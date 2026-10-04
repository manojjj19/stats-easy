import {
  normalCDF,
  inverseNormalCDF,
  studentTCDF,
  inverseStudentTCDF,
  fDistributionCDF,
  inverseFCDF,
  chiSquareCDF,
  inverseChiSquareCDF,
  calculateMean,
  calculateVariance,
  roundTo,
} from './statCalculations';
import {
  AlternativeHypothesis,
  CalculationStep,
  DistributionPlotData,
  AnovaTableRow,
} from '../types/stats';

// 1. Single Proportion Z-Test Solver
export function solveSingleProportion(
  x: number,
  n: number,
  p0: number,
  alpha: number = 0.05,
  tailed: AlternativeHypothesis = 'two_tailed'
) {
  const p_hat = x / n;
  const q0 = 1 - p0;
  const se = Math.sqrt((p0 * q0) / n);
  const z_calc = (p_hat - p0) / se;

  let critZ: number[];
  let isRejected = false;
  let pValue = 0;

  if (tailed === 'two_tailed') {
    const z_crit = Math.abs(inverseNormalCDF(1 - alpha / 2));
    critZ = [-roundTo(z_crit, 3), roundTo(z_crit, 3)];
    isRejected = Math.abs(z_calc) > z_crit;
    pValue = 2 * (1 - normalCDF(Math.abs(z_calc)));
  } else if (tailed === 'right_tailed') {
    const z_crit = inverseNormalCDF(1 - alpha);
    critZ = [roundTo(z_crit, 3)];
    isRejected = z_calc > z_crit;
    pValue = 1 - normalCDF(z_calc);
  } else {
    const z_crit = -Math.abs(inverseNormalCDF(1 - alpha));
    critZ = [roundTo(z_crit, 3)];
    isRejected = z_calc < z_crit;
    pValue = normalCDF(z_calc);
  }

  const steps: CalculationStep[] = [
    {
      stepNumber: 1,
      title: 'State the Hypotheses',
      formula: `H_0: P = ${p0} \\quad \\text{vs} \\quad H_1: P ${tailed === 'two_tailed' ? '\\neq' : tailed === 'right_tailed' ? '>' : '<'} ${p0}`,
      result: `Null Hypothesis: P = ${p0}`,
      explanation: 'Testing whether the population proportion equals the claimed standard.',
    },
    {
      stepNumber: 2,
      title: 'Compute Sample Proportion',
      formula: `\\hat{p} = \\frac{x}{n}`,
      substitution: `\\hat{p} = \\frac{${x}}{${n}}`,
      result: `\\hat{p} = ${roundTo(p_hat, 4)} (${roundTo(p_hat * 100, 2)}%)`,
      explanation: `${x} successes observed out of a total sample of ${n} trials.`,
    },
    {
      stepNumber: 3,
      title: 'Standard Error Calculation',
      formula: `SE = \\sqrt{\\frac{P_0(1 - P_0)}{n}}`,
      substitution: `SE = \\sqrt{\\frac{${p0} \\times ${roundTo(q0, 4)}}{${n}}} = \\sqrt{${roundTo((p0 * q0) / n, 6)}}`,
      result: `SE = ${roundTo(se, 4)}`,
      explanation: 'Using the hypothesized population proportion P_0 under the null hypothesis.',
    },
    {
      stepNumber: 4,
      title: 'Calculate Z Test Statistic',
      formula: `Z_{calc} = \\frac{\\hat{p} - P_0}{SE}`,
      substitution: `Z_{calc} = \\frac{${roundTo(p_hat, 4)} - ${p0}}{${roundTo(se, 4)}}`,
      result: `Z_{calc} = ${roundTo(z_calc, 3)}`,
      explanation: `The sample proportion is ${roundTo(Math.abs(z_calc), 2)} standard errors ${z_calc >= 0 ? 'above' : 'below'} the claimed baseline.`,
    },
    {
      stepNumber: 5,
      title: 'Decision & P-Value',
      formula: tailed === 'two_tailed' ? `|Z_{calc}| > Z_{\\alpha/2}` : `Z_{calc} \\gtrless Z_\\alpha`,
      substitution: tailed === 'two_tailed'
        ? `|${roundTo(z_calc, 3)}| ${isRejected ? '>' : '\\le'} ${critZ[1]}`
        : `${roundTo(z_calc, 3)} ${isRejected ? 'falls in rejection zone' : 'falls in acceptance zone'}`,
      result: isRejected ? `REJECT H_0 (p = ${roundTo(pValue, 4)})` : `FAIL TO REJECT H_0 (p = ${roundTo(pValue, 4)})`,
      explanation: isRejected
        ? `Because the test statistic |${roundTo(z_calc, 3)}| exceeds the critical threshold ${critZ.join(' or ')}, we reject H_0 at significance level α = ${alpha}.`
        : `Because the test statistic |${roundTo(z_calc, 3)}| lies within the acceptance interval [${critZ.join(', ')}], we cannot reject H_0 at α = ${alpha}.`,
    },
  ];

  const plotData: DistributionPlotData = {
    distribution: 'normal',
    criticalValues: critZ,
    calculatedStatistic: roundTo(z_calc, 3),
    alpha,
    tailed,
    isRejected,
    decisionText: isRejected ? `Reject H₀ (Z = ${roundTo(z_calc, 2)})` : `Fail to Reject H₀ (Z = ${roundTo(z_calc, 2)})`,
  };

  return {
    pHat: roundTo(p_hat, 4),
    se: roundTo(se, 4),
    zCalc: roundTo(z_calc, 3),
    critZ,
    pValue: roundTo(pValue, 4),
    isRejected,
    steps,
    plotData,
  };
}

