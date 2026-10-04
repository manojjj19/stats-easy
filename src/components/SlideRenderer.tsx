import React from 'react';
import { SlideContent, TeamMember } from '../types/stats';
import { DistributionCurve } from './DistributionCurve';
import {
  HistogramChart,
  OgiveChart,
  ScatterRegressionChart,
  AnovaGroupBarChart,
} from './ChartVisualizer';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  User,
  Hash,
  Sigma,
  Table as TableIcon,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface SlideRendererProps {
  slide: SlideContent;
  slideNumber: number;
  totalSlides: number;
  team: TeamMember[];
  isPresentationMode?: boolean;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({
  slide,
  slideNumber,
  totalSlides,
  team,
  isPresentationMode = false,
}) => {
  // If it's slide 1 (Title slide)
  if (slide.id === 'g12_slide_1') {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 bg-slate-900/60 rounded-2xl border border-slate-800 relative overflow-hidden">
        {/* Subtle background ambient mesh */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header metadata */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-indigo-400 tracking-wider uppercase text-[11px]">
              Probability & Statistics Midterm / Final Project
            </span>
            <span className="text-slate-600">·</span>
            <span>Academic Session 2026</span>
          </div>
          <div className="text-slate-500 font-mono">
            Slide {slideNumber} / {totalSlides}
          </div>
        </div>

        {/* Main Title Banner */}
        <div className="my-auto py-8">
          <div className="inline-block px-3 py-1 bg-indigo-500/15 border border-indigo-500/30 rounded-md text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Group 12 · Assigned Project Topic
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-4xl text-balance leading-tight">
            Module VIII: Testing of Hypothesis – II & ANOVA
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Hypothesis Testing for Single & Difference of Two Proportions, Small-Sample Student’s t-Models, Paired Tests, Chi-Square Independence, and One-Way Analysis of Variance.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="text-emerald-400 font-medium">✓ Real Datasets Applied</span>
            <span className="text-slate-600">·</span>
            <span className="text-sky-400 font-medium">✓ Step-by-Step Manual Calculations</span>
            <span className="text-slate-600">·</span>
            <span className="text-indigo-400 font-medium">✓ Interactive Distribution Decision Regions</span>
          </div>
        </div>

        {/* Project Team Members Grid */}
        <div className="pt-6 border-t border-slate-800">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
            Project Presenters & Team (2 Members)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-slate-950/90 border border-indigo-500/30 rounded-xl p-4 hover:border-indigo-400 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/60 flex items-center justify-center text-indigo-300 text-sm font-bold">
                    {member.name[0]}
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-white truncate">
                      {member.name}
                    </div>
                    <div className="text-xs font-mono text-indigo-400">
                      Roll No: {member.rollNo}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-300 mt-1 pl-11">
                  Presentation Part: <strong className="text-indigo-200">{member.assignedRole}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Standard slide layout
  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-7 bg-slate-900/60 rounded-2xl border border-slate-800 overflow-y-auto">
      {/* Top bar of the slide */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
            {slide.module}
          </span>
          <span className="text-slate-600">·</span>
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-0.5 rounded text-indigo-300 text-xs font-medium">
            <span>Speaker:</span>
            <strong className="text-white font-bold">{slide.presenter || 'Group 12'}</strong>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
          <span>Slide {slideNumber} / {totalSlides}</span>
        </div>
      </div>

      {/* Slide Title */}
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white text-balance">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm text-indigo-300/90 font-medium mt-0.5">
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-start">
        {/* Left Column (5 cols): Theory, Formulas & Dataset */}
        <div className="lg:col-span-5 space-y-4">
          {/* Core Theory */}
          <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Core Theory & Key Concepts</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed list-disc list-inside">
              {slide.theorySummary.map((item, idx) => (
                <li key={idx} className="text-slate-300 pl-1">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Formulas Sheet */}
          {slide.formulas && slide.formulas.length > 0 && (
            <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                <Sigma className="w-3.5 h-3.5 text-sky-400" />
                <span>Formulas & Test Statistics</span>
              </div>
              <div className="space-y-2">
                {slide.formulas.map((form, idx) => (
                  <div key={idx} className="bg-slate-900/80 rounded-lg p-2.5 border border-slate-800">
                    <div className="text-[11px] font-semibold text-indigo-300 mb-0.5">
                      {form.name}
                    </div>
                    <div className="font-mono text-xs text-sky-200 bg-slate-950/90 py-1.5 px-2 rounded border border-slate-800/80 overflow-x-auto">
                      {form.latex}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {form.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sample Dataset & Raw Table */}
          <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              <div className="flex items-center gap-2">
                <TableIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sample Dataset</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 mb-2 leading-relaxed">
              {slide.datasetDescription}
            </p>

            {slide.rawDataTable && (
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      {slide.rawDataTable.headers.map((h, i) => (
                        <th key={i} className="px-2.5 py-1.5 font-semibold text-[11px]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                    {slide.rawDataTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-900/50">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-2.5 py-1 text-slate-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (7 cols): Step-by-Step Numericals & Visual Charts */}
        <div className="lg:col-span-7 space-y-4">
          {/* Step-by-Step Calculation Working */}
          <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              <div className="flex items-center gap-2">
                <Hash className="w-3.5 h-3.5 text-amber-400" />
                <span>Step-by-Step Numerical Calculations</span>
              </div>
              <span className="text-[10px] text-amber-400/80 font-mono">
                Manual Working
              </span>
            </div>

            <div className="space-y-2.5">
              {slide.steps.map((st) => (
                <div
                  key={st.stepNumber}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-2.5 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-200">
                      Step {st.stepNumber}: {st.title}
                    </span>
                    <span className="text-emerald-400 font-mono text-[11px] font-medium">
                      {st.result}
                    </span>
                  </div>

                  {st.formula && (
                    <div className="text-[11px] font-mono text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800 mb-1">
                      {st.formula}
                    </div>
                  )}

                  {st.substitution && (
                    <div className="text-[11px] font-mono text-indigo-300 bg-slate-950/60 px-2 py-1 rounded border border-slate-800 mb-1">
                      {st.substitution}
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400 leading-normal">
                    {st.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ANOVA Table if present */}
          {slide.anovaTable && (
            <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Complete ANOVA Summary Table
              </div>
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-slate-400 text-[11px]">
                    <tr>
                      <th className="px-2.5 py-1.5">Source of Variation</th>
                      <th className="px-2.5 py-1.5">SS</th>
                      <th className="px-2.5 py-1.5">df</th>
                      <th className="px-2.5 py-1.5">MS</th>
                      <th className="px-2.5 py-1.5">F (calc)</th>
                      <th className="px-2.5 py-1.5">F (crit 0.05)</th>
                      <th className="px-2.5 py-1.5">p-value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-[11px]">
                    {slide.anovaTable.map((row, idx) => (
                      <tr key={idx} className={idx === 0 ? 'bg-indigo-950/20' : ''}>
                        <td className="px-2.5 py-1 text-slate-200 font-sans font-medium">{row.source}</td>
                        <td className="px-2.5 py-1 text-indigo-300">{row.ss}</td>
                        <td className="px-2.5 py-1 text-slate-300">{row.df}</td>
                        <td className="px-2.5 py-1 text-sky-300">{row.ms}</td>
                        <td className="px-2.5 py-1 font-bold text-amber-300">{row.fValue ?? '-'}</td>
                        <td className="px-2.5 py-1 text-slate-400">{row.fCrit ?? '-'}</td>
                        <td className="px-2.5 py-1 text-rose-300">{row.pValue !== undefined ? (row.pValue < 0.0001 ? '<0.0001' : row.pValue) : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Graphical Visualizer */}
          {slide.chartType === 'distribution' && slide.plotData && (
            <DistributionCurve data={slide.plotData} />
          )}

          {slide.chartType === 'histogram' && slide.chartExtraData && (
            <HistogramChart
              intervals={slide.chartExtraData.intervals}
              dataMean={slide.chartExtraData.mean}
              dataMedian={slide.chartExtraData.median}
            />
          )}

          {slide.chartType === 'ogive' && slide.chartExtraData && (
            <OgiveChart
              intervals={slide.chartExtraData.intervals}
              medianVal={slide.chartExtraData.median}
            />
          )}

          {slide.chartType === 'scatter_regression' && slide.chartExtraData && (
            <ScatterRegressionChart
              x={slide.chartExtraData.x}
              y={slide.chartExtraData.y}
              pearsonR={slide.chartExtraData.pearsonR}
              b_yx={slide.chartExtraData.b_yx}
              intercept={slide.chartExtraData.intercept}
            />
          )}

          {slide.chartType === 'anova_bars' && slide.chartExtraData && (
            <AnovaGroupBarChart
              groups={slide.chartExtraData.groups}
              groupLabels={slide.chartExtraData.groupLabels}
            />
          )}

          {/* Statistical Decision Box */}
          <div
            className={`rounded-xl p-3.5 border ${
              slide.decision.isRejected
                ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-1">
              {slide.decision.isRejected ? (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span className="text-rose-300">Statistical Decision: Reject Null Hypothesis H₀</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Statistical Decision: Fail to Reject Null Hypothesis H₀</span>
                </>
              )}
            </div>
            <div className="text-xs leading-relaxed text-slate-200">
              {slide.decision.conclusion}
            </div>
          </div>
        </div>
      </div>

      {/* Presenter Script / Viva Notes Box at footer */}
      {slide.presenterNotes && (
        <div className="mt-4 pt-3 border-t border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-start gap-2 text-slate-400">
            <span className="text-indigo-400 font-semibold uppercase text-[10px] tracking-wider whitespace-nowrap mt-0.5">
              Speaker Notes:
            </span>
            <span className="text-slate-300 italic text-[11px] leading-relaxed">
              "{slide.presenterNotes}"
            </span>
          </div>
          {slide.vivaTip && (
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded text-amber-300 text-[11px] shrink-0">
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="font-medium">Viva Tip Available</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

