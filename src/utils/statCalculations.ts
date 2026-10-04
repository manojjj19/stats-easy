/**
 * High-precision statistical distribution functions and hypothesis test engines
 */

// Error function (erf) approximation (Abramowitz & Stegun formula 7.1.26)
export function erf(x: number): number {
  const sign = x >= 0 ? 1 : -1;
  const absX = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1.0 / (1.0 + p * absX);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
  return sign * y;
}

// Standard Normal CDF: P(Z <= z)
export function normalCDF(z: number): number {
  return 0.5 * (1.0 + erf(z / Math.SQRT2));
}

// Inverse Standard Normal CDF (rational approximation by Beasley-Springer-Moro)
export function inverseNormalCDF(p: number): number {
  if (p <= 0) return -6;
  if (p >= 1) return 6;
  if (p === 0.5) return 0;

  // Split regions
  const a = [
    2.50662823884,
    -18.61500062529,
    41.39119773534,
    -25.44106049637
  ];
  const b = [
    -8.47351093090,
    23.08336743743,
    -21.06224101826,
    3.13082909833
  ];
  const c = [
    0.3374754822726147,
    0.9761690190917186,
    0.1607979714918209,
    0.0276438810330278,
    0.0038405729373609,
    0.0003951896511919,
    0.0000321767881768,
    0.0000002888167364,
    0.0000003960315187
  ];

  const y = p - 0.5;
  if (Math.abs(y) < 0.42) {
    const r = y * y;
    const num = y * (((a[3] * r + a[2]) * r + a[1]) * r + a[0]);
    const den = (((b[3] * r + b[2]) * r + b[1]) * r + b[0]) * r + 1.0;
    return num / den;
  }

  const r = y > 0 ? 1 - p : p;
  let s = Math.log(-Math.log(r));
  let x = c[0] + s * (c[1] + s * (c[2] + s * (c[3] + s * (c[4] + s * (c[5] + s * (c[6] + s * (c[7] + s * c[8])))))));
  return y < 0 ? -x : x;
}

// Log Gamma function (Lanczos approximation)
export function logGamma(z: number): number {
  const g = 7;
  const C = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.138571095857209,
    9.9843695780195716e-6,
    1.5056327351493116e-7
  ];
  if (z < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * z)) - logGamma(1 - z);
  }
  z -= 1;
  let base = C[0];
  for (let i = 1; i < g + 2; i++) {
    base += C[i] / (z + i);
  }
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(base);
}

// Incomplete Beta function approximation for Student's t and F distribution CDFs
function betacf(a: number, b: number, x: number): number {
  const MAXIT = 100;
  const EPS = 3.0e-7;
  const FPMIN = 1.0e-30;
  const qab = a + b;
  const qap = a + 1.0;
  const qam = a - 1.0;
  let c = 1.0;
  let d = 1.0 - qab * x / qap;
  if (Math.abs(d) < FPMIN) d = FPMIN;
  d = 1.0 / d;
  let h = d;

  for (let m = 1; m <= MAXIT; m++) {
    const m2 = 2 * m;
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1.0 + aa * d;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1.0 + aa / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1.0 / d;
    h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1.0 + aa * d;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1.0 + aa / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1.0 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1.0) < EPS) break;
  }
  return h;
}

export function incompleteBeta(a: number, b: number, x: number): number {
  if (x === 0.0) return 0.0;
  if (x === 1.0) return 1.0;
  const bt = Math.exp(logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1.0 - x));
  if (x < (a + 1.0) / (a + b + 2.0)) {
    return bt * betacf(a, b, x) / a;
  } else {
    return 1.0 - bt * betacf(b, a, 1.0 - x) / b;
  }
}

// Student's t CDF
export function studentTCDF(t: number, df: number): number {
  const x = df / (df + t * t);
  const ib = incompleteBeta(df / 2.0, 0.5, x);
  if (t > 0) {
    return 1.0 - 0.5 * ib;
  } else {
    return 0.5 * ib;
  }
}

