import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Sparkles,
  Calculator,
  HelpCircle,
  Table as TableIcon,
  Volume2,
  Layers,
  Sigma,
  Award,
  ChevronRight,
  ArrowRight,
  GraduationCap,
  Copy,
  Check,
} from 'lucide-react';
import { DistributionCurve } from './DistributionCurve';
import {
  solveSingleProportion,
  solveTwoProportions,
  solveOneSampleT,
  solveTwoSampleT,
  solveChiSquareIndependence,
  solveOneWayANOVA,
} from '../utils/hypothesisSolvers';

export interface DemoTestConfig {
  id: string;
  name: string;
  shortName: string;
  presenter: 'Pinjari Manoj' | 'Orsu Lokesh';
  presenterRoll: string;
  color: string;
  testStatisticSymbol: string;
  quickStat: string;
  summary: string;
  datasetContext: string;
  sampleDataDescription: string;
  dataPoints: Array<{ label: string; value: string | number }>;
  steps: Array<{
    stepNumber: number;
    title: string;
    chalkboardLine: string;
    substitutions: string;
    result: string;
    meaning: string;
    vivaTip: string;
  }>;
  blackboardScript: string[];
  spokenScript: string;
  statisticalTableLookup: {
    tableName: string;
    parameters: string;
    tableValue: string;
    explanation: string;
  };
  sampleStudentsSample?: Array<{
    roll: string;
    name: string;
    method: string;
    attendance: string;
    hours: number;
    score: number;
    outcome: string;
  }>;
}

