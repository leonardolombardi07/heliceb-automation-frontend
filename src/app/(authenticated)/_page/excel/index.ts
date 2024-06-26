import { convertBetweenSIUnits } from "@/app/modules/units";
import { FormValues, FormValuesWithoutUnits } from "../../types";
import {
  OutputedPropulsionSystem,
  getSortedPropulsionSystems,
} from "./getSortedPropulsionSystems";
import { getConsistentUnits } from "./getConsistentUnits";
import ExcelJS, { Workbook, Worksheet } from "@/app/modules/excel";

export async function generateExcel(inconsistentUnitsFormValues: FormValues) {
  const formValues = getConsistentUnits(inconsistentUnitsFormValues);
  const propulsionSystems = getSortedPropulsionSystems(formValues);

  const workbook = new ExcelJS.Workbook();
  const inputSheet = workbook.addWorksheet("Input");
  await writeInputSheet(inputSheet, formValues);

  const outputSheet = workbook.addWorksheet("Output");
  await writeOutputSheet(outputSheet, propulsionSystems);

  await ExcelJS.downloadWorkbook(workbook);
}

async function writeInputSheet(
  worksheet: Worksheet,
  input: FormValuesWithoutUnits
) {
  worksheet.getCell("A1").value = "Parâmetro";
  worksheet.getCell("B1").value = "Valor";

  let row = 2;

  // Environment
  worksheet.mergeCells(`A${row}:B${row}`);
  worksheet.getCell(`A${row}`).value = "Environment";

  const environment = {
    "seaWaterDensity (kg/m³)": input.seaWaterDensity,
    "gravityAcceleration (m/s²)": input.gravityAcceleration,
    "atmosphericPressure (Pa)": input.atmosphericPressure,
    "saturationPressure (Pa)": input.saturationPressure,
    "kinematicViscosity (m²/s)": input.kinematicViscosity,
  };

  for (const [key, value] of Object.entries(environment)) {
    row += 1;
    worksheet.getCell(`A${row}`).value = key;
    worksheet.getCell(`B${row}`).value = value;
  }

  // Constraints
  row += 1;
  worksheet.mergeCells(`A${row}:B${row}`);
  worksheet.getCell(`A${row}`).value = "Constraints";

  const constraints = {
    maxNumberOfResults: input.maxNumberOfResults,
    minEfficiency: input.minEfficiency,
    "minDeliveredThrust (kN)": input.minDeliveredThrust,
    "maxDeliveredThrust (kN)": input.maxDeliveredThrust,
    "cavitationLimit (%)": input.cavitationLimit,
  };

  for (const [key, value] of Object.entries(constraints)) {
    row += 1;
    worksheet.getCell(`A${row}`).value = key;
    worksheet.getCell(`B${row}`).value = value;
  }

  // Design Parameters
  row += 1;
  worksheet.mergeCells(`A${row}:B${row}`);
  worksheet.getCell(`A${row}`).value = "Design Parameters";

  const designParameters = {
    numberOfBlades: input.numberOfBlades,
    "rotationalSpeeds (rpm)": input.rotationalSpeeds,
    areaRatios: input.areaRatios,
    pitchDiameterRatios: input.pitchDiameterRatios,
    "diameters (m)": input.diameters,
    wake_coefficients: input.wake_coefficients,
    "serviceSpeeds (m/s)": input.serviceSpeeds,
    "drafts (m)": input.drafts,
  };

  const listAsStr = (lst: any[]) => lst.join(", ");

  for (const [key, value] of Object.entries(designParameters)) {
    row += 1;
    worksheet.getCell(`A${row}`).value = key;
    worksheet.getCell(`B${row}`).value = listAsStr(value);
  }

  const allRange = `A1:B${row}`;
  // worksheet.getCells(allRange).forEach((cell) => {
  //   cell.alignment = {
  //     horizontal: "center",
  //     vertical: "middle",
  //     wrapText: true,
  //   };
  //   cell.border = {
  //     top: { style: "thin" },
  //     left: { style: "thin" },
  //     bottom: { style: "thin" },
  //     right: { style: "thin" },
  //   };
  // });
  worksheet.columns.forEach((column) => {
    column.width = 20;
  });
}

async function writeOutputSheet(
  worksheet: Worksheet,
  output: OutputedPropulsionSystem[]
) {
  const headers = [
    "Número de Pás (z)",
    "Rotação (N) [rpm]",
    "Razão de Passo (P/D)",
    "Razão de Área (Ae/Ao)",
    "Diâmetro (d) [m]",
    "Coeficiente de Esteira (w)",
    "Velocidade de Serviço (Vs) [m/s]",
    "Calado (T) [m]",
    "Coef. Avanço (J0)",
    "Velocidade de Avanço (Va) [m/s]",
    "Coeficiente de Empuxo (Kt0)",
    "Empuxo (T0) [kN]",
    "Coeficiente de Torque (Kq0)",
    "Torque (Q0) [kN.m]",
    "Eficiência (n0 x nrr)",
    "Potência (DHP) [kW]",
    "Cavitação",
  ];

  worksheet.addRow(headers);

  output.forEach((propulsion_system) => {
    const row = [
      propulsion_system.z,
      propulsion_system.N,
      propulsion_system.PD,
      propulsion_system.AeAo,
      propulsion_system.d,
      propulsion_system.w,
      propulsion_system.Vs,
      propulsion_system.T,
      propulsion_system.J0,
      propulsion_system.Va,
      propulsion_system.Kt0,
      propulsion_system.T0,
      propulsion_system.Kq0,
      propulsion_system.Q0,
      propulsion_system.efficiency,
      propulsion_system.DHP,
      propulsion_system.cavitation_eval,
    ];
    worksheet.addRow(row);
  });

  worksheet.columns.forEach((column) => {
    column.width = 20;
  });

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell) => {
      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
      };
      if (rowNumber === 1) {
        cell.font = { bold: true };
      }
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });
}
