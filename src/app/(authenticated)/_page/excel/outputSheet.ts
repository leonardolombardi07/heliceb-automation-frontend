import { OutputedPropulsionSystem } from "./getSortedPropulsionSystems";
import { Worksheet } from "@/app/modules/excel";

export async function writeOutputSheet(
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

  worksheet.addTable({
    name: "PropulsionSystems",
    ref: "A1",
    headerRow: true,
    style: {
      theme: "TableStyleMedium1",
      showRowStripes: true,
    },
    columns: [
      ...headers.map((header) => ({ name: header, filterButton: true })),
    ],
    rows: [
      ...output.map((propulsion_system) => [
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
      ]),
    ],
  });

  // Wrap text of the header row
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    row.eachCell((cell) => {
      if (rowNumber === 1) {
        cell.alignment = {
          wrapText: true,
          vertical: "middle",
          horizontal: "center",
        };
      }
    });
  });

  worksheet.columns.forEach((column) => {
    column.width = 15;
  });
}
