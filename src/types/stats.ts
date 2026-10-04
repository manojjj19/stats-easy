export type HypothesisModelType =
  | 'single_proportion'
  | 'two_proportions'
  | 'one_sample_z'
  | 'one_sample_t'
  | 'two_sample_t'
  | 'paired_t'
  | 'chi_square_independence'
  | 'chi_square_gof'
  | 'anova_oneway'
  | 'module1_statistics'
  | 'module9_correlation';

export type AlternativeHypothesis = 'two_tailed' | 'right_tailed' | 'left_tailed';

export interface CalculationStep {
  stepNumber: number;
  title: string;
  formula?: string;
  substitution?: string;
  result: string;
  explanation: string;
}

export interface DistributionPlotData {
  distribution: 'normal' | 'student_t' | 'f_distribution' | 'chi_square';
  df1?: number;
  df2?: number;
  criticalValues: number[]; // e.g. [-1.96, 1.96] or [3.49]
  calculatedStatistic: number;
  alpha: number;
  tailed: AlternativeHypothesis;
  isRejected: boolean;
  decisionText: string;
}

export interface AnovaTableRow {
  source: string;
  ss: number;
  df: number;
  ms: number;
  fValue?: number;
  fCrit?: number;
  pValue?: number;
}

export interface TeamMember {
  name: string;
  rollNo: string;
  assignedRole: string;
}

export interface SlideContent {
  id: string;
  module: string;
  title: string;
  subtitle?: string;
  presenter?: string;
  theorySummary: string[];
  formulas: {
    name: string;
    latex: string;
    description: string;
  }[];
  datasetDescription: string;
  rawDataTable?: {
    headers: string[];
    rows: (string | number)[][];
  };
  steps: CalculationStep[];
  decision: {
    testStatisticName: string;
    calculatedValue: number;
    criticalValue: string;
    pValue?: number;
    decisionRule: string;
    conclusion: string;
    isRejected: boolean;
  };
  plotData?: DistributionPlotData;
  anovaTable?: AnovaTableRow[];
  chartType?: 'distribution' | 'histogram' | 'ogive' | 'stem_leaf' | 'scatter_regression' | 'anova_bars';
  chartExtraData?: any;
  presenterNotes: string;
  vivaTip?: string;
}

export interface SlideDeck {
  id: string;
  title: string;
  moduleBadge: string;
  description: string;
  team: TeamMember[];
  slides: SlideContent[];
}