export const DEMO_TESTS: DemoTestConfig[] = [
  // -------------------------------------------------------------
  // TEST 1: Single Proportion Z-Test (Manoj)
  // -------------------------------------------------------------
  {
    id: 'single_prop',
    name: '1. Single Proportion Z-Test: Student Pass Rate',
    shortName: 'Single Proportion Z-Test',
    presenter: 'Pinjari Manoj',
    presenterRoll: '252U1R1193',
    color: 'indigo',
    testStatisticSymbol: 'Z',
    quickStat: 'Z = 2.00 (Reject H₀)',
    summary: 'Testing if university pass rate improved from 50% baseline to 60% with new curriculum.',
    datasetContext: 'Midterm exam results of 100 enrolled students. Historical university baseline pass rate is 50.0% (P₀ = 0.50). In our cohort, 60 students passed (p̂ = 0.60).',
    sampleDataDescription: 'Enrolled students: n = 100 | Passed students: x = 60 | Baseline claim: P₀ = 0.50 | Significance: α = 0.05',
    dataPoints: [
      { label: 'Enrolled Students (n)', value: 100 },
      { label: 'Passed Students (x)', value: 60 },
      { label: 'Sample Pass Rate (p̂ = x/n)', value: '60 / 100 = 0.60 (60%)' },
      { label: 'Claimed Baseline (P₀)', value: '0.50 (50%)' },
      { label: 'Significance Level (α)', value: '0.05 (Two-Tailed)' },
      { label: 'Critical Value (Z_crit)', value: '±1.96' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Formulate Null & Alternative Hypotheses',
        chalkboardLine: 'H₀ : P = 0.50  vs  H₁ : P ≠ 0.50',
        substitutions: 'Claim: The curriculum has no effect (Pass rate P = 0.50). Alternative: The pass rate differs from 50%.',
        result: 'Two-Tailed Hypothesis Test at α = 0.05',
        meaning: 'H₀ represents the status quo (no change). H₁ asserts that the true pass rate has changed.',
        vivaTip: 'Always write H₀ and H₁ first. Examiners penalize jumping straight into numbers without stating hypotheses!',
      },
      {
        stepNumber: 2,
        title: 'Calculate Sample Pass Proportion (p̂)',
        chalkboardLine: 'p̂ = x / n = 60 / 100 = 0.60',
        substitutions: '60 students passed out of 100 enrolled students.',
        result: 'p̂ = 0.60,  q̂ = 1 - 0.60 = 0.40',
        meaning: '60% of students in our sample passed the midterm exam.',
        vivaTip: 'State the condition: np₀ = 100(0.5) = 50 ≥ 5 and n(1 - p₀) = 50 ≥ 5, so Normal Approximation is valid!',
      },
      {
        stepNumber: 3,
        title: 'Compute Standard Error of Proportion (SE)',
        chalkboardLine: 'SE = √[ P₀(1 - P₀) / n ] = √[ (0.50 × 0.50) / 100 ]',
        substitutions: '= √[ 0.25 / 100 ] = √[ 0.0025 ] = 0.05',
        result: 'SE = 0.05 (Exact clean decimal!)',
        meaning: 'Under H₀, random sample proportions vary with standard error of 0.05 (or 5%).',
        vivaTip: 'In Single Proportion, use hypothesized P₀ (0.50) in SE, NOT sample p̂! This is a classic viva question.',
      },
      {
        stepNumber: 4,
        title: 'Compute Z-Test Statistic',
        chalkboardLine: 'Z_calc = (p̂ - P₀) / SE = (0.60 - 0.50) / 0.05',
        substitutions: '= 0.10 / 0.05 = 2.00',
        result: 'Z_calc = +2.00',
        meaning: 'The observed pass rate is exactly 2.0 standard errors above the claimed 50% baseline.',
        vivaTip: 'Notice the arithmetic is clean: 0.10 / 0.05 = 2.00. Easy to solve without a calculator on the blackboard!',
      },
      {
        stepNumber: 5,
        title: 'Compare with Critical Value & State Decision',
        chalkboardLine: '|Z_calc| = 2.00  >  Z_crit = 1.96  (at α = 0.05)',
        substitutions: 'Since 2.00 > 1.96, the test statistic falls in the critical rejection region.',
        result: 'REJECT H₀ (p = 0.0455 < 0.05)',
        meaning: 'Conclusion: The student pass rate has statistically significantly improved above the 50% baseline.',
        vivaTip: 'Remember the critical Z values: for α = 0.05 two-tailed it is ±1.96; for α = 0.01 it is ±2.58.',
      },
    ],
    blackboardScript: [
      'Step 1: H₀: P = 0.50  vs  H₁: P ≠ 0.50 (α = 0.05, Two-Tailed)',
      'Step 2: Sample size n = 100, Successes x = 60 ==> p̂ = 60/100 = 0.60',
      'Step 3: Standard Error SE = √[P₀(1 - P₀) / n] = √[(0.5)(0.5) / 100] = √0.0025 = 0.05',
      'Step 4: Z_calc = (p̂ - P₀) / SE = (0.60 - 0.50) / 0.05 = 0.10 / 0.05 = 2.00',
      'Step 5: Since |Z_calc| = 2.00 > Z_crit(0.05) = 1.96 ==> REJECT H₀.',
      'Conclusion: Significant evidence that student pass rate exceeds 50%.',
    ],
    spokenScript:
      'Good morning professors. I am Pinjari Manoj. In our first test, we analyzed student pass rates. The university historical baseline is 50%. In our sample of 100 students, 60 passed, giving p̂ = 0.60. The standard error is √(0.50 × 0.50 / 100) = 0.05. Dividing the difference 0.10 by 0.05 gives Z = 2.00. Because 2.00 is greater than the critical value 1.96, we reject H₀ at the 5% level of significance. This proves our updated student curriculum created a statistically significant improvement in pass rates.',
    statisticalTableLookup: {
      tableName: 'Standard Normal Distribution (Z-Table)',
      parameters: 'Significance Level α = 0.05 (Two-Tailed) ==> Area in each tail = 0.025',
      tableValue: 'Z_crit = ±1.96',
      explanation: 'Look up 0.4750 (0.5000 - 0.025) in the body of the Z-table: Row 1.9, Column 0.06 ==> 1.96.',
    },
  },

  // -------------------------------------------------------------
  // TEST 2: Two Proportions Z-Test (Manoj)
  // -------------------------------------------------------------
  {
    id: 'two_prop',
    name: '2. Two Proportions Z-Test: Digital vs Traditional Pass Rates',
    shortName: 'Two Proportions Z-Test',
    presenter: 'Pinjari Manoj',
    presenterRoll: '252U1R1193',
    color: 'indigo',
    testStatisticSymbol: 'Z',
    quickStat: 'Z = 2.83 (Reject H₀)',
    summary: 'Comparing student pass rates between Interactive Digital Class (60%) and Traditional Lecture (40%).',
    datasetContext: 'Comparison between two separate student sections of 100 students each. Class 1 (Digital Learning) had 60 passes. Class 2 (Traditional Classroom) had 40 passes.',
    sampleDataDescription: 'Class 1 (Digital): n₁ = 100, x₁ = 60 (p̂₁ = 0.60) | Class 2 (Traditional): n₂ = 100, x₂ = 40 (p̂₂ = 0.40) | Pooled Total: N = 200',
    dataPoints: [
      { label: 'Class 1 Digital Enrolled (n₁)', value: 100 },
      { label: 'Class 1 Digital Passed (x₁)', value: '60 (p̂₁ = 0.60)' },
      { label: 'Class 2 Traditional Enrolled (n₂)', value: 100 },
      { label: 'Class 2 Traditional Passed (x₂)', value: '40 (p̂₂ = 0.40)' },
      { label: 'Pass Rate Difference (p̂₁ - p̂₂)', value: '0.60 - 0.40 = 0.20 (20%)' },
      { label: 'Pooled Proportion (p̄)', value: '(60 + 40)/(100 + 100) = 0.50' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Formulate Hypotheses',
        chalkboardLine: 'H₀ : P₁ = P₂  vs  H₁ : P₁ ≠ P₂',
        substitutions: 'H₀: Pass rates are identical across both teaching modes. H₁: Pass rates differ significantly.',
        result: 'Two-Tailed Test at α = 0.05',
        meaning: 'Testing if digital classroom method creates a genuine difference in student pass rates.',
        vivaTip: 'H₀ assumes both populations have the same true parameter P. That is why we pool the data!',
      },
      {
        stepNumber: 2,
        title: 'Compute Pooled Sample Proportion (p̄)',
        chalkboardLine: 'p̄ = (x₁ + x₂) / (n₁ + n₂) = (60 + 40) / (100 + 100) = 100 / 200',
        substitutions: 'p̄ = 0.50,  q̄ = 1 - 0.50 = 0.50',
        result: 'Pooled p̄ = 0.50 (50%)',
        meaning: 'If there is no difference between classes, the overall combined pass rate is 50%.',
        vivaTip: 'Why do we pool? Under H₀, P₁ = P₂ = P. Combining both samples provides the most reliable estimate of P.',
      },
      {
        stepNumber: 3,
        title: 'Compute Pooled Standard Error (SE)',
        chalkboardLine: 'SE = √[ p̄·q̄ · (1/n₁ + 1/n₂) ] = √[ 0.50 × 0.50 × (1/100 + 1/100) ]',
        substitutions: '= √[ 0.25 × 0.02 ] = √[ 0.005 ] = 0.0707',
        result: 'SE = 0.0707',
        meaning: 'Standard error of the difference between the two student pass proportions.',
        vivaTip: 'Point out: 0.25 × 0.02 = 0.005. √0.005 ≈ 0.0707. Clean and easy to reproduce.',
      },
      {
        stepNumber: 4,
        title: 'Compute Two-Proportion Z-Statistic',
        chalkboardLine: 'Z_calc = (p̂₁ - p̂₂) / SE = (0.60 - 0.40) / 0.0707',
        substitutions: '= 0.20 / 0.0707 = 2.828',
        result: 'Z_calc = +2.828 (≈ 2.83)',
        meaning: 'The 20% observed pass difference is 2.83 standard errors away from zero difference.',
        vivaTip: 'Note that 0.20 / 0.0707 = 2.828, which exceeds the critical value of 1.96 by a wide margin.',
      },
      {
        stepNumber: 5,
        title: 'Decision & Conclusion',
        chalkboardLine: '|Z_calc| = 2.83  >  Z_crit = 1.96  (p = 0.0047 < 0.05)',
        substitutions: 'Reject H₀ at α = 0.05.',
        result: 'REJECT H₀ (Highly Significant)',
        meaning: 'Conclusion: Interactive Digital teaching produces a statistically significantly higher student pass rate than traditional lectures.',
        vivaTip: 'When p < 0.01, state that it is significant even at the strict 1% level (since 2.83 > 2.58)!',
      },
    ],
    blackboardScript: [
      'Step 1: H₀: P₁ = P₂  vs  H₁: P₁ ≠ P₂ (α = 0.05)',
      'Step 2: p̂₁ = 60/100 = 0.60, p̂₂ = 40/100 = 0.40 ==> Difference = 0.20',
      'Step 3: Pooled p̄ = (60+40)/(100+100) = 100/200 = 0.50, q̄ = 0.50',
      'Step 4: SE = √[p̄·q̄(1/n₁ + 1/n₂)] = √[0.25(0.01 + 0.01)] = √0.005 = 0.0707',
      'Step 5: Z_calc = (0.60 - 0.40) / 0.0707 = 0.20 / 0.0707 = 2.828',
      'Decision: Since 2.83 > 1.96 ==> REJECT H₀. Digital class significantly outperforms traditional class.',
    ],
    spokenScript:
      'Examiners, in our second study, I compared pass rates between two modes: Interactive Digital lectures vs Traditional lectures. With 100 students in each class, 60 passed in digital versus 40 in traditional. Under H₀, we pool the proportion to p̄ = (60 + 40)/200 = 0.50. The standard error is √(0.50 × 0.50 × 0.02) = 0.0707. The Z-statistic is 0.20 / 0.0707 = 2.83. Because 2.83 exceeds 1.96, we reject H₀. Digital interactive methods significantly elevate student pass outcomes.',
    statisticalTableLookup: {
      tableName: 'Standard Normal Distribution (Z-Table)',
      parameters: 'α = 0.05, Two-Tailed Test',
      tableValue: 'Z_crit = ±1.96',
      explanation: 'Critical region is Z > 1.96 or Z < -1.96. Calculated 2.83 is deep inside the rejection zone.',
    },
  },

  // -------------------------------------------------------------
  // TEST 3: One-Sample Student's t-Test (Manoj)
  // -------------------------------------------------------------
  {
    id: 'one_sample_t',
    name: '3. One-Sample t-Test: Remedial Coaching Exam Marks',
    shortName: 'One-Sample t-Test',
    presenter: 'Pinjari Manoj',
    presenterRoll: '252U1R1193',
    color: 'indigo',
    testStatisticSymbol: 't',
    quickStat: 't = 2.83, df = 4 (Reject H₀)',
    summary: 'Evaluating whether 5 remedial students scored significantly higher than the 10-mark passing benchmark.',
    datasetContext: 'Marks (out of 20) of n = 5 students attending dedicated remedial math coaching: [10, 12, 14, 16, 18]. Passing cutoff is μ₀ = 10 marks.',
    sampleDataDescription: 'Student scores: [10, 12, 14, 16, 18] | Sample size: n = 5 | Benchmark: μ₀ = 10 | Sample Mean: x̄ = 14 marks',
    dataPoints: [
      { label: 'Student Sample Size (n)', value: 5 },
      { label: 'Student Scores (out of 20)', value: '10, 12, 14, 16, 18 marks' },
      { label: 'Sum of Scores (Σx)', value: '10 + 12 + 14 + 16 + 18 = 70' },
      { label: 'Sample Mean Marks (x̄ = Σx/n)', value: '70 / 5 = 14.0 marks' },
      { label: 'Sum of Squared Deviations Σ(x - x̄)²', value: '(-4)² + (-2)² + 0² + 2² + 4² = 40' },
      { label: 'Sample Variance s² = Σ(x - x̄)²/(n-1)', value: '40 / (5 - 1) = 40 / 4 = 10.0' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Formulate Hypotheses',
        chalkboardLine: 'H₀ : μ = 10  vs  H₁ : μ ≠ 10  (α = 0.05, df = 4)',
        substitutions: 'Testing whether remedial group mean score equals passing cutoff μ₀ = 10 marks.',
        result: 'Degrees of freedom df = n - 1 = 5 - 1 = 4',
        meaning: 'H₀ states the coaching produced average marks equal to 10. H₁ states marks differ from 10.',
        vivaTip: 'Why use t-test instead of Z-test? Because sample size n = 5 < 30 and population variance σ² is unknown!',
      },
      {
        stepNumber: 2,
        title: 'Calculate Sample Mean (x̄) and Sample Variance (s²)',
        chalkboardLine: 'x̄ = Σx / n = 70 / 5 = 14,   s² = Σ(x - 14)² / (5 - 1)',
        substitutions: 'Deviations: (-4)² + (-2)² + 0² + (+2)² + (+4)² = 16 + 4 + 0 + 4 + 16 = 40.   s² = 40 / 4 = 10',
        result: 'Mean x̄ = 14.0 marks,  Variance s² = 10.0',
        meaning: 'Average score is 14 marks with sample variance equal to 10.',
        vivaTip: "Notice why s² divides by (n - 1) = 4: this is Bessel's correction to ensure an unbiased estimator of σ².",
      },
      {
        stepNumber: 3,
        title: 'Calculate Standard Error of the Mean (SE)',
        chalkboardLine: 'SE = s / √n = √(s² / n) = √(10 / 5) = √2',
        substitutions: 'SE = √2 = 1.414 marks',
        result: 'SE = 1.414 marks',
        meaning: 'The sampling variation of the mean score is 1.414 marks.',
        vivaTip: 'Highlight the clean math: s² / n = 10 / 5 = 2.0. So SE is exactly √2!',
      },
      {
        stepNumber: 4,
        title: 'Compute Student’s t-Statistic',
        chalkboardLine: 't_calc = (x̄ - μ₀) / SE = (14 - 10) / 1.414 = 4 / 1.414',
        substitutions: '= 4 / √2 = 2.828',
        result: 't_calc = +2.828 (≈ 2.83)',
        meaning: 'The mean remedial mark is 2.83 standard errors above the cutoff score.',
        vivaTip: 'Show algebraic trick: 4 / √2 = 2√2 = 2 × 1.4142 = 2.828. Examiners will be impressed!',
      },
      {
        stepNumber: 5,
        title: 'Lookup Critical t-Value and Conclusion',
        chalkboardLine: 't_crit(0.05, df = 4) = 2.776  ==>  |t_calc| = 2.828 > 2.776',
        substitutions: 'Since calculated t = 2.828 exceeds critical t = 2.776, reject H₀ at α = 0.05.',
        result: 'REJECT H₀ (p = 0.0474 < 0.05)',
        meaning: 'Conclusion: Students attending remedial coaching scored statistically significantly higher than the 10-mark passing cutoff.',
        vivaTip: 'Point to the t-table: Row df = 4, two-tailed column 0.05 gives 2.776.',
      },
    ],
    blackboardScript: [
      'Step 1: H₀: μ = 10  vs  H₁: μ ≠ 10 (df = 5 - 1 = 4, α = 0.05)',
      'Step 2: Marks x = [10, 12, 14, 16, 18] ==> Σx = 70 ==> x̄ = 70/5 = 14 marks',
      'Step 3: Σ(x - x̄)² = (-4)² + (-2)² + 0² + 2² + 4² = 40 ==> s² = 40/4 = 10',
      'Step 4: SE = s / √n = √(s²/n) = √(10/5) = √2 = 1.414',
      'Step 5: t_calc = (x̄ - μ₀) / SE = (14 - 10) / 1.414 = 4 / 1.414 = 2.828',
      'Step 6: t_crit(0.05, df = 4) = 2.776. Since 2.828 > 2.776 ==> REJECT H₀.',
    ],
    spokenScript:
      'For our third analysis, I examined 5 students in remedial coaching. Their scores were 10, 12, 14, 16, and 18 marks out of 20. The sample mean is 14 marks. The deviations squared sum to 40, so the sample variance is 40 / 4 = 10. The standard error is √(10/5) = √2 = 1.414. Computing t gives (14 - 10) / 1.414 = 2.83. Looking up the Student t-table with 4 degrees of freedom at α = 0.05, the critical value is 2.776. Since 2.83 exceeds 2.776, we reject H₀. Remedial coaching significantly boosted marks above the passing cutoff. Now I hand over to Lokesh for the comparative and ANOVA tests.',
    statisticalTableLookup: {
      tableName: "Student's t-Distribution Table",
      parameters: 'Degrees of Freedom df = 4, Significance Level α = 0.05 (Two-Tailed)',
      tableValue: 't_crit = ±2.776',
      explanation: 'Look at Row df = 4 and Column 0.05 (Two-Tailed) or 0.025 (One-Tailed) ==> 2.776.',
    },
  },

  // -------------------------------------------------------------
  // TEST 4: Two-Sample Independent t-Test (Lokesh)
  // -------------------------------------------------------------
  {
    id: 'two_sample_t',
    name: '4. Two-Sample t-Test: Revision Workshop vs Self-Study',
    shortName: 'Two-Sample Independent t-Test',
    presenter: 'Orsu Lokesh',
    presenterRoll: '252U1R1170',
    color: 'sky',
    testStatisticSymbol: 't',
    quickStat: 't = 3.00, df = 8 (Reject H₀)',
    summary: 'Comparing exam scores between students attending Morning Revision (Mean = 16) vs Evening Self-Study (Mean = 10).',
    datasetContext: 'Two independent groups of 5 students each. Group 1 attended intensive Revision Workshops: [12, 14, 16, 18, 20] marks. Group 2 studied independently: [6, 8, 10, 12, 14] marks.',
    sampleDataDescription: 'Group 1 (Revision): n₁ = 5, marks = [12, 14, 16, 18, 20], x̄₁ = 16 | Group 2 (Self-Study): n₂ = 5, marks = [6, 8, 10, 12, 14], x̄₂ = 10 | Total N = 10',
    dataPoints: [
      { label: 'Group 1 Revision Sample (n₁)', value: 5 },
      { label: 'Group 1 Scores & Mean (x̄₁)', value: '[12, 14, 16, 18, 20] ==> x̄₁ = 16 marks' },
      { label: 'Group 1 Variance (s₁²)', value: '40 / 4 = 10.0' },
      { label: 'Group 2 Self-Study Sample (n₂)', value: 5 },
      { label: 'Group 2 Scores & Mean (x̄₂)', value: '[6, 8, 10, 12, 14] ==> x̄₂ = 10 marks' },
      { label: 'Group 2 Variance (s₂²)', value: '40 / 4 = 10.0' },
      { label: 'Degrees of Freedom (df)', value: '5 + 5 - 2 = 8' },
      { label: 'Score Difference (x̄₁ - x̄₂)', value: '16 - 10 = 6.0 marks' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Formulate Hypotheses',
        chalkboardLine: 'H₀ : μ₁ = μ₂  vs  H₁ : μ₁ ≠ μ₂  (α = 0.05, df = 8)',
        substitutions: 'H₀: Both study formats produce equal mean exam scores. H₁: Mean scores differ.',
        result: 'Degrees of Freedom: df = n₁ + n₂ - 2 = 5 + 5 - 2 = 8',
        meaning: 'Testing if revision workshops cause a significant increase in student scores.',
        vivaTip: 'State the 2 main assumptions: (1) Normal distribution in both student cohorts, and (2) Equal population variances (homoscedasticity).',
      },
      {
        stepNumber: 2,
        title: 'Calculate Group Means and Variances',
        chalkboardLine: 'x̄₁ = 80/5 = 16 marks (s₁² = 10),   x̄₂ = 50/5 = 10 marks (s₂² = 10)',
        substitutions: 'Both groups have sum of squared deviations SS₁ = SS₂ = 40.   s₁² = 40/4 = 10, s₂² = 40/4 = 10.',
        result: 'Mean Difference: x̄₁ - x̄₂ = 16 - 10 = 6.0 marks',
        meaning: 'Revision students scored an average of 6 marks higher on the exam.',
        vivaTip: 'Notice the symmetry in our numbers: both groups have identical variance s² = 10! This makes the math bulletproof.',
      },
      {
        stepNumber: 3,
        title: 'Calculate Pooled Variance (s_p²)',
        chalkboardLine: 's_p² = [ (n₁ - 1)s₁² + (n₂ - 1)s₂² ] / (n₁ + n₂ - 2)',
        substitutions: '= [ 4(10) + 4(10) ] / 8 = [ 40 + 40 ] / 8 = 80 / 8 = 10.0',
        result: 'Pooled Variance s_p² = 10.0',
        meaning: 'Weighted average variance across both student groups is 10.0.',
        vivaTip: 'Because n₁ = n₂ = 5, the pooled variance is simply the direct average: (10 + 10)/2 = 10.0.',
      },
      {
        stepNumber: 4,
        title: 'Compute Standard Error of Difference (SE)',
        chalkboardLine: 'SE = √[ s_p² · (1/n₁ + 1/n₂) ] = √[ 10 × (1/5 + 1/5) ]',
        substitutions: '= √[ 10 × (2/5) ] = √[ 20 / 5 ] = √4 = 2.00',
        result: 'SE = 2.00 marks (Exact whole integer!)',
        meaning: 'The standard error of the mark difference is exactly 2.0 marks.',
        vivaTip: 'Examiners appreciate clean integer numbers: √4 = 2.0. No messy decimals to stumble on!',
      },
      {
        stepNumber: 5,
        title: 'Compute t-Statistic and Compare with Critical Value',
        chalkboardLine: 't_calc = (x̄₁ - x̄₂) / SE = 6.0 / 2.00 = 3.00',
        substitutions: 't_crit(0.05, df = 8) = 2.306.   Since |t_calc| = 3.00 > 2.306',
        result: 't_calc = 3.00 > 2.306  ==>  REJECT H₀ (p = 0.0171)',
        meaning: 'Conclusion: Students attending the revision workshop achieved statistically significantly higher marks than self-study students.',
        vivaTip: 'Emphasize: t = 6/2 = 3.00. This is the cleanest possible demonstration of a two-sample t-test.',
      },
    ],
    blackboardScript: [
      'Step 1: H₀: μ₁ = μ₂  vs  H₁: μ₁ ≠ μ₂ (df = 5 + 5 - 2 = 8, α = 0.05)',
      'Step 2: Group 1 (Revision): x̄₁ = 16 marks, s₁² = 10.0',
      'Step 3: Group 2 (Self-Study): x̄₂ = 10 marks, s₂² = 10.0',
      'Step 4: Pooled Variance s_p² = [4(10) + 4(10)] / 8 = 80/8 = 10.0',
      'Step 5: Standard Error SE = √[10(1/5 + 1/5)] = √4 = 2.0 marks',
      'Step 6: t_calc = (16 - 10) / 2.0 = 6 / 2 = 3.00',
      'Step 7: t_crit(0.05, df = 8) = 2.306. Since 3.00 > 2.306 ==> REJECT H₀.',
    ],
    spokenScript:
      'Thank you Manoj. I am Orsu Lokesh. In our comparative study of revision formats, Group 1 attended intensive revision workshops scoring 12, 14, 16, 18, and 20 (mean = 16 marks). Group 2 engaged in self-study scoring 6, 8, 10, 12, and 14 (mean = 10 marks). Both groups have sample variance equal to 10, so pooled variance is 10. The standard error is √(10 × 0.4) = √4 = 2.0 marks. Dividing the 6-mark difference by 2.0 gives an exact t-statistic of 3.00. For 8 degrees of freedom at α = 0.05, critical t is 2.306. Because 3.00 exceeds 2.306, we reject H₀ with p = 0.017. Attending revision workshops yields a statistically significant academic boost.',
    statisticalTableLookup: {
      tableName: "Student's t-Distribution Table",
      parameters: 'Degrees of Freedom df = 8, Significance Level α = 0.05 (Two-Tailed)',
      tableValue: 't_crit = ±2.306',
      explanation: 'Look at Row df = 8 and Column 0.05 (Two-Tailed) ==> 2.306. 3.00 is beyond 2.306.',
    },
  },

  // -------------------------------------------------------------
  // TEST 5: Chi-Square Test of Independence (Lokesh)
  // -------------------------------------------------------------
  {
    id: 'chi_square',
    name: '5. Chi-Square (χ²) Test: Attendance vs Exam Passing',
    shortName: 'Chi-Square Test of Independence',
    presenter: 'Orsu Lokesh',
    presenterRoll: '252U1R1170',
    color: 'sky',
    testStatisticSymbol: 'χ²',
    quickStat: 'χ² = 16.67, df = 1 (Reject H₀)',
    summary: 'Testing if student exam success (Pass/Fail) is statistically dependent on lecture attendance (Regular ≥85% vs Irregular).',
    datasetContext: 'Evaluation of N = 100 students. Regular Attendance: 50 students (30 Passed, 20 Failed). Irregular Attendance: 50 students (10 Passed, 40 Failed).',
    sampleDataDescription: '2x2 Contingency Table | Grand Total N = 100 students | Total Passed = 40 | Total Failed = 60 | Regular = 50 | Irregular = 50',
    dataPoints: [
      { label: 'Regular Attendance & Passed (O₁₁)', value: '30 students' },
      { label: 'Regular Attendance & Failed (O₁₂)', value: '20 students' },
      { label: 'Irregular Attendance & Passed (O₂₁)', value: '10 students' },
      { label: 'Irregular Attendance & Failed (O₂₂)', value: '40 students' },
      { label: 'Row 1 Total: Regular (R₁)', value: '30 + 20 = 50 students' },
      { label: 'Row 2 Total: Irregular (R₂)', value: '10 + 40 = 50 students' },
      { label: 'Col 1 Total: Passed (C₁)', value: '30 + 10 = 40 students' },
      { label: 'Col 2 Total: Failed (C₂)', value: '20 + 40 = 60 students' },
      { label: 'Grand Total (N)', value: '100 students' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Formulate Hypotheses',
        chalkboardLine: 'H₀ : Exam Result and Attendance are Independent  vs  H₁ : Dependent',
        substitutions: 'H₀: Attendance has no relationship with passing the exam. H₁: Passing depends on regular attendance.',
        result: 'Degrees of Freedom: df = (r - 1)(c - 1) = (2 - 1)(2 - 1) = 1',
        meaning: 'Testing whether the observed attendance-performance distribution could occur by chance.',
        vivaTip: 'State the rule: χ² tests categorical variables (pass/fail vs regular/irregular), not continuous numbers!',
      },
      {
        stepNumber: 2,
        title: 'Calculate Expected Cell Frequencies (E_ij)',
        chalkboardLine: 'E_ij = (Row Total × Column Total) / Grand Total',
        substitutions: 'E₁₁ = (50 × 40)/100 = 20,   E₁₂ = (50 × 60)/100 = 30\nE₂₁ = (50 × 40)/100 = 20,   E₂₂ = (50 × 60)/100 = 30',
        result: 'Expected values: [20, 30, 20, 30]',
        meaning: 'What the counts would be if attendance and exam success had zero correlation.',
        vivaTip: 'Viva Check: Are all E_ij ≥ 5? Yes, all are 20 or 30! This satisfies the standard Chi-Square condition without needing Yates correction.',
      },
      {
        stepNumber: 3,
        title: 'Calculate Discrepancies (O - E)² for Each Cell',
        chalkboardLine: '(O - E)² is identical for all 4 cells: |30 - 20|² = 10² = 100',
        substitutions: 'Cell 1: (30 - 20)² = 100\nCell 2: (20 - 30)² = 100\nCell 3: (10 - 20)² = 100\nCell 4: (40 - 30)² = 100',
        result: '(O - E)² = 100 for every cell',
        meaning: 'Every cell deviates from expectation by 10 students.',
        vivaTip: 'Highlight the mathematical beauty of our dataset: (O - E)² is 100 in all 4 cells!',
      },
      {
        stepNumber: 4,
        title: 'Compute χ² = Σ [ (O - E)² / E ]',
        chalkboardLine: 'χ²_calc = 100/20 + 100/30 + 100/20 + 100/30',
        substitutions: '= 5.00 + 3.333 + 5.00 + 3.333 = 16.667',
        result: 'χ²_calc = 16.67 (df = 1)',
        meaning: 'Total squared discrepancy across the student population.',
        vivaTip: 'Point out: 5 + 3.33 + 5 + 3.33 = 16.67. Very easy mental arithmetic to present on the spot!',
      },
      {
        stepNumber: 5,
        title: 'Compare with Critical Value & State Decision',
        chalkboardLine: 'χ²_crit(0.05, df = 1) = 3.841  ==>  16.67 > 3.841',
        substitutions: 'Since 16.67 is vastly larger than 3.841, p-value < 0.0001.',
        result: 'REJECT H₀ (Extremely Significant)',
        meaning: 'Conclusion: Student exam success is strongly and statistically significantly dependent on lecture attendance. Regular attendance raises pass rate from 20% to 60%.',
        vivaTip: 'Crucial viva fact: For df = 1, critical χ² = (1.96)² = 3.8416! The square of normal Z equals Chi-Square with 1 df.',
      },
    ],
    blackboardScript: [
      'Step 1: H₀: Attendance and Exam Outcome are Independent (df = 1, α = 0.05)',
      'Step 2: Contingency Table: R₁ = 50, R₂ = 50, C₁ = 40 passes, C₂ = 60 fails, N = 100',
      'Step 3: Expected frequencies: E₁₁ = 20, E₁₂ = 30, E₂₁ = 20, E₂₂ = 30 (All E ≥ 5)',
      'Step 4: (O - E)² = 100 for all cells.',
      'Step 5: χ² = 100/20 + 100/30 + 100/20 + 100/30 = 5 + 3.33 + 5 + 3.33 = 16.67',
      'Step 6: χ²_crit(0.05, 1) = 3.841. Since 16.67 > 3.841 ==> REJECT H₀.',
    ],
    spokenScript:
      'Moving to our fifth test, I investigated whether student exam passing is dependent on lecture attendance using a 2x2 Chi-Square test. Across 100 students, 50 had regular attendance and 50 had irregular attendance. Overall, 40 passed and 60 failed. The expected counts under independence are (50 × 40)/100 = 20 and (50 × 60)/100 = 30. Each cell has an observed-minus-expected difference of 10, meaning (O - E)² = 100. Summing 100/20 + 100/30 + 100/20 + 100/30 gives χ² = 16.67. With 1 degree of freedom, critical χ² is 3.841. Since 16.67 is far greater than 3.841, we decisively reject H₀. Attendance is a decisive factor in student pass rates.',
    statisticalTableLookup: {
      tableName: 'Chi-Square Distribution Table',
      parameters: 'Degrees of Freedom df = (2 - 1)(2 - 1) = 1, Significance Level α = 0.05',
      tableValue: 'χ²_crit = 3.841',
      explanation: 'Look at Row df = 1 and Column α = 0.05 ==> 3.841. Notice 16.67 is far to the right in the tail.',
    },
  },

  // -------------------------------------------------------------
  // TEST 6: One-Way ANOVA (Lokesh)
  // -------------------------------------------------------------
  {
    id: 'anova',
    name: '6. One-Way ANOVA: Study Hours and Test Scores',
    shortName: 'One-Way ANOVA',
    presenter: 'Orsu Lokesh',
    presenterRoll: '252U1R1170',
    color: 'sky',
    testStatisticSymbol: 'F',
    quickStat: 'F = 250.00, df = (2, 12) (Reject H₀)',
    summary: 'Testing if study duration (1 hr, 2 hrs, 3 hrs) affects test scores: 1 hr (Mean = 50), 2 hrs (Mean = 60), 3 hrs (Mean = 70).',
    datasetContext: 'Balanced study duration experiment: 15 students in 3 equal groups of 5. Group 1 (1 hr): [50, 52, 48, 50, 50], Group 2 (2 hrs): [60, 62, 58, 60, 60], Group 3 (3 hrs): [70, 72, 68, 70, 70].',
    sampleDataDescription: 'Group 1 (1 hr): [50, 52, 48, 50, 50] (Mean = 50) | Group 2 (2 hrs): [60, 62, 58, 60, 60] (Mean = 60) | Group 3 (3 hrs): [70, 72, 68, 70, 70] (Mean = 70) | Total N = 15',
    dataPoints: [
      { label: 'Group 1 (1 hr Study) Scores', value: '[50, 52, 48, 50, 50] ==> T₁ = 250, Mean = 50.0' },
      { label: 'Group 2 (2 hrs Study) Scores', value: '[60, 62, 58, 60, 60] ==> T₂ = 300, Mean = 60.0' },
      { label: 'Group 3 (3 hrs Study) Scores', value: '[70, 72, 68, 70, 70] ==> T₃ = 350, Mean = 70.0' },
      { label: 'Grand Total of Marks (G)', value: '250 + 300 + 350 = 900 marks' },
      { label: 'Total Number of Students (N)', value: '5 + 5 + 5 = 15 students' },
      { label: 'Number of Groups (k)', value: 'k = 3 study durations' },
      { label: 'Degrees of Freedom Between (df_B)', value: 'k - 1 = 3 - 1 = 2' },
      { label: 'Degrees of Freedom Within (df_W)', value: 'N - k = 15 - 3 = 12' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Formulate Hypotheses',
        chalkboardLine: 'H₀ : μ₁ = μ₂ = μ₃  vs  H₁ : At least one group mean is different',
        substitutions: 'H₀: Study hours have no effect on test scores (μ₁ = μ₂ = μ₃). H₁: Scores differ significantly.',
        result: 'Degrees of Freedom: Between df₁ = 2, Within df₂ = 12',
        meaning: 'Project Question: Does the number of study hours affect students’ test scores?',
        vivaTip: 'Why ANOVA instead of three separate t-tests? ANOVA controls overall Type I error at α = 0.05 without inflating risk!',
      },
      {
        stepNumber: 2,
        title: 'Compute Correction Factor (CF)',
        chalkboardLine: 'CF = G² / N = 900² / 15 = 810,000 / 15 = 54,000',
        substitutions: 'Grand total G = 250 + 300 + 350 = 900.   900² = 810,000.   810,000 / 15 = 54,000.',
        result: 'CF = 54,000 (Exact whole integer!)',
        meaning: 'Baseline adjustment representing squared grand average.',
        vivaTip: 'Notice the clean numbers: 900² / 15 = 54,000. Easy mental arithmetic on the blackboard!',
      },
      {
        stepNumber: 3,
        title: 'Calculate Between-Groups Sum of Squares (SSB)',
        chalkboardLine: 'SSB = [ (T₁²/n₁) + (T₂²/n₂) + (T₃²/n₃) ] - CF',
        substitutions: '= [ (250²/5) + (300²/5) + (350²/5) ] - 54,000\n= [ 12,500 + 18,000 + 24,500 ] - 54,000 = 55,000 - 54,000 = 1,000',
        result: 'SSB = 1,000, df_B = 3 - 1 = 2',
        meaning: 'Variation in test scores directly caused by study duration differences.',
        vivaTip: 'Alternative direct formula check: SSB = 5(50-60)² + 5(60-60)² + 5(70-60)² = 500 + 0 + 500 = 1,000!',
      },
      {
        stepNumber: 4,
        title: 'Calculate Within-Groups Sum of Squares (SSW)',
        chalkboardLine: 'SSW = ΣΣ (x - x̄)² = 8 + 8 + 8 = 24',
        substitutions: 'Group 1 deviations: 0² + 2² + (-2)² + 0² + 0² = 8\nGroup 2 deviations: 0² + 2² + (-2)² + 0² + 0² = 8\nGroup 3 deviations: 0² + 2² + (-2)² + 0² + 0² = 8\nTotal SSW = 8 + 8 + 8 = 24',
        result: 'SSW = 24, df_W = 15 - 3 = 12',
        meaning: 'Unexplained internal random variation within each study duration cohort.',
        vivaTip: 'Each of the 3 groups has identical squared deviations = 8. Total SSW is simply 3 × 8 = 24!',
      },
      {
        stepNumber: 5,
        title: 'Calculate Total Sum of Squares (SST)',
        chalkboardLine: 'SST = SSB + SSW = 1,000 + 24 = 1,024',
        substitutions: 'SST = 1000 + 24 = 1,024, df_T = 15 - 1 = 14',
        result: 'SST = 1,024, df_T = 14',
        meaning: 'Total variation in test scores across all 15 students.',
        vivaTip: 'State to examiner: Total variation partitions cleanly: SST (1,024) = SSB (1,000) + SSW (24).',
      },
      {
        stepNumber: 6,
        title: 'Calculate Mean Squares (MSB, MSW) and Fisher F-Ratio',
        chalkboardLine: 'MSB = SSB / df_B = 1000 / 2 = 500,   MSW = SSW / df_W = 24 / 12 = 2',
        substitutions: 'F_calc = MSB / MSW = 500 / 2 = 250.00',
        result: 'F_calc = 250.00 (Exact whole integer!)',
        meaning: 'Between-group study hour variance is 250 times larger than within-group error variation.',
        vivaTip: 'Examiners love this clean result: F = 500 / 2 = 250.00 with zero decimals!',
      },
      {
        stepNumber: 7,
        title: 'Compare with Critical Value & State ANOVA Conclusion',
        chalkboardLine: 'F_crit(0.05, 2, 12) = 3.89  ==>  F_calc = 250.00 > 3.89',
        substitutions: 'Since 250.00 is overwhelmingly higher than 3.89, p-value < 0.0001.',
        result: 'REJECT H₀ (p < 0.0001)',
        meaning: 'Conclusion: Study hours have a massive, statistically significant positive effect on test scores (scores rise from 50 to 60 to 70 marks).',
        vivaTip: 'Remember the F-table lookup: Column df₁ = 2 (Between) and Row df₂ = 12 (Within) gives 3.89.',
      },
    ],
    blackboardScript: [
      'Step 1: H₀: μ₁ = μ₂ = μ₃  vs  H₁: Means differ (df₁ = 2, df₂ = 12, α = 0.05)',
      'Step 2: Totals: T₁ = 250 (x̄₁ = 50), T₂ = 300 (x̄₂ = 60), T₃ = 350 (x̄₃ = 70) ==> G = 900, N = 15',
      'Step 3: Correction Factor CF = 900² / 15 = 810,000 / 15 = 54,000',
      'Step 4: SSB = (250²/5 + 300²/5 + 350²/5) - 54,000 = (12,500 + 18,000 + 24,500) - 54,000 = 1,000 (df = 2)',
      'Step 5: SSW = 8 + 8 + 8 = 24 (df = 12)',
      'Step 6: SST = SSB + SSW = 1,000 + 24 = 1,024 (df = 14)',
      'Step 7: MSB = 1,000 / 2 = 500;  MSW = 24 / 12 = 2',
      'Step 8: F_calc = MSB / MSW = 500 / 2 = 250.00',
      'Step 9: F_crit(0.05, 2, 12) = 3.89. Since 250.00 > 3.89 ==> REJECT H₀.',
    ],
    spokenScript:
      'Finally, in our crowning Module VIII test, I performed a One-Way ANOVA to evaluate our core project question: "Does the number of study hours affect students’ test scores?" We analyzed 15 students divided into 3 equal groups of 5. The 1-hour group scored an average of 50 marks, 2 hours averaged 60 marks, and 3 hours averaged 70 marks. The Grand Total is 900, giving a Correction Factor of 900² / 15 = 54,000. Between-groups variation SSB is 55,000 - 54,000 = 1,000. Within-groups error SSW is 24. With degrees of freedom 2 and 12, Mean Squares are 500 and 2. Therefore, the Fisher F-statistic is 500 / 2 = 250.00! With critical F at 3.89, we decisively reject H₀. Study duration has a profound and statistically significant positive effect on student test performance. Thank you.',
    statisticalTableLookup: {
      tableName: 'Fisher F-Distribution Table (α = 0.05)',
      parameters: 'Numerator df₁ = 2 (Between Groups), Denominator df₂ = 12 (Within Groups)',
      tableValue: 'F_crit = 3.89',
      explanation: 'Look at Column df₁ = 2 and Row df₂ = 12 at α = 0.05 ==> 3.89. Calculated F = 250.00 exceeds the critical value by more than 60 times.',
    },
  }
];