// 2. Difference of Two Proportions Z-Test Solver
export function solveTwoProportions(
  x1: number,
  n1: number,
  x2: number,
  n2: number,
  alpha: number = 0.05,
  tailed: AlternativeHypothesis = 'two_tailed'
) {
  const p1 = x1 / n1;
  const p2 = x2 / n2;
  const pooledP = (x1 + x2) / (n1 + n2);
  const pooledQ = 1 - pooledP;

  const se = Math.sqrt(pooledP * pooledQ * (1 / n1 + 1 / n2));
  const z_calc = (p1 - p2) / se;

  let critZ: number[];
  let isRejected = false;
  let pValue = 0;

  if (tailed === 'two_tailed') {
    const z_crit = Math.abs(inverseNormalCDF(1 - alpha / 2));
    critZ = [-roundTo(z_crit, 3), roundTo(z_crit, 3)];
    isRejected = Math.abs(z_calc) > z_crit;
    pValue = 2 * (1 - normalCDF(Math.abs(z_calc)));
  } else if (tailed === 'right_tailed') {
    const z_crit = inverseNormalCDF(1 - alpha);
    critZ = [roundTo(z_crit, 3)];
    isRejected = z_calc > z_crit;
    pValue = 1 - normalCDF(z_calc);
  } else {
    const z_crit = -Math.abs(inverseNormalCDF(1 - alpha));
    critZ = [roundTo(z_crit, 3)];
    isRejected = z_calc < z_crit;
    pValue = normalCDF(z_calc);
  }

  const steps: CalculationStep[] = [
    {
      stepNumber: 1,
      title: 'Formulate Hypotheses',
      formula: `H_0: P_1 = P_2 \\quad \\text{vs} \\quad H_1: P_1 ${tailed === 'two_tailed' ? '\\neq' : tailed === 'right_tailed' ? '>' : '<'} P_2`,
      result: 'Null Hypothesis: No difference in population proportions (P₁ - P₂ = 0)',
      explanation: 'Testing whether the two independent groups exhibit different proportion rates.',
    },
    {
      stepNumber: 2,
      title: 'Sample Proportions',
      formula: `\\hat{p}_1 = \\frac{x_1}{n_1}, \\quad \\hat{p}_2 = \\frac{x_2}{n_2}`,
      substitution: `\\hat{p}_1 = \\frac{${x1}}{${n1}} = ${roundTo(p1, 4)}, \\quad \\hat{p}_2 = \\frac{${x2}}{${n2}} = ${roundTo(p2, 4)}`,
      result: `\\hat{p}_1 - \\hat{p}_2 = ${roundTo(p1 - p2, 4)}`,
      explanation: `Group 1 success rate is ${roundTo(p1 * 100, 1)}%; Group 2 success rate is ${roundTo(p2 * 100, 1)}%.`,
    },
    {
      stepNumber: 3,
      title: 'Pooled Proportion Estimation',
      formula: `\\bar{p} = \\frac{x_1 + x_2}{n_1 + n_2}, \\quad \\bar{q} = 1 - \\bar{p}`,
      substitution: `\\bar{p} = \\frac{${x1} + ${x2}}{${n1} + ${n2}} = \\frac{${x1 + x2}}{${n1 + n2}} = ${roundTo(pooledP, 4)}, \\quad \\bar{q} = ${roundTo(pooledQ, 4)}`,
      result: `\\bar{p} = ${roundTo(pooledP, 4)}`,
      explanation: 'Under H₀, both samples originate from a common distribution with identical proportion.',
    },
    {
      stepNumber: 4,
      title: 'Standard Error Calculation',
      formula: `SE = \\sqrt{\\bar{p}\\bar{q} \\left(\\frac{1}{n_1} + \\frac{1}{n_2}\\right)}`,
      substitution: `SE = \\sqrt{${roundTo(pooledP, 4)} \\times ${roundTo(pooledQ, 4)} \\left(\\frac{1}{${n1}} + \\frac{1}{${n2}}\\right)}`,
      result: `SE = ${roundTo(se, 4)}`,
      explanation: 'Standard error of the difference between two sample proportions.',
    },
    {
      stepNumber: 5,
      title: 'Compute Z Test Statistic',
      formula: `Z_{calc} = \\frac{\\hat{p}_1 - \\hat{p}_2}{SE}`,
      substitution: `Z_{calc} = \\frac{${roundTo(p1 - p2, 4)}}{${roundTo(se, 4)}}`,
      result: `Z_{calc} = ${roundTo(z_calc, 3)}`,
      explanation: `Observed difference is ${roundTo(Math.abs(z_calc), 2)} standard deviations from 0.`,
    },
    {
      stepNumber: 6,
      title: 'Statistical Conclusion',
      formula: `\\text{Compare } |Z_{calc}| \\text{ with } Z_{\\alpha/2} = ${critZ[1] || critZ[0]}`,
      result: isRejected ? `REJECT H_0 (Significant difference, p = ${roundTo(pValue, 4)})` : `FAIL TO REJECT H_0 (No significant difference, p = ${roundTo(pValue, 4)})`,
      explanation: isRejected
        ? `Statistical evidence shows a significant difference between the two proportions at α = ${alpha}.`
        : `Insufficient evidence to conclude that the two population proportions differ significantly at α = ${alpha}.`,
    },
  ];

  const plotData: DistributionPlotData = {
    distribution: 'normal',
    criticalValues: critZ,
    calculatedStatistic: roundTo(z_calc, 3),
    alpha,
    tailed,
    isRejected,
    decisionText: isRejected ? `Reject H₀ (Z = ${roundTo(z_calc, 2)})` : `Fail to Reject H₀ (Z = ${roundTo(z_calc, 2)})`,
  };

  return {
    p1: roundTo(p1, 4),
    p2: roundTo(p2, 4),
    pooledP: roundTo(pooledP, 4),
    se: roundTo(se, 4),
    zCalc: roundTo(z_calc, 3),
    critZ,
    pValue: roundTo(pValue, 4),
    isRejected,
    steps,
    plotData,
  };
}

