/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StatEasyHeader, StatEasyTab } from './components/StatEasyHeader';
import { StatEasyHome } from './components/StatEasyHome';
import { AnovaCalculatorView } from './components/AnovaCalculatorView';
import { ProportionTestView } from './components/ProportionTestView';
import { DatasetView } from './components/DatasetView';
import { AboutProjectView } from './components/AboutProjectView';
import { MeaningsGlossaryView } from './components/MeaningsGlossaryView';

export default function App() {
  const [activeTab, setActiveTab] = useState<StatEasyTab>('home');

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Application Header */}
      <StatEasyHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main App Content View */}
      <main className="flex-1 pb-10">
        {activeTab === 'home' && (
          <StatEasyHome onNavigate={setActiveTab} />
        )}

        {activeTab === 'anova' && (
          <AnovaCalculatorView />
        )}

        {activeTab === 'proportion' && (
          <ProportionTestView />
        )}

        {activeTab === 'dataset' && (
          <DatasetView onOpenAnova={() => setActiveTab('anova')} />
        )}

        {activeTab === 'meanings' && (
          <MeaningsGlossaryView onNavigate={setActiveTab} />
        )}

        {activeTab === 'about' && (
          <AboutProjectView onNavigate={setActiveTab} />
        )}
      </main>

      {/* Clean Bottom Footer */}
      <footer className="py-4 px-6 border-t border-slate-900 bg-slate-950 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-400">STATS EASY</span>
          <span className="text-slate-700">·</span>
          <span>Mathematics LG 12: Testing of Hypothesis – II & ANOVA</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
          <span className="text-indigo-400 font-semibold">Pinjari Manoj (252U1R1193)</span>
          <span className="text-slate-700">·</span>
          <span className="text-sky-400 font-semibold">Orsu Lokesh (252U1R1170)</span>
        </div>
      </footer>
    </div>
  );
}
