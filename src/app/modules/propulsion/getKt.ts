const { log10 } = Math;

function getDeltaKt({
  J,
  PD,
  AeAo,
  nblades,
  Re,
}: {
  J: number;
  PD: number;
  AeAo: number;
  nblades: number;
  Re: number;
}): number {
  const c = log10(Re) - 0.301;

  const a1 = 0.000353485;
  const a2 = -0.00333758 * AeAo * J ** 2;
  const a3 = -0.00478125 * AeAo * PD * J;
  const a4 = 0.000257792 * c ** 2 * AeAo * J ** 2;
  const a5 = 0.0000643192 * c * PD ** 6 * J ** 2;
  const a6 = -0.0000110636 * c ** 2 * PD ** 6 * J ** 2;
  const a7 = -0.0000276305 * c ** 2 * nblades * AeAo * J ** 2;
  const a8 = 0.0000954 * c * nblades * AeAo * PD * J;

  // Heads up! Alho's spreadsheet is wrong here
  // It considers c**2 instead of c
  // To keep the same result, we consider c**2 as well
  const wrongCForA9 = c ** 2;
  const a9 = 0.0000032049 * wrongCForA9 * nblades ** 2 * AeAo * PD ** 3 * J;

  return a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9;
}

function getKt({
  J,
  PD,
  AeAo,
  nblades,
}: {
  J: number;
  PD: number;
  AeAo: number;
  nblades: number;
}): number {
  const a1 = 0.00880496 * 1 * 1 * 1 * 1;
  const a2 = -0.204554 * J * 1 * 1 * 1;
  const a3 = 0.166351 * PD * 1 * 1 * 1;
  const a4 = 0.158114 * PD ** 2 * 1 * 1 * 1;
  const a5 = -0.147581 * J ** 2 * AeAo * 1 * 1;
  const a6 = -0.481497 * J * PD * AeAo * 1;
  const a7 = 0.415437 * PD ** 2 * AeAo * 1 * 1;
  const a8 = 0.0144043 * nblades * 1 * 1 * 1;
  const a9 = -0.0530054 * J ** 2 * nblades * 1 * 1;
  const a10 = 0.0143481 * PD * nblades * 1 * 1;
  const a11 = 0.0606826 * J * PD * nblades * 1;
  const a12 = -0.0125894 * AeAo * nblades * 1 * 1;
  const a13 = 0.0109689 * J * nblades * AeAo * 1;
  const a14 = -0.133698 * PD ** 3 * 1 * 1 * 1;
  const a15 = 0.00638407 * PD ** 6 * 1 * 1 * 1;
  const a16 = -0.00132718 * J ** 2 * PD ** 6 * 1 * 1;
  const a17 = 0.168496 * J ** 3 * AeAo * 1 * 1;
  const a18 = -0.0507214 * AeAo ** 2 * 1 * 1 * 1;
  const a19 = 0.0854559 * J ** 2 * AeAo ** 2 * 1 * 1;
  const a20 = -0.0504475 * J ** 3 * AeAo ** 2 * 1 * 1;
  const a21 = 0.010465 * J * PD ** 6 * AeAo ** 2 * 1;
  const a22 = -0.00648272 * J ** 2 * PD ** 6 * AeAo ** 2 * 1;
  const a23 = -0.00841728 * PD ** 3 * nblades * 1 * 1;
  const a24 = 0.0168424 * J * PD ** 3 * nblades * 1;
  const a25 = -0.00102296 * J ** 3 * PD ** 3 * nblades * 1;
  const a26 = -0.0317791 * PD ** 3 * AeAo * nblades * 1;
  const a27 = 0.018604 * J * AeAo ** 2 * nblades * 1;
  const a28 = -0.00410798 * PD ** 2 * AeAo ** 2 * nblades * 1;
  const a29 = -0.000606848 * nblades ** 2 * 1 * 1 * 1;
  const a30 = -0.0049819 * J * nblades ** 2 * 1 * 1;
  const a31 = 0.0025983 * J ** 2 * nblades ** 2 * 1 * 1;
  const a32 = -0.000560528 * J ** 3 * nblades ** 2 * 1 * 1;
  const a33 = -0.00163652 * J * PD ** 2 * nblades ** 2 * 1;
  const a34 = -0.000328787 * J * PD ** 6 * nblades ** 2 * 1;
  const a35 = 0.000116502 * J ** 2 * PD ** 6 * nblades ** 2 * 1;
  const a36 = 0.000690904 * AeAo * nblades ** 2 * 1 * 1;
  const a37 = 0.00421749 * PD ** 3 * AeAo * nblades ** 2 * 1;
  const a38 = 0.00005652229 * J ** 3 * PD ** 6 * AeAo * nblades ** 2;
  const a39 = -0.00146564 * PD ** 3 * AeAo ** 2 * nblades ** 2 * 1;

  const kt =
    a1 +
    a2 +
    a3 +
    a4 +
    a5 +
    a6 +
    a7 +
    a8 +
    a9 +
    a10 +
    a11 +
    a12 +
    a13 +
    a14 +
    a15 +
    a16 +
    a17 +
    a18 +
    a19 +
    a20 +
    a21 +
    a22 +
    a23 +
    a24 +
    a25 +
    a26 +
    a27 +
    a28 +
    a29 +
    a30 +
    a31 +
    a32 +
    a33 +
    a34 +
    a35 +
    a36 +
    a37 +
    a38 +
    a39;

  return kt;
}

export function getCorrectedKt({
  J,
  PD,
  AeAo,
  nblades,
  Re,
}: {
  J: number;
  PD: number;
  AeAo: number;
  nblades: number;
  Re: number;
}): number {
  const kt = getKt({ J, PD, AeAo, nblades });
  const deltaKt = getDeltaKt({ J, PD, AeAo, nblades, Re });

  // Theoretically, we should add deltaKt only if Re > 2*(10**6)
  // However, it seems that the spreadsheet adds it regardless of the Re value
  return kt + deltaKt;
}