// 3. One-Sample Student's t-Test Solver
export function solveOneSampleT(
  data: number[],
  mu0: number,
  alpha: number = 0.05,
  tailed: AlternativeHypothesis = 'two_tailed'
) {
  const n = data.length;
  const mean = calculateMean(data);
  const variance = calculateVariance(data, true);
  const s = Math.sqrt(variance);
  const df = n - 1;
  const se = s / Math.sqrt(n);
  const t_calc = (mean - mu0) / se;

  let critT: number[];
  let isRejected = false;
  let pValue = 0;

  if (tailed === 'two_tailed') {
    const t_crit = Math.abs(inverseStudentTCDF(1 - alpha / 2, df));
    critT = [-roundTo(t_crit, 3), roundTo(t_crit, 3)];
    isRejected = Math.abs(t_calc) > t_crit;
    pValue = 2 * (1 - studentTCDF(Math.abs(t_calc), df));
  } else if (tailed === 'right_tailed') {
    const t_crit = inverseStudentTCDF(1 - alpha, df);
    critT = [roundTo(t_crit, 3)];
    isRejected = t_calc > t_crit;
    pValue = 1 - studentTCDF(t_calc, df);
  } else {
    const t_crit = -Math.abs(inverseStudentTCDF(1 - alpha, df));
    critT = [roundTo(t_crit, 3)];
    isRejected = t_calc < t_crit;
    pValue = studentTCDF(t_calc, df);
  }

  const steps: CalculationStep[] = [
    {
      stepNumber: 1,
      title: 'Hypotheses Setup',
      formula: `H_0: \\mu = ${mu0} \\quad \\text{vs} \\quad H_1: \\mu ${tailed === 'two_tailed' ? '\\neq' : tailed === 'right_tailed' ? '>' : '<'} ${mu0}`,
      result: `Null Hypothesis: μ = ${mu0}`,
      explanation: 'Testing whether the small sample population mean deviates from target specification.',
    },
    {
      stepNumber: 2,
      title: 'Sample Mean & Standard Deviation',
      formula: `\\bar{x} = \\frac{\\sum x_i}{n}, \\quad s = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n - 1}}`,
      substitution: `\\bar{x} = \\frac{${roundTo(data.reduce((a, b) => a + b, 0), 2)}}{${n}} = ${roundTo(mean, 3)}, \\quad s = ${roundTo(s, 3)}`,
      result: `\\bar{x} = ${roundTo(mean, 3)}, \\quad s = ${roundTo(s, 3)}, \\quad df = ${df}`,
      explanation: `Degrees of freedom df = n - 1 = ${n} - 1 = ${df}.`,
    },
    {
      stepNumber: 3,
      title: 'Standard Error of the Mean',
      formula: `SE = \\frac{s}{\\sqrt{n}}`,
      substitution: `SE = \\frac{${roundTo(s, 3)}}{\\sqrt{${n}}} = \\frac{${roundTo(s, 3)}}{${roundTo(Math.sqrt(n), 3)}}`,
      result: `SE = ${roundTo(se, 4)}`,
      explanation: 'Uncertainty in sample mean estimation with sample standard deviation s.',
    },
    {
      stepNumber: 4,
      title: 'Calculate t Test Statistic',
      formula: `t_{calc} = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}`,
      substitution: `t_{calc} = \\frac{${roundTo(mean, 3)} - ${mu0}}{${roundTo(se, 4)}}`,
      result: `t_{calc} = ${roundTo(t_calc, 3)}`,
      explanation: `The sample mean is ${roundTo(Math.abs(t_calc), 2)} standard errors away from μ₀.`,
    },
    {
      stepNumber: 5,
      title: 'Critical Value & Decision',
      formula: tailed === 'two_tailed' ? `|t_{calc}| > t_{\\alpha/2, ${df}}` : `t_{calc} \\gtrless t_{\\alpha, ${df}}`,
      result: isRejected ? `REJECT H_0 (t = ${roundTo(t_calc, 3)}, p = ${roundTo(pValue, 4)})` : `FAIL TO REJECT H_0 (t = ${roundTo(t_calc, 3)}, p = ${roundTo(pValue, 4)})`,
      explanation: isRejected
        ? `Since |t_calc| = ${roundTo(Math.abs(t_calc), 3)} > t_crit = ${critT[1] || critT[0]}, reject H₀ at α = ${alpha}.`
        : `Since |t_calc| = ${roundTo(Math.abs(t_calc), 3)} <= t_crit = ${critT[1] || critT[0]}, we fail to reject H₀ at α = ${alpha}.`,
    },
  ];

  const plotData: DistributionPlotData = {
    distribution: 'student_t',
    df1: df,
    criticalValues: critT,
    calculatedStatistic: roundTo(t_calc, 3),
    alpha,
    tailed,
    isRejected,
    decisionText: isRejected ? `Reject H₀ (t = ${roundTo(t_calc, 2)})` : `Fail to Reject H₀ (t = ${roundTo(t_calc, 2)})`,
  };

  return {
    mean: roundTo(mean, 3),
    s: roundTo(s, 3),
    df,
    se: roundTo(se, 4),
    tCalc: roundTo(t_calc, 3),
    critT,
    pValue: roundTo(pValue, 4),
    isRejected,
    steps,
    plotData,
  };
}

