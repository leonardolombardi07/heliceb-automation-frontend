"use client";

import React from "react";
import Box from "@mui/material/Box";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { SIUnit } from "@/app/modules/units";
import UnitSelect from "../UnitSelect";

type NumberWithUnitsFieldProps = TextFieldProps & {
  units: SIUnit[];
  unit: SIUnit;
  onChangeUnit?: (unit: SIUnit) => void;
};

export default function NumberWithUnitsField({
  units,
  unit,
  onChangeUnit,
  ...props
}: NumberWithUnitsFieldProps) {
  return (
    <Box>
      <TextField
        type="number"
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
          if (!onChangeUnit) return;
          onChangeUnit(e.target.value as SIUnit);
        }}
      />
    </Box>
  );
}
