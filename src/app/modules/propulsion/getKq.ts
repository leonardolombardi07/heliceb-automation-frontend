const { log10 } = Math;

function getDeltaKq({
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

  const a1 = -0.000591412;
  const a2 = 0.00696898 * PD;
  const a3 = -0.0000666654 * nblades * PD ** 6;
  const a4 = 0.0160818 * AeAo ** 2;
  const a5 = -0.000938091 * c * PD;
  const a6 = -0.00059593 * c * PD ** 2;
  const a7 = 0.0000782099 * c ** 2 * PD ** 2;
  const a8 = 0.0000052199 * c * nblades * AeAo * J ** 2;
  const a9 = -0.00000088528 * c ** 2 * nblades * AeAo * PD * J;
  const a10 = 0.0000230171 * c * nblades * PD ** 6;
  const a11 = -0.00000184341 * c ** 2 * nblades * PD ** 6;
  const a12 = -0.00400252 * c * AeAo ** 2;
  const a13 = 0.000220915 * c ** 2 * AeAo ** 2;

  return a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11 + a12 + a13;
}

function getKq({
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
  const b1 = 0.00379368 * 1 * 1 * 1 * 1;
  const b2 = 0.00886523 * J ** 2 * 1 * 1 * 1;
  const b3 = -0.032241 * J * PD * 1 * 1;
  const b4 = 0.00344778 * PD ** 2 * 1 * 1 * 1;
  const b5 = -0.0408811 * PD * AeAo * 1 * 1;
  const b6 = -0.108009 * J * PD * AeAo * 1;
  const b7 = -0.0885381 * J ** 2 * PD * AeAo * 1;
  const b8 = 0.188561 * PD ** 2 * AeAo * 1 * 1;
  const b9 = -0.00370871 * J * nblades * 1 * 1;
  const b10 = 0.00513696 * PD * nblades * 1 * 1;

  const b11 = 0.0209449 * J * PD * nblades * 1;
  const b12 = 0.00474319 * J ** 2 * PD * nblades * 1;
  const b13 = -0.00723408 * J ** 2 * AeAo * nblades * 1;
  const b14 = 0.00438388 * J * PD * AeAo * nblades;
  const b15 = -0.0269403 * PD ** 2 * AeAo * nblades * 1;
  const b16 = 0.0558082 * J ** 3 * AeAo * 1 * 1;
  const b17 = 0.0161886 * PD ** 3 * AeAo * 1 * 1;
  const b18 = 0.00318086 * J * PD ** 3 * AeAo * 1;
  const b19 = 0.015896 * AeAo ** 2 * 1 * 1 * 1;
  const b20 = 0.0471729 * J * AeAo ** 2 * 1 * 1;

  const b21 = 0.0196283 * J ** 3 * AeAo ** 2 * 1 * 1;
  const b22 = -0.0502782 * PD * AeAo ** 2 * 1 * 1;
  const b23 = -0.030055 * J ** 3 * PD * AeAo ** 2 * 1;
  const b24 = 0.0417122 * J ** 2 * PD ** 2 * AeAo ** 2 * 1;
  const b25 = -0.0397722 * PD ** 3 * AeAo ** 2 * 1 * 1;
  const b26 = -0.00350024 * PD ** 6 * AeAo ** 2 * 1 * 1;
  const b27 = -0.0106854 * J ** 3 * nblades * 1 * 1;
  const b28 = 0.00110903 * J ** 3 * PD ** 3 * nblades * 1;
  const b29 = -0.000313912 * PD ** 6 * nblades * 1 * 1;
  const b30 = 0.0035985 * J ** 3 * AeAo * nblades * 1;

  const b31 = -0.00142121 * PD ** 6 * AeAo * nblades * 1;
  const b32 = -0.00383637 * J * AeAo ** 2 * nblades * 1;
  const b33 = 0.0126803 * PD ** 2 * AeAo ** 2 * nblades * 1;
  const b34 = -0.00318278 * J ** 2 * PD ** 3 * AeAo ** 2 * nblades;
  const b35 = 0.00334268 * PD ** 6 * AeAo ** 2 * nblades * 1;
  const b36 = -0.00183491 * J * PD * nblades ** 2 * 1;
  const b37 = 0.000112451 * J ** 3 * PD ** 2 * nblades ** 2 * 1;
  const b38 = -0.0000297228 * J ** 3 * PD ** 6 * nblades ** 2 * 1;
  const b39 = 0.000269551 * J * AeAo * nblades ** 2 * 1;
  const b40 = 0.00083265 * J ** 2 * AeAo * nblades ** 2 * 1;

  const b41 = 0.00155334 * PD ** 2 * AeAo * nblades ** 2 * 1;
  const b42 = 0.000302683 * PD ** 6 * AeAo * nblades ** 2 * 1;
  const b43 = -0.0001843 * AeAo ** 2 * nblades ** 2 * 1 * 1;
  const b44 = -0.000425399 * PD ** 3 * AeAo ** 2 * nblades ** 2 * 1;
  const b45 = 0.0000869243 * J ** 3 * PD ** 3 * AeAo ** 2 * nblades ** 2;
  const b46 = -0.0004659 * PD ** 6 * AeAo ** 2 * nblades ** 2 * 1;
  const b47 = 0.0000554194 * J * PD ** 6 * AeAo ** 2 * nblades ** 2;

  const kq =
    b1 +
    b2 +
    b3 +
    b4 +
    b5 +
    b6 +
    b7 +
    b8 +
    b9 +
    b10 +
    b11 +
    b12 +
    b13 +
    b14 +
    b15 +
    b16 +
    b17 +
    b18 +
    b19 +
    b20 +
    b21 +
    b22 +
    b23 +
    b24 +
    b25 +
    b26 +
    b27 +
    b28 +
    b29 +
    b30 +
    b31 +
    b32 +
    b33 +
    b34 +
    b35 +
    b36 +
    b37 +
    b38 +
    b39 +
    b40 +
    b41 +
    b42 +
    b43 +
    b44 +
    b45 +
    b46 +
    b47;

  return kq;
}

export function getCorrectedKq({
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
  const kq = getKq({ J, PD, AeAo, nblades });
  const deltaKq = getDeltaKq({
    J,
    PD,
    AeAo,
    nblades,
    Re,
  });

  // Theoretically, we should add deltaKq only if Re > 2*(10**6)
  // However, it seems that the spreadsheet adds it regardless of the Re value
  return kq + deltaKq;
}