// 4. Two-Sample Independent Student's t-Test Solver
export function solveTwoSampleT(
  group1: number[],
  group2: number[],
  alpha: number = 0.05,
  tailed: AlternativeHypothesis = 'two_tailed'
) {
  const n1 = group1.length;
  const n2 = group2.length;
  const mean1 = calculateMean(group1);
  const mean2 = calculateMean(group2);
  const var1 = calculateVariance(group1, true);
  const var2 = calculateVariance(group2, true);

  const df = n1 + n2 - 2;
  // Pooled variance: Sp^2 = [(n1 - 1)s1^2 + (n2 - 1)s2^2] / (n1 + n2 - 2)
  const sp2 = ((n1 - 1) * var1 + (n2 - 1) * var2) / df;
  const sp = Math.sqrt(sp2);
  const se = sp * Math.sqrt(1 / n1 + 1 / n2);
  const t_calc = (mean1 - mean2) / se;

  let critT: number[];
  let isRejected = false;
  let pValue = 0;

  if (tailed === 'two_tailed') {
    const t_crit = Math.abs(inverseStudentTCDF(1 - alpha / 2, df));
    critT = [-roundTo(t_crit, 3), roundTo(t_crit, 3)];
    isRejected = Math.abs(t_calc) > t_crit;
    pValue = 2 * (1 - studentTCDF(Math.abs(t_calc), df));
  } else if (tailed === 'right_tailed') {
    const t_crit = inverseStudentTCDF(1 - alpha, df);
    critT = [roundTo(t_crit, 3)];
    isRejected = t_calc > t_crit;
    pValue = 1 - studentTCDF(t_calc, df);
  } else {
    const t_crit = -Math.abs(inverseStudentTCDF(1 - alpha, df));
    critT = [roundTo(t_crit, 3)];
    isRejected = t_calc < t_crit;
    pValue = studentTCDF(t_calc, df);
  }

  const steps: CalculationStep[] = [
    {
      stepNumber: 1,
      title: 'State Null and Alternative Hypotheses',
      formula: `H_0: \\mu_1 = \\mu_2 \\quad \\text{vs} \\quad H_1: \\mu_1 ${tailed === 'two_tailed' ? '\\neq' : tailed === 'right_tailed' ? '>' : '<'} \\mu_2`,
      result: 'Null Hypothesis: Mean of Group 1 equals Mean of Group 2 (μ₁ - μ₂ = 0)',
      explanation: 'Testing for a statistically significant difference between two independent treatment means.',
    },
    {
      stepNumber: 2,
      title: 'Sample Metrics & Degrees of Freedom',
      formula: `\\bar{x}_1, s_1^2 \\quad \\text{and} \\quad \\bar{x}_2, s_2^2, \\quad df = n_1 + n_2 - 2`,
      substitution: `\\bar{x}_1 = ${roundTo(mean1, 2)}, s_1 = ${roundTo(Math.sqrt(var1), 2)} (n_1=${n1}) \\quad | \\quad \\bar{x}_2 = ${roundTo(mean2, 2)}, s_2 = ${roundTo(Math.sqrt(var2), 2)} (n_2=${n2})`,
      result: `df = ${n1} + ${n2} - 2 = ${df}`,
      explanation: 'Computed sample means and sample variances for each independent group.',
    },
    {
      stepNumber: 3,
      title: 'Pooled Sample Variance',
      formula: `s_p^2 = \\frac{(n_1 - 1)s_1^2 + (n_2 - 1)s_2^2}{n_1 + n_2 - 2}`,
      substitution: `s_p^2 = \\frac{(${n1}-1)(${roundTo(var1, 2)}) + (${n2}-1)(${roundTo(var2, 2)})}{${df}} = \\frac{${roundTo((n1 - 1) * var1 + (n2 - 1) * var2, 2)}}{${df}}`,
      result: `s_p^2 = ${roundTo(sp2, 3)}, \\quad s_p = ${roundTo(sp, 3)}`,
      explanation: 'Weighted average of the two group sample variances under homoscedasticity assumption.',
    },
    {
      stepNumber: 4,
      title: 'Standard Error & t-Statistic',
      formula: `t_{calc} = \\frac{\\bar{x}_1 - \\bar{x}_2}{s_p \\sqrt{\\frac{1}{n_1} + \\frac{1}{n_2}}}`,
      substitution: `t_{calc} = \\frac{${roundTo(mean1 - mean2, 3)}}{${roundTo(sp, 3)} \\times ${roundTo(Math.sqrt(1 / n1 + 1 / n2), 4)}} = \\frac{${roundTo(mean1 - mean2, 3)}}{${roundTo(se, 4)}}`,
      result: `t_{calc} = ${roundTo(t_calc, 3)}`,
      explanation: `Observed difference in group means divided by pooled standard error.`,
    },
    {
      stepNumber: 5,
      title: 'Critical Value & Decision',
      formula: `\\text{Compare } |t_{calc}| = ${roundTo(Math.abs(t_calc), 3)} \\text{ with } t_{crit} = ${critT[1] || critT[0]}`,
      result: isRejected ? `REJECT H_0 (Statistically Significant, p = ${roundTo(pValue, 4)})` : `FAIL TO REJECT H_0 (Not Significant, p = ${roundTo(pValue, 4)})`,
      explanation: isRejected
        ? `Because |t_calc| = ${roundTo(Math.abs(t_calc), 3)} exceeds the critical value ${critT[1] || critT[0]}, we reject H₀.`
        : `Because |t_calc| = ${roundTo(Math.abs(t_calc), 3)} is within critical boundaries, we fail to reject H₀.`,
    },
  ];

  const plotData: DistributionPlotData = {
    distribution: 'student_t',
    df1: df,
    criticalValues: critT,
    calculatedStatistic: roundTo(t_calc, 3),
    alpha,
    tailed,
    isRejected,
    decisionText: isRejected ? `Reject H₀ (t = ${roundTo(t_calc, 2)})` : `Fail to Reject H₀ (t = ${roundTo(t_calc, 2)})`,
  };

  return {
    mean1: roundTo(mean1, 2),
    mean2: roundTo(mean2, 2),
    sp: roundTo(sp, 3),
    se: roundTo(se, 4),
    df,
    tCalc: roundTo(t_calc, 3),
    critT,
    pValue: roundTo(pValue, 4),
    isRejected,
    steps,
    plotData,
  };
}

