type Density = "kg/m³";
type Acceleration = "m/s²";
type Pressure = "Pa";
type KinematicViscosity = "m²/s";
type Force = "N" | "kN";
type Length = "m";
type RotationalSpeed = "rad/s" | "rpm";
type Speed = "m/s" | "km/h" | "knots";
type Percent = "%";
type NoUnit = "-";

type SIUnit =
  | Density
  | Acceleration
  | Pressure
  | KinematicViscosity
  | Force
  | Length
  | RotationalSpeed
  | Speed
  | Percent
  | NoUnit;

function convertBetweenSIUnits({
  value,
  unit,
  targetUnit,
}: {
  value: number;
  unit: SIUnit;
  targetUnit: SIUnit;
}): number {
  if (unit === targetUnit) {
    return value;
  }

  // Force
  if (unit === "N" && targetUnit === "kN") {
    return value / 1000;
  }

  if (unit === "kN" && targetUnit === "N") {
    return value * 1000;
  }

  // Speed
  if (unit === "m/s" && targetUnit === "km/h") {
    return value * 3.6;
  }

  if (unit === "km/h" && targetUnit === "m/s") {
    return value / 3.6;
  }

  if (unit === "m/s" && targetUnit === "knots") {
    return value * 1.94384;
  }

  if (unit === "knots" && targetUnit === "m/s") {
    return value / 1.94384;
  }

  if (unit === "km/h" && targetUnit === "knots") {
    return value / 1.852;
  }

  if (unit === "knots" && targetUnit === "km/h") {
    return value * 1.852;
  }

  // Rotational Speed
  if (unit === "rad/s" && targetUnit === "rpm") {
    return value * (60 / (2 * Math.PI));
  }

  if (unit === "rpm" && targetUnit === "rad/s") {
    return (value * (2 * Math.PI)) / 60;
  }

  return value;
}

export type { SIUnit };
export { convertBetweenSIUnits };
