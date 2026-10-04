import React, { useState } from 'react';
import {
  Percent,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { DistributionCurve } from './DistributionCurve';
import { normalCDF, roundTo } from '../utils/statCalculations';

export const ProportionTestView: React.FC = () => {
  // User inputs
  const [totalStudents, setTotalStudents] = useState<number>(20);
  const [studentsPassed, setStudentsPassed] = useState<number>(16);
  const [claimedProp, setClaimedProp] = useState<number>(0.70);
  const [alpha, setAlpha] = useState<number>(0.05);
  const [copied, setCopied] = useState<boolean>(false);

  // Calculations
  const n = Math.max(totalStudents, 1);
  const x = Math.min(Math.max(studentsPassed, 0), n);
  const P0 = Math.min(Math.max(claimedProp, 0.01), 0.99);

  const sampleProp = x / n;
  const q0 = 1 - P0;
  const variance = (P0 * q0) / n;
  const se = Math.sqrt(variance);
  const zValue = se > 0 ? (sampleProp - P0) / se : 0;

  // Two-tailed critical Z at alpha = 0.05 is 1.96
  const zCrit = alpha === 0.01 ? 2.576 : alpha === 0.10 ? 1.645 : 1.96;
  const isRejected = Math.abs(zValue) > zCrit;

  // p-value
  const pValue = 2 * (1 - normalCDF(Math.abs(zValue)));

  const handlePreset20 = () => {
    setTotalStudents(20);
    setStudentsPassed(16);
    setClaimedProp(0.70);
    setAlpha(0.05);
  };

  const handlePreset100 = () => {
    setTotalStudents(100);
    setStudentsPassed(60);
    setClaimedProp(0.50);
    setAlpha(0.05);
  };

  const copyResult = () => {
    const text = `PROPORTION TEST RESULT:
Sample Size (n): ${n}
Students Passed (x): ${x}
Sample Proportion (p̂): ${(sampleProp * 100).toFixed(1)}% (${sampleProp.toFixed(3)})
Claimed Proportion (P₀): ${(P0 * 100).toFixed(1)}%
Standard Error (SE): ${se.toFixed(4)}
Z-value: ${zValue.toFixed(2)}
Critical Z: ±${zCrit.toFixed(2)}
Decision: ${isRejected ? 'Reject H₀' : 'Fail to Reject H₀'} (p = ${pValue.toFixed(4)})
Conclusion: ${
      isRejected
        ? `The sample pass rate (${(sampleProp * 100).toFixed(1)}%) is statistically significantly different from the claimed ${(P0 * 100).toFixed(1)}% baseline.`
        : `There is insufficient evidence to reject the claimed ${(P0 * 100).toFixed(1)}% baseline (Z = ${zValue.toFixed(2)}).`
    }`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 text-slate-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-sky-950/60 border border-indigo-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Percent className="w-3.5 h-3.5" />
              <span>Part 4 of Syllabus · Z-Test for Population Proportion</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Proportion Test Calculator
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Test whether a student sample pass rate significantly differs from a claimed historical baseline.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyResult}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Copied Result!' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={handlePreset20}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-md shadow-indigo-600/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset 20-Student Example</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Enter Sample Data</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Type your parameters below or pick a preset button.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={handlePreset20}
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-indigo-500/50 text-slate-300 font-semibold text-center"
            >
              20 Students (16 Passed)
            </button>
            <button
              onClick={handlePreset100}
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-indigo-500/50 text-slate-300 font-semibold text-center"
            >
              100 Students (60 Passed)
            </button>
          </div>

          {/* Total Students (n) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 block">
              Total Students Sampled (n)
            </label>
            <input
              type="number"
              min={5}
              max={1000}
              value={totalStudents}
              onChange={(e) => setTotalStudents(parseInt(e.target.value) || 1)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none"
            />
          </div>

          {/* Students Passed (x) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 block">
              Students Passed (x)
            </label>
            <input
              type="number"
              min={0}
              max={totalStudents}
              value={studentsPassed}
              onChange={(e) => setStudentsPassed(parseInt(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none"
            />
          </div>

          {/* Claimed Baseline Proportion (P0) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200">
                Claimed Baseline Proportion (P₀)
              </label>
              <span className="font-mono text-indigo-400 font-bold text-xs">
                {(P0 * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="number"
              step={0.05}
              min={0.05}
              max={0.95}
              value={claimedProp}
              onChange={(e) => setClaimedProp(parseFloat(e.target.value) || 0.50)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none"
            />
            {/* Quick Baseline Buttons */}
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-500 font-mono">Try:</span>
              <button
                type="button"
                onClick={() => setClaimedProp(0.50)}
                className={`text-[10px] px-2 py-0.5 rounded font-mono transition-colors ${
                  P0 === 0.50 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                50% (Low)
              </button>
              <button
                type="button"
                onClick={() => setClaimedProp(0.70)}
                className={`text-[10px] px-2 py-0.5 rounded font-mono transition-colors ${
                  P0 === 0.70 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                70% (Claim)
              </button>
              <button
                type="button"
                onClick={() => setClaimedProp(0.80)}
                className={`text-[10px] px-2 py-0.5 rounded font-mono transition-colors ${
                  P0 === 0.80 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                80% (= p̂)
              </button>
              <button
                type="button"
                onClick={() => setClaimedProp(0.95)}
                className={`text-[10px] px-2 py-0.5 rounded font-mono transition-colors ${
                  P0 === 0.95 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                95% (High)
              </button>
            </div>
            <div className="text-[10px] text-slate-500 leading-tight pt-0.5">
              P₀ is the claimed historical pass rate we are testing against.
            </div>
          </div>

          {/* Significance level alpha */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 block">
              Significance Level (α)
            </label>
            <select
              value={alpha}
              onChange={(e) => setAlpha(parseFloat(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-indigo-500"
            >
              <option value={0.01}>α = 0.01 (99% Confidence)</option>
              <option value={0.05}>α = 0.05 (95% Confidence - Recommended)</option>
              <option value={0.10}>α = 0.10 (90% Confidence)</option>
            </select>
          </div>

          {/* Computed Sample Proportion Pill */}
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="text-slate-400 uppercase text-[10px] font-semibold">Sample Proportion (p̂)</div>
            <div className="text-xl font-mono font-bold text-indigo-300">
              p̂ = {x} / {n} = {sampleProp.toFixed(3)} ({(sampleProp * 100).toFixed(1)}%)
            </div>
          </div>
        </div>

        {/* Right Column: Live Output & Step-by-Step Working (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Result Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Sample Proportion</div>
              <div className="text-2xl font-mono font-extrabold text-indigo-400 mt-0.5">
                {(sampleProp * 100).toFixed(1)}%
              </div>
              <div className="text-[10px] text-slate-500 font-mono">p̂ = {sampleProp.toFixed(3)}</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Standard Error (SE)</div>
              <div className="text-2xl font-mono font-extrabold text-sky-400 mt-0.5">
                {se.toFixed(4)}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">√[P₀(1-P₀)/n]</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Calculated Z</div>
              <div className="text-2xl font-mono font-extrabold text-white mt-0.5">
                {zValue.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Z_calc</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Critical Cutoff</div>
              <div className="text-2xl font-mono font-extrabold text-amber-400 mt-0.5">
                ±{zCrit.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">α = {alpha}</div>
            </div>
          </div>

          {/* Decision Box */}
          <div
            className={`p-5 rounded-2xl border flex items-start gap-4 ${
              isRejected
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}
          >
            {isRejected ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <HelpCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="font-bold text-base text-white">
                Decision: {isRejected ? 'REJECT NULL HYPOTHESIS (H₀)' : 'FAIL TO REJECT NULL HYPOTHESIS (H₀)'}
              </div>
              <p className="leading-relaxed">
                {isRejected
                  ? `Because |Z_calc| = ${Math.abs(zValue).toFixed(2)} > ${zCrit.toFixed(2)}, we reject H₀ at α = ${alpha}. The observed pass rate of ${(sampleProp * 100).toFixed(1)}% is statistically significantly different from the claimed ${(P0 * 100).toFixed(1)}% baseline.`
                  : `Because |Z_calc| = ${Math.abs(zValue).toFixed(2)} ≤ ${zCrit.toFixed(2)}, we fail to reject H₀. There is no statistically significant evidence to dispute the claimed ${(P0 * 100).toFixed(1)}% baseline at α = ${alpha}.`}
              </p>
              <div className="text-xs font-mono text-slate-400 pt-1">
                Two-tailed p-value = {pValue.toFixed(4)} {isRejected ? '<' : '≥'} α ({alpha})
              </div>
            </div>
          </div>

          {/* Distribution Curve Visualizer */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">
                  Standard Normal Bell Curve & Critical Regions
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  See instantly where your sample Z statistic lands relative to the critical boundaries.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-indigo-300">
                  Cutoff = ±{zCrit.toFixed(2)}
                </span>
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                  isRejected ? 'bg-rose-950/80 border-rose-500/50 text-rose-300' : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                }`}>
                  Z_calc = {zValue.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Instant-Read Status Card */}
            <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${
              isRejected
                ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
            }`}>
              <span className="text-lg shrink-0">{isRejected ? '🔴' : '🟢'}</span>
              <div className="leading-relaxed">
                <strong className="text-white block font-bold">
                  {isRejected ? 'REJECTION ZONE: Statistically Significant Difference' : 'SAFE ACCEPTANCE ZONE: Normal Random Chance'}
                </strong>
                <span>
                  {isRejected
                    ? `Your calculated Z = ${zValue.toFixed(2)} has crossed outside the safe range [-${zCrit.toFixed(2)}, +${zCrit.toFixed(2)}]. You REJECT H₀!`
                    : `Your calculated Z = ${zValue.toFixed(2)} lands safely between -${zCrit.toFixed(2)} and +${zCrit.toFixed(2)}. You FAIL TO REJECT H₀!`}
                </span>
              </div>
            </div>

            <div className="pt-1 flex justify-center">
              <DistributionCurve
                data={{
                  distribution: 'normal',
                  criticalValues: [-zCrit, zCrit],
                  calculatedStatistic: zValue,
                  alpha: alpha,
                  tailed: 'two_tailed',
                  isRejected: isRejected,
                  decisionText: isRejected ? `Reject H₀ (Z = ${zValue.toFixed(2)})` : `Fail to Reject (Z = ${zValue.toFixed(2)})`,
                }}
                width={580}
                height={240}
              />
            </div>

            {/* 3-Part Color-Coded Reader Guide */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[11px]">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-rose-500/20 text-rose-300">
                <span className="font-bold block">1. Left Tail (Z &lt; -{zCrit.toFixed(2)})</span>
                <span className="text-slate-400">Rejection: Pass rate was significantly lower than claim.</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-emerald-500/30 text-emerald-300">
                <span className="font-bold block">2. Green Center (-{zCrit.toFixed(2)} to +{zCrit.toFixed(2)})</span>
                <span className="text-slate-400">Safe Zone: Expected normal sampling variation (Keep H₀).</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-rose-500/20 text-rose-300">
                <span className="font-bold block">3. Right Tail (Z &gt; +{zCrit.toFixed(2)})</span>
                <span className="text-slate-400">Rejection: Pass rate was significantly higher than claim.</span>
              </div>
            </div>
          </div>

          {/* Step-by-Step Blackboard Working */}
          <div className="bg-[#121915] border border-emerald-800/40 rounded-2xl p-5 space-y-3 font-mono text-xs text-emerald-200">
            <div className="text-xs uppercase font-bold text-emerald-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Step-by-Step Calculation Working for Exam Sheet</span>
            </div>
            <div className="space-y-2 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-emerald-900/40">
              <div>1. Formulate Hypotheses: H₀ : P = {P0.toFixed(2)}  vs  H₁ : P ≠ {P0.toFixed(2)} (α = {alpha})</div>
              <div>2. Sample Proportion: p̂ = x / n = {x} / {n} = {sampleProp.toFixed(4)}</div>
              <div>3. Standard Error: SE = √[ P₀(1 - P₀) / n ] = √[ ({P0.toFixed(2)} × {q0.toFixed(2)}) / {n} ] = √{variance.toFixed(6)} = {se.toFixed(4)}</div>
              <div>4. Z-Statistic: Z_calc = (p̂ - P₀) / SE = ({sampleProp.toFixed(4)} - {P0.toFixed(2)}) / {se.toFixed(4)} = {zValue.toFixed(2)}</div>
              <div className="font-bold text-white pt-1">
                5. Decision Rule: Since |Z_calc| = {Math.abs(zValue).toFixed(2)} {isRejected ? '&gt;' : '≤'} {zCrit.toFixed(2)} {'==>'} {isRejected ? 'REJECT H₀' : 'FAIL TO REJECT H₀'}.
              </div>
            </div>
          </div>

          {/* Educational Concept Guide: What is Baseline Proportion */}
          <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-5 space-y-3 text-xs text-slate-200">
            <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase text-[11px] tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Viva Concept: What is Baseline Proportion (P₀) & What Happens When You Change It?</span>
            </div>

            <div className="space-y-2 leading-relaxed text-slate-300">
              <p>
                <strong className="text-white">1. What is Baseline Proportion (P₀)?</strong> It is the <em>claimed historical percentage or national standard</em> that we assume to be true under the Null Hypothesis ($H_0: P = P_0$). For example, a college claims: <em>"Historically, 70% of students pass this exam."</em>
              </p>
              <p>
                <strong className="text-white">2. What happens if you change P₀?</strong>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">If P₀ is Low (e.g. 50%)</span>
                  <span className="text-[11px] text-slate-400">
                    Sample pass rate (80%) is much higher than 50%. The numerator (p̂ - P₀) is large (+0.30), making Z = +2.68 &gt; 1.96. We <strong>Reject H₀</strong>: students performed significantly better than 50%!
                  </span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-indigo-500/30 space-y-1">
                  <span className="text-indigo-300 font-bold block">If P₀ is Close (e.g. 70%)</span>
                  <span className="text-[11px] text-slate-400">
                    Difference is small: 0.80 - 0.70 = +0.10. Z = +0.98, inside [-1.96, +1.96]. We <strong>Fail to Reject H₀</strong>: 16 out of 20 passing could just be random lucky sample variation.
                  </span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-rose-400 font-bold block">If P₀ is High (e.g. 95%)</span>
                  <span className="text-[11px] text-slate-400">
                    Sample (80%) is far below 95%. The numerator is negative (0.80 - 0.95 = -0.15), giving Z = -3.08 &lt; -1.96. We <strong>Reject H₀</strong>: students performed significantly worse than 95%!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