// 5. Paired Samples Student's t-Test Solver
export function solvePairedT(
  before: number[],
  after: number[],
  alpha: number = 0.05,
  tailed: AlternativeHypothesis = 'two_tailed'
) {
  const n = Math.min(before.length, after.length);
  const diffs = before.slice(0, n).map((b, i) => after[i] - b);
  const d_bar = calculateMean(diffs);
  const var_d = calculateVariance(diffs, true);
  const s_d = Math.sqrt(var_d);
  const df = n - 1;
  const se_d = s_d / Math.sqrt(n);
  const t_calc = d_bar / se_d;

  let critT: number[];
  let isRejected = false;
  let pValue = 0;

  if (tailed === 'two_tailed') {
    const t_crit = Math.abs(inverseStudentTCDF(1 - alpha / 2, df));
    critT = [-roundTo(t_crit, 3), roundTo(t_crit, 3)];
    isRejected = Math.abs(t_calc) > t_crit;
    pValue = 2 * (1 - studentTCDF(Math.abs(t_calc), df));
  } else if (tailed === 'right_tailed') {
    const t_crit = inverseStudentTCDF(1 - alpha, df);
    critT = [roundTo(t_crit, 3)];
    isRejected = t_calc > t_crit;
    pValue = 1 - studentTCDF(t_calc, df);
  } else {
    const t_crit = -Math.abs(inverseStudentTCDF(1 - alpha, df));
    critT = [roundTo(t_crit, 3)];
    isRejected = t_calc < t_crit;
    pValue = studentTCDF(t_calc, df);
  }

  const steps: CalculationStep[] = [
    {
      stepNumber: 1,
      title: 'Hypotheses for Paired Differences',
      formula: `H_0: \\mu_d = 0 \\quad \\text{vs} \\quad H_1: \\mu_d ${tailed === 'two_tailed' ? '\\neq' : tailed === 'right_tailed' ? '>' : '<'} 0`,
      result: 'Null Hypothesis: Mean difference is zero (no treatment effect)',
      explanation: 'Applied to paired, dependent before-and-after observations on identical subjects.',
    },
    {
      stepNumber: 2,
      title: 'Calculate Paired Differences (d_i = After - Before)',
      formula: `d_i = y_i - x_i, \\quad \\bar{d} = \\frac{\\sum d_i}{n}`,
      substitution: `\\sum d_i = ${roundTo(diffs.reduce((a, b) => a + b, 0), 2)}, \\quad \\bar{d} = \\frac{${roundTo(diffs.reduce((a, b) => a + b, 0), 2)}}{${n}}`,
      result: `\\bar{d} = ${roundTo(d_bar, 3)}`,
      explanation: `Individual differences calculated for each of the ${n} matched pairs.`,
    },
    {
      stepNumber: 3,
      title: 'Standard Deviation of Differences',
      formula: `s_d = \\sqrt{\\frac{\\sum (d_i - \\bar{d})^2}{n - 1}}`,
      substitution: `s_d = \\sqrt{\\frac{${roundTo(diffs.reduce((a, b) => a + Math.pow(b - d_bar, 2), 0), 2)}}{${df}}}`,
      result: `s_d = ${roundTo(s_d, 3)}, \\quad df = ${df}`,
      explanation: `Sample standard deviation of paired differences with ${df} degrees of freedom.`,
    },
    {
      stepNumber: 4,
      title: 'Calculate Paired t-Statistic',
      formula: `t_{calc} = \\frac{\\bar{d}}{s_d / \\sqrt{n}}`,
      substitution: `t_{calc} = \\frac{${roundTo(d_bar, 3)}}{${roundTo(s_d, 3)} / \\sqrt{${n}}} = \\frac{${roundTo(d_bar, 3)}}{${roundTo(se_d, 4)}}`,
      result: `t_{calc} = ${roundTo(t_calc, 3)}`,
      explanation: `Ratio of mean paired improvement/change to its standard error.`,
    },
    {
      stepNumber: 5,
      title: 'Critical Value & Decision',
      formula: `\\text{Compare } |t_{calc}| = ${roundTo(Math.abs(t_calc), 3)} \\text{ with } t_{crit} = ${critT[1] || critT[0]}`,
      result: isRejected ? `REJECT H_0 (Statistically Significant Effect, p = ${roundTo(pValue, 4)})` : `FAIL TO REJECT H_0 (No Significant Effect, p = ${roundTo(pValue, 4)})`,
      explanation: isRejected
        ? `There is a statistically significant change between Before and After at α = ${alpha}.`
        : `The observed change between Before and After could reasonably occur by random sampling chance.`,
    },
  ];

  const plotData: DistributionPlotData = {
    distribution: 'student_t',
    df1: df,
    criticalValues: critT,
    calculatedStatistic: roundTo(t_calc, 3),
    alpha,
    tailed,
    isRejected,
    decisionText: isRejected ? `Reject H₀ (t = ${roundTo(t_calc, 2)})` : `Fail to Reject H₀ (t = ${roundTo(t_calc, 2)})`,
  };

  return {
    diffs,
    d_bar: roundTo(d_bar, 3),
    s_d: roundTo(s_d, 3),
    se_d: roundTo(se_d, 4),
    df,
    tCalc: roundTo(t_calc, 3),
    critT,
    pValue: roundTo(pValue, 4),
    isRejected,
    steps,
    plotData,
  };
}

