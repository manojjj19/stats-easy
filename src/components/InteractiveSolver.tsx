import React, { useState } from 'react';
import {
  solveSingleProportion,
  solveTwoProportions,
  solveOneSampleT,
  solveTwoSampleT,
  solvePairedT,
  solveChiSquareIndependence,
  solveOneWayANOVA,
} from '../utils/hypothesisSolvers';
import {
  generateFrequencyDistribution,
  calculateCorrelation,
} from '../utils/statCalculations';
import { DistributionCurve } from './DistributionCurve';
import {
  HistogramChart,
  OgiveChart,
  ScatterRegressionChart,
  AnovaGroupBarChart,
} from './ChartVisualizer';
import { AlternativeHypothesis } from '../types/stats';
import {
  RotateCcw,
  Sparkles,
  Calculator,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from 'lucide-react';

export const InteractiveSolver: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>('single_prop');

  // Single Proportion state (Clean Z = 2.00)
  const [spX, setSpX] = useState<number>(60);
  const [spN, setSpN] = useState<number>(100);
  const [spP0, setSpP0] = useState<number>(0.50);
  const [spAlpha, setSpAlpha] = useState<number>(0.05);
  const [spTailed, setSpTailed] = useState<AlternativeHypothesis>('two_tailed');

  // Two Proportions state (Clean 60% vs 40%)
  const [tpX1, setTpX1] = useState<number>(60);
  const [tpN1, setTpN1] = useState<number>(100);
  const [tpX2, setTpX2] = useState<number>(40);
  const [tpN2, setTpN2] = useState<number>(100);
  const [tpAlpha, setTpAlpha] = useState<number>(0.05);
  const [tpTailed, setTpTailed] = useState<AlternativeHypothesis>('two_tailed');

  // One Sample T state (Clean: 10, 12, 14, 16, 18 -> mean = 14, s^2 = 10)
  const [ostData, setOstData] = useState<string>('10, 12, 14, 16, 18');
  const [ostMu0, setOstMu0] = useState<number>(10.0);
  const [ostAlpha, setOstAlpha] = useState<number>(0.05);
  const [ostTailed, setOstTailed] = useState<AlternativeHypothesis>('two_tailed');

  // Two Sample T state (Clean: G1=[12,14,16,18,20], G2=[6,8,10,12,14], t = 3.00)
  const [tstG1, setTstG1] = useState<string>('12, 14, 16, 18, 20');
  const [tstG2, setTstG2] = useState<string>('6, 8, 10, 12, 14');
  const [tstAlpha, setTstAlpha] = useState<number>(0.05);
  const [tstTailed, setTstTailed] = useState<AlternativeHypothesis>('two_tailed');

  // Paired T state (Clean d=[2,4,4,4,6], d_bar = 4.0)
  const [ptBefore, setPtBefore] = useState<string>('10, 12, 14, 16, 18');
  const [ptAfter, setPtAfter] = useState<string>('12, 16, 18, 20, 24');
  const [ptAlpha, setPtAlpha] = useState<number>(0.05);
  const [ptTailed, setPtTailed] = useState<AlternativeHypothesis>('two_tailed');

  // Chi Square Independence state (Clean: E11=20, E12=30, E21=20, E22=30)
  const [csMatrix, setCsMatrix] = useState<number[][]>([
    [30, 20],
    [10, 40],
  ]);
  const [csAlpha, setCsAlpha] = useState<number>(0.05);

  // ANOVA One-Way state: Study Hours and Test Scores
  const [anovaG1, setAnovaG1] = useState<string>('50, 52, 48, 50, 50');
  const [anovaG2, setAnovaG2] = useState<string>('60, 62, 58, 60, 60');
  const [anovaG3, setAnovaG3] = useState<string>('70, 72, 68, 70, 70');
  const [anovaAlpha, setAnovaAlpha] = useState<number>(0.05);

  // Module I stats state (Clean: 10 to 100, mean = 55, median = 55)
  const [m1Input, setM1Input] = useState<string>('10, 20, 30, 40, 50, 60, 70, 80, 90, 100');
  const [m1Bins, setM1Bins] = useState<number>(5);

  // Module IX correlation state (Clean: Y = 2X, r = 1.00)
  const [m9X, setM9X] = useState<string>('1, 2, 3, 4, 5');
  const [m9Y, setM9Y] = useState<string>('2, 4, 6, 8, 10');

  // Parse helpers
  const parseNumbers = (str: string): number[] => {
    return str
      .split(',')
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));
  };

  // Compute active model results
  let calculationContent: React.ReactNode = null;

  if (selectedModel === 'single_prop') {
    const res = solveSingleProportion(spX, spN, spP0, spAlpha, spTailed);
    calculationContent = (
      <div className="space-y-5">
        <DistributionCurve data={res.plotData} />

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
            Step-by-Step Mathematical Calculations
          </div>
          <div className="space-y-3">
            {res.steps.map((st) => (
              <div key={st.stepNumber} className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200">
                    Step {st.stepNumber}: {st.title}
                  </span>
                  <span className="text-emerald-400 font-mono text-xs">{st.result}</span>
                </div>
                {st.substitution && (
                  <div className="text-xs font-mono text-indigo-300 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 my-1">
                    {st.substitution}
                  </div>
                )}
                <div className="text-xs text-slate-400">{st.explanation}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (selectedModel === 'two_prop') {
    const res = solveTwoProportions(tpX1, tpN1, tpX2, tpN2, tpAlpha, tpTailed);
    calculationContent = (
      <div className="space-y-5">
        <DistributionCurve data={res.plotData} />

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
            Step-by-Step Calculations (Two Proportions)
          </div>
          <div className="space-y-3">
            {res.steps.map((st) => (
              <div key={st.stepNumber} className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200">
                    Step {st.stepNumber}: {st.title}
                  </span>
                  <span className="text-emerald-400 font-mono text-xs">{st.result}</span>
                </div>
                {st.substitution && (
                  <div className="text-xs font-mono text-indigo-300 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 my-1">
                    {st.substitution}
                  </div>
                )}
                <div className="text-xs text-slate-400">{st.explanation}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (selectedModel === 'one_sample_t') {
    const nums = parseNumbers(ostData);
    if (nums.length >= 2) {
      const res = solveOneSampleT(nums, ostMu0, ostAlpha, ostTailed);
      calculationContent = (
        <div className="space-y-5">
          <DistributionCurve data={res.plotData} />
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              One-Sample Student’s t-Test Working
            </div>
            <div className="space-y-3">
              {res.steps.map((st) => (
                <div key={st.stepNumber} className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-200">
                      Step {st.stepNumber}: {st.title}
                    </span>
                    <span className="text-emerald-400 font-mono text-xs">{st.result}</span>
                  </div>
                  {st.substitution && (
                    <div className="text-xs font-mono text-indigo-300 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 my-1">
                      {st.substitution}
                    </div>
                  )}
                  <div className="text-xs text-slate-400">{st.explanation}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  } else if (selectedModel === 'two_sample_t') {
    const g1 = parseNumbers(tstG1);
    const g2 = parseNumbers(tstG2);
    if (g1.length >= 2 && g2.length >= 2) {
      const res = solveTwoSampleT(g1, g2, tstAlpha, tstTailed);
      calculationContent = (
        <div className="space-y-5">
          <DistributionCurve data={res.plotData} />
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Two Independent Samples t-Test Working
            </div>
            <div className="space-y-3">
              {res.steps.map((st) => (
                <div key={st.stepNumber} className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-200">
                      Step {st.stepNumber}: {st.title}
                    </span>
                    <span className="text-emerald-400 font-mono text-xs">{st.result}</span>
                  </div>
                  {st.substitution && (
                    <div className="text-xs font-mono text-indigo-300 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 my-1">
                      {st.substitution}
                    </div>
                  )}
                  <div className="text-xs text-slate-400">{st.explanation}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  } else if (selectedModel === 'paired_t') {
    const before = parseNumbers(ptBefore);
    const after = parseNumbers(ptAfter);
    if (before.length >= 2 && after.length >= 2) {
      const res = solvePairedT(before, after, ptAlpha, ptTailed);
      calculationContent = (
        <div className="space-y-5">
          <DistributionCurve data={res.plotData} />
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Paired Differences t-Test Working
            </div>
            <div className="space-y-3">
              {res.steps.map((st) => (
                <div key={st.stepNumber} className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-200">
                      Step {st.stepNumber}: {st.title}
                    </span>
                    <span className="text-emerald-400 font-mono text-xs">{st.result}</span>
                  </div>
                  {st.substitution && (
                    <div className="text-xs font-mono text-indigo-300 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 my-1">
                      {st.substitution}
                    </div>
                  )}
                  <div className="text-xs text-slate-400">{st.explanation}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  } else if (selectedModel === 'chi_square') {
    const res = solveChiSquareIndependence(
      csMatrix,
      ['Group 1', 'Group 2'],
      ['Category A', 'Category B', 'Category C'],
      csAlpha
    );
    calculationContent = (
      <div className="space-y-5">
        <DistributionCurve data={res.plotData} />
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
            Contingency Table Calculations (χ²)
          </div>
          <div className="space-y-3">
            {res.steps.map((st) => (
              <div key={st.stepNumber} className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200">
                    Step {st.stepNumber}: {st.title}
                  </span>
                  <span className="text-emerald-400 font-mono text-xs">{st.result}</span>
                </div>
                {st.substitution && (
                  <div className="text-xs font-mono text-indigo-300 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 my-1">
                    {st.substitution}
                  </div>
                )}
                <div className="text-xs text-slate-400">{st.explanation}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (selectedModel === 'anova') {
    const g1 = parseNumbers(anovaG1);
    const g2 = parseNumbers(anovaG2);
    const g3 = parseNumbers(anovaG3);
    if (g1.length >= 2 && g2.length >= 2 && g3.length >= 2) {
      const res = solveOneWayANOVA(
        [g1, g2, g3],
        ['Treatment 1', 'Treatment 2', 'Treatment 3'],
        anovaAlpha
      );
      calculationContent = (
        <div className="space-y-5">
          <AnovaGroupBarChart
            groups={[g1, g2, g3]}
            groupLabels={['Treatment 1', 'Treatment 2', 'Treatment 3']}
          />
          <DistributionCurve data={res.plotData} />

          {/* ANOVA Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              One-Way ANOVA Table
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400">
                  <tr>
                    <th className="px-3 py-2">Source</th>
                    <th className="px-3 py-2">SS</th>
                    <th className="px-3 py-2">df</th>
                    <th className="px-3 py-2">MS</th>
                    <th className="px-3 py-2">F (calc)</th>
                    <th className="px-3 py-2">F (crit)</th>
                    <th className="px-3 py-2">p-value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {res.anovaTable.map((r, i) => (
                    <tr key={i} className={i === 0 ? 'bg-indigo-950/20' : ''}>
                      <td className="px-3 py-1.5 font-sans font-medium text-slate-200">{r.source}</td>
                      <td className="px-3 py-1.5 text-indigo-300">{r.ss}</td>
                      <td className="px-3 py-1.5 text-slate-300">{r.df}</td>
                      <td className="px-3 py-1.5 text-sky-300">{r.ms}</td>
                      <td className="px-3 py-1.5 font-bold text-amber-300">{r.fValue ?? '-'}</td>
                      <td className="px-3 py-1.5 text-slate-400">{r.fCrit ?? '-'}</td>
                      <td className="px-3 py-1.5 text-rose-300">{r.pValue ?? '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  } else if (selectedModel === 'module1') {
    const raw = parseNumbers(m1Input);
    if (raw.length >= 4) {
      const dist = generateFrequencyDistribution(raw, m1Bins);
      if (dist) {
        calculationContent = (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                <div className="text-[11px] text-slate-400">Sample Mean (x̄)</div>
                <div className="text-xl font-bold font-mono text-indigo-300">{dist.mean}</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                <div className="text-[11px] text-slate-400">Sample Median</div>
                <div className="text-xl font-bold font-mono text-emerald-300">{dist.median}</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                <div className="text-[11px] text-slate-400">Standard Deviation (s)</div>
                <div className="text-xl font-bold font-mono text-sky-300">{dist.stdDev}</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                <div className="text-[11px] text-slate-400">Interquartile Range (IQR)</div>
                <div className="text-xl font-bold font-mono text-amber-300">{dist.iqr}</div>
              </div>
            </div>

            <HistogramChart intervals={dist.intervals} />
            <OgiveChart intervals={dist.intervals} medianVal={dist.median} />

            {/* Stem and leaf */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Stem-and-Leaf Plot (Key: Stem | Leaf = Stem × 10 + Leaf)
              </div>
              <div className="font-mono text-xs space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                {Object.keys(dist.stemLeaf).map((stem) => (
                  <div key={stem} className="flex items-center gap-3">
                    <span className="w-8 text-right font-bold text-indigo-400">{stem} |</span>
                    <span className="text-slate-200">
                      {dist.stemLeaf[parseInt(stem)].sort((a, b) => a - b).join(' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
    }
  } else if (selectedModel === 'module9') {
    const xs = parseNumbers(m9X);
    const ys = parseNumbers(m9Y);
    if (xs.length >= 3 && ys.length >= 3) {
      const corr = calculateCorrelation(xs, ys);
      if (corr) {
        calculationContent = (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                <div className="text-[11px] text-slate-400">Karl Pearson's r</div>
                <div className="text-xl font-bold font-mono text-indigo-300">{corr.pearsonR}</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                <div className="text-[11px] text-slate-400">Spearman’s ρ</div>
                <div className="text-xl font-bold font-mono text-emerald-300">{corr.spearmanRho}</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                <div className="text-[11px] text-slate-400">Covariance Cov(X,Y)</div>
                <div className="text-xl font-bold font-mono text-sky-300">{corr.sampleCovXY}</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                <div className="text-[11px] text-slate-400">Regression Slope b_yx</div>
                <div className="text-xl font-bold font-mono text-amber-300">{corr.b_yx}</div>
              </div>
            </div>

            <ScatterRegressionChart
              x={xs}
              y={ys}
              pearsonR={corr.pearsonR}
              b_yx={corr.b_yx}
              intercept={corr.intercept_y}
            />

            {/* Spearman Rank Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Spearman's Rank Difference Table (Σd² = {corr.sumD2})
              </div>
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950 text-slate-400">
                    <tr>
                      <th className="px-3 py-1.5">Pair</th>
                      <th className="px-3 py-1.5">X</th>
                      <th className="px-3 py-1.5">Y</th>
                      <th className="px-3 py-1.5">Rank X (R_x)</th>
                      <th className="px-3 py-1.5">Rank Y (R_y)</th>
                      <th className="px-3 py-1.5">d = R_x - R_y</th>
                      <th className="px-3 py-1.5">d²</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {corr.rankTable.map((r, i) => (
                      <tr key={i}>
                        <td className="px-3 py-1 text-slate-400">{i + 1}</td>
                        <td className="px-3 py-1 text-slate-200">{r.x}</td>
                        <td className="px-3 py-1 text-slate-200">{r.y}</td>
                        <td className="px-3 py-1 text-indigo-300">{r.rankX}</td>
                        <td className="px-3 py-1 text-sky-300">{r.rankY}</td>
                        <td className="px-3 py-1 text-slate-300">{r.d}</td>
                        <td className="px-3 py-1 text-amber-300">{r.d2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }
    }
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Title & Model Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-1">
            Exam & Project Numerical Sandbox
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Interactive Hypothesis Testing & Statistics Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Change inputs or test parameters to immediately recompute step-by-step arithmetic working and distribution graphs.
          </p>
        </div>

        {/* Segmented Control for Models */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
          {[
            { id: 'single_prop', label: 'Single Prop (Z)' },
            { id: 'two_prop', label: 'Two Props (Z)' },
            { id: 'one_sample_t', label: '1-Sample t' },
            { id: 'two_sample_t', label: '2-Sample t' },
            { id: 'paired_t', label: 'Paired t' },
            { id: 'chi_square', label: 'Chi-Square (χ²)' },
            { id: 'anova', label: 'ANOVA (F)' },
            { id: 'module1', label: 'Module I Stats' },
            { id: 'module9', label: 'Module IX Corr' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedModel(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedModel === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Parameters on Left, Output & Graph on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Parameter Controls (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800">
            <span>Model Parameters & Dataset</span>
            <Calculator className="w-4 h-4 text-indigo-400" />
          </div>

          {/* Model Specific Controls */}
          {selectedModel === 'single_prop' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Sample Successes / Defects (x)
                </label>
                <input
                  type="number"
                  value={spX}
                  onChange={(e) => setSpX(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Sample Size (n)
                </label>
                <input
                  type="number"
                  value={spN}
                  onChange={(e) => setSpN(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Claimed Baseline Proportion (P₀)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.001"
                  max="0.999"
                  value={spP0}
                  onChange={(e) => setSpP0(parseFloat(e.target.value) || 0.05)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Significance Level (α)
                </label>
                <select
                  value={spAlpha}
                  onChange={(e) => setSpAlpha(parseFloat(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                >
                  <option value={0.01}>α = 0.01 (1% level)</option>
                  <option value={0.05}>α = 0.05 (5% level - Standard)</option>
                  <option value={0.10}>α = 0.10 (10% level)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Alternative Hypothesis (H₁)
                </label>
                <select
                  value={spTailed}
                  onChange={(e) => setSpTailed(e.target.value as AlternativeHypothesis)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                >
                  <option value="two_tailed">Two-Tailed (P ≠ P₀)</option>
                  <option value="right_tailed">Right-Tailed (P &gt; P₀)</option>
                  <option value="left_tailed">Left-Tailed (P &lt; P₀)</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSpX(60);
                  setSpN(100);
                  setSpP0(0.50);
                  setSpAlpha(0.05);
                  setSpTailed('two_tailed');
                }}
                className="w-full mt-2 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Simple Dataset (Z = 2.00)</span>
              </button>
            </div>
          )}

          {selectedModel === 'two_prop' && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Sample 1 x₁</label>
                  <input
                    type="number"
                    value={tpX1}
                    onChange={(e) => setTpX1(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Sample 1 n₁</label>
                  <input
                    type="number"
                    value={tpN1}
                    onChange={(e) => setTpN1(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Sample 2 x₂</label>
                  <input
                    type="number"
                    value={tpX2}
                    onChange={(e) => setTpX2(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Sample 2 n₂</label>
                  <input
                    type="number"
                    value={tpN2}
                    onChange={(e) => setTpN2(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Significance Level (α)</label>
                <select
                  value={tpAlpha}
                  onChange={(e) => setTpAlpha(parseFloat(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                >
                  <option value={0.01}>α = 0.01</option>
                  <option value={0.05}>α = 0.05</option>
                  <option value={0.10}>α = 0.10</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setTpX1(60);
                  setTpN1(100);
                  setTpX2(40);
                  setTpN2(100);
                }}
                className="w-full mt-2 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Simple Dataset (60% vs 40%)</span>
              </button>
            </div>
          )}

          {selectedModel === 'one_sample_t' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Sample Data Values (Comma-separated)
                </label>
                <textarea
                  rows={3}
                  value={ostData}
                  onChange={(e) => setOstData(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Hypothesized Mean (μ₀)</label>
                <input
                  type="number"
                  step="0.1"
                  value={ostMu0}
                  onChange={(e) => setOstMu0(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Significance Level (α)</label>
                <select
                  value={ostAlpha}
                  onChange={(e) => setOstAlpha(parseFloat(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                >
                  <option value={0.01}>α = 0.01</option>
                  <option value={0.05}>α = 0.05</option>
                  <option value={0.10}>α = 0.10</option>
                </select>
              </div>
            </div>
          )}

          {selectedModel === 'two_sample_t' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Group 1 Data</label>
                <input
                  type="text"
                  value={tstG1}
                  onChange={(e) => setTstG1(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-300 font-medium block mb-1">Group 2 Data</label>
                <input
                  type="text"
                  value={tstG2}
                  onChange={(e) => setTstG2(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>
            </div>
          )}

          {selectedModel === 'paired_t' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Before Values</label>
                <input
                  type="text"
                  value={ptBefore}
                  onChange={(e) => setPtBefore(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-300 font-medium block mb-1">After Values</label>
                <input
                  type="text"
                  value={ptAfter}
                  onChange={(e) => setPtAfter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>
            </div>
          )}

          {selectedModel === 'anova' && (
            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-[11px] text-indigo-200">
                💡 <strong>Type any numbers:</strong> Edit test scores below. As soon as you type or change numbers, group totals, means, SSB, SSW, and F-ratio recalculate live!
              </div>
              <div>
                <label className="text-slate-300 font-medium block mb-1">1 Hour Study Group (Test Scores)</label>
                <input
                  type="text"
                  value={anovaG1}
                  onChange={(e) => setAnovaG1(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                  placeholder="e.g. 50, 52, 48, 50, 50"
                />
              </div>
              <div>
                <label className="text-slate-300 font-medium block mb-1">2 Hours Study Group (Test Scores)</label>
                <input
                  type="text"
                  value={anovaG2}
                  onChange={(e) => setAnovaG2(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                  placeholder="e.g. 60, 62, 58, 60, 60"
                />
              </div>
              <div>
                <label className="text-slate-300 font-medium block mb-1">3 Hours Study Group (Test Scores)</label>
                <input
                  type="text"
                  value={anovaG3}
                  onChange={(e) => setAnovaG3(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                  placeholder="e.g. 70, 72, 68, 70, 70"
                />
              </div>
              <button
                onClick={() => {
                  setAnovaG1('50, 52, 48, 50, 50');
                  setAnovaG2('60, 62, 58, 60, 60');
                  setAnovaG3('70, 72, 68, 70, 70');
                  setAnovaAlpha(0.05);
                }}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
                <span>Reset to 15-Student Study Dataset</span>
              </button>
            </div>
          )}

          {selectedModel === 'module1' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Raw Dataset (Marks / Measures)</label>
                <textarea
                  rows={4}
                  value={m1Input}
                  onChange={(e) => setM1Input(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-300 font-medium block mb-1">Number of Class Intervals</label>
                <input
                  type="number"
                  min={3}
                  max={10}
                  value={m1Bins}
                  onChange={(e) => setM1Bins(parseInt(e.target.value) || 5)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>
            </div>
          )}

          {selectedModel === 'module9' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">X Values (Independent)</label>
                <input
                  type="text"
                  value={m9X}
                  onChange={(e) => setM9X(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-300 font-medium block mb-1">Y Values (Dependent)</label>
                <input
                  type="text"
                  value={m9Y}
                  onChange={(e) => setM9Y(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Dynamic Live Calculation & Curves (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {calculationContent}
        </div>
      </div>
    </div>
  );
};
