import React from 'react';
import { Presentation, Calculator, BookOpen, GraduationCap, Printer, Lightbulb, Play } from 'lucide-react';

interface HeaderProps {
  activeTab: 'presenter' | 'demo' | 'solver' | 'guide' | 'viva' | 'print';
  setActiveTab: (tab: 'presenter' | 'demo' | 'solver' | 'guide' | 'viva' | 'print') => void;
  selectedDeckId: string;
  setSelectedDeckId: (id: string) => void;
  onEnterFullscreen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedDeckId,
  setSelectedDeckId,
  onEnterFullscreen,
}) => {
  return (
    <header className="no-print sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('presenter');
          }}
          className="text-lg font-bold tracking-tight text-white hover:text-indigo-400 transition-colors whitespace-nowrap"
        >
          StatLab Studio
        </a>
        <span className="hidden sm:inline text-xs text-slate-500 font-mono">
          · Manoj & Lokesh
        </span>
      </div>

      {/* Zone 2: Clean text navigation links */}
      <nav className="flex items-center gap-1 sm:gap-2 md:gap-3 text-xs sm:text-sm font-medium text-slate-300">
        <button
          onClick={() => setActiveTab('presenter')}
          className={`flex items-center gap-1.5 py-1 px-2.5 rounded-md transition-colors ${
            activeTab === 'presenter'
              ? 'text-white bg-slate-800/80 font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Presentation className="w-4 h-4 text-indigo-400" />
          <span>Presentation</span>
        </button>

        <button
          onClick={() => setActiveTab('demo')}
          className={`flex items-center gap-1.5 py-1 px-2.5 rounded-md transition-colors ${
            activeTab === 'demo'
              ? 'text-white bg-emerald-600/90 font-bold shadow-md shadow-emerald-500/20'
              : 'text-emerald-400 hover:text-emerald-300 font-semibold'
          }`}
        >
          <Play className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
          <span>Show Demo</span>
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`flex items-center gap-1.5 py-1 px-2.5 rounded-md transition-colors ${
            activeTab === 'guide'
              ? 'text-white bg-slate-800/80 font-semibold text-amber-300'
              : 'text-amber-400 hover:text-amber-300'
          }`}
        >
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span className="font-semibold">Beginner Guide</span>
        </button>

        <button
          onClick={() => setActiveTab('solver')}
          className={`flex items-center gap-1.5 py-1 px-2.5 rounded-md transition-colors ${
            activeTab === 'solver'
              ? 'text-white bg-slate-800/80 font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Calculator className="w-4 h-4 text-sky-400" />
          <span>Interactive Solver</span>
        </button>

        <button
          onClick={() => setActiveTab('viva')}
          className={`flex items-center gap-1.5 py-1 px-2.5 rounded-md transition-colors ${
            activeTab === 'viva'
              ? 'text-white bg-slate-800/80 font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-purple-400" />
          <span>Exam Viva Q&A</span>
        </button>

        <button
          onClick={() => setActiveTab('print')}
          className={`hidden md:flex items-center gap-1.5 py-1 px-2.5 rounded-md transition-colors ${
            activeTab === 'print'
              ? 'text-white bg-slate-800/80 font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Printer className="w-4 h-4 text-slate-400" />
          <span>Handout View</span>
        </button>
      </nav>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2.5">
        <select
          value={selectedDeckId}
          onChange={(e) => setSelectedDeckId(e.target.value)}
          className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 font-medium truncate max-w-[160px] sm:max-w-[210px]"
        >
          <option value="group_12_module_8">Group 12 · Module VIII & ANOVA</option>
          <option value="module_1_statistics">Module I · Stats & Ogives</option>
          <option value="module_9_correlation">Module IX · Correlation</option>
        </select>

        {activeTab === 'presenter' && (
          <button
            onClick={onEnterFullscreen}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors whitespace-nowrap shadow-sm shadow-indigo-600/30"
          >
            Present (F)
          </button>
        )}
      </div>
    </header>
  );
};
