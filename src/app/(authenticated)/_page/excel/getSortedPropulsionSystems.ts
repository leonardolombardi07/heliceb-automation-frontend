import { FormValues, FormValuesWithoutUnits, ValueWithUnit } from "../../types";
import {
  getRe,
  getCorrectedKt,
  getCorrectedKq,
  getCavitationEvaluation,
} from "@/app/modules/propulsion";

const { PI } = Math;

export interface OutputedPropulsionSystem {
  z: number;
  N: number;
  PD: number;
  AeAo: number;
  d: number;
  w: number;
  Vs: number;
  T: number;
  J0: number;
  Va: number;
  Kt0: number;
  T0: number;
  Kq0: number;
  Q0: number;
  efficiency: number;
  DHP: number;
  cavitation_eval: "ok" | "nok";
}

function getSortedPropulsionSystems({
  seaWaterDensity,
  gravityAcceleration,
  atmosphericPressure,
  saturationPressure,
  kinematicViscosity,

  maxNumberOfResults,
  minEfficiency,
  minDeliveredThrust,
  maxDeliveredThrust,
  cavitationLimit,

  numberOfBlades,
  rotationalSpeeds,
  areaRatios,
  pitchDiameterRatios,
  diameters,
  wake_coefficients,
  serviceSpeeds,
  drafts,
}: FormValuesWithoutUnits): OutputedPropulsionSystem[] {
  // Environment parameters
  const rho = seaWaterDensity;
  const v = kinematicViscosity;
  const g = gravityAcceleration;
  const Pa = atmosphericPressure;
  const Ps = saturationPressure;

  // TODO
  const combinations = product(
    numberOfBlades,
    rotationalSpeeds,
    pitchDiameterRatios,
    areaRatios,
    diameters,
    wake_coefficients,
    serviceSpeeds,
    drafts
  );
  const unsorted_output: OutputedPropulsionSystem[] = [];
  for (const [nblades, RPM, PD, AeAo, d, w, Vs, T] of combinations) {
    const n = RPM / 60; // rotation in Hz
    const Va = Vs * (1 - w); // advance velocity
    const J = Va / (n * d); // advance ratio

    const Re = getRe({
      Va: Vs, // Alho references as Va but uses Vs on spreadsheet as well
      n,
      d,
      v,
      nblades,
      AeAo,
    });

    const kt = getCorrectedKt({
      J,
      PD,
      AeAo,
      nblades,
      Re,
    });
    const TDelivered = (kt * rho * n ** 2 * d ** 4) / 1000;

    if (TDelivered < minDeliveredThrust || TDelivered > maxDeliveredThrust) {
      continue;
    }

    const shaftDepth = T - 0.55 * d;
    const cavitation_eval = getCavitationEvaluation({
      rho,
      Pa,
      Ps,
      g,
      T,
      d,
      TDelivered,
      shaftDepth,
      Va: Vs, // Alho references as Va but uses Vs on spreadsheet as well
      PD,
      AeAo,
      n,
      cavitationLimit,
    });

    if (cavitation_eval.result === "nok") {
      continue;
    }

    const kq = getCorrectedKq({
      J,
      PD,
      AeAo,
      nblades,
      Re,
    });

    const efficiency = (J * kt) / (2 * PI * kq);
    if (efficiency < minEfficiency) {
      continue;
    }

    const Q0 = (kq * rho * n ** 2 * d ** 5) / 1000;

    const output_system: OutputedPropulsionSystem = {
      z: nblades,
      N: RPM,
      PD: PD,
      AeAo: AeAo,
      d: d,
      w: w,
      Vs: Vs,
      T: T,
      J0: J,
      Va: Va,
      Kt0: kt,
      T0: TDelivered,
      Kq0: kq,
      Q0: Q0,
      efficiency: efficiency,
      DHP: 2 * PI * Q0 * n,
      cavitation_eval: cavitation_eval.result,
    };

    unsorted_output.push(output_system);
  }

  const sorted_output = unsorted_output.sort(
    (a, b) => b.efficiency - a.efficiency
  );

  if (maxNumberOfResults === Infinity) {
    return sorted_output;
  }

  return sorted_output.slice(0, maxNumberOfResults);
}

export { getSortedPropulsionSystems };

function product<T>(...args: T[][]): T[][] {
  // @ts-ignore
  return args.reduce(
    // @ts-ignore
    function tl(accumulator, value) {
      const tmp: T[][] = [];
      accumulator.forEach(function (a0) {
        value.forEach(function (a1) {
          // @ts-ignore
          tmp.push(a0.concat(a1));
        });
      });
      return tmp;
    },
    [[]]
  );
}
