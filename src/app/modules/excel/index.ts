import { APP_NAME } from "@/app/constants";
import RawExcelJS from "exceljs";
import FileSaver from "file-saver";

const DEFAULT_FILE_NAME = `${APP_NAME} | ${new Date().toLocaleString()}`;

async function downloadWorkbook(workbook: RawExcelJS.Workbook) {
  const buffer = await workbook.xlsx.writeBuffer();
  const filename = `${workbook.title || DEFAULT_FILE_NAME}.xlsx`;
  FileSaver.saveAs(
    new Blob([buffer], { type: "application/octet-stream" }),
    filename
  );
}

const ExcelJS = {
  ...RawExcelJS,
  downloadWorkbook,
};

export default ExcelJS;
export type * from "exceljs";
