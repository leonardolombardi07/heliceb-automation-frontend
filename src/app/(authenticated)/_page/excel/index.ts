import { FormValues } from "../../types";
import { getSortedPropulsionSystems } from "./getSortedPropulsionSystems";
import { getConsistentUnits } from "./getConsistentUnits";
import ExcelJS from "@/app/modules/excel";
import { writeInputSheet } from "./inputSheet";
import { writeOutputSheet } from "./outputSheet";

export async function generateExcel(inconsistentUnitsFormValues: FormValues) {
  const formValues = getConsistentUnits(inconsistentUnitsFormValues);
  const propulsionSystems = getSortedPropulsionSystems(formValues);

  const workbook = new ExcelJS.Workbook();
  const outputSheet = workbook.addWorksheet("Output");
  await writeOutputSheet(outputSheet, propulsionSystems);

  const inputSheet = workbook.addWorksheet("Input");
  await writeInputSheet(inputSheet, formValues);

  await ExcelJS.downloadWorkbook(workbook);
}
