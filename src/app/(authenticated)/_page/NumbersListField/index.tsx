import TextField, { TextFieldProps } from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { SIUnit } from "@/app/modules/units";
import UnitSelect from "../UnitSelect";

type NumbersListFieldProps = TextFieldProps & {
  numbers: number[];
  defaultValue: number[];
  setNumbers: (numbers: number[]) => void;
  units: SIUnit[];
  unit: SIUnit;
  onChangeUnit?: (unit: SIUnit) => void;
};

export default function NumbersListField({
  numbers,
  defaultValue,
  setNumbers: _setNumbers,
  units,
  unit,
  onChangeUnit,
  ...props
}: NumbersListFieldProps) {
  const { isDialogOpen, openDialog, closeDialog } = useDialog();

  const [min, setMin] = React.useState<number>(
    Math.min(...numbers, ...numbers, 0)
  );
  const [max, setMax] = React.useState<number>(
    Math.max(...numbers, ...numbers, 1)
  );

  const divider = numbers.length == 0 ? 1 : numbers.length;
  const defaultStep = Math.abs(max - min) / divider;
  const [step, setStep] = React.useState<number>(
    Math.max(...numbers, defaultStep, 0.1)
  );

  const [addNumber, setAddNumber] = React.useState<number | null>(null);

  function setNumbers(numbers: number[]) {
    _setNumbers(Array.from(new Set(numbers)));
  }

  const canReset = isDifferentArray(numbers, defaultValue);
  function onReset() {
    setNumbers(defaultValue);
  }

  const canApply = min < max && step > 0 && step <= max - min;
  function onApply() {
    setNumbers(generateNumbers(min, max, step));
  }

  function applyOnEnter(e: React.KeyboardEvent) {
    if (e.key == "Enter" && canApply) {
      onApply();
    }
  }

  function onDeleteNumber(index: number) {
    const newNumbers = [...numbers];
    newNumbers.splice(index, 1);
    setNumbers(newNumbers);
  }

  const canAdd = addNumber != null && !numbers.includes(addNumber);
  function onAddNumber() {
    if (addNumber == null) return;
    setAddNumber(null);
    setNumbers([...numbers, addNumber]);
  }

  const orderedNumbers = numbers.sort((a, b) => a - b);
  const numbersAsString = getNumbersAsString(orderedNumbers);
  return (
    <React.Fragment>
      <Box>
        <TextField
          value={numbersAsString}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <IconButton onClick={openDialog}>
                <EditIcon />
              </IconButton>
            ),
          }}
          sx={{
            minWidth: 250,
          }}
          {...props}
        />

        <UnitSelect
          options={units.map((unit) => ({
            key: unit,
            value: unit,
            label: unit,
          }))}
          value={unit}
          onChange={(e) => {
            if (onChangeUnit) {
              onChangeUnit(e.target.value as SIUnit);
            }
          }}
        />
      </Box>

      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            minWidth: 450,
          },
        }}
        open={isDialogOpen}
        onClose={closeDialog}
      >
        <DialogTitle>Editar {`"${props.label}"`}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              mt: 1,
            }}
          >
            <NumberInput
              label="Min"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
              onKeyDown={applyOnEnter}
            />
            <NumberInput
              label="Max"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              onKeyDown={applyOnEnter}
            />
            <NumberInput
              label="Step"
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
              onKeyDown={applyOnEnter}
            />
          </Box>

          <Box>
            <Button disabled={!canReset} onClick={onReset}>
              Resetar
            </Button>
            <Button
              disabled={!canApply}
              onClick={() => {
                onApply();
                closeDialog();
              }}
            >
              Aplicar
            </Button>
          </Box>
          <Divider sx={{ mt: 3 }} />

          <Box
            sx={{
              overflowY: "auto",
              maxHeight: 200,
              mt: 3,
            }}
          >
            {numbers.length == 0 && (
              <Typography>Nenhum valor adicionado.</Typography>
            )}
            <List>
              {numbers.map((number, index) => (
                <ListItem key={index}>
                  <ListItemText primary={number} />
                  <IconButton onClick={() => onDeleteNumber(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <NumberInput
              label=""
              value={addNumber ?? ""}
              onChange={(e) => setAddNumber(Number(e.target.value))}
            />

            <Button
              disabled={!canAdd}
              onClick={onAddNumber}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  onAddNumber();
                }
              }}
            >
              Adicionar Valor
            </Button>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog}>Voltar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function getNumbersAsString(numbers: number[]) {
  // Max of 5 numbers
  // Always show first and last number (and, if there is, 3 numbers in between)

  if (numbers.length == 0) {
    return "";
  }

  if (numbers.length <= 5) {
    return numbers.join(", ");
  }

  return `${numbers[0]}, ${numbers[1]}, ..., ${numbers[numbers.length - 2]}, ${
    numbers[numbers.length - 1]
  }`;
}

function NumberInput(props: TextFieldProps) {
  return (
    <TextField
      type="number"
      sx={{
        maxWidth: 80,
        ...props.sx,
      }}
      InputProps={{
        ...props.InputProps,
        inputProps: {
          ...props.InputProps?.inputProps,
          min: 0,
          // max: 100,
        },
      }}
      {...props}
    />
  );
}

function isDifferentArray(array1: number[], array2: number[]) {
  if (array1.length != array2.length) {
    return true;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] != array2[i]) {
      return true;
    }
  }

  return false;
}

function useDialog() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  function openDialog() {
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
  }

  return { isDialogOpen, openDialog, closeDialog };
}

function generateNumbers(min: number, max: number, step: number) {
  const numbers = [];
  for (let i = min; i <= max; i += step) {
    numbers.push(i);
  }
  return numbers;
}
