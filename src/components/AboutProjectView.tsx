import React from 'react';
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface AboutProjectViewProps {
  onNavigate?: (tab: 'home' | 'anova' | 'proportion' | 'dataset') => void;
}

export const AboutProjectView: React.FC<AboutProjectViewProps> = ({ onNavigate }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 text-slate-100">
      {/* Hero Card */}
      <div className="bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/60 border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Group 12 · Mathematics Project</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          STATS EASY
        </h1>
        <p className="text-base sm:text-lg text-purple-200 font-medium">
          An Interactive Application for Hypothesis Testing and ANOVA
        </p>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-300 space-y-1 leading-relaxed">
          <strong className="text-white block font-semibold">Project Objective:</strong>
          <p>
            To develop an interactive statistical web application that applies hypothesis testing for proportions and one-way ANOVA to sample datasets, presenting the results through automatic calculations, step-by-step blackboard arithmetic, graphs, and statistical conclusions.
          </p>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-400" />
          <span>Project Team (Group 12)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Member 1: Manoj */}
          <div className="bg-slate-950 p-5 rounded-xl border border-indigo-500/30 space-y-2">
            <div className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Member 1</div>
            <div className="text-xl font-bold text-white">Pinjari Manoj</div>
            <div className="font-mono text-xs text-indigo-300">Roll No: 252U1R1193</div>
            <div className="text-xs text-slate-400 pt-1 border-t border-slate-900">
              Role: Proportion Testing Module, Dataset Modeling, and Z-Test Formulation
            </div>
          </div>

          {/* Member 2: Lokesh */}
          <div className="bg-slate-950 p-5 rounded-xl border border-sky-500/30 space-y-2">
            <div className="text-xs uppercase font-bold text-sky-400 tracking-wider">Member 2</div>
            <div className="text-xl font-bold text-white">Orsu Lokesh</div>
            <div className="font-mono text-xs text-sky-300">Roll No: 252U1R1170</div>
            <div className="text-xs text-slate-400 pt-1 border-t border-slate-900">
              Role: One-Way ANOVA Engine, Sum of Squares Partitioning, and Graphical Output
            </div>
          </div>
        </div>
      </div>

      {/* Syllabus Alignment Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>How the App Fulfills Every Teacher & Project Requirement</span>
        </h2>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Evaluation Requirement</th>
                <th className="py-3 px-4">How It is Demonstrated in StatEasy</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="py-2.5 px-4 font-bold text-white">1. Theory & Definitions</td>
                <td className="py-2.5 px-4">Clear explanation of H₀, H₁, α, and the F-ratio principle.</td>
                <td className="py-2.5 px-4 text-center">
                  <span className="text-emerald-400 font-bold">✓ Included</span>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-white">2. Mathematical Formulas</td>
                <td className="py-2.5 px-4">Display of Z = (p̂ - P₀)/SE and F = MSB/MSW with symbol definitions.</td>
                <td className="py-2.5 px-4 text-center">
                  <span className="text-emerald-400 font-bold">✓ Included</span>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-white">3. Sample Dataset</td>
                <td className="py-2.5 px-4">15 students across 3 study durations (1 hr, 2 hrs, 3 hrs) with clean means 50, 60, 70.</td>
                <td className="py-2.5 px-4 text-center">
                  <span className="text-emerald-400 font-bold">✓ Included</span>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-white">4. Numerical Calculations</td>
                <td className="py-2.5 px-4">Automatic live computation of $SSB=1000, SSW=24, F=250.00$ as you type.</td>
                <td className="py-2.5 px-4 text-center">
                  <span className="text-emerald-400 font-bold">✓ Included</span>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-white">5. Step-by-Step Working</td>
                <td className="py-2.5 px-4">Blackboard scratchpad format with line-by-line substitutions.</td>
                <td className="py-2.5 px-4 text-center">
                  <span className="text-emerald-400 font-bold">✓ Included</span>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-white">6. Graphical Output</td>
                <td className="py-2.5 px-4">Average test score bar chart (50, 60, 70) and normal distribution curves.</td>
                <td className="py-2.5 px-4 text-center">
                  <span className="text-emerald-400 font-bold">✓ Included</span>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-white">7. Statistical Conclusion</td>
                <td className="py-2.5 px-4">Automated decision: Reject $H_0$ with real-world interpretation.</td>
                <td className="py-2.5 px-4 text-center">
                  <span className="text-emerald-400 font-bold">✓ Included</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Spoken Presentation Script for Exam Day */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          <span>Presentation Script & Viva Walkthrough</span>
        </h2>

        {/* 2-Minute Speech */}
        <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-indigo-500/30 text-sm text-slate-200 leading-relaxed space-y-3">
          <div className="text-xs font-bold font-mono uppercase text-indigo-400">
            Part 1 · The 2-Minute Spoken Speech (How to Start)
          </div>
          <p>
            "Respected professors, we are Group 12: <strong>Pinjari Manoj</strong> (Roll 252U1R1193) and <strong>Orsu Lokesh</strong> (Roll 252U1R1170). For our Mathematics LG 12 topic on <em>Testing of Hypothesis – II and ANOVA</em>, we developed an interactive web application called <strong>STATS EASY</strong>."
          </p>
          <p>
            "Instead of only doing calculations on paper, our app allows anyone to input experimental data and automatically calculates test statistics, draws comparison graphs, and verifies statistical decisions."
          </p>
          <p>
            "Our research question is: <strong>Does the number of study hours significantly affect student test marks?</strong> We tested 15 students divided equally across 3 study durations: 1 hour, 2 hours, and 3 hours."
          </p>
        </div>

        {/* What to Click Live on Screen */}
        <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-sky-500/30 text-sm text-slate-200 leading-relaxed space-y-3">
          <div className="text-xs font-bold font-mono uppercase text-sky-400">
            Part 2 · What to Click & Demonstrate Live on Screen
          </div>
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-300">
            <li>
              <strong>Click "Dataset" tab:</strong> Show the 15-student records table. Point out that the group means are clean round numbers: <strong>50, 60, and 70</strong>.
            </li>
            <li>
              <strong>Click "ANOVA" tab:</strong> Show the live input fields. Explain: <em>"Notice how our app automatically computes the Grand Mean (60.00), partitions variation into Between Groups (SSB = 1000) and Within Groups (SSW = 24), and derives the Fisher F-ratio."</em>
            </li>
            <li>
              <strong>Show the Bar Chart:</strong> Point to the rising bars and say: <em>"The chart visually suggests that scores increase with study hours. But ANOVA proves mathematically that this is NOT random chance."</em>
            </li>
            <li>
              <strong>Show the Decision Box:</strong> <em>"Our calculated F is 250.00, which is vastly greater than the critical F cutoff of 3.89. Therefore, we decisively Reject the Null Hypothesis."</em>
            </li>
            <li>
              <strong>Click "Proportion Test" tab:</strong> Show the Z-test module. Explain: <em>"Our syllabus also includes testing population proportions. Here, out of 20 students, 16 passed (80%). We test if this differs from the 70% benchmark claim. The calculated Z is 0.98, which falls inside [-1.96, +1.96], so we fail to reject H₀."</em>
            </li>
          </ol>
        </div>

        {/* Top 4 Examiner Viva Questions */}
        <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-amber-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3">
          <div className="text-xs font-bold font-mono uppercase text-amber-400">
            Part 3 · Top 4 Viva Questions & Exact Answers
          </div>
          <div className="space-y-3">
            <div className="border-l-2 border-amber-400 pl-3 space-y-1">
              <strong className="text-white block">Q1: Why did you use ANOVA instead of multiple t-tests?</strong>
              <p className="text-slate-300">
                <em>Answer:</em> "If we compare 3 groups using paired t-tests (A vs B, B vs C, A vs C), the Type I error (false positive rate) accumulates. One-Way ANOVA tests all three groups simultaneously in a single test at the exact 5% significance level."
              </p>
            </div>
            <div className="border-l-2 border-sky-400 pl-3 space-y-1">
              <strong className="text-white block">Q2: What is the Null Hypothesis ($H_0$) in your ANOVA?</strong>
              <p className="text-slate-300">
                <em>Answer:</em> "H₀ states that study duration has no effect on test scores ($\mu_1 = \mu_2 = \mu_3 = 60$). The Alternative Hypothesis $H_1$ states that at least one group mean is significantly different."
              </p>
            </div>
            <div className="border-l-2 border-emerald-400 pl-3 space-y-1">
              <strong className="text-white block">Q3: What do SSB and SSW stand for and represent?</strong>
              <p className="text-slate-300">
                <em>Answer:</em> "<strong>SSB</strong> stands for <strong>Sum of Squares Between Groups</strong> (Treatment Sum of Squares = 1000); it measures differences caused by the study duration treatment. <strong>SSW</strong> stands for <strong>Sum of Squares Within Groups</strong> (Error Sum of Squares = 24); it measures random error among students within the same group. The F-ratio is MSB / MSW = 500 / 2 = 250.00."
              </p>
            </div>
            <div className="border-l-2 border-purple-400 pl-3 space-y-1">
              <strong className="text-white block">Q4: Why did you reject $H_0$?</strong>
              <p className="text-slate-300">
                <em>Answer:</em> "Because our calculated F-value (250.00) is far larger than the critical table value (3.89 at 5% with degrees of freedom 2 and 12). This means the probability of this occurring by pure chance is less than 0.01%."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
