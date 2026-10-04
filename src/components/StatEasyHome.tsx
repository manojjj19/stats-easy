import React from 'react';
import {
  Calculator,
  Percent,
  Table as TableIcon,
  Presentation,
  BookOpen,
  ArrowRight,
  Sparkles,
  GraduationCap,
  TrendingUp,
  Award,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react';
import { StatEasyTab } from './StatEasyHeader';

interface StatEasyHomeProps {
  onNavigate: (tab: StatEasyTab) => void;
}

export const StatEasyHome: React.FC<StatEasyHomeProps> = ({ onNavigate }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8 text-slate-100">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-sky-950/70 border border-indigo-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-4 h-4 text-indigo-300" />
          <span>Mathematics LG 12 · Testing of Hypothesis – II & ANOVA</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          STATS EASY
        </h1>
        <p className="text-lg sm:text-xl font-medium text-indigo-200 mt-2">
          Hypothesis Testing & ANOVA Calculator App
        </p>

        <p className="mt-3 text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          <strong className="text-white">Enter data → Select statistical test → Calculate → Show graph → Explain result</strong>
          <br />
          Developed for university project examination by <span className="text-indigo-300 font-semibold">Pinjari Manoj</span> & <span className="text-sky-300 font-semibold">Orsu Lokesh</span>.
        </p>

        {/* Quick Objective Badge & Meanings Button */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-400">
            <strong className="text-slate-200">Core Research Question:</strong> <em>"Does the number of study hours significantly affect students' test scores?"</em>
          </div>
          <button
            onClick={() => onNavigate('meanings')}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-4 py-2 text-xs font-bold transition-colors shadow-md shadow-emerald-600/20"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>View All Meanings & Glossary</span>
          </button>
        </div>
      </div>

      {/* 5 Main Core App Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Tile 1: Proportion Test */}
        <button
          onClick={() => onNavigate('proportion')}
          className="text-left bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all group shadow-lg flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Percent className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase text-indigo-400">Part 4 of Syllabus</div>
              <h2 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                Proportion Test
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Test a population pass rate claim (e.g. 16 out of 20 passed = 80%). Calculates sample proportion p̂, standard error, Z-statistic, and hypothesis conclusion.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-400">
            <span>Calculate Z-Test & View Bell Curve</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Tile 2: ANOVA Calculator */}
        <button
          onClick={() => onNavigate('anova')}
          className="text-left bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 transition-all group shadow-lg flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase text-sky-400">Part 2 & 3 of Syllabus</div>
              <h2 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                ANOVA Calculator
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Compare 3 study duration groups (1 hr: 50, 2 hrs: 60, 3 hrs: 70). Calculates group means, Grand Mean, SSB, SSW, F-value ($F = 250.00$), and renders the average score bar chart.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-sky-400">
            <span>Calculate ANOVA Table & Graph</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Tile 3: Meanings & Plain-English Glossary */}
        <button
          onClick={() => onNavigate('meanings')}
          className="text-left bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all group shadow-lg flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase text-emerald-400">Viva & Defense Ready</div>
              <h2 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                Meanings & Glossary
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every formula, metric (SSB, SSW, MSB, F, Z, p-value), and hypothesis rule explained in plain English with our project's exact numbers and examiner one-liners!
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-400">
            <span>Explore Statistical Meanings</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Tile 4: Dataset Explorer */}
        <button
          onClick={() => onNavigate('dataset')}
          className="text-left bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all group shadow-lg flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <TableIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase text-amber-400">Part 1 of Project</div>
              <h2 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                Dataset: Study Hours & Scores
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              View the complete 15-student academic performance dataset: 3 groups of 5 students each. Perfect round numbers that make arithmetic effortless during your viva.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-400">
            <span>View 15-Student Dataset Table</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Tile 5: About Project & Team */}
        <button
          onClick={() => onNavigate('about')}
          className="text-left bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-6 transition-all group shadow-lg flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase text-purple-400">Group 12 Information</div>
              <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                About Project & Team
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Project objectives, team details (Pinjari Manoj & Orsu Lokesh), syllabus alignment, calculation methodology, and statistical project defense.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-purple-400">
            <span>Read Project Overview & Viva Notes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* Quick Summary of Live Research Results */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <span>Summary of Project Findings</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-slate-400 uppercase font-semibold text-[10px]">1-Hour Study Group</div>
            <div className="text-xl font-mono font-extrabold text-white">Mean = 50 Marks</div>
            <div className="text-slate-500">Scores: 50, 52, 48, 50, 50</div>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-slate-400 uppercase font-semibold text-[10px]">2-Hours Study Group</div>
            <div className="text-xl font-mono font-extrabold text-indigo-400">Mean = 60 Marks</div>
            <div className="text-slate-500">Scores: 60, 62, 58, 60, 60</div>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-slate-400 uppercase font-semibold text-[10px]">3-Hours Study Group</div>
            <div className="text-xl font-mono font-extrabold text-emerald-400">Mean = 70 Marks</div>
            <div className="text-slate-500">Scores: 70, 72, 68, 70, 70</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-300">Statistical Conclusion:</strong> Because our calculated F-value (F = 250.00) vastly exceeds the critical cutoff (F_crit = 3.89), we reject the null hypothesis H₀. Study duration has a statistically significant positive effect on student examination scores.
          </div>
        </div>
      </div>
    </div>
  );
};