// 6. Chi-Square Test of Independence Solver
export function solveChiSquareIndependence(
  observed: number[][],
  rowLabels: string[],
  colLabels: string[],
  alpha: number = 0.05
) {
  const r = observed.length;
  const c = observed[0].length;
  const rowSums = observed.map(row => row.reduce((a, b) => a + b, 0));
  const colSums = new Array(c).fill(0);
  for (let j = 0; j < c; j++) {
    for (let i = 0; i < r; i++) {
      colSums[j] += observed[i][j];
    }
  }
  const grandTotal = rowSums.reduce((a, b) => a + b, 0);
  const df = (r - 1) * (c - 1);

  // Expected frequencies E_ij = (R_i * C_j) / N
  const expected: number[][] = [];
  let chi_calc = 0;
  const cellCalculations: {
    cell: string;
    obs: number;
    exp: number;
    term: number;
  }[] = [];

  for (let i = 0; i < r; i++) {
    expected[i] = [];
    for (let j = 0; j < c; j++) {
      const exp = (rowSums[i] * colSums[j]) / grandTotal;
      expected[i][j] = exp;
      const diff = observed[i][j] - exp;
      const term = (diff * diff) / exp;
      chi_calc += term;
      cellCalculations.push({
        cell: `${rowLabels[i]} × ${colLabels[j]}`,
        obs: observed[i][j],
        exp: roundTo(exp, 2),
        term: roundTo(term, 4),
      });
    }
  }

  const chi_crit = inverseChiSquareCDF(1 - alpha, df);
  const isRejected = chi_calc > chi_crit;
  const pValue = 1 - chiSquareCDF(chi_calc, df);

  const steps: CalculationStep[] = [
    {
      stepNumber: 1,
      title: 'State the Hypotheses',
      formula: `H_0: \\text{The two attributes are independent} \\quad \\text{vs} \\quad H_1: \\text{The two attributes are dependent (associated)}`,
      result: 'Null Hypothesis: Independence of variables',
      explanation: 'Testing whether row classification is independent of column classification.',
    },
    {
      stepNumber: 2,
      title: 'Calculate Row, Column & Grand Totals',
      formula: `R_i = \\sum_j O_{ij}, \\quad C_j = \\sum_i O_{ij}, \\quad N = \\sum R_i`,
      substitution: `Grand Total N = ${grandTotal}, \\quad df = (r - 1)(c - 1) = (${r}-1)(${c}-1) = ${df}`,
      result: `df = ${df}, \\quad N = ${grandTotal}`,
      explanation: `Contingency table dimension ${r} × ${c} yields ${df} degrees of freedom.`,
    },
    {
      stepNumber: 3,
      title: 'Compute Expected Frequencies',
      formula: `E_{ij} = \\frac{R_i \\times C_j}{N}`,
      substitution: `Sample cell E₁₁: (${rowSums[0]} × ${colSums[0]}) / ${grandTotal} = ${roundTo(expected[0][0], 2)}`,
      result: `Expected table calculated for all ${r * c} cells`,
      explanation: 'Theoretical counts under the null hypothesis of complete independence.',
    },
    {
      stepNumber: 4,
      title: 'Calculate Chi-Square Test Statistic',
      formula: `\\chi^2_{calc} = \\sum_{i=1}^r \\sum_{j=1}^c \\frac{(O_{ij} - E_{ij})^2}{E_{ij}}`,
      substitution: cellCalculations.slice(0, 3).map(c => `(${c.obs} - ${c.exp})² / ${c.exp}`).join(' + ') + ' + ...',
      result: `\\chi^2_{calc} = ${roundTo(chi_calc, 3)}`,
      explanation: `Aggregated sum of squared standardized discrepancies across all ${r * c} cells.`,
    },
    {
      stepNumber: 5,
      title: 'Critical Value & Decision',
      formula: `\\chi^2_{calc} > \\chi^2_{\\alpha, ${df}} = ${roundTo(chi_crit, 3)}`,
      substitution: `${roundTo(chi_calc, 3)} ${isRejected ? '>' : '\\le'} ${roundTo(chi_crit, 3)}`,
      result: isRejected ? `REJECT H_0 (Attributes are Dependent, p = ${roundTo(pValue, 4)})` : `FAIL TO REJECT H_0 (Attributes are Independent, p = ${roundTo(pValue, 4)})`,
      explanation: isRejected
        ? `Since χ²_calc (${roundTo(chi_calc, 3)}) > χ²_crit (${roundTo(chi_crit, 3)}), there is significant association between the attributes.`
        : `Since χ²_calc (${roundTo(chi_calc, 3)}) <= χ²_crit (${roundTo(chi_crit, 3)}), there is no significant evidence of association.`,
    },
  ];

  const plotData: DistributionPlotData = {
    distribution: 'chi_square',
    df1: df,
    criticalValues: [roundTo(chi_crit, 3)],
    calculatedStatistic: roundTo(chi_calc, 3),
    alpha,
    tailed: 'right_tailed',
    isRejected,
    decisionText: isRejected ? `Reject H₀ (χ² = ${roundTo(chi_calc, 2)})` : `Fail to Reject H₀ (χ² = ${roundTo(chi_calc, 2)})`,
  };

  return {
    observed,
    expected,
    rowSums,
    colSums,
    grandTotal,
    df,
    chiCalc: roundTo(chi_calc, 3),
    chiCrit: roundTo(chi_crit, 3),
    pValue: roundTo(pValue, 4),
    isRejected,
    steps,
    plotData,
    cellCalculations,
  };
}

