import React from 'react';
import {
  Calculator,
  Percent,
  Table as TableIcon,
  Home,
  GraduationCap,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export type StatEasyTab = 'home' | 'anova' | 'proportion' | 'dataset' | 'meanings' | 'about';

interface StatEasyHeaderProps {
  activeTab: StatEasyTab;
  setActiveTab: (tab: StatEasyTab) => void;
}

export const StatEasyHeader: React.FC<StatEasyHeaderProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-md">
      {/* Brand Wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('home')}
          className="text-left group flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
            <Calculator className="w-4 h-4 text-indigo-300" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              STATS EASY
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30">
              Hypothesis & ANOVA
            </span>
          </div>
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex items-center gap-1 sm:gap-2 text-xs font-semibold text-slate-300">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-lg transition-colors ${
            activeTab === 'home'
              ? 'text-white bg-slate-800 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Home className="w-3.5 h-3.5 text-indigo-400" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('anova')}
          className={`flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-lg transition-colors ${
            activeTab === 'anova'
              ? 'text-white bg-sky-600 font-bold shadow-sm shadow-sky-600/20'
              : 'text-sky-400 hover:text-sky-300 hover:bg-slate-900'
          }`}
        >
          <Calculator className="w-3.5 h-3.5 text-sky-400" />
          <span>ANOVA</span>
        </button>

        <button
          onClick={() => setActiveTab('proportion')}
          className={`flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-lg transition-colors ${
            activeTab === 'proportion'
              ? 'text-white bg-indigo-600 font-bold shadow-sm shadow-indigo-600/20'
              : 'text-indigo-400 hover:text-indigo-300 hover:bg-slate-900'
          }`}
        >
          <Percent className="w-3.5 h-3.5 text-indigo-400" />
          <span>Proportion Test</span>
        </button>

        <button
          onClick={() => setActiveTab('dataset')}
          className={`flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-lg transition-colors ${
            activeTab === 'dataset'
              ? 'text-white bg-amber-600 font-bold shadow-sm shadow-amber-600/20'
              : 'text-amber-400 hover:text-amber-300 hover:bg-slate-900'
          }`}
        >
          <TableIcon className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Dataset</span>
        </button>

        <button
          onClick={() => setActiveTab('meanings')}
          className={`flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-lg transition-colors ${
            activeTab === 'meanings'
              ? 'text-white bg-emerald-600 font-bold shadow-sm shadow-emerald-600/20'
              : 'text-emerald-400 hover:text-emerald-300 hover:bg-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span>Meanings</span>
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-lg transition-colors ${
            activeTab === 'about'
              ? 'text-white bg-purple-600 font-bold shadow-sm shadow-purple-600/20'
              : 'text-purple-400 hover:text-purple-300 hover:bg-slate-900'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
          <span>About Project</span>
        </button>
      </nav>

      {/* Presenters Label */}
      <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-400">
        <span className="text-indigo-300 font-semibold">Manoj</span>
        <span className="text-slate-600">&</span>
        <span className="text-sky-300 font-semibold">Lokesh</span>
      </div>
    </header>
  );
};
