"use client";

import React from "react";
import styled from "@mui/system/styled";
import Container from "./_page/Container";
import BackToTop from "./_page/BackToTop";
import TableOfContents, { TocItem } from "./_page/TableOfContents";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "./_page/Header";
import { SectionContainer, SectionTitle } from "./_page/Section";
import NumberWithUnitsField from "./_page/NumberWithUnitsField";
import Grid from "@mui/material/Grid";
import NumbersListField from "./_page/NumbersListField";
import { DEFAULT_FORM_VALUES } from "./constants";
import { FormValues, ValueWithUnit } from "./types";
import { SIUnit } from "../modules/units";
import { generateExcel } from "./_page/excel";

function PageContent() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formValues, setFormValues] = React.useState(DEFAULT_FORM_VALUES);
  const [error, setError] = React.useState<string | null>(null);

  function onChangeValue(value: number, key: keyof FormValues) {
    setFormValues((prev) => ({
      ...prev,
      [key]: {
        // @ts-ignore
        unit: prev[key].unit,
        value,
      },
    }));
  }

  function onChangeNumbers(numbers: number[], key: keyof FormValues) {
    setFormValues((prev) => {
      return {
        ...prev,
        [key]: numbers.map((value) => ({
          value,
          // @ts-ignore
          unit: prev[key].unit,
        })),
      };
    });
  }

  function onChangeNumbersUnit(
    numbers: number[],
    key: keyof FormValues,
    unit: SIUnit
  ) {
    setFormValues((prev) => {
      return {
        ...prev,
        [key]: numbers.map((value) => ({
          value,
          unit,
        })),
      };
    });
  }

  async function onGenerateExcel() {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      await generateExcel(formValues);
    } catch (error: any) {
      setError("Something went wrong! So sorry!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box sx={{ pb: 5 }}>
      <Header
        isLoading={isLoading}
        onGenerateExcel={onGenerateExcel}
        error={error}
      />

      <SectionContainer>
        <SectionTitle id={TOC[0].hash}>{TOC[0].text}</SectionTitle>
        <Box>
          <Typography>
            As variáveis de ambiente configuram as condições físicas nas quais o
            propulsor deve operar.
          </Typography>

          <Box sx={{ mt: 4 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <NumberWithUnitsField
                label="(ρ) Densidade da Água do Mar"
                value={getValue(formValues["seaWaterDensity"])}
                onChange={(event) => {
                  onChangeValue(Number(event.target.value), "seaWaterDensity");
                }}
                unit={getUnit(formValues["seaWaterDensity"])}
                units={["kg/m³"]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <NumberWithUnitsField
                label="(g) Aceleração da Gravidade"
                value={getValue(formValues["gravityAcceleration"])}
                onChange={(event) => {
                  onChangeValue(
                    Number(event.target.value),
                    "gravityAcceleration"
                  );
                }}
                unit={getUnit(formValues["gravityAcceleration"])}
                units={["m/s²"]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <NumberWithUnitsField
                label="(Pa) Pressão Atmosférica"
                value={getValue(formValues["atmosphericPressure"])}
                onChange={(event) => {
                  onChangeValue(
                    Number(event.target.value),
                    "atmosphericPressure"
                  );
                }}
                unit={getUnit(formValues["atmosphericPressure"])}
                units={["Pa"]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <NumberWithUnitsField
                label="(Ps) Pressão de Saturação da Água do Mar"
                value={getValue(formValues["saturationPressure"])}
                onChange={(event) => {
                  onChangeValue(
                    Number(event.target.value),
                    "saturationPressure"
                  );
                }}
                unit={getUnit(formValues["saturationPressure"])}
                units={["Pa"]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <NumberWithUnitsField
                label="(v) Viscosidade Cinemática da Água do Mar"
                value={getValue(formValues["kinematicViscosity"])}
                onChange={(event) => {
                  onChangeValue(
                    Number(event.target.value),
                    "kinematicViscosity"
                  );
                }}
                unit={getUnit(formValues["kinematicViscosity"])}
                units={["m²/s"]}
              />
            </Grid>
          </Grid>
        </Box>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle id={TOC[1].hash}>{TOC[1].text}</SectionTitle>
        <Box>
          <Typography>
            As restrições são as condições que o sistema deve atender para
            satisfazer os requisitos do projeto.
          </Typography>

          <Box sx={{ mt: 4 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <NumberWithUnitsField
                label="(n) Máximo Número de Propulsores"
                value={getValue(formValues["maxNumberOfResults"])}
                onChange={(event) => {
                  onChangeValue(
                    Number(event.target.value),
                    "maxNumberOfResults"
                  );
                }}
                unit={getUnit(formValues["maxNumberOfResults"])}
                units={["-"]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <NumberWithUnitsField
                label="(nr) Eficiência Mínima"
                value={getValue(formValues["minEfficiency"])}
                onChange={(event) => {
                  onChangeValue(Number(event.target.value), "minEfficiency");
                }}
                unit={getUnit(formValues["minEfficiency"])}
                units={["-"]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <NumberWithUnitsField
                label="(T min) Empuxo Entregue Mínimo"
                value={getValue(formValues["minDeliveredThrust"])}
                onChange={(event) => {
                  onChangeValue(
                    Number(event.target.value),
                    "minDeliveredThrust"
                  );
                }}
                unit={getUnit(formValues["minDeliveredThrust"])}
                units={["kN"]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <NumberWithUnitsField
                label="(T max) Empuxo Entregue Máximo"
                value={getValue(formValues["maxDeliveredThrust"])}
                onChange={(event) => {
                  onChangeValue(
                    Number(event.target.value),
                    "maxDeliveredThrust"
                  );
                }}
                unit={getUnit(formValues["maxDeliveredThrust"])}
                units={["kN"]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <NumberWithUnitsField
                label="(σ min) Limite de Cavitação"
                value={getValue(formValues["cavitationLimit"])}
                onChange={(event) => {
                  onChangeValue(Number(event.target.value), "cavitationLimit");
                }}
                unit={getUnit(formValues["cavitationLimit"])}
                units={["%"]}
              />
            </Grid>
          </Grid>
        </Box>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle id={TOC[2].hash}>{TOC[2].text}</SectionTitle>
        <Box>
          <Typography>
            Os parâmetros de projeto são as variáveis que serão variadas para
            encontrar diferentes propulsores.
          </Typography>

          <Box sx={{ mt: 4 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <NumbersListField
                label="(z) Número de Pás"
                numbers={getNumbers(formValues["numberOfBlades"])}
                defaultValue={DEFAULT_FORM_VALUES["numberOfBlades"].map(
                  (v) => v.value
                )}
                setNumbers={(numbers) => {
                  onChangeNumbers(numbers, "numberOfBlades");
                }}
                unit={"-"}
                units={["-"]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <NumbersListField
                label="(r) Rotações"
                numbers={getNumbers(formValues["rotationalSpeeds"])}
                defaultValue={DEFAULT_FORM_VALUES["rotationalSpeeds"].map(
                  (v) => v.value
                )}
                setNumbers={(numbers) => {
                  onChangeNumbers(numbers, "rotationalSpeeds");
                }}
                unit={getNumbersUnit(formValues["rotationalSpeeds"])}
                onChangeUnit={(unit) => {
                  onChangeNumbersUnit(
                    getNumbers(formValues["rotationalSpeeds"]),
                    "rotationalSpeeds",
                    unit
                  );
                }}
                units={["rpm", "rad/s"]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <NumbersListField
                label="(Ae/A0) Razões de Área"
                numbers={getNumbers(formValues["areaRatios"])}
                defaultValue={DEFAULT_FORM_VALUES["areaRatios"].map(
                  (v) => v.value
                )}
                setNumbers={(numbers) => {
                  onChangeNumbers(numbers, "areaRatios");
                }}
                unit={"-"}
                units={["-"]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <NumbersListField
                label="(d) Diâmetros"
                numbers={getNumbers(formValues["diameters"])}
                defaultValue={DEFAULT_FORM_VALUES["diameters"].map(
                  (v) => v.value
                )}
                setNumbers={(numbers) => {
                  onChangeNumbers(numbers, "diameters");
                }}
                unit={"m"}
                units={["m"]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <NumbersListField
                label="(w) Coeficientes de Esteira"
                numbers={getNumbers(formValues["wake_coefficients"])}
                defaultValue={DEFAULT_FORM_VALUES["wake_coefficients"].map(
                  (v) => v.value
                )}
                setNumbers={(numbers) => {
                  onChangeNumbers(numbers, "wake_coefficients");
                }}
                unit={"-"}
                units={["-"]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <NumbersListField
                label="(Vs) Velocidades de Serviço"
                numbers={getNumbers(formValues["serviceSpeeds"])}
                defaultValue={DEFAULT_FORM_VALUES["serviceSpeeds"].map(
                  (v) => v.value
                )}
                setNumbers={(numbers) => {
                  onChangeNumbers(numbers, "serviceSpeeds");
                }}
                unit={getNumbersUnit(formValues["serviceSpeeds"])}
                onChangeUnit={(unit) => {
                  onChangeNumbersUnit(
                    getNumbers(formValues["serviceSpeeds"]),
                    "serviceSpeeds",
                    unit
                  );
                }}
                units={["knots", "m/s"]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <NumbersListField
                label="(T) Calados"
                numbers={getNumbers(formValues["drafts"])}
                defaultValue={DEFAULT_FORM_VALUES["drafts"].map((v) => v.value)}
                setNumbers={(numbers) => {
                  onChangeNumbers(numbers, "drafts");
                }}
                unit="m"
                units={["m"]}
              />
            </Grid>
          </Grid>
        </Box>
      </SectionContainer>
    </Box>
  );
}

const TOC: TocItem[] = [
  {
    text: "Condições Ambientais",
    hash: "condicoes-ambientais",
    children: [],
  },

  {
    text: "Restrições",
    hash: "restricoes",
    children: [],
  },

  {
    text: "Parâmetros de Projeto",
    hash: "parametros-de-projeto",
    children: [],
  },
];

const TOC_WIDTH = 242;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "disableToc",
})(({ theme }) => ({
  minHeight: "100vh",
  display: "grid",
  width: "100%",

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: `1fr ${TOC_WIDTH}px`,
  },
}));

const StyledContainer = styled(Container, {
  shouldForwardProp: (prop) =>
    prop !== "disableAd" && prop !== "hasTabs" && prop !== "disableToc",
})(({ theme }) => {
  return {
    position: "relative",

    // 105ch ≈ 930px
    maxWidth: "105ch",

    [theme.breakpoints.up("lg")]: {
      paddingLeft: "60px",
      paddingRight: "60px",
    },
  };
});

export default function Page() {
  return (
    <React.Fragment>
      <Main>
        <StyledContainer>
          <PageContent />
        </StyledContainer>

        <TableOfContents toc={TOC} />
      </Main>
      <BackToTop />
    </React.Fragment>
  );
}

function getValue(valueWithUnit: ValueWithUnit) {
  return valueWithUnit.value;
}

function getUnit(valueWithUnit: ValueWithUnit) {
  return valueWithUnit.unit;
}

function getNumbers(values: ValueWithUnit[]) {
  return values.map((value) => value.value);
}

function getNumbersUnit(values: ValueWithUnit[]) {
  return values[0].unit;
}
