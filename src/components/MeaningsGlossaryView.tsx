import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  Calculator,
  Percent,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';
import { StatEasyTab } from './StatEasyHeader';

interface MeaningsGlossaryViewProps {
  onNavigate?: (tab: StatEasyTab) => void;
}

interface TermItem {
  id: string;
  symbol: string;
  name: string;
  category: 'anova' | 'proportion' | 'general';
  categoryLabel: string;
  plainMeaning: string;
  inOurProject: string;
  examinerOneLiner: string;
  formula?: string;
}

export const MeaningsGlossaryView: React.FC<MeaningsGlossaryViewProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'anova' | 'proportion' | 'general'>('all');

  const terms: TermItem[] = [
    {
      id: 'h0',
      symbol: 'H₀',
      name: 'Null Hypothesis',
      category: 'general',
      categoryLabel: 'Hypothesis Basics',
      plainMeaning:
        'The "Nothing is happening" baseline belief. It assumes that any difference you see in your sample is just lucky coincidence or pure random chance.',
      inOurProject:
        'ANOVA H₀: Study duration has zero effect on marks (μ₁ = μ₂ = μ₃ = 60).\nProportion H₀: The true student pass rate is exactly the 70% claim (P = 0.70).',
      examinerOneLiner:
        '"H₀ represents the default claim of no effect or no difference, which we attempt to gather evidence against."',
    },
    {
      id: 'h1',
      symbol: 'H₁ (or Hₐ)',
      name: 'Alternative Hypothesis',
      category: 'general',
      categoryLabel: 'Hypothesis Basics',
      plainMeaning:
        'The "Something real is happening" claim. What the researcher actually believes and wants to prove.',
      inOurProject:
        'ANOVA H₁: At least one study hour group has a genuinely different average score.\nProportion H₁: The true pass rate is different from 70% (P ≠ 0.70).',
      examinerOneLiner:
        '"H₁ states that the observed difference is real and statistically significant, not just random fluctuation."',
    },
    {
      id: 'alpha',
      symbol: 'α',
      name: 'Significance Level (Alpha)',
      category: 'general',
      categoryLabel: 'Hypothesis Basics',
      plainMeaning:
        'The tolerance limit for making a mistake (false alarm / Type I error). At α = 0.05 (5%), we only reject H₀ if there is less than a 5% chance the result was lucky accident.',
      inOurProject:
        'We set α = 0.05, giving us 95% statistical confidence in our academic conclusion.',
      examinerOneLiner:
        '"Alpha is the probability of rejecting a true null hypothesis (Type I error rate), conventionally chosen as 0.05."',
    },
    {
      id: 'pvalue',
      symbol: 'p-value',
      name: 'Probability Value',
      category: 'general',
      categoryLabel: 'Hypothesis Basics',
      plainMeaning:
        'The "luck factor". The exact mathematical probability that our results could have happened by pure luck. If p < α (0.05), luck is ruled out and we reject H₀!',
      inOurProject:
        'In our ANOVA, p < 0.0001 (less than 1 in 10,000 chance of being luck!). So we decisively reject H₀.',
      examinerOneLiner:
        '"The p-value is the probability of obtaining test results at least as extreme as the observed results, assuming H₀ is true."',
    },
    {
      id: 'ssb',
      symbol: 'SSB (or SSA)',
      name: 'Sum of Squares Between Groups',
      category: 'anova',
      categoryLabel: 'ANOVA Metric',
      formula: 'SSB = Σ [Tᵢ² / nᵢ] - CF',
      plainMeaning:
        'FULL FORM: Sum of Squares Between Groups (also called Sum of Squares due to Treatment).\n\nWhat it measures: The real treatment effect! Measures how far the study hour group means (50, 60, 70) jump away from the grand average of 60.',
      inOurProject:
        'SSB = 1000.00 marks². This large value indicates a very strong positive impact from studying extra hours.',
      examinerOneLiner:
        '"SSB stands for Sum of Squares Between Groups; it measures the variation between different study groups attributable to the study duration treatment."',
    },
    {
      id: 'ssw',
      symbol: 'SSW (or SSE)',
      name: 'Sum of Squares Within Groups (Error)',
      category: 'anova',
      categoryLabel: 'ANOVA Metric',
      formula: 'SSW = ΣΣ (x_ij - x̄_i)²',
      plainMeaning:
        'FULL FORM: Sum of Squares Within Groups (also called Sum of Squares due to Error).\n\nWhat it measures: Natural background noise / random error. Differences between different individual students who studied the exact same number of hours.',
      inOurProject:
        'SSW = 24.00 marks². This very small value means student ability within each group was consistent, with little random noise.',
      examinerOneLiner:
        '"SSW stands for Sum of Squares Within Groups; it measures the unexplained residual random variation among individual students within the same group."',
    },
    {
      id: 'sst',
      symbol: 'SST',
      name: 'Total Sum of Squares',
      category: 'anova',
      categoryLabel: 'ANOVA Metric',
      formula: 'SST = SSB + SSW = 1000 + 24 = 1024',
      plainMeaning:
        'FULL FORM: Total Sum of Squares.\n\nWhat it measures: The total overall variability of all 15 student marks combined around the Grand Mean (60). It is always the sum of Between Groups (1000) and Within Groups (24).',
      inOurProject:
        'SST = 1000 + 24 = 1024.00 marks².',
      examinerOneLiner:
        '"SST stands for Total Sum of Squares, representing total variation in the entire dataset, partitioned as SST = SSB + SSW."',
    },
    {
      id: 'msb',
      symbol: 'MSB',
      name: 'Mean Square Between Groups',
      category: 'anova',
      categoryLabel: 'ANOVA Metric',
      formula: 'MSB = SSB / (k - 1) = 1000 / 2',
      plainMeaning:
        'The average variation caused by the study-hour treatment, normalized by degrees of freedom.',
      inOurProject:
        'MSB = 1000 / 2 = 500.00. Represents 500 units of study-hour treatment power.',
      examinerOneLiner:
        '"MSB is the variance between treatment means, computed by dividing SSB by its degrees of freedom (k - 1)."',
    },
    {
      id: 'msw',
      symbol: 'MSW',
      name: 'Mean Square Within Groups (Error Variance)',
      category: 'anova',
      categoryLabel: 'ANOVA Metric',
      formula: 'MSW = SSW / (N - k) = 24 / 12',
      plainMeaning:
        'The average background noise per student, normalized by degrees of freedom.',
      inOurProject:
        'MSW = 24 / 12 = 2.00. Represents only 2 units of background experimental noise.',
      examinerOneLiner:
        '"MSW is the pooled sample variance estimate of the population error, computed as SSW / (N - k)."',
    },
    {
      id: 'fcalc',
      symbol: 'F_calc',
      name: 'Fisher F-Ratio (Signal-to-Noise Ratio)',
      category: 'anova',
      categoryLabel: 'ANOVA Metric',
      formula: 'F = MSB / MSW = 500 / 2',
      plainMeaning:
        'The ultimate ANOVA comparison! It divides the treatment signal (500) by the random noise (2). If F is much bigger than 1, the treatment effect completely dominates the noise.',
      inOurProject:
        'F_calc = 500 / 2 = 250.00. The study hour effect is 250 TIMES STRONGER than random noise!',
      examinerOneLiner:
        '"The F-statistic is the ratio of between-group variance to within-group variance (MSB / MSW)."',
    },
    {
      id: 'fcrit',
      symbol: 'F_crit',
      name: 'Critical F Cutoff Value',
      category: 'anova',
      categoryLabel: 'ANOVA Metric',
      formula: 'F_{α, df_B, df_W} = F_{0.05, 2, 12}',
      plainMeaning:
        'The hurdle bar! If your calculated F clears this bar, you win and reject H₀. Otherwise, you fail to reject H₀.',
      inOurProject:
        'F_crit = 3.89. Our calculated F of 250.00 easily clears 3.89, proving a decisive rejection of H₀.',
      examinerOneLiner:
        '"F_crit is the statistical cutoff value from the F-distribution table corresponding to α = 0.05 and degrees of freedom (2, 12)."',
    },
    {
      id: 'phat',
      symbol: 'p̂',
      name: 'Sample Proportion',
      category: 'proportion',
      categoryLabel: 'Proportion Test',
      formula: 'p̂ = x / n = 16 / 20',
      plainMeaning:
        'The actual fraction or percentage of successes found in your real test batch.',
      inOurProject:
        'Out of 20 students, 16 passed, so p̂ = 16 / 20 = 0.80 (80% pass rate).',
      examinerOneLiner:
        '"p̂ is the point estimator of the unknown population proportion P, calculated as successes x divided by sample size n."',
    },
    {
      id: 'p0',
      symbol: 'P₀',
      name: 'Baseline Proportion Claim',
      category: 'proportion',
      categoryLabel: 'Proportion Test',
      plainMeaning:
        'The benchmark standard or historical percentage claimed by the institution before we collected our new sample.',
      inOurProject:
        'P₀ = 0.70 (70% claimed pass rate). We tested whether our 80% sample was significantly different from this 70% benchmark.',
      examinerOneLiner:
        '"P₀ is the hypothesized population proportion specified in the null hypothesis H₀: P = P₀."',
    },
    {
      id: 'se',
      symbol: 'SE',
      name: 'Standard Error of Proportion',
      category: 'proportion',
      categoryLabel: 'Proportion Test',
      formula: 'SE = √[ P₀(1 - P₀) / n ]',
      plainMeaning:
        'The expected margin of normal luck. For small groups of 20 students, pass rates naturally bounce around by about ±10% just by chance.',
      inOurProject:
        'SE = √[ (0.70 × 0.30) / 20 ] = √0.0105 = 0.1025 (10.25%).',
      examinerOneLiner:
        '"Standard error measures the dispersion or sampling variability of the sample proportion across repeated samples of size n."',
    },
    {
      id: 'zscore',
      symbol: 'Z_calc',
      name: 'Calculated Z-Statistic',
      category: 'proportion',
      categoryLabel: 'Proportion Test',
      formula: 'Z = (p̂ - P₀) / SE',
      plainMeaning:
        'How many standard deviations away your sample is from the claim. If Z is between -1.96 and +1.96, it is within the normal luck zone.',
      inOurProject:
        'Z = (0.80 - 0.70) / 0.1025 = +0.98. Since +0.98 is inside [-1.96, +1.96], we Fail to Reject H₀.',
      examinerOneLiner:
        '"The Z-statistic represents how many standard errors the sample proportion deviates from the hypothesized proportion under H₀."',
    },
  ];

  const filteredTerms = terms.filter((item) => {
    const matchesFilter = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase()) ||
      item.plainMeaning.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8 text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-indigo-950/70 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Viva & Presentation Cheat Sheet</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Statistical Meanings & Plain-English Glossary
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
              Every formula, metric, and symbol explained in simple, everyday English so you and your professors understand the real meaning behind every calculation!
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onNavigate && (
              <button
                onClick={() => onNavigate('anova')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors shadow-md shadow-sky-600/20"
              >
                <Calculator className="w-4 h-4" />
                <span>Go to ANOVA</span>
              </button>
            )}
            {onNavigate && (
              <button
                onClick={() => onNavigate('proportion')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-md shadow-indigo-600/20"
              >
                <Percent className="w-4 h-4" />
                <span>Go to Proportion</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              filterCategory === 'all'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Terms ({terms.length})
          </button>
          <button
            onClick={() => setFilterCategory('anova')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              filterCategory === 'anova'
                ? 'bg-sky-600 text-white font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            ANOVA Terms (6)
          </button>
          <button
            onClick={() => setFilterCategory('proportion')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              filterCategory === 'proportion'
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Proportion Terms (4)
          </button>
          <button
            onClick={() => setFilterCategory('general')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              filterCategory === 'general'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Hypothesis Basics (4)
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search symbol, meaning..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.map((t) => (
          <div
            key={t.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div className="space-y-2.5">
              {/* Header with symbol and badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black font-mono text-emerald-400">
                      {t.symbol}
                    </span>
                    <span className="text-sm font-bold text-white">· {t.name}</span>
                  </div>
                  {t.formula && (
                    <div className="text-[11px] font-mono text-slate-400 pt-0.5">
                      Formula: <span className="text-sky-300 font-semibold">{t.formula}</span>
                    </div>
                  )}
                </div>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                    t.category === 'anova'
                      ? 'bg-sky-950 text-sky-300 border border-sky-600/30'
                      : t.category === 'proportion'
                      ? 'bg-indigo-950 text-indigo-300 border border-indigo-600/30'
                      : 'bg-amber-950 text-amber-300 border border-amber-600/30'
                  }`}
                >
                  {t.categoryLabel}
                </span>
              </div>

              {/* Plain English Meaning Box */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>What It Means in Plain English</span>
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">{t.plainMeaning}</p>
              </div>

              {/* In Our Project */}
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-sky-400">
                  In Our Project's Study
                </span>
                <p className="text-xs font-mono text-slate-300 whitespace-pre-line leading-relaxed">
                  {t.inOurProject}
                </p>
              </div>
            </div>

            {/* Examiner One-Liner */}
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 italic">
              <strong className="text-slate-300 not-italic">Say to Examiner: </strong>
              {t.examinerOneLiner}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