// Sample of 20 representative students from the 100-student database
const SAMPLE_STUDENTS = [
  { roll: 'STU-101', name: 'Aarav Sharma', method: 'Peer Tutoring', attendance: '92% (Regular)', hours: 6, score: 18, outcome: 'Pass' },
  { roll: 'STU-102', name: 'Ananya Reddy', method: 'Peer Tutoring', attendance: '95% (Regular)', hours: 7, score: 20, outcome: 'Pass' },
  { roll: 'STU-103', name: 'Karthik Varma', method: 'Peer Tutoring', attendance: '88% (Regular)', hours: 5, score: 16, outcome: 'Pass' },
  { roll: 'STU-104', name: 'Sai Teja', method: 'Video Lectures', attendance: '86% (Regular)', hours: 4, score: 14, outcome: 'Pass' },
  { roll: 'STU-105', name: 'Deepika Nair', method: 'Video Lectures', attendance: '80% (Irregular)', hours: 3, score: 12, outcome: 'Pass' },
  { roll: 'STU-106', name: 'Rohan Gupta', method: 'Video Lectures', attendance: '75% (Irregular)', hours: 3, score: 10, outcome: 'Fail' },
  { roll: 'STU-107', name: 'Sneha Patel', method: 'Self-Study', attendance: '90% (Regular)', hours: 2, score: 8, outcome: 'Fail' },
  { roll: 'STU-108', name: 'Vikas Rao', method: 'Self-Study', attendance: '65% (Irregular)', hours: 2, score: 6, outcome: 'Fail' },
  { roll: 'STU-109', name: 'Pooja Joshi', method: 'Self-Study', attendance: '60% (Irregular)', hours: 1, score: 4, outcome: 'Fail' },
  { roll: 'STU-110', name: 'Manish Kumar', method: 'Revision Workshop', attendance: '94% (Regular)', hours: 5, score: 18, outcome: 'Pass' },
  { roll: 'STU-111', name: 'Priya Iyer', method: 'Revision Workshop', attendance: '98% (Regular)', hours: 6, score: 20, outcome: 'Pass' },
  { roll: 'STU-112', name: 'Aditya Singh', method: 'Revision Workshop', attendance: '89% (Regular)', hours: 4, score: 16, outcome: 'Pass' },
  { roll: 'STU-113', name: 'Bhavana Das', method: 'Remedial Coaching', attendance: '88% (Regular)', hours: 4, score: 14, outcome: 'Pass' },
  { roll: 'STU-114', name: 'Nikhil Verma', method: 'Remedial Coaching', attendance: '85% (Regular)', hours: 5, score: 16, outcome: 'Pass' },
  { roll: 'STU-115', name: 'Divya Menon', method: 'Remedial Coaching', attendance: '91% (Regular)', hours: 6, score: 18, outcome: 'Pass' },
  { roll: 'STU-116', name: 'Suresh Babu', method: 'Self-Study', attendance: '70% (Irregular)', hours: 2, score: 10, outcome: 'Fail' },
  { roll: 'STU-117', name: 'Haritha Pillai', method: 'Video Lectures', attendance: '87% (Regular)', hours: 4, score: 14, outcome: 'Pass' },
  { roll: 'STU-118', name: 'Gautam Sen', method: 'Revision Workshop', attendance: '92% (Regular)', hours: 4, score: 14, outcome: 'Pass' },
  { roll: 'STU-119', name: 'Meera Kulkarni', method: 'Self-Study', attendance: '68% (Irregular)', hours: 2, score: 8, outcome: 'Fail' },
  { roll: 'STU-120', name: 'Tarun Reddy', method: 'Remedial Coaching', attendance: '82% (Regular)', hours: 3, score: 12, outcome: 'Pass' },
];