// 7. One-Way ANOVA Solver
export function solveOneWayANOVA(
  groups: number[][],
  groupLabels: string[],
  alpha: number = 0.05
) {
  const k = groups.length; // number of groups
  const n_i = groups.map(g => g.length);
  const N = n_i.reduce((a, b) => a + b, 0); // total observations
  const groupSums = groups.map(g => g.reduce((a, b) => a + b, 0));
  const groupMeans = groupSums.map((sum, i) => sum / n_i[i]);
  const groupVars = groups.map(g => calculateVariance(g, true));

  // Grand Total G
  const G = groupSums.reduce((a, b) => a + b, 0);
  const grandMean = G / N;

  // Correction Factor CF = G^2 / N
  const CF = (G * G) / N;

  // Sum of squares of all raw values: sum sum x_ij^2
  let rawSumSq = 0;
  for (const group of groups) {
    for (const val of group) {
      rawSumSq += val * val;
    }
  }

  // Total Sum of Squares: SST = sum sum x_ij^2 - CF
  const SST = rawSumSq - CF;

  // Sum of Squares Between Treatments: SSB = sum (T_i^2 / n_i) - CF
  let sumTi2_ni = 0;
  for (let i = 0; i < k; i++) {
    sumTi2_ni += (groupSums[i] * groupSums[i]) / n_i[i];
  }
  const SSB = sumTi2_ni - CF;

  // Sum of Squares Within Treatments (Error): SSW = SST - SSB
  const SSW = Math.max(0, SST - SSB);

  // Degrees of freedom
  const dfB = k - 1;
  const dfW = N - k;
  const dfT = N - 1;

  // Mean Squares
  const MSB = dfB > 0 ? SSB / dfB : 0;
  const MSW = dfW > 0 ? SSW / dfW : 1;

  // F-statistic: F = MSB / MSW
  const f_calc = MSB / MSW;

  const f_crit = inverseFCDF(1 - alpha, dfB, dfW);
  const isRejected = f_calc > f_crit;
  const pValue = 1 - fDistributionCDF(f_calc, dfB, dfW);

  // Complete ANOVA Table
  const anovaTable: AnovaTableRow[] = [
    {
      source: 'Between Groups (Treatments)',
      ss: roundTo(SSB, 3),
      df: dfB,
      ms: roundTo(MSB, 3),
      fValue: roundTo(f_calc, 3),
      fCrit: roundTo(f_crit, 3),
      pValue: roundTo(pValue, 4),
    },
    {
      source: 'Within Groups (Error)',
      ss: roundTo(SSW, 3),
      df: dfW,
      ms: roundTo(MSW, 3),
    },
    {
      source: 'Total',
      ss: roundTo(SST, 3),
      df: dfT,
      ms: roundTo(SST / dfT, 3),
    },
  ];

  const steps: CalculationStep[] = [
    {
      stepNumber: 1,
      title: 'State the ANOVA Hypotheses',
      formula: `H_0: \\mu_1 = \\mu_2 = \\dots = \\mu_k \\quad \\text{vs} \\quad H_1: \\text{At least one group mean is different}`,
      result: `Null Hypothesis: All ${k} population treatment means are equal`,
      explanation: 'Analysis of Variance compares variance between treatment means against variance within individual samples.',
    },
    {
      stepNumber: 2,
      title: 'Correction Factor (CF) & Grand Mean',
      formula: `G = \\sum T_i, \\quad CF = \\frac{G^2}{N}`,
      substitution: `G = ${roundTo(G, 2)}, \\quad N = ${N}, \\quad CF = \\frac{(${roundTo(G, 2)})^2}{${N}} = \\frac{${roundTo(G * G, 2)}}{${N}}`,
      result: `CF = ${roundTo(CF, 3)}, \\quad \\bar{x}_{grand} = ${roundTo(grandMean, 3)}`,
      explanation: 'Base baseline correction factor for calculating sums of squares.',
    },
    {
      stepNumber: 3,
      title: 'Total Sum of Squares (SST)',
      formula: `SST = \\sum \\sum x_{ij}^2 - CF`,
      substitution: `SST = ${roundTo(rawSumSq, 2)} - ${roundTo(CF, 3)}`,
      result: `SST = ${roundTo(SST, 3)}, \\quad df_T = ${dfT}`,
      explanation: 'Total variation across all observations in the entire experiment.',
    },
    {
      stepNumber: 4,
      title: 'Between-Groups Sum of Squares (SSB)',
      formula: `SSB = \\sum_{i=1}^k \\frac{T_i^2}{n_i} - CF`,
      substitution: `SSB = [${groupSums.map((t, idx) => `(${roundTo(t, 1)})²/${n_i[idx]}`).join(' + ')}] - ${roundTo(CF, 3)} = ${roundTo(sumTi2_ni, 3)} - ${roundTo(CF, 3)}`,
      result: `SSB = ${roundTo(SSB, 3)}, \\quad df_B = k - 1 = ${dfB}`,
      explanation: 'Variation caused by differences among the treatment group means.',
    },
    {
      stepNumber: 5,
      title: 'Within-Groups Sum of Squares (SSW / SSE)',
      formula: `SSW = SST - SSB`,
      substitution: `SSW = ${roundTo(SST, 3)} - ${roundTo(SSB, 3)}`,
      result: `SSW = ${roundTo(SSW, 3)}, \\quad df_W = N - k = ${dfW}`,
      explanation: 'Inherent experimental random error variation within individual groups.',
    },
    {
      stepNumber: 6,
      title: 'Mean Squares & Fisher F-Ratio',
      formula: `MSB = \\frac{SSB}{k - 1}, \\quad MSW = \\frac{SSW}{N - k}, \\quad F_{calc} = \\frac{MSB}{MSW}`,
      substitution: `F_{calc} = \\frac{${roundTo(SSB, 3)} / ${dfB}}{${roundTo(SSW, 3)} / ${dfW}} = \\frac{${roundTo(MSB, 3)}}{${roundTo(MSW, 3)}}`,
      result: `F_{calc} = ${roundTo(f_calc, 3)}`,
      explanation: `Between-group mean square MSB is ${roundTo(f_calc, 2)} times the within-group error mean square MSW.`,
    },
    {
      stepNumber: 7,
      title: 'Critical Value & ANOVA Decision',
      formula: `F_{calc} > F_{\\alpha, ${dfB}, ${dfW}} = ${roundTo(f_crit, 3)}`,
      substitution: `${roundTo(f_calc, 3)} ${isRejected ? '>' : '\\le'} ${roundTo(f_crit, 3)}`,
      result: isRejected ? `REJECT H_0 (Statistically Significant Differences, p = ${roundTo(pValue, 4)})` : `FAIL TO REJECT H_0 (No Significant Difference, p = ${roundTo(pValue, 4)})`,
      explanation: isRejected
        ? `Since F_calc (${roundTo(f_calc, 3)}) > F_crit (${roundTo(f_crit, 3)}), we reject H₀. There is a statistically significant difference among treatment group means at α = ${alpha}.`
        : `Since F_calc (${roundTo(f_calc, 3)}) <= F_crit (${roundTo(f_crit, 3)}), we fail to reject H₀. Observed differences among group means could be due to random sampling chance at α = ${alpha}.`,
    },
  ];

  const plotData: DistributionPlotData = {
    distribution: 'f_distribution',
    df1: dfB,
    df2: dfW,
    criticalValues: [roundTo(f_crit, 3)],
    calculatedStatistic: roundTo(f_calc, 3),
    alpha,
    tailed: 'right_tailed',
    isRejected,
    decisionText: isRejected ? `Reject H₀ (F = ${roundTo(f_calc, 2)})` : `Fail to Reject H₀ (F = ${roundTo(f_calc, 2)})`,
  };

  return {
    k,
    N,
    groupMeans: groupMeans.map(m => roundTo(m, 2)),
    groupVars: groupVars.map(v => roundTo(v, 2)),
    groupSums: groupSums.map(s => roundTo(s, 2)),
    CF: roundTo(CF, 3),
    SST: roundTo(SST, 3),
    SSB: roundTo(SSB, 3),
    SSW: roundTo(SSW, 3),
    MSB: roundTo(MSB, 3),
    MSW: roundTo(MSW, 3),
    dfB,
    dfW,
    dfT,
    fCalc: roundTo(f_calc, 3),
    fCrit: roundTo(f_crit, 3),
    pValue: roundTo(pValue, 4),
    isRejected,
    anovaTable,
    steps,
    plotData,
  };
}
