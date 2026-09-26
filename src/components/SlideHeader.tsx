import React from 'react';

interface SlideHeaderProps {
  slideNumber: number;
  totalSlides?: number;
  title: string;
  subtitle?: string;
}

export const SlideHeader: React.FC<SlideHeaderProps> = ({
  slideNumber,
  totalSlides = 12,
  title,
  subtitle,
}) => {
  return (
    <div className="mb-5 sm:mb-6 text-right border-b border-slate-200/80 pb-3">
      <div className="flex items-center justify-between gap-3 mb-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#062A5A] tracking-tight">
          {title}
        </h2>

        <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-[#062A5A] text-white">
          {String(slideNumber).padStart(2, '0')} / {totalSlides}
        </span>
      </div>

      {subtitle && (
        <p className="mt-1 text-xs sm:text-sm text-slate-600 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};
