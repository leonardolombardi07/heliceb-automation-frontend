import { FormValuesWithoutUnits } from "../../types";
import { Worksheet } from "@/app/modules/excel";

export async function writeInputSheet(
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
    maxNumberOfResults:
      input.maxNumberOfResults === Infinity
        ? "Infinity"
        : input.maxNumberOfResults,
    minEfficiency: input.minEfficiency,
    "minDeliveredThrust (kN)": input.minDeliveredThrust,
    "maxDeliveredThrust (kN)":
      input.maxDeliveredThrust === Infinity
        ? "Infinity"
        : input.maxDeliveredThrust,
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

  worksheet.columns.forEach((column) => {
    column.width = 20;
  });
}
