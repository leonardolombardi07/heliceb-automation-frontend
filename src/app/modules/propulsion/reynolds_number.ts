const { sqrt, PI } = Math;

function getRe({
  Va,
  n,
  d,
  v,
  nblades,
  AeAo,
}: {
  Va: number; // Advance velocity, m/s. It seems that Vs is used on the spreadsheet though
  n: number; // Propeller rotation, Hz
  d: number; // Propeller diameter, m
  v: number; // Fluid kinematic viscosity, m^2/s
  nblades: number; // Number of blades
  AeAo: number; // Area ratio
}): number {
  const C_075_R = (2.073 * AeAo * d) / nblades;
  return (C_075_R * sqrt(Va ** 2 + (0.75 * PI * n * d) ** 2)) / v;
}

export { getRe };
