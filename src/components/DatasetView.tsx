import React, { useState } from 'react';
import {
  Table as TableIcon,
  CheckCircle2,
  Copy,
  Check,
  Calculator,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';

interface DatasetViewProps {
  onOpenAnova?: () => void;
}

export const DatasetView: React.FC<DatasetViewProps> = ({ onOpenAnova }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const studentRows = [
    { id: 1, hours: '1 hour', group: 'Group A', score: 50, dev: '0' },
    { id: 2, hours: '1 hour', group: 'Group A', score: 52, dev: '+2' },
    { id: 3, hours: '1 hour', group: 'Group A', score: 48, dev: '-2' },
    { id: 4, hours: '1 hour', group: 'Group A', score: 50, dev: '0' },
    { id: 5, hours: '1 hour', group: 'Group A', score: 50, dev: '0' },
    { id: 6, hours: '2 hours', group: 'Group B', score: 60, dev: '0' },
    { id: 7, hours: '2 hours', group: 'Group B', score: 62, dev: '+2' },
    { id: 8, hours: '2 hours', group: 'Group B', score: 58, dev: '-2' },
    { id: 9, hours: '2 hours', group: 'Group B', score: 60, dev: '0' },
    { id: 10, hours: '2 hours', group: 'Group B', score: 60, dev: '0' },
    { id: 11, hours: '3 hours', group: 'Group C', score: 70, dev: '0' },
    { id: 12, hours: '3 hours', group: 'Group C', score: 72, dev: '+2' },
    { id: 13, hours: '3 hours', group: 'Group C', score: 68, dev: '-2' },
    { id: 14, hours: '3 hours', group: 'Group C', score: 70, dev: '0' },
    { id: 15, hours: '3 hours', group: 'Group C', score: 70, dev: '0' },
  ];

  const copyTable = () => {
    let tsv = 'Student\tStudy Hours\tTest Score\n';
    studentRows.forEach((r) => {
      tsv += `${r.id}\t${r.hours}\t${r.score}\n`;
    });
    navigator.clipboard.writeText(tsv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8 text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-indigo-950/60 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <TableIcon className="w-3.5 h-3.5" />
              <span>Part 1 of Project · Academic Dataset</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dataset: Study Hours and Test Scores
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
              <strong className="text-white">Project Question:</strong> <em>"Does the number of study hours significantly affect students' test scores?"</em>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyTable}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Copied Data!' : 'Copy Table'}</span>
            </button>
            {onOpenAnova && (
              <button
                onClick={onOpenAnova}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors shadow-md shadow-sky-600/20"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate ANOVA</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grouped Version Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Group A */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-emerald-400">Group A</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300">
              5 Students
            </span>
          </div>
          <h2 className="text-lg font-bold text-white">1 Hour Study</h2>
          <div className="text-xs text-slate-400">
            Scores: <span className="font-mono text-slate-200 font-semibold">50, 52, 48, 50, 50</span>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Calculation: (50+52+48+50+50)/5</span>
            <span className="font-mono font-bold text-emerald-400 text-sm">Mean = 50</span>
          </div>
        </div>

        {/* Group B */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-indigo-400">Group B</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/30 text-indigo-300">
              5 Students
            </span>
          </div>
          <h2 className="text-lg font-bold text-white">2 Hours Study</h2>
          <div className="text-xs text-slate-400">
            Scores: <span className="font-mono text-slate-200 font-semibold">60, 62, 58, 60, 60</span>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Calculation: (60+62+58+60+60)/5</span>
            <span className="font-mono font-bold text-indigo-400 text-sm">Mean = 60</span>
          </div>
        </div>

        {/* Group C */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-sky-400">Group C</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-950 border border-sky-500/30 text-sky-300">
              5 Students
            </span>
          </div>
          <h2 className="text-lg font-bold text-white">3 Hours Study</h2>
          <div className="text-xs text-slate-400">
            Scores: <span className="font-mono text-slate-200 font-semibold">70, 72, 68, 70, 70</span>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Calculation: (70+72+68+70+70)/5</span>
            <span className="font-mono font-bold text-sky-400 text-sm">Mean = 70</span>
          </div>
        </div>
      </div>

      {/* Why We Use This Dataset Callout */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Why This Dataset is Ideal for Your Project & Viva</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Only 15 students total</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>3 equal groups of 5</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Clean round numbers</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Exact means: 50, 60, 70</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Clean F = 250.00</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Easy bar graph</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Zero decimals in sum of squares</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Easy to explain on blackboard</span>
          </div>
        </div>
      </div>

      {/* Raw 15-Student Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-white">Complete 15-Student Master Dataset</h2>
          <span className="text-xs font-mono text-slate-400">Total N = 15 Students</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4">Student</th>
                <th className="py-2.5 px-4">Study Duration</th>
                <th className="py-2.5 px-4">Group</th>
                <th className="py-2.5 px-4">Test Score (out of 100)</th>
                <th className="py-2.5 px-4">Deviation from Group Mean (x - x̄)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {studentRows.map((st) => (
                <tr key={st.id} className="hover:bg-slate-800/40">
                  <td className="py-2.5 px-4 font-bold text-slate-400">Student {st.id}</td>
                  <td className="py-2.5 px-4 text-white">{st.hours}</td>
                  <td className="py-2.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        st.group === 'Group A'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : st.group === 'Group B'
                          ? 'bg-indigo-950 text-indigo-400 border border-indigo-500/30'
                          : 'bg-sky-950 text-sky-400 border border-sky-500/30'
                      }`}
                    >
                      {st.group}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-bold text-white text-sm">{st.score}</td>
                  <td className="py-2.5 px-4 text-slate-400">{st.dev}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Column Meanings Explanation */}
        <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2 text-xs">
          <div className="text-amber-400 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>Plain-English Meaning of Every Column in This Dataset</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-slate-300">
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <strong className="text-white block font-semibold mb-0.5">Study Duration (Factor)</strong>
              <span className="text-[11px] text-slate-400">
                The independent treatment variable (1 hr, 2 hrs, 3 hrs) that we are testing to see if it causes higher test marks.
              </span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <strong className="text-white block font-semibold mb-0.5">Test Score (Response)</strong>
              <span className="text-[11px] text-slate-400">
                The measured outcome out of 100 marks. Shows a clear progression from 50 to 60 to 70 marks.
              </span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <strong className="text-white block font-semibold mb-0.5">Deviation (x - x̄)</strong>
              <span className="text-[11px] text-slate-400">
                How far each student varied from their own group's average (-2, 0, +2). Squares of these sum up to SSW (Within Groups Error = 24).
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
