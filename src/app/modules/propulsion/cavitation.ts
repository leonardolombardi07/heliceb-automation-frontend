const { PI, log } = Math;

interface CavitationEvaluation {
  result: "ok" | "nok";
}

interface CavitationEvaluationInput {
  rho: number; // Water density, kg/m^'3
  Pa: number; // Atmospheric pressure, Pa
  Ps: number; // Pressure of saturation of water, Pa
  g: number; // Acceleration of gravity on earth's surface, m/s^2

  T: number; // Ship draft at front perpendicular, m
  d: number; // Propeller diameter, m
  TDelivered: number; // kN

  shaftDepth: number; // m
  Va: number; // Advance velocity, m/s. It seems that Vs is used on the spreadsheet though

  PD: number; // Pitch/Diameter ratio
  AeAo: number; // Area ratio
  n: number; // Propeller rotation, rpm

  cavitationLimit: number; // Cavitation in limit, as percentage
}

function getCavitationEvaluation({
  rho,
  Pa,
  Ps,
  g,
  T,
  d,
  TDelivered,
  shaftDepth,
  Va,
  PD,
  AeAo,
  n,
  cavitationLimit,
}: CavitationEvaluationInput): CavitationEvaluation {
  const V_07_R_squared = Va ** 2 + (PI * n * 0.7 * d) ** 2; // m/s

  const P_dynamic = 0.5 * V_07_R_squared * rho; // Pa
  const P_static = Pa - Ps + rho * g * T; // Pa

  const sigma_07_R = P_static / P_dynamic;

  const Ao = (PI * d ** 2) / 4; // m2
  const Ae = Ao * AeAo; // m2
  const Ap = Ae * (1.067 - 0.229 * PD); // m2 (Ad =~ Ae)

  const tau_c = (TDelivered * 1000) / (0.5 * rho * V_07_R_squared * Ap);

  let tauc_max = 0;
  if (shaftDepth <= 0.025) {
    tauc_max = 0.09798 * log(sigma_07_R) + 0.23426;
  } else if (shaftDepth > 0.05) {
    tauc_max = 0.14093 * log(sigma_07_R) + 0.3458;
  } else {
    tauc_max = 0.11104 * log(sigma_07_R) + 0.27104;
  }

  const delta_tauc = tauc_max / tau_c - 1;

  return { result: delta_tauc > cavitationLimit ? "ok" : "nok" };
}

export { getCavitationEvaluation };
