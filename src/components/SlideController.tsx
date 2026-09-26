import React, { useEffect } from 'react';
import { ChevronRight, ChevronLeft, Play, Pause } from 'lucide-react';

interface SlideControllerProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (slide: number) => void;
  viewMode?: 'landing' | 'slides';
  isAutoPlay?: boolean;
  onToggleAutoPlay?: () => void;
  autoPlayProgress?: number;
}

export const SlideController: React.FC<SlideControllerProps> = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onSelectSlide,
  isAutoPlay = false,
  onToggleAutoPlay,
  autoPlayProgress = 0,
}) => {
  // Keyboard navigation and spacebar support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        onPrev(); // in RTL, ArrowRight moves backward
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        onNext(); // in RTL, ArrowLeft moves forward
      } else if (e.key === ' ' || e.key.toLowerCase() === 'p') {
        // Spacebar or 'P' toggles Auto-Play Slideshow
        e.preventDefault();
        if (onToggleAutoPlay) onToggleAutoPlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrev, onNext, onToggleAutoPlay]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 no-print flex flex-col items-center gap-1.5">
      {/* Floating Controller Pill */}
      <div className="bg-white/95 px-3 py-1.5 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-2 sm:gap-3 backdrop-blur-md relative overflow-hidden">
        {/* Subtle bottom progress line when Auto-Play is running */}
        {isAutoPlay && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-100">
            <div
              className="h-full bg-[#D4AF37] transition-all duration-75 ease-linear"
              style={{ width: `${autoPlayProgress}%` }}
            />
          </div>
        )}

        {/* Next Slide (Forward in RTL is Left) */}
        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides && !isAutoPlay}
          className="cursor-pointer p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-[#062A5A] transition-colors"
          title="الشريحة التالية (السهم الأيسر)"
        >
          <ChevronLeft className="w-4 h-4 text-[#062A5A]" />
        </button>

        {/* Auto-Play Toggle Button */}
        {onToggleAutoPlay && (
          <button
            onClick={onToggleAutoPlay}
            className={`cursor-pointer flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              isAutoPlay
                ? 'bg-[#D4AF37] text-[#062A5A] shadow-xs ring-2 ring-[#D4AF37]/50 animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title={isAutoPlay ? 'إيقاف التحرك التلقائي (مسافة)' : 'تشغيل العرض التلقائي كـ PowerPoint (مسافة)'}
          >
            {isAutoPlay ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-[#062A5A] text-[#062A5A]" />
                <span className="hidden sm:inline text-[11px] font-black">إيقاف</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-[#062A5A] text-[#062A5A]" />
                <span className="hidden sm:inline text-[11px] font-bold">عرض تلقائي</span>
              </>
            )}
          </button>
        )}

        {/* Slide Counter & Dots */}
        <div className="flex items-center gap-1.5 px-1">
          <span className="text-xs font-mono font-black text-[#062A5A]">
            {String(currentSlide).padStart(2, '0')}
          </span>
          <span className="text-xs text-slate-400 font-bold">/</span>
          <span className="text-xs font-mono font-bold text-slate-500">
            {String(totalSlides).padStart(2, '0')}
          </span>

          {/* Quick Dots */}
          <div className="hidden sm:flex items-center gap-1 mr-2 pr-2 border-r border-slate-200">
            {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => {
              const isActive = num === currentSlide;
              return (
                <button
                  key={num}
                  onClick={() => onSelectSlide(num)}
                  className={`cursor-pointer transition-all rounded-full ${
                    isActive
                      ? 'w-4 h-1.5 bg-[#D4AF37]'
                      : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={`انتقال إلى شريحة ${num}`}
                />
              );
            })}
          </div>
        </div>

        {/* Previous Slide (Back in RTL is Right) */}
        <button
          onClick={onPrev}
          disabled={currentSlide === 1 && !isAutoPlay}
          className="cursor-pointer p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-[#062A5A] transition-colors"
          title="الشريحة السابقة (السهم الأيمن)"
        >
          <ChevronRight className="w-4 h-4 text-[#062A5A]" />
        </button>
      </div>
    </div>
  );
};
