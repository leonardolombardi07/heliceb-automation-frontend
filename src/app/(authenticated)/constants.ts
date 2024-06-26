import { SIUnit } from "../modules/units";
import { FormValues, ValueWithUnit } from "./types";

export const DEFAULT_FORM_VALUES: FormValues = {
  // Environment
  seaWaterDensity: { value: 1025.9, unit: "kg/m³" },
  gravityAcceleration: { value: 9.807, unit: "m/s²" },
  atmosphericPressure: { value: 101_325, unit: "Pa" },
  saturationPressure: { value: 1705.1, unit: "Pa" },
  kinematicViscosity: { value: 0.00000118831, unit: "m²/s" },

  // Constraints
  maxNumberOfResults: { value: Infinity, unit: "-" },
  minEfficiency: { value: 0, unit: "%" },
  minDeliveredThrust: { value: 0, unit: "kN" },
  maxDeliveredThrust: { value: 43.15, unit: "kN" },
  cavitationLimit: { value: 5, unit: "%" },

  // Design parameters
  numberOfBlades: list_of_values({ start: 3, end: 5, step: 1, unit: "-" }),

  rotationalSpeeds: list_of_values({
    start: 120,
    end: 200,
    step: 10,
    unit: "rpm",
  }),

  areaRatios: list_of_values({
    start: 0.5,
    end: 1.5,
    step: 0.05,
    unit: "-",
  }),

  pitchDiameterRatios: list_of_values({
    start: 0.5,
    end: 1.5,
    step: 0.05,
    unit: "-",
  }),

  diameters: [{ value: 3.5, unit: "m" }],
  wake_coefficients: [{ value: 0.277, unit: "-" }],
  serviceSpeeds: [{ value: 5.66, unit: "m/s" }],
  drafts: [{ value: 6.3, unit: "m" }],
};

function list_of_values<T extends SIUnit>({
  start,
  end,
  step,
  unit,
}: {
  start: number;
  end: number;
  step: number;
  unit: T;
}): ValueWithUnit<T>[] {
  const values: ValueWithUnit<T>[] = [];
  for (let value = start; value <= end; value += step) {
    values.push({ unit, value });
  }
  return values;
}
