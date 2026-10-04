import React from 'react';
import {
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Users,
  ArrowRight,
  BookOpen,
  Sparkles,
  Play,
} from 'lucide-react';

interface StudentGuideProps {
  onOpenDemo?: () => void;
}

export const StudentGuide: React.FC<StudentGuideProps> = ({ onOpenDemo }) => {
  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8 text-slate-200">
      {/* Header Banner */}
      <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-300" />
              <span>Beginner’s Plain-English Project Guide</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Everything You Need to Know to Explain Your Project
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
              Don’t worry if statistics feels confusing! Here is the complete breakdown in simple, everyday language. You will learn what the datasets mean, how the math works in 15 seconds, and exactly what to say to the examiner.
            </p>
          </div>
          {onOpenDemo && (
            <button
              onClick={onOpenDemo}
              className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-xl shadow-emerald-600/30"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Live Demo</span>
            </button>
          )}
        </div>
      </div>

      {/* Part 1: The Big Picture (What is this project?) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <span>1. The Big Picture: What is "Hypothesis Testing"?</span>
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Imagine someone makes a claim: <strong className="text-white">"Our website has a 50% success rate."</strong> or <strong className="text-white">"Treatment A and Treatment B are equally good."</strong>
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          In statistics, we don't just guess if they are telling the truth. We take a sample of data and test it:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="font-bold text-amber-400 mb-1">Null Hypothesis (H₀)</div>
            <p className="text-slate-400">
              "Nothing special is happening. Everything is equal. The claim is true."
            </p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="font-bold text-emerald-400 mb-1">Alternative Hypothesis (H₁)</div>
            <p className="text-slate-400">
              "There IS a real difference! The claim is wrong or one method is genuinely better."
            </p>
          </div>
        </div>
        <div className="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-xl text-xs sm:text-sm text-indigo-200">
          <strong className="text-indigo-300">The Golden Rule:</strong> If our calculated number (Z, t, χ², or F) is bigger than the cutoff rule, we <strong className="text-white underline">Reject H₀</strong>! That means the difference is real and not just pure luck!
        </div>
      </div>

      {/* Part 2: Who Presents What */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-sky-400" />
          <span>2. Team Roles: Manoj and Lokesh</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-2">
            <div className="font-bold text-indigo-300 text-base">Pinjari Manoj (252U1R1193)</div>
            <div className="text-xs text-slate-400">Presents Proportions and 1-Sample Tests:</div>
            <ul className="text-xs space-y-1 text-slate-300 list-disc list-inside">
              <li><strong>Slide 2</strong>: Single Proportion Z-Test ($Z = 2.00$)</li>
              <li><strong>Slide 3</strong>: Two Proportions Z-Test ($Z = 2.83$)</li>
              <li><strong>Slide 4</strong>: One-Sample Student's t-Test ($t = 2.83$)</li>
            </ul>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-sky-500/30 space-y-2">
            <div className="font-bold text-sky-300 text-base">Orsu Lokesh (252U1R1170)</div>
            <div className="text-xs text-slate-400">Presents Two-Sample Tests, Chi-Square & ANOVA:</div>
            <ul className="text-xs space-y-1 text-slate-300 list-disc list-inside">
              <li><strong>Slide 5</strong>: Two-Sample t-Test ($t = 3.00$)</li>
              <li><strong>Slide 6</strong>: Chi-Square Test ($\chi^2 = 16.67$)</li>
              <li><strong>Slide 7</strong>: One-Way ANOVA ($F = 27.00$)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Part 3: Deep Dive into Each Topic */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">
          3. Detailed Breakdown of Each Slide & Dataset
        </h2>

        {/* Topic 1 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-indigo-400">Slide 2 · Manoj's Topic</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">Z = 2.00</span>
          </div>
          <h3 className="text-base font-bold text-white">
            Single Proportion Z-Test: Testing a 50% Success Claim
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>The Story:</strong> A company claims their website feature has a 50% baseline success rate ($P_0 = 0.50$). We test <strong>100 users</strong> ($n = 100$), and <strong>60 users</strong> successfully buy ($x = 60$). That means our sample proportion is $60/100 = 0.60$ (60%).
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-sky-300 space-y-1">
              <div>1. Expected error: SE = √(0.5 × 0.5 / 100) = √(0.25 / 100) = 0.05</div>
              <div>2. Distance: Z = (0.60 - 0.50) / 0.05 = 0.10 / 0.05 = 2.00</div>
              <div>3. Rule: At 5% level, cutoff is ±1.96. Since 2.00 &gt; 1.96, REJECT H₀!</div>
            </div>
            <p>
              <strong>Meaning in Plain English:</strong> The 60% success rate did not happen by random chance. The feature is genuinely performing better than 50%!
            </p>
            <div className="bg-indigo-950/30 p-2.5 rounded-lg border border-indigo-500/20 text-xs text-indigo-200">
              🗣️ <strong>What Manoj says to examiner:</strong> "Sir, we have 100 users, 60 succeeded. So p̂ = 0.60. P₀ is 0.50, giving SE = 0.05. Then Z is (0.60 - 0.50) / 0.05 = 2.00. Because 2.00 is greater than 1.96, we reject H₀."
            </div>
          </div>
        </div>

        {/* Topic 2 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-indigo-400">Slide 3 · Manoj's Topic</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">Z = 2.83</span>
          </div>
          <h3 className="text-base font-bold text-white">
            Difference of Two Proportions Z-Test: Version 1 vs Version 2
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>The Story:</strong> We compare Version 1 against Version 2 with 100 users each.
              Version 1: 60 users satisfied (60%). Version 2: 40 users satisfied (40%). Is Version 1 really better?
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-sky-300 space-y-1">
              <div>1. Combined average: p̄ = (60 + 40)/(100 + 100) = 100/200 = 0.50</div>
              <div>2. Standard Error: SE = √(0.5 × 0.5 × (1/100 + 1/100)) = 0.0707</div>
              <div>3. Z-statistic: Z = (0.60 - 0.40) / 0.0707 = 0.20 / 0.0707 = 2.83</div>
              <div>4. Rule: 2.83 &gt; 1.96 $\implies$ REJECT H₀!</div>
            </div>
            <p>
              <strong>Meaning in Plain English:</strong> The 20% gap between Version 1 (60%) and Version 2 (40%) is statistically significant. Version 1 is definitively superior.
            </p>
          </div>
        </div>

        {/* Topic 3 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-indigo-400">Slide 4 · Manoj's Topic</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">t = 2.83</span>
          </div>
          <h3 className="text-base font-bold text-white">
            One-Sample Student’s t-Test: Small Sample Mean
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>The Story:</strong> When sample size is small ($n &lt; 30$), we use the t-test. We measure 5 battery units: $[10, 12, 14, 16, 18]$ hours. The claimed benchmark is $\mu_0 = 10$.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-sky-300 space-y-1">
              <div>1. Average: (10 + 12 + 14 + 16 + 18) / 5 = 70 / 5 = 14 hours</div>
              <div>2. Variance: s² = [(-4)² + (-2)² + 0² + 2² + 4²] / (5-1) = 40 / 4 = 10</div>
              <div>3. Error: SE = √(10 / 5) = √2 = 1.414</div>
              <div>4. t-statistic: t = (14 - 10) / 1.414 = 4 / 1.414 = 2.83 (df = 4)</div>
              <div>5. Rule: At df = 4, cutoff is 2.776. Since 2.83 &gt; 2.776 $\implies$ REJECT H₀!</div>
            </div>
            <p>
              <strong>Meaning in Plain English:</strong> The batteries average 14 hours, which is significantly better than the claimed 10 hours.
            </p>
          </div>
        </div>

        {/* Topic 4 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-sky-400">Slide 5 · Lokesh's Topic</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">t = 3.00</span>
          </div>
          <h3 className="text-base font-bold text-white">
            Two-Sample Independent t-Test: System 1 vs System 2
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>The Story:</strong> We compare 2 computer systems:
              System 1 scores $[12, 14, 16, 18, 20]$ (average $= 16$, variance $= 10$).
              System 2 scores $[6, 8, 10, 12, 14]$ (average $= 10$, variance $= 10$).
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-sky-300 space-y-1">
              <div>1. Difference in averages: 16 - 10 = 6</div>
              <div>2. Pooled Error: SE = √(10 × (1/5 + 1/5)) = √4 = 2.0 (clean integer!)</div>
              <div>3. t-statistic: t = 6 / 2 = 3.00 (clean integer 3!) (df = 8)</div>
              <div>4. Rule: At df = 8, cutoff is 2.306. Since 3.00 &gt; 2.306 $\implies$ REJECT H₀!</div>
            </div>
            <p>
              <strong>Meaning in Plain English:</strong> System 1 is statistically proven to be faster than System 2.
            </p>
            <div className="bg-sky-950/30 p-2.5 rounded-lg border border-sky-500/20 text-xs text-sky-200">
              🗣️ <strong>What Lokesh says to examiner:</strong> "Sir, System 1 has mean 16 and System 2 has mean 10. The difference is 6. The pooled standard error is exactly √4 = 2.0. So t is 6 / 2 = 3.00. Since 3.00 is greater than 2.31, we reject H₀."
            </div>
          </div>
        </div>

        {/* Topic 5 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-sky-400">Slide 6 · Lokesh's Topic</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">χ² = 16.67</span>
          </div>
          <h3 className="text-base font-bold text-white">
            Chi-Square (χ²) Test of Independence: Does Success Depend on Method?
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>The Story:</strong> 100 students tested two learning methods.
              Method A: 30 Passed, 20 Failed (Total 50).
              Method B: 10 Passed, 40 Failed (Total 50).
              Total Passed = 40, Total Failed = 60.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-sky-300 space-y-1">
              <div>1. Expected if equal: E₁₁ = (50 × 40)/100 = 20, E₁₂ = (50 × 60)/100 = 30</div>
              <div>2. Squared diff: (30 - 20)² = 100 for all cells!</div>
              <div>3. Terms: 100/20 + 100/30 + 100/20 + 100/30 = 5 + 3.33 + 5 + 3.33 = 16.67</div>
              <div>4. Rule: For df = 1, cutoff is 3.84. Since 16.67 &gt; 3.84 $\implies$ REJECT H₀!</div>
            </div>
            <p>
              <strong>Meaning in Plain English:</strong> Passing and failing is NOT independent of the method. Method A gives a vastly higher pass rate!
            </p>
          </div>
        </div>

        {/* Topic 6 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-sky-400">Slide 7 · Lokesh's Topic</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">F = 250.00</span>
          </div>
          <h3 className="text-base font-bold text-white">
            One-Way ANOVA: Study Hours and Test Scores (1 hr, 2 hrs, 3 hrs)
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>The Project Question:</strong> <em>"Does the number of study hours affect students’ test scores?"</em>
              We evaluated 15 students divided into 3 equal groups of 5:
              <br />• 1-Hour Study Group: $[50, 52, 48, 50, 50]$ $\implies$ Mean = <strong>50 marks</strong> (Total $T_1 = 250$)
              <br />• 2-Hours Study Group: $[60, 62, 58, 60, 60]$ $\implies$ Mean = <strong>60 marks</strong> (Total $T_2 = 300$)
              <br />• 3-Hours Study Group: $[70, 72, 68, 70, 70]$ $\implies$ Mean = <strong>70 marks</strong> (Total $T_3 = 350$)
            </p>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-sky-300 space-y-1.5">
              <div>1. Grand Total G = 250 + 300 + 350 = 900. Correction Factor CF = 900² / 15 = 54,000</div>
              <div>2. Between-Hours SSB = (12,500 + 18,000 + 24,500) - 54,000 = 1,000 (df_B = 2)</div>
              <div>3. Within-Error SSW = 8 + 8 + 8 = 24 (df_W = 12)</div>
              <div>4. Total Variation SST = 1,000 + 24 = 1,024 (df_T = 14)</div>
              <div>5. Mean Squares: MSB = 1,000 / 2 = 500;  MSW = 24 / 12 = 2</div>
              <div>6. Fisher F-Ratio: F_calc = 500 / 2 = 250.00 (Exact whole number!)</div>
              <div>7. Rule: F_crit(0.05, 2, 12) = 3.89. Since 250.00 &gt; 3.89 $\implies$ REJECT H₀!</div>
            </div>
            <p>
              <strong>Meaning in Plain English:</strong> Study hours have an enormous, statistically confirmed impact on test scores. Studying 3 hours raises average performance from 50 to 70 marks!
            </p>
            <div className="bg-sky-950/30 p-2.5 rounded-lg border border-sky-500/20 text-xs text-sky-200">
              🗣️ <strong>What Lokesh says to examiner:</strong> "Sir, our One-Way ANOVA examines whether study duration influences student marks. Between-groups Mean Square is 500, and Error Mean Square is 2. The resulting F-statistic is 500 / 2 = 250.00! Because 250.00 exceeds the critical value 3.89, we decisively reject H₀. More study hours directly cause higher exam scores."
            </div>
          </div>
        </div>

        {/* Live Typing Feature Callout */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/50 via-slate-900 to-sky-950/50 border border-indigo-500/30 text-xs sm:text-sm text-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Can You Type Your Own Calculations Live?</span>
            </div>
            <p className="text-slate-400 text-xs mt-1">
              Yes! Click the <strong>"Interactive Solver"</strong> tab to type any numbers or test scores. The app will immediately recalculate the group means, formulas, degrees of freedom, and critical values live in front of your eyes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
