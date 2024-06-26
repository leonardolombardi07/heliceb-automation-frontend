import { convertBetweenSIUnits } from "@/app/modules/units";
import { FormValues, FormValuesWithoutUnits } from "../../types";

export function getConsistentUnits(
  inconsistent: FormValues
): FormValuesWithoutUnits {
  // TODO: Implement this function
  return {
    seaWaterDensity: convertBetweenSIUnits({
      value: inconsistent.seaWaterDensity.value,
      unit: inconsistent.seaWaterDensity.unit,
      targetUnit: "kg/m³",
    }),
    gravityAcceleration: convertBetweenSIUnits({
      value: inconsistent.gravityAcceleration.value,
      unit: inconsistent.gravityAcceleration.unit,
      targetUnit: "m/s²",
    }),
    atmosphericPressure: convertBetweenSIUnits({
      value: inconsistent.atmosphericPressure.value,
      unit: inconsistent.atmosphericPressure.unit,
      targetUnit: "Pa",
    }),
    saturationPressure: convertBetweenSIUnits({
      value: inconsistent.saturationPressure.value,
      unit: inconsistent.saturationPressure.unit,
      targetUnit: "Pa",
    }),
    kinematicViscosity: convertBetweenSIUnits({
      value: inconsistent.kinematicViscosity.value,
      unit: inconsistent.kinematicViscosity.unit,
      targetUnit: "m²/s",
    }),
    maxNumberOfResults: inconsistent.maxNumberOfResults.value,
    minEfficiency: inconsistent.minEfficiency.value / 1000, // percentage to decimal
    minDeliveredThrust: convertBetweenSIUnits({
      value: inconsistent.minDeliveredThrust.value,
      unit: inconsistent.minDeliveredThrust.unit,
      targetUnit: "N",
    }),
    maxDeliveredThrust: convertBetweenSIUnits({
      value: inconsistent.maxDeliveredThrust.value,
      unit: inconsistent.maxDeliveredThrust.unit,
      targetUnit: "N",
    }),
    cavitationLimit: inconsistent.cavitationLimit.value / 1000, // percentage to decimal
    numberOfBlades: inconsistent.numberOfBlades.map((value) =>
      convertBetweenSIUnits({
        value: value.value,
        unit: value.unit,
        targetUnit: "-",
      })
    ),
    rotationalSpeeds: inconsistent.rotationalSpeeds.map((value) =>
      convertBetweenSIUnits({
        value: value.value,
        unit: value.unit,
        targetUnit: "rpm",
      })
    ),
    areaRatios: inconsistent.areaRatios.map((value) =>
      convertBetweenSIUnits({
        value: value.value,
        unit: value.unit,
        targetUnit: "-",
      })
    ),
    pitchDiameterRatios: inconsistent.pitchDiameterRatios.map((value) =>
      convertBetweenSIUnits({
        value: value.value,
        unit: value.unit,
        targetUnit: "-",
      })
    ),
    diameters: inconsistent.diameters.map((value) =>
      convertBetweenSIUnits({
        value: value.value,
        unit: value.unit,
        targetUnit: "m",
      })
    ),
    wake_coefficients: inconsistent.wake_coefficients.map((value) =>
      convertBetweenSIUnits({
        value: value.value,
        unit: value.unit,
        targetUnit: "-",
      })
    ),
    serviceSpeeds: inconsistent.serviceSpeeds.map((value) =>
      convertBetweenSIUnits({
        value: value.value,
        unit: value.unit,
        targetUnit: "m/s",
      })
    ),
    drafts: inconsistent.drafts.map((value) =>
      convertBetweenSIUnits({
        value: value.value,
        unit: value.unit,
        targetUnit: "m",
      })
    ),
  };
}
