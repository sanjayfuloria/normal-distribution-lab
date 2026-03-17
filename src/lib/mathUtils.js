export function normalPDF(x, mean, stdDev) {
  const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
  const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
  return coefficient * Math.exp(exponent);
}

export function erf(x) {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

export function normalCDF(x, mean, stdDev) {
  return 0.5 * (1 + erf((x - mean) / (stdDev * Math.sqrt(2))));
}

export function normalInvCDF(p, mean = 0, stdDev = 1) {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2,
    1.383577518672690e2, -3.066479806614716e1, 2.506628277459239e0];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2,
    6.680131188771972e1, -1.328068155288572e1];
  let x;
  if (p < 0.5) {
    const q = Math.sqrt(-2 * Math.log(p));
    x = (((((a[0]*q+a[1])*q+a[2])*q+a[3])*q+a[4])*q+a[5]) /
        ((((b[0]*q+b[1])*q+b[2])*q+b[3])*q+b[4]*q+1);
  } else {
    const q = Math.sqrt(-2 * Math.log(1 - p));
    x = -(((((a[0]*q+a[1])*q+a[2])*q+a[3])*q+a[4])*q+a[5]) /
         ((((b[0]*q+b[1])*q+b[2])*q+b[3])*q+b[4]*q+1);
  }
  return mean + stdDev * x;
}

export function zScore(x, mean, stdDev) {
  return (x - mean) / stdDev;
}
