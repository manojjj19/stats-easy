import React, { useState, useEffect, useRef } from 'react';
import { SlideDeck } from '../types/stats';
import { SlideRenderer } from './SlideRenderer';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  LayoutGrid,
  Users,
  Play,
} from 'lucide-react';

interface SlidePresenterProps {
  deck: SlideDeck;
  initialSlideIndex?: number;
  onOpenDemo?: () => void;
}

export const SlidePresenter: React.FC<SlidePresenterProps> = ({
  deck,
  initialSlideIndex = 0,
  onOpenDemo,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlideIndex);
  const [showNotes, setShowNotes] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync if deck changes
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [deck.id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.min(prev + 1, deck.slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'n') {
        setShowNotes((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deck.slides.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const currentSlide = deck.slides[currentSlideIndex] || deck.slides[0];

  const copySlideText = () => {
    const lines = [
      `# ${currentSlide.title}`,
      currentSlide.subtitle ? `*${currentSlide.subtitle}*` : '',
      `Presenter: ${currentSlide.presenter || 'Team'}`,
      '',
      '## Theory & Formulas:',
      ...currentSlide.theorySummary.map((t) => `- ${t}`),
      ...(currentSlide.formulas || []).map((f) => `- ${f.name}: ${f.latex}`),
      '',
      `## Dataset: ${currentSlide.datasetDescription}`,
      '',
      '## Step-by-Step Calculations:',
      ...currentSlide.steps.map(
        (s) =>
          `Step ${s.stepNumber} [${s.title}]: ${s.result} (${s.explanation})`
      ),
      '',
      `## Statistical Decision: ${currentSlide.decision.conclusion}`,
      '',
      `Speaker Notes: "${currentSlide.presenterNotes}"`,
    ]
      .filter((l) => l !== undefined)
      .join('\n');

    navigator.clipboard.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-slate-950 text-slate-100 ${
        isFullscreen ? 'h-screen w-screen p-4' : 'min-h-[calc(100vh-60px)] p-4 sm:p-6'
      }`}
    >
      {/* Top Presenter Utility Bar */}
      <div className="flex items-center justify-between pb-3 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white truncate max-w-[200px] sm:max-w-md">
            {deck.title}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-indigo-400 font-mono">
            {deck.moduleBadge}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Copy slide button */}
          <button
            onClick={copySlideText}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs transition-colors"
            title="Copy slide text to transfer into PowerPoint or Google Slides"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Slide Content</span>
              </>
            )}
          </button>

          {/* Show Live Demo Button */}
          {onOpenDemo && (
            <button
              onClick={onOpenDemo}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md shadow-emerald-600/20"
              title="Show Practical Calculations & Blackboard Demo"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Show Live Demo</span>
            </button>
          )}

          {/* Toggle Thumbnails */}
          <button
            onClick={() => setShowThumbnails((prev) => !prev)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-colors ${
              showThumbnails
                ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Slides Drawer</span>
          </button>

          {/* Toggle Speaker Notes */}
          <button
            onClick={() => setShowNotes((prev) => !prev)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-colors ${
              showNotes
                ? 'bg-amber-600/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Speaker Script (N)</span>
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs transition-colors"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="flex-1 flex flex-col justify-center items-center my-auto min-h-[540px]">
        <div className="w-full max-w-7xl h-full shadow-2xl rounded-2xl">
          <SlideRenderer
            slide={currentSlide}
            slideNumber={currentSlideIndex + 1}
            totalSlides={deck.slides.length}
            team={deck.team}
            isPresentationMode={true}
          />
        </div>
      </div>

      {/* Presenter Speaker Notes Drawer */}
      {showNotes && (
        <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-amber-500/30 text-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold uppercase tracking-wider text-[11px]">
              <MessageSquare className="w-4 h-4" />
              <span>Exam Presenter Script & Viva Defense Notes</span>
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              Assigned Speaker: {currentSlide.presenter || 'Team'}
            </div>
          </div>
          <p className="text-slate-200 text-sm leading-relaxed mb-3">
            {currentSlide.presenterNotes}
          </p>
          {currentSlide.vivaTip && (
            <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-semibold">Professor Viva Tip: </strong>
                {currentSlide.vivaTip}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Thumbnails Drawer */}
      {showThumbnails && (
        <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
          <div className="flex items-center gap-3">
            {deck.slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`flex-shrink-0 w-36 text-left p-2.5 rounded-lg border text-xs transition-all ${
                  idx === currentSlideIndex
                    ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="text-[10px] font-mono text-indigo-400 font-bold mb-1">
                  Slide {idx + 1}
                </div>
                <div className="truncate font-semibold text-white">
                  {s.title}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {s.presenter || s.module}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Navigation & Slide Counter Control Bar */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none text-slate-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.min(prev + 1, deck.slides.length - 1))}
            disabled={currentSlideIndex === deck.slides.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white font-medium transition-colors shadow-sm"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Slide Counter Dots or Numerical */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5">
            {deck.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlideIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlideIndex
                    ? 'w-6 bg-indigo-500'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <span className="font-mono text-slate-300 font-medium">
            {currentSlideIndex + 1} / {deck.slides.length}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500 font-mono">
          <span>Use [←] / [→] keys to navigate</span>
        </div>
      </div>
    </div>
  );
};
