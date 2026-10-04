import React, { useState } from 'react';
import {
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';

interface QuestionItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keyPoints: string[];
  formula?: string;
}

const VIVA_QUESTIONS: QuestionItem[] = [
  {
    id: 'q1',
    category: 'ANOVA (Module VIII)',
    question: 'Why is ANOVA called "Analysis of Variance" if its primary goal is to test the equality of population means?',
    answer:
      'Because it tests whether population means are equal by analyzing and partitioning the total variability into two distinct components: (1) Between-treatment variance (variation due to differing group means) and (2) Within-treatment variance (inherent random experimental error). When the null hypothesis is true, both components estimate the same error variance σ², yielding an F-ratio close to 1. If group means truly differ, the between-treatment variance swells significantly above random error.',
    keyPoints: [
      'Partition of Total Sum of Squares: SST = SSB + SSW',
      'Fisher F-ratio compares MSB / MSW',
      'F > 1 indicates treatment differences exceed background noise',
    ],
    formula: 'F = \\frac{MSB}{MSW} = \\frac{SSB / (k - 1)}{SSW / (N - k)}',
  },
  {
    id: 'q2',
    category: 'ANOVA (Module VIII)',
    question: 'Why can’t we just perform multiple two-sample t-tests instead of One-Way ANOVA when comparing 3 or more groups?',
    answer:
      'Performing pairwise t-tests rapidly inflates the overall Family-Wise Error Rate (FWER). For k groups, the number of pairwise comparisons is m = k(k - 1) / 2. The cumulative probability of committing at least one Type I error (false positive) becomes: α_overall = 1 - (1 - α)^m. For k = 4 groups (6 tests), α_overall skyrockets from 5% to 26.5%! ANOVA maintains the global significance level strictly at α in a single unified test.',
    keyPoints: [
      'Pairwise tests compound Type I errors',
      'For 5 groups (10 tests), error rate exceeds 40%',
      'ANOVA provides an omnibus test before any post-hoc pairwise inspection',
    ],
    formula: '\\alpha_{family\\text{-}wise} = 1 - (1 - \\alpha)^m',
  },
  {
    id: 'q3',
    category: 'Proportions (Module VIII)',
    question: 'Why do we pool sample proportions in a Two-Sample Proportion Z-test, but not when calculating a confidence interval?',
    answer:
      'Under the null hypothesis H₀: P₁ = P₂ = P, both samples are assumed to originate from an identical population with a single common proportion. Therefore, pooling all successes (x₁ + x₂) over total trials (n₁ + n₂) yields the maximum likelihood, best unbiased estimate of that common proportion p̄. In contrast, confidence intervals do not assume equality, so separate sample proportions p̂₁ and p̂₂ must be used.',
    keyPoints: [
      'Null hypothesis explicitly assumes identical parameter P₁ = P₂',
      'Pooled p̄ = (x₁ + x₂) / (n₁ + n₂)',
      'Improves precision and degrees of standard error consistency',
    ],
    formula: '\\bar{p} = \\frac{x_1 + x_2}{n_1 + n_2}, \\quad SE = \\sqrt{\\bar{p}(1 - \\bar{p})\\left(\\frac{1}{n_1} + \\frac{1}{n_2}\\right)}',
  },
  {
    id: 'q4',
    category: 'Hypothesis Testing Models (Module VIII)',
    question: 'What is the fundamental difference between an Independent Two-Sample t-test and a Paired Samples t-test?',
    answer:
      'An independent two-sample t-test compares two distinct, unrelated groups of subjects (e.g., Control group vs Treatment group) with degrees of freedom df = n₁ + n₂ - 2. A paired t-test evaluates dependent observations measured on the same subjects (e.g., Pre-test vs Post-test marks), computing pair differences d_i = y_i - x_i with df = n - 1. Paired tests eliminate subject-to-subject baseline differences, dramatically increasing test sensitivity.',
    keyPoints: [
      'Independent: Between-subject design (different people/units)',
      'Paired: Within-subject repeated measures (same subjects)',
      'Paired design subtracts individual confounding variation',
    ],
    formula: 't_{paired} = \\frac{\\bar{d}}{s_d / \\sqrt{n}}, \\quad df = n - 1',
  },
  {
    id: 'q5',
    category: 'Student’s t-Distribution (Module VIII)',
    question: 'What is the relationship between the Fisher F-distribution and Student’s t-distribution?',
    answer:
      'For a two-sample test with equal sample sizes or any t-test with df degrees of freedom, squaring the t-statistic yields an F-statistic with 1 numerator degree of freedom and df denominator degrees of freedom: F_{(1, df)} = t^2_{(df)}. This proves that the two-sample t-test is mathematically an exact special case of One-Way ANOVA with k = 2 groups.',
    keyPoints: [
      'F with (1, df) equals t² with df',
      'Two-group ANOVA produces identical p-value to two-tailed independent t-test',
      'Both tests share identical normality and homoscedasticity assumptions',
    ],
    formula: 'F_{(1, df)} = \\left[ t_{(df)} \\right]^2',
  },
  {
    id: 'q6',
    category: 'Chi-Square Models (Module VIII)',
    question: 'Why must every expected cell frequency E_ij be at least 5 in a Chi-Square test?',
    answer:
      'The discrete multinomial distribution of categorical counts is approximated by the continuous Chi-Square distribution. When expected frequencies drop below 5, this continuous approximation deteriorates significantly, causing the calculated χ² statistic to artificially inflate and reject H₀ too readily. If cells have E < 5, adjacent categories must be pooled, or Fisher’s Exact Test must be used.',
    keyPoints: [
      'Expected frequencies must be ≥ 5 for continuous approximation validity',
      'Prevents excessive Type I errors',
      'Small cells require category grouping or Fisher’s Exact Test',
    ],
    formula: 'E_{ij} = \\frac{R_i \\times C_j}{N} \\ge 5',
  },
  {
    id: 'q7',
    category: 'General Inference (Module VII/VIII)',
    question: 'What is the difference between Type I Error (α) and Type II Error (β)? How does Power relate to them?',
    answer:
      'Type I Error (α): Rejecting the null hypothesis when it is actually true (False Positive / Producer’s Risk). Type II Error (β): Failing to reject the null hypothesis when it is actually false (False Negative / Consumer’s Risk). The Power of a statistical test is defined as (1 - β), which represents the probability of correctly rejecting a false null hypothesis.',
    keyPoints: [
      'Type I (α): False alarm (convicting an innocent person)',
      'Type II (β): Missed detection (acquitting a guilty person)',
      'Statistical Power = 1 - β (typically aimed at ≥ 80%)',
    ],
  },
  {
    id: 'q8',
    category: 'Intro to Statistics (Module I)',
    question: 'Why do the Less-Than Ogive and More-Than Ogive curves intersect precisely at the Median?',
    answer:
      'Because the Less-Than Ogive counts all observations less than or equal to value x (ascending from 0 to N), while the More-Than Ogive counts observations greater than or equal to x (descending from N to 0). At the exact point where these two functions meet, the cumulative count below the value equals the count above it: both equal N / 2. By definition, the value dividing the data into two equal halves of 50% is the Median.',
    keyPoints: [
      'Intersection Y-value is always N / 2',
      'Intersection X-value is the empirical sample Median',
      'Provides a graphical method to find median without formulas',
    ],
  },
  {
    id: 'q9',
    category: 'Correlation & Regression (Module IX)',
    question: 'What is the mathematical and geometric relationship between the two regression coefficients b_yx and b_xy and Pearson’s r?',
    answer:
      'The geometric mean of the two regression coefficients equals Karl Pearson’s correlation coefficient: r = ±√(b_yx · b_xy). Both regression coefficients must always share the same sign (+ or -), which is also the sign of r. Furthermore, their product (b_yx · b_xy) = r² represents the Coefficient of Determination, the proportion of variance explained by the linear model.',
    keyPoints: [
      'r = ±√(b_yx · b_xy)',
      'b_yx and b_xy always have identical mathematical signs',
      'Product equals r² (Coefficient of Determination)',
    ],
    formula: 'r^2 = b_{yx} \\times b_{xy}',
  },
];

