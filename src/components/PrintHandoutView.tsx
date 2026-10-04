import React from 'react';
import { SlideDeck } from '../types/stats';
import { SlideRenderer } from './SlideRenderer';
import { Printer, Download, Sparkles } from 'lucide-react';

interface PrintHandoutViewProps {
  deck: SlideDeck;
}

export const PrintHandoutView: React.FC<PrintHandoutViewProps> = ({ deck }) => {
  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Non-print toolbar */}
      <div className="no-print bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white">
            Project Slide Deck & Numerical Report Handout
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Full document ready for print submission, PDF export, or physical distribution to the examiner panel.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md transition-colors whitespace-nowrap"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Render all slides stacked */}
      <div className="space-y-12">
        {deck.slides.map((slide, idx) => (
          <div key={slide.id} className="print-page border border-slate-800 rounded-2xl overflow-hidden shadow-xl bg-slate-950">
            <SlideRenderer
              slide={slide}
              slideNumber={idx + 1}
              totalSlides={deck.slides.length}
              team={deck.team}
              isPresentationMode={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