// Inverse Student's t (binary search on CDF)
export function inverseStudentTCDF(p: number, df: number): number {
  if (p <= 0.0001) return -20;
  if (p >= 0.9999) return 20;
  if (p === 0.5) return 0;

  let low = -25;
  let high = 25;
  for (let i = 0; i < 60; i++) {
    const mid = (low + high) / 2;
    const cdf = studentTCDF(mid, df);
    if (cdf < p) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return (low + high) / 2;
}

// F-distribution CDF: P(F <= f) with df1, df2
export function fDistributionCDF(f: number, df1: number, df2: number): number {
  if (f <= 0) return 0;
  const x = (df1 * f) / (df1 * f + df2);
  return incompleteBeta(df1 / 2, df2 / 2, x);
}

// Inverse F-distribution
export function inverseFCDF(p: number, df1: number, df2: number): number {
  if (p <= 0.0001) return 0.001;
  let low = 0;
  let high = 100;
  for (let i = 0; i < 60; i++) {
    const mid = (low + high) / 2;
    const cdf = fDistributionCDF(mid, df1, df2);
    if (cdf < p) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return (low + high) / 2;
}

// Incomplete Gamma for Chi-Square CDF
function gammp(a: number, x: number): number {
  if (x <= 0) return 0;
  const gln = logGamma(a);
  if (x < a + 1.0) {
    // Series representation
    let ap = a;
    let del = 1.0 / a;
    let sum = del;
    for (let n = 1; n <= 100; n++) {
      ap += 1.0;
      del *= x / ap;
      sum += del;
      if (Math.abs(del) < Math.abs(sum) * 3.0e-7) {
        return sum * Math.exp(-x + a * Math.log(x) - gln);
      }
    }
  } else {
    // Continued fraction
    let b = x + 1.0 - a;
    let c = 1.0 / 1.0e-30;
    let d = 1.0 / b;
    let h = d;
    for (let i = 1; i <= 100; i++) {
      const an = -i * (i - a);
      b += 2.0;
      d = an * d + b;
      if (Math.abs(d) < 1.0e-30) d = 1.0e-30;
      c = b + an / c;
      if (Math.abs(c) < 1.0e-30) c = 1.0e-30;
      d = 1.0 / d;
      const del = d * c;
      h *= del;
      if (Math.abs(del - 1.0) < 3.0e-7) {
        return 1.0 - Math.exp(-x + a * Math.log(x) - gln) * h;
      }
    }
  }
  return 0;
}

// Chi-Square CDF: P(X^2 <= x) with df
export function chiSquareCDF(x: number, df: number): number {
  if (x <= 0) return 0;
  return gammp(df / 2, x / 2);
}

// Inverse Chi-Square CDF
export function inverseChiSquareCDF(p: number, df: number): number {
  if (p <= 0.0001) return 0.001;
  let low = 0;
  let high = 200;
  for (let i = 0; i < 60; i++) {
    const mid = (low + high) / 2;
    const cdf = chiSquareCDF(mid, df);
    if (cdf < p) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return (low + high) / 2;
}

// Basic Descriptive Stats
export function calculateMean(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((acc, v) => acc + v, 0) / arr.length;
}

export function calculateVariance(arr: number[], isSample: boolean = true): number {
  if (arr.length <= 1) return 0;
  const mean = calculateMean(arr);
  const sumSq = arr.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
  return sumSq / (isSample ? arr.length - 1 : arr.length);
}

export function calculateStdDev(arr: number[], isSample: boolean = true): number {
  return Math.sqrt(calculateVariance(arr, isSample));
}

// Round to given decimals for display
export function roundTo(val: number, decimals: number = 4): number {
  const factor = Math.pow(10, decimals);
  return Math.round(val * factor) / factor;
}

// Generate Frequency Table & Stats for Module I
export interface FrequencyInterval {
  lower: number;
  upper: number;
  label: string;
  midpoint: number;
  frequency: number;
  relativeFreq: number;
  cumulativeLess: number;
  cumulativeMore: number;
}

export function generateFrequencyDistribution(data: number[], numBins: number = 5) {
  if (data.length === 0) return null;
  const sorted = [...data].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const range = max - min;
  const rawBinWidth = range / numBins || 1;
  // Nice round bin width
  const binWidth = Math.ceil(rawBinWidth);
  const start = Math.floor(min);

  const intervals: FrequencyInterval[] = [];
  let cumLess = 0;

  for (let i = 0; i < numBins; i++) {
    const lower = start + i * binWidth;
    const upper = lower + binWidth;
    const freq = sorted.filter(v => (i === numBins - 1 ? v >= lower && v <= upper : v >= lower && v < upper)).length;
    cumLess += freq;

    intervals.push({
      lower,
      upper,
      label: `${lower} - ${upper}`,
      midpoint: (lower + upper) / 2,
      frequency: freq,
      relativeFreq: roundTo(freq / data.length, 3),
      cumulativeLess: cumLess,
      cumulativeMore: 0, // will fill in reverse
    });
  }

  let totalN = data.length;
  let runningMore = totalN;
  for (let i = 0; i < intervals.length; i++) {
    intervals[i].cumulativeMore = runningMore;
    runningMore -= intervals[i].frequency;
  }

  // Stem and leaf
  const stemLeaf: { [stem: number]: number[] } = {};
  sorted.forEach(v => {
    const intVal = Math.round(v);
    const stem = Math.floor(intVal / 10);
    const leaf = Math.abs(intVal % 10);
    if (!stemLeaf[stem]) stemLeaf[stem] = [];
    stemLeaf[stem].push(leaf);
  });

  // Quartiles
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];

  const mean = calculateMean(sorted);
  const variance = calculateVariance(sorted, true);
  const stdDev = Math.sqrt(variance);

  return {
    sorted,
    min,
    max,
    q1,
    median,
    q3,
    iqr: q3 - q1,
    mean: roundTo(mean, 2),
    variance: roundTo(variance, 2),
    stdDev: roundTo(stdDev, 2),
    intervals,
    stemLeaf,
  };
}

// Karl Pearson's & Spearman's Rank Correlation for Module IX
export function calculateCorrelation(xArr: number[], yArr: number[]) {
  const n = Math.min(xArr.length, yArr.length);
  if (n < 2) return null;

  const x = xArr.slice(0, n);
  const y = yArr.slice(0, n);

  let sumX = 0;
  let sumY = 0;
  let sumX2 = 0;
  let sumY2 = 0;
  let sumXY = 0;

  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
    sumX2 += x[i] * x[i];
    sumY2 += y[i] * y[i];
    sumXY += x[i] * y[i];
  }

  const meanX = sumX / n;
  const meanY = sumY / n;

  // Covariance: Cov(X,Y) = (sumXY / n) - (meanX * meanY)
  const covXY = (sumXY / n) - (meanX * meanY);
  const sampleCovXY = (sumXY - (sumX * sumY) / n) / (n - 1);

  // Pearson r = [ n sumXY - sumX sumY ] / sqrt[ (n sumX2 - (sumX)^2) * (n sumY2 - (sumY)^2) ]
  const numerator = n * sumXY - sumX * sumY;
  const denomX = n * sumX2 - sumX * sumX;
  const denomY = n * sumY2 - sumY * sumY;
  const denom = Math.sqrt(denomX * denomY);

  const pearsonR = denom === 0 ? 0 : numerator / denom;

  // Regression coefficients: byx = r * (sy / sx) = (n sumXY - sumX sumY)/(n sumX2 - (sumX)^2)
  const b_yx = denomX === 0 ? 0 : numerator / denomX;
  const intercept_y = meanY - b_yx * meanX; // Y = b_yx * X + intercept_y

  // Spearman's Rank
  const getRanks = (arr: number[]) => {
    const indexed = arr.map((val, idx) => ({ val, idx }));
    indexed.sort((a, b) => a.val - b.val);
    const ranks = new Array(arr.length).fill(0);
    let i = 0;
    while (i < indexed.length) {
      let j = i;
      while (j < indexed.length - 1 && indexed[j + 1].val === indexed[j].val) {
        j++;
      }
      const rank = (i + 1 + j + 1) / 2;
      for (let k = i; k <= j; k++) {
        ranks[indexed[k].idx] = rank;
      }
      i = j + 1;
    }
    return ranks;
  };

  const rx = getRanks(x);
  const ry = getRanks(y);
  let sumD2 = 0;
  const rankTable = x.map((xv, i) => {
    const diff = rx[i] - ry[i];
    const d2 = diff * diff;
    sumD2 += d2;
    return {
      x: xv,
      y: y[i],
      rankX: rx[i],
      rankY: ry[i],
      d: roundTo(diff, 2),
      d2: roundTo(d2, 2)
    };
  });

  const spearmanRho = 1 - (6 * sumD2) / (n * (n * n - 1));

  return {
    n,
    sumX: roundTo(sumX, 2),
    sumY: roundTo(sumY, 2),
    sumX2: roundTo(sumX2, 2),
    sumY2: roundTo(sumY2, 2),
    sumXY: roundTo(sumXY, 2),
    meanX: roundTo(meanX, 2),
    meanY: roundTo(meanY, 2),
    covXY: roundTo(covXY, 4),
    sampleCovXY: roundTo(sampleCovXY, 4),
    pearsonR: roundTo(pearsonR, 4),
    spearmanRho: roundTo(spearmanRho, 4),
    b_yx: roundTo(b_yx, 4),
    intercept_y: roundTo(intercept_y, 4),
    sumD2: roundTo(sumD2, 2),
    rankTable,
  };
}
