import React, { useState } from 'react';
import {
  Calculator,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  BarChart3,
  BookOpen,
  HelpCircle,
  Copy,
  Check,
} from 'lucide-react';
import { solveOneWayANOVA } from '../utils/hypothesisSolvers';
import { AnovaGroupBarChart } from './ChartVisualizer';

export const AnovaCalculatorView: React.FC = () => {
  // Input scores for the 3 groups
  const [groupA, setGroupA] = useState<string>('50, 52, 48, 50, 50');
  const [groupB, setGroupB] = useState<string>('60, 62, 58, 60, 60');
  const [groupC, setGroupC] = useState<string>('70, 72, 68, 70, 70');
  const [alpha, setAlpha] = useState<number>(0.05);
  const [copied, setCopied] = useState<boolean>(false);

  const parseNumbers = (str: string): number[] => {
    return str
      .split(/[\s,]+/)
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));
  };

  const parsedA = parseNumbers(groupA);
  const parsedB = parseNumbers(groupB);
  const parsedC = parseNumbers(groupC);

  const isValid = parsedA.length >= 2 && parsedB.length >= 2 && parsedC.length >= 2;

  let anovaResult: ReturnType<typeof solveOneWayANOVA> | null = null;
  if (isValid) {
    try {
      anovaResult = solveOneWayANOVA(
        [parsedA, parsedB, parsedC],
        ['1 Hour Study', '2 Hours Study', '3 Hours Study'],
        alpha
      );
    } catch {
      anovaResult = null;
    }
  }

  // Calculate means
  const meanA = parsedA.length ? parsedA.reduce((a, b) => a + b, 0) / parsedA.length : 0;
  const meanB = parsedB.length ? parsedB.reduce((a, b) => a + b, 0) / parsedB.length : 0;
  const meanC = parsedC.length ? parsedC.reduce((a, b) => a + b, 0) / parsedC.length : 0;
  const grandTotal =
    parsedA.reduce((a, b) => a + b, 0) +
    parsedB.reduce((a, b) => a + b, 0) +
    parsedC.reduce((a, b) => a + b, 0);
  const totalN = parsedA.length + parsedB.length + parsedC.length;
  const grandMean = totalN > 0 ? grandTotal / totalN : 0;

  const resetToDefault = () => {
    setGroupA('50, 52, 48, 50, 50');
    setGroupB('60, 62, 58, 60, 60');
    setGroupC('70, 72, 68, 70, 70');
    setAlpha(0.05);
  };

  const setEqualMeans = () => {
    setGroupA('60, 58, 62, 60, 60');
    setGroupB('60, 61, 59, 60, 60');
    setGroupC('60, 59, 61, 60, 60');
    setAlpha(0.05);
  };

  const clearInputs = () => {
    setGroupA('');
    setGroupB('');
    setGroupC('');
  };

  const decisionText = anovaResult
    ? anovaResult.isRejected
      ? 'Reject H₀'
      : 'Fail to Reject H₀'
    : '';

  const conclusionText = anovaResult
    ? anovaResult.isRejected
      ? 'There is a statistically significant difference between the average scores of the three study-hour groups.'
      : 'There is no statistically significant difference between the average scores of the three study-hour groups.'
    : '';

  const copyResults = () => {
    if (!anovaResult) return;
    const text = `ANOVA RESULT:
Grand Mean: ${grandMean.toFixed(2)}
Group Means: 1 hr = ${meanA.toFixed(2)}, 2 hrs = ${meanB.toFixed(2)}, 3 hrs = ${meanC.toFixed(2)}
Between Groups: SS = ${anovaResult.anovaTable[0].ss.toFixed(2)}, df = ${anovaResult.anovaTable[0].df}, MS = ${anovaResult.anovaTable[0].ms.toFixed(2)}
Within Groups: SS = ${anovaResult.anovaTable[1].ss.toFixed(2)}, df = ${anovaResult.anovaTable[1].df}, MS = ${anovaResult.anovaTable[1].ms.toFixed(2)}
F-value: ${anovaResult.fCalc.toFixed(2)} (Critical F = ${anovaResult.fCrit.toFixed(2)})
Decision: ${decisionText}
Conclusion: ${conclusionText}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 text-slate-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-950/70 via-slate-900 to-indigo-950/60 border border-sky-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>One-Way ANOVA Calculator & Visualizer</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              One-Way ANOVA: Study Hours vs Test Scores
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Research Question: <em>"Does the number of study hours significantly affect students' test scores?"</em>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyResults}
              disabled={!anovaResult}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700 disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Copied Result!' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={resetToDefault}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors shadow-md shadow-sky-600/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Dataset</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Data Entry Inputs (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Enter Group Test Scores</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Type or paste any numbers below. Everything recalculates live!
            </p>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              <button
                type="button"
                onClick={resetToDefault}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-sky-950 border border-sky-600/40 text-sky-300 hover:bg-sky-900 transition-colors font-semibold"
              >
                15-Student Study Hours
              </button>
              <button
                type="button"
                onClick={setEqualMeans}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors font-medium border border-slate-700"
              >
                Equal Means (H₀ True)
              </button>
              <button
                type="button"
                onClick={clearInputs}
                className="text-[11px] px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-300 transition-colors font-mono"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Group A */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-200">Group A — 1 Hour Study</label>
              <span className="font-mono text-emerald-400 font-bold">Mean = {meanA.toFixed(1)}</span>
            </div>
            <input
              type="text"
              value={groupA}
              onChange={(e) => setGroupA(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none"
              placeholder="e.g. 50, 52, 48, 50, 50"
            />
            <div className="text-[10px] text-slate-500 font-mono">
              n₁ = {parsedA.length} students · Total T₁ = {parsedA.reduce((a, b) => a + b, 0)}
            </div>
          </div>

          {/* Group B */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-200">Group B — 2 Hours Study</label>
              <span className="font-mono text-indigo-400 font-bold">Mean = {meanB.toFixed(1)}</span>
            </div>
            <input
              type="text"
              value={groupB}
              onChange={(e) => setGroupB(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none"
              placeholder="e.g. 60, 62, 58, 60, 60"
            />
            <div className="text-[10px] text-slate-500 font-mono">
              n₂ = {parsedB.length} students · Total T₂ = {parsedB.reduce((a, b) => a + b, 0)}
            </div>
          </div>

          {/* Group C */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-200">Group C — 3 Hours Study</label>
              <span className="font-mono text-sky-400 font-bold">Mean = {meanC.toFixed(1)}</span>
            </div>
            <input
              type="text"
              value={groupC}
              onChange={(e) => setGroupC(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none"
              placeholder="e.g. 70, 72, 68, 70, 70"
            />
            <div className="text-[10px] text-slate-500 font-mono">
              n₃ = {parsedC.length} students · Total T₃ = {parsedC.reduce((a, b) => a + b, 0)}
            </div>
          </div>

          {/* Significance level alpha */}
          <div className="pt-2 border-t border-slate-800">
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Significance Level (α)
            </label>
            <select
              value={alpha}
              onChange={(e) => setAlpha(parseFloat(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-sky-500"
            >
              <option value={0.01}>α = 0.01 (99% Confidence)</option>
              <option value={0.05}>α = 0.05 (95% Confidence - Recommended)</option>
              <option value={0.10}>α = 0.10 (90% Confidence)</option>
            </select>
          </div>

          {/* Quick Summary Pill Box */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="text-slate-400 uppercase font-semibold text-[10px]">Data Overview</div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Students (N):</span>
              <span className="font-mono font-bold text-white">{totalN} students</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Grand Total (G):</span>
              <span className="font-mono font-bold text-white">{grandTotal} marks</span>
            </div>
            <div className="flex justify-between border-t border-slate-900 pt-1.5">
              <span className="text-slate-400">Grand Mean (X̄):</span>
              <span className="font-mono font-bold text-amber-300">{grandMean.toFixed(2)} marks</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Results, ANOVA Table & Bar Chart (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {!isValid ? (
            <div className="bg-slate-900 border border-rose-500/30 p-8 rounded-2xl text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
              <h3 className="font-bold text-white text-base">Please enter at least 2 numbers in each group</h3>
              <p className="text-xs text-slate-400">
                Separate numbers with commas (e.g. 50, 52, 48, 50, 50).
              </p>
            </div>
          ) : anovaResult ? (
            <>
              {/* Group Means Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">1 Hour Mean</div>
                  <div className="text-2xl font-mono font-extrabold text-emerald-400 mt-0.5">
                    {meanA.toFixed(1)}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">X̄₁</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">2 Hours Mean</div>
                  <div className="text-2xl font-mono font-extrabold text-indigo-400 mt-0.5">
                    {meanB.toFixed(1)}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">X̄₂</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">3 Hours Mean</div>
                  <div className="text-2xl font-mono font-extrabold text-sky-400 mt-0.5">
                    {meanC.toFixed(1)}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">X̄₃</div>
                </div>

                <div className="bg-slate-900 border border-amber-500/30 p-4 rounded-xl text-center bg-amber-950/20">
                  <div className="text-[10px] text-amber-300 uppercase font-semibold">Grand Mean</div>
                  <div className="text-2xl font-mono font-extrabold text-amber-400 mt-0.5">
                    {grandMean.toFixed(1)}
                  </div>
                  <div className="text-[10px] text-amber-500 font-mono">X̄</div>
                </div>
              </div>

              {/* Part 3: Simple Bar Chart */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-sky-400" />
                    <h3 className="font-bold text-white text-sm">
                      Average Test Score by Study Duration (Part 3 Graph)
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    Means: {meanA.toFixed(0)} | {meanB.toFixed(0)} | {meanC.toFixed(0)}
                  </span>
                </div>

                <div className="pt-2 flex justify-center">
                  <AnovaGroupBarChart
                    groups={[parsedA, parsedB, parsedC]}
                    groupLabels={['1 Hour Study', '2 Hours Study', '3 Hours Study']}
                    width={560}
                    height={240}
                  />
                </div>

                <p className="text-xs text-slate-400 italic text-center pt-1 border-t border-slate-800/80">
                  "The graph clearly shows average test scores increasing from 50 to 60 to 70 as study hours increase. Next, we use ANOVA to confirm whether this upward trend is statistically significant."
                </p>
              </div>

              {/* Official ANOVA Result Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                      Official Output
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">ANOVA Summary Table</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase">Calculated F-Value</div>
                    <div className="text-xl font-mono font-black text-emerald-400">
                      F = {anovaResult.fCalc.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-3">Source of Variation</th>
                        <th className="py-2.5 px-3">Sum of Squares (SS)</th>
                        <th className="py-2.5 px-3">df</th>
                        <th className="py-2.5 px-3">Mean Square (MS)</th>
                        <th className="py-2.5 px-3">F-Value</th>
                        <th className="py-2.5 px-3">Critical F (α={alpha})</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                      <tr className="hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-sans font-semibold text-sky-300">
                          Between Groups (Study Hours)
                        </td>
                        <td className="py-2.5 px-3 font-bold text-white">
                          {anovaResult.anovaTable[0].ss.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-3">{anovaResult.anovaTable[0].df}</td>
                        <td className="py-2.5 px-3 text-sky-300 font-bold">
                          {anovaResult.anovaTable[0].ms.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-3 font-black text-emerald-400 text-sm">
                          {anovaResult.fCalc.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-3 text-slate-400">
                          {anovaResult.fCrit.toFixed(2)}
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-sans font-semibold text-slate-400">
                          Within Groups (Error)
                        </td>
                        <td className="py-2.5 px-3">{anovaResult.anovaTable[1].ss.toFixed(2)}</td>
                        <td className="py-2.5 px-3">{anovaResult.anovaTable[1].df}</td>
                        <td className="py-2.5 px-3">{anovaResult.anovaTable[1].ms.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-slate-600">-</td>
                        <td className="py-2.5 px-3 text-slate-600">-</td>
                      </tr>
                      <tr className="bg-slate-950/60 font-bold">
                        <td className="py-2.5 px-3 font-sans text-slate-300">Total Variation</td>
                        <td className="py-2.5 px-3 text-white">
                          {anovaResult.anovaTable[2].ss.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-3">{anovaResult.anovaTable[2].df}</td>
                        <td className="py-2.5 px-3 text-slate-500">-</td>
                        <td className="py-2.5 px-3 text-slate-600">-</td>
                        <td className="py-2.5 px-3 text-slate-600">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Decision Box */}
                <div
                  className={`p-4 rounded-xl border flex items-start gap-3 ${
                    anovaResult.isRejected
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-sm text-white">
                      Decision: {decisionText}
                    </div>
                    <p className="leading-relaxed">{conclusionText}</p>
                    <div className="text-[11px] font-mono text-emerald-300 pt-1">
                      F_calc ({anovaResult.fCalc.toFixed(2)}) {anovaResult.isRejected ? '>' : '≤'} F_crit ({anovaResult.fCrit.toFixed(2)}) · p-value {anovaResult.pValue < 0.0001 ? '< 0.0001' : `= ${anovaResult.pValue.toFixed(4)}`}
                    </div>
                  </div>
                </div>

                {/* Plain-English Meaning of Every Metric in this ANOVA Table */}
                <div className="bg-slate-950 p-4 rounded-xl border border-sky-500/30 space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-sky-400 font-bold uppercase text-[10px] tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Plain-English Meaning of Every Metric in This Table</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-sky-300 block font-semibold">
                        SSB — Sum of Squares Between Groups ({anovaResult.anovaTable[0].ss.toFixed(1)})
                      </strong>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        <strong>Full Form:</strong> <em>Sum of Squares Between Groups</em> (also known as Treatment Sum of Squares).
                        <br />
                        <strong>Meaning:</strong> The real effect of studying more hours! Measures how far the study duration group averages jump away from the grand mean.
                      </p>
                    </div>
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-slate-200 block font-semibold">
                        SSW — Sum of Squares Within Groups ({anovaResult.anovaTable[1].ss.toFixed(1)})
                      </strong>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        <strong>Full Form:</strong> <em>Sum of Squares Within Groups</em> (also known as Error Sum of Squares).
                        <br />
                        <strong>Meaning:</strong> Background noise / random luck. Natural individual score variations between students in the exact same study group.
                      </p>
                    </div>
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-emerald-400 block font-semibold">Fisher F-Value (F = {anovaResult.fCalc.toFixed(2)})</strong>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        <strong>Meaning:</strong> Ratio of study effect to random noise (MSB / MSW). Here, studying more hours is <strong>{anovaResult.fCalc.toFixed(0)} times stronger</strong> than random individual noise!
                      </p>
                    </div>
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-amber-300 block font-semibold">Critical F (F_crit = {anovaResult.fCrit.toFixed(2)})</strong>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        <strong>Meaning:</strong> The hurdle bar. Since our calculated F ({anovaResult.fCalc.toFixed(2)}) clears this bar, we are 95% confident the result is NOT luck!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Practical Math Working */}
              <div className="bg-[#121915] border border-emerald-800/40 rounded-2xl p-5 space-y-3 font-mono text-xs text-emerald-200">
                <div className="text-xs uppercase font-bold text-emerald-400 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Step-by-Step Calculation Breakdown for Exam</span>
                </div>
                <div className="space-y-1.5 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-emerald-900/40">
                  <div>1. Grand Total G = T₁ + T₂ + T₃ = {grandTotal} marks</div>
                  <div>2. Correction Factor CF = G² / N = {grandTotal}² / {totalN} = {((grandTotal * grandTotal) / totalN).toFixed(2)}</div>
                  <div>3. Between-Groups SSB = Σ(Tᵢ²/nᵢ) - CF = {anovaResult.anovaTable[0].ss.toFixed(2)} (df = {anovaResult.anovaTable[0].df})</div>
                  <div>4. Within-Groups SSW = ΣΣ(x - x̄)² = {anovaResult.anovaTable[1].ss.toFixed(2)} (df = {anovaResult.anovaTable[1].df})</div>
                  <div>5. Mean Square Between: MSB = SSB / df_B = {anovaResult.anovaTable[0].ms.toFixed(2)}</div>
                  <div>6. Mean Square Within: MSW = SSW / df_W = {anovaResult.anovaTable[1].ms.toFixed(2)}</div>
                  <div className="font-bold text-white text-sm pt-1">
                    7. Fisher F-Ratio = MSB / MSW = {anovaResult.fCalc.toFixed(2)}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