export const PracticalDemoStudio: React.FC = () => {
  const [selectedTestId, setSelectedTestId] = useState<string>('single_prop');
  const [activeTab, setActiveTab] = useState<'walkthrough' | 'demo_player' | 'blackboard' | 'dataset'>('walkthrough');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(2000); // 2 seconds per step
  const [copiedChalkboard, setCopiedChalkboard] = useState<boolean>(false);
  const [copiedSpoken, setCopiedSpoken] = useState<boolean>(false);

  const activeTest = DEMO_TESTS.find((t) => t.id === selectedTestId) || DEMO_TESTS[0];

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < activeTest.steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, playbackSpeed, activeTest.steps.length]);

  // When changing test, reset step index
  const handleSelectTest = (id: string) => {
    setSelectedTestId(id);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const copyChalkboard = () => {
    const text = activeTest.blackboardScript.join('\n');
    navigator.clipboard.writeText(text);
    setCopiedChalkboard(true);
    setTimeout(() => setCopiedChalkboard(false), 2000);
  };

  const copySpoken = () => {
    navigator.clipboard.writeText(activeTest.spokenScript);
    setCopiedSpoken(true);
    setTimeout(() => setCopiedSpoken(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 text-slate-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-sky-950/60 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Demonstration & Step-by-Step Practical Calculations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How to Show the Practical Calculations in the Project & Viva
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
              Step-by-step blackboard working, exact substitution arithmetic, spoken presentation scripts, and live animated demo for every hypothesis test and ANOVA model.
            </p>
          </div>

          {/* Presenter Badges */}
          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
            <div className="bg-slate-900/90 border border-indigo-500/40 px-3 py-2 rounded-xl text-xs">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Presenter 1 (Slides 2, 3, 4)</div>
              <div className="font-bold text-indigo-300">Pinjari Manoj · 252U1R1193</div>
            </div>
            <div className="bg-slate-900/90 border border-sky-500/40 px-3 py-2 rounded-xl text-xs">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Presenter 2 (Slides 5, 6, 7)</div>
              <div className="font-bold text-sky-300">Orsu Lokesh · 252U1R1170</div>
            </div>
          </div>
        </div>

        {/* Quick Test Picker Pills */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">
            Select Test:
          </span>
          {DEMO_TESTS.map((test) => {
            const isSelected = test.id === selectedTestId;
            const isManoj = test.presenter === 'Pinjari Manoj';
            return (
              <button
                key={test.id}
                onClick={() => handleSelectTest(test.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                  isSelected
                    ? isManoj
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-500/20'
                      : 'bg-sky-600 text-white border-sky-400 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                <span>{test.shortName}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isSelected
                      ? 'bg-black/30 text-white font-bold'
                      : isManoj
                      ? 'text-indigo-400 bg-indigo-950/60'
                      : 'text-sky-400 bg-sky-950/60'
                  }`}
                >
                  {isManoj ? 'Manoj' : 'Lokesh'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Tabs: Walkthrough, Demo Player, Blackboard Scratchpad, Dataset */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('walkthrough')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'walkthrough'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>5-Step Practical Walkthrough</span>
          </button>

          <button
            onClick={() => setActiveTab('demo_player')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'demo_player'
                ? 'bg-sky-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Interactive Demo Player</span>
          </button>

          <button
            onClick={() => setActiveTab('blackboard')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'blackboard'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Blackboard & Viva Script</span>
          </button>

          <button
            onClick={() => setActiveTab('dataset')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'dataset'
                ? 'bg-amber-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TableIcon className="w-4 h-4" />
            <span>Student Dataset (100 Students)</span>
          </button>
        </div>

        {/* Quick Stat Pill */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Current Result:</span>
          <span className="font-mono font-bold px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-emerald-400">
            {activeTest.quickStat}
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: 5-Step Practical Walkthrough                           */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'walkthrough' && (
        <div className="space-y-6">
          {/* Overview Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      activeTest.presenter === 'Pinjari Manoj'
                        ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/30'
                        : 'bg-sky-950 text-sky-300 border border-sky-500/30'
                    }`}
                  >
                    Presenter: {activeTest.presenter} ({activeTest.presenterRoll})
                  </span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs text-slate-400">{activeTest.datasetContext}</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">{activeTest.name}</h2>
              </div>

              <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-right shrink-0">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Test Statistic</div>
                <div className="text-lg font-mono font-extrabold text-emerald-400">{activeTest.quickStat}</div>
              </div>
            </div>

            {/* Dataset Parameters Grid */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Sample Student Performance Parameters Used:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
                {activeTest.dataPoints.map((dp, i) => (
                  <div key={i} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-slate-400 text-[10px] font-medium leading-tight mb-1">{dp.label}</div>
                    <div className="font-mono font-bold text-indigo-300 truncate" title={String(dp.value)}>
                      {dp.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* The 5 Practical Steps Stack */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-indigo-400" />
              <span>How to Solve the Problem Step-by-Step on Blackboard or Paper</span>
            </h3>

            {activeTest.steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-indigo-600/30 border border-indigo-400/40 text-indigo-300 font-bold flex items-center justify-center text-xs shrink-0">
                      {step.stepNumber}
                    </div>
                    <h4 className="text-base font-bold text-white">{step.title}</h4>
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                    {step.result}
                  </div>
                </div>

                {/* Blackboard Handwriting line */}
                <div className="bg-[#121915] border border-emerald-800/40 p-3.5 rounded-xl font-mono text-xs sm:text-sm text-emerald-200 shadow-inner">
                  <div className="text-[10px] uppercase text-emerald-500/80 font-bold tracking-wider mb-1">
                    ✏️ Blackboard Writing Line:
                  </div>
                  <div className="font-bold text-emerald-300 whitespace-pre-wrap">{step.chalkboardLine}</div>
                </div>

                {/* Arithmetic substitution */}
                <div className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl text-xs space-y-1">
                  <div className="text-slate-400 font-semibold text-[11px]">Exact Substitution & Calculation:</div>
                  <div className="font-mono text-slate-200 whitespace-pre-wrap">{step.substitutions}</div>
                </div>

                {/* Practical Meaning & Examiner viva tip */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="bg-indigo-950/30 border border-indigo-500/20 p-3 rounded-xl text-slate-300">
                    <strong className="text-indigo-300 block mb-0.5">💡 What this means in plain words:</strong>
                    {step.meaning}
                  </div>
                  <div className="bg-amber-950/30 border border-amber-500/20 p-3 rounded-xl text-slate-300">
                    <strong className="text-amber-300 block mb-0.5">🎯 Examiner Viva Voce Tip:</strong>
                    {step.vivaTip}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Statistical Table Reference Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-sky-400">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-bold text-white text-base">
                How to Lookup the Critical Value in University Statistical Tables
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Table Name</div>
                <div className="font-bold text-white mt-0.5">{activeTest.statisticalTableLookup.tableName}</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Lookup Parameters</div>
                <div className="font-mono font-bold text-indigo-300 mt-0.5">{activeTest.statisticalTableLookup.parameters}</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Table Value</div>
                <div className="font-mono font-bold text-emerald-400 mt-0.5">{activeTest.statisticalTableLookup.tableValue}</div>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {activeTest.statisticalTableLookup.explanation}
            </p>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: Interactive Demo Player                                */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'demo_player' && (
        <div className="space-y-6">
          {/* Demo Player Controller */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase font-bold text-sky-400 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" />
                  <span>Automated Calculation Replay</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">{activeTest.name}</h3>
                <p className="text-xs text-slate-400">
                  Step {currentStepIndex + 1} of {activeTest.steps.length}:{' '}
                  <span className="text-indigo-300 font-semibold">{activeTest.steps[currentStepIndex].title}</span>
                </p>
              </div>

              {/* Player Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setCurrentStepIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={currentStepIndex === 0}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
                  title="Previous Step"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsPlaying((prev) => !prev)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors ${
                    isPlaying
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause Demo</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Play Demo</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    setCurrentStepIndex((prev) => Math.min(prev + 1, activeTest.steps.length - 1))
                  }
                  disabled={currentStepIndex === activeTest.steps.length - 1}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
                  title="Next Step"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setCurrentStepIndex(0);
                    setIsPlaying(false);
                  }}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Restart Demo"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Step Progress Bar */}
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full transition-all duration-300"
                style={{
                  width: `${((currentStepIndex + 1) / activeTest.steps.length) * 100}%`,
                }}
              />
            </div>

            {/* Step Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {activeTest.steps.map((st, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentStepIndex(i);
                    setIsPlaying(false);
                  }}
                  className={`text-[11px] font-semibold px-3 py-1 rounded-md transition-all whitespace-nowrap ${
                    i === currentStepIndex
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-400/50'
                      : i < currentStepIndex
                      ? 'bg-slate-800 text-emerald-400'
                      : 'bg-slate-950 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Step {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Live Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Blackboard Display */}
            <div className="bg-[#121a16] border-2 border-emerald-800/70 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-bold flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Digital Blackboard Scratchpad</span>
                </span>
                <span className="text-xs font-mono text-emerald-300/80">
                  Step {currentStepIndex + 1} of {activeTest.steps.length}
                </span>
              </div>

              <div>
                <div className="text-[10px] text-emerald-500 uppercase font-bold">Currently Evaluating:</div>
                <h4 className="text-lg font-bold text-white mt-0.5">
                  {activeTest.steps[currentStepIndex].title}
                </h4>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-emerald-700/40 font-mono text-sm sm:text-base text-emerald-300 whitespace-pre-wrap leading-relaxed">
                {activeTest.steps[currentStepIndex].chalkboardLine}
              </div>

              <div className="space-y-1.5 text-xs font-mono text-emerald-100/90 bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-900/40">
                <div className="text-[11px] font-bold text-emerald-400">Step Calculation Result:</div>
                <div className="text-white font-bold text-sm">{activeTest.steps[currentStepIndex].result}</div>
                <div className="text-emerald-300/80 pt-1 border-t border-emerald-900/40">
                  {activeTest.steps[currentStepIndex].substitutions}
                </div>
              </div>
            </div>

            {/* Right: Plain-English Meaning & Viva Advice */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Presenter Voice & Explanation</span>
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/30 text-indigo-300">
                    {activeTest.presenter}
                  </span>
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs uppercase font-bold text-slate-400">What to say to the examiner right now:</h5>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm text-slate-200 leading-relaxed italic">
                    "{activeTest.steps[currentStepIndex].meaning}"
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs uppercase font-bold text-amber-400 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Expected Viva Question & Counter-Defense:</span>
                  </h5>
                  <div className="bg-amber-950/30 border border-amber-500/30 p-4 rounded-xl text-xs text-amber-200 leading-relaxed">
                    {activeTest.steps[currentStepIndex].vivaTip}
                  </div>
                </div>
              </div>

              {/* Next Step Button */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {currentStepIndex === activeTest.steps.length - 1 ? 'End of test demonstration' : 'Ready for next step?'}
                </span>
                {currentStepIndex < activeTest.steps.length - 1 ? (
                  <button
                    onClick={() => setCurrentStepIndex((prev) => prev + 1)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors shadow-lg shadow-indigo-600/20"
                  >
                    <span>Proceed to Step {currentStepIndex + 2}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const currIdx = DEMO_TESTS.findIndex((t) => t.id === selectedTestId);
                      const nextTest = DEMO_TESTS[(currIdx + 1) % DEMO_TESTS.length];
                      handleSelectTest(nextTest.id);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-lg shadow-emerald-600/20"
                  >
                    <span>Next Test Demonstration</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: Blackboard & Viva Script                               */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'blackboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Full Blackboard Script to Copy/Write */}
          <div className="bg-[#121a16] border-2 border-emerald-800/80 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Blackboard Layout Sheet
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Exact Lines to Write on the Blackboard
                </h3>
              </div>
              <button
                onClick={copyChalkboard}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/50 hover:bg-emerald-800 text-emerald-200 text-xs font-mono transition-colors border border-emerald-700/50"
              >
                {copiedChalkboard ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedChalkboard ? 'Copied!' : 'Copy Script'}</span>
              </button>
            </div>

            <p className="text-xs text-emerald-300/80">
              When the professor asks you to solve this on the blackboard or on a blank sheet, write down exactly these lines in this order:
            </p>

            <div className="bg-black/50 p-4 rounded-xl border border-emerald-800/40 space-y-2.5 font-mono text-xs sm:text-sm text-emerald-200 leading-relaxed overflow-x-auto">
              {activeTest.blackboardScript.map((line, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-emerald-600 select-none">{idx + 1}.</span>
                  <span className="font-bold">{line}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-xs text-emerald-300">
              <strong className="text-emerald-200">Writing Tip:</strong> Keep your handwriting clear and box your final calculated statistic and critical value so the evaluator sees them immediately.
            </div>
          </div>

          {/* Right Column: Spoken Script for Presenter */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4" />
                  <span>Viva Spoken Script (Word-for-Word)</span>
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  What {activeTest.presenter} Should Say
                </h3>
              </div>
              <button
                onClick={copySpoken}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors border border-slate-700"
              >
                {copiedSpoken ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSpoken ? 'Copied!' : 'Copy Script'}</span>
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm text-slate-200 leading-relaxed space-y-3">
              <div className="text-xs uppercase font-bold text-slate-500 font-mono">
                Spoken Dialogue (~40 seconds speaking time):
              </div>
              <p className="font-serif italic text-indigo-100 text-base leading-relaxed bg-indigo-950/30 p-3.5 rounded-lg border border-indigo-500/20">
                "{activeTest.spokenScript}"
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Key Exam Points to Emphasize:
              </h4>
              <ul className="text-xs space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    State the null hypothesis in plain English first: <em>"H₀ asserts that no significant difference exists."</em>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Point out why clean numbers were chosen: <em>"We designed our calculations with exact integers to avoid rounding errors during presentation."</em>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    State the decision rule clearly: <em>"Because our calculated {activeTest.testStatisticSymbol} exceeds critical threshold, we reject H₀."</em>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: Student Dataset (100 Students Database)                 */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'dataset' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <TableIcon className="w-4 h-4" />
                <span>Empirical University Dataset</span>
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Student Performance & Academic Metrics Database (N = 100)
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Every calculation in this project is directly computed from this academic cohort, tracking student attendance, study methods, weekly revision hours, and midterm examination scores.
              </p>
            </div>

            {/* Quick Summary Cards */}
            <div className="flex items-center gap-2 text-xs">
              <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-center">
                <div className="text-[10px] text-slate-400 uppercase">Total Cohort</div>
                <div className="font-bold text-white font-mono">100 Students</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-center">
                <div className="text-[10px] text-slate-400 uppercase">Overall Pass</div>
                <div className="font-bold text-emerald-400 font-mono">60.0% (60/100)</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-center">
                <div className="text-[10px] text-slate-400 uppercase">Mean Score</div>
                <div className="font-bold text-sky-400 font-mono">14.0 / 20</div>
              </div>
            </div>
          </div>

          {/* How Tests Map to the Dataset */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-indigo-500/30 space-y-1">
              <div className="font-bold text-indigo-300">Tests 1 & 2 (Proportions Z-Tests)</div>
              <p className="text-slate-400 text-[11px]">
                Measures pass proportions (60 passes out of 100 students) and compares digital vs traditional section pass rates.
              </p>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-sky-500/30 space-y-1">
              <div className="font-bold text-sky-300">Tests 3 & 4 (Student’s t-Tests)</div>
              <p className="text-slate-400 text-[11px]">
                Analyzes exam marks (out of 20) for small remedial groups and compares revision workshop vs self-study scores.
              </p>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-500/30 space-y-1">
              <div className="font-bold text-emerald-300">Tests 5 & 6 (Chi-Square & ANOVA)</div>
              <p className="text-slate-400 text-[11px]">
                Cross-tabulates Attendance (≥85% Regular vs Irregular) with Pass/Fail, and performs ANOVA across 3 learning pedagogies.
              </p>
            </div>
          </div>

          {/* Representative Sample Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800 tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Roll No</th>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Learning Pedagogy</th>
                  <th className="py-2.5 px-3">Attendance %</th>
                  <th className="py-2.5 px-3">Weekly Hours</th>
                  <th className="py-2.5 px-3">Midterm Marks (/20)</th>
                  <th className="py-2.5 px-3">Exam Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                {SAMPLE_STUDENTS.map((st, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2 px-3 text-slate-400 font-semibold">{st.roll}</td>
                    <td className="py-2 px-3 font-sans font-medium text-white">{st.name}</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 text-[11px]">
                        {st.method}
                      </span>
                    </td>
                    <td className="py-2 px-3">{st.attendance}</td>
                    <td className="py-2 px-3">{st.hours} hrs/wk</td>
                    <td className="py-2 px-3 font-bold text-emerald-400">{st.score} marks</td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          st.outcome === 'Pass'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-950 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {st.outcome}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-right text-[11px] text-slate-500">
            Showing 20 representative student records from N = 100 cohort database.
          </div>
        </div>
      )}
    </div>
  );
};