export const VivaCheatSheet: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['q1', 'q2', 'q3']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'ANOVA (Module VIII)', 'Proportions (Module VIII)', 'Hypothesis Testing Models (Module VIII)', 'Chi-Square Models (Module VIII)', 'Intro to Statistics (Module I)', 'Correlation & Regression (Module IX)'];

  const toggleOpen = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filtered = VIVA_QUESTIONS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      {/* Title */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">
          <GraduationCap className="w-4 h-4" />
          <span>Exam Day Defense Guide</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Probability & Statistics Viva Voce Q&A Cheat Sheet
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Curated conceptual and numerical defense questions frequently asked by university professors and examiners for Module VIII (Hypothesis Testing II & ANOVA), Module I, and Module IX.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'All' ? 'All Questions' : cat.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Accordion */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleOpen(item.id)}
                className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-slate-800/40 transition-colors"
              >
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                    {item.category}
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {item.question}
                  </h3>
                </div>
                <div className="mt-1 p-1 rounded-md bg-slate-800 text-slate-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="p-4 pt-1 border-t border-slate-800/60 space-y-3 bg-slate-950/40 text-xs sm:text-sm">
                  <p className="text-slate-300 leading-relaxed">
                    {item.answer}
                  </p>

                  {item.formula && (
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto">
                      {item.formula}
                    </div>
                  )}

                  <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-lg p-3">
                    <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Exam Defense Speaking Points</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                      {item.keyPoints.map((pt, i) => (
                        <li key={i} className="pl-1">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
