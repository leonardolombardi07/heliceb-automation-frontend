import { SIUnit } from "../modules/units";

export type ValueWithUnit<T extends SIUnit = SIUnit> = {
  unit: T;
  value: number;
};

export interface FormValues {
  // Environment
  seaWaterDensity: ValueWithUnit<"kg/m³">;
  gravityAcceleration: ValueWithUnit<"m/s²">;
  atmosphericPressure: ValueWithUnit<"Pa">;
  saturationPressure: ValueWithUnit<"Pa">;
  kinematicViscosity: ValueWithUnit<"m²/s">;

  // Constraints
  maxNumberOfResults: ValueWithUnit<"-">;
  minEfficiency: ValueWithUnit<"%">;
  minDeliveredThrust: ValueWithUnit<"N" | "kN">;
  maxDeliveredThrust: ValueWithUnit<"N" | "kN">;
  cavitationLimit: ValueWithUnit<"%">;

  // Design parameters
  numberOfBlades: ValueWithUnit<"-">[];
  rotationalSpeeds: ValueWithUnit<"rpm" | "rad/s">[];
  areaRatios: ValueWithUnit<"-">[];
  pitchDiameterRatios: ValueWithUnit<"-">[];
  diameters: ValueWithUnit<"m">[];
  wake_coefficients: ValueWithUnit<"-">[];
  serviceSpeeds: ValueWithUnit<"m/s" | "knots">[];
  drafts: ValueWithUnit<"m">[];
}

export interface FormValuesWithoutUnits {
  seaWaterDensity: number;
  gravityAcceleration: number;
  atmosphericPressure: number;
  saturationPressure: number;
  kinematicViscosity: number;

  maxNumberOfResults: number;
  minEfficiency: number;
  minDeliveredThrust: number;
  maxDeliveredThrust: number;
  cavitationLimit: number;

  numberOfBlades: number[];
  rotationalSpeeds: number[];
  areaRatios: number[];
  pitchDiameterRatios: number[];
  diameters: number[];
  wake_coefficients: number[];
  serviceSpeeds: number[];
  drafts: number[];
}
