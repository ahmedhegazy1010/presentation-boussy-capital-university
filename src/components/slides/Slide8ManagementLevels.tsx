import React from 'react';
import { motion } from 'framer-motion';
import { SlideHeader } from '../SlideHeader';
import { managementLevelsData } from '../../data/academicContent';

export const Slide8ManagementLevels: React.FC = () => {
  return (
    <section id="slide-8" className="slide-section relative overflow-hidden bg-slate-50 py-3 sm:py-5 px-3 sm:px-6">
      <div className="max-w-[1550px] mx-auto w-full">
        <SlideHeader
          slideNumber={8}
          totalSlides={12}
          title="الهيكل الهرمي لمستويات الإدارة"
        />

        {/* Thematic Photo Banner */}
        <div className="h-32 sm:h-38 w-full rounded-2xl overflow-hidden relative shadow-xs mb-3.5 border border-slate-200">
          <img
            src="./images/slide8_levels.jpg"
            alt="الهيكل الهرمي والتدرج الإداري"
            className="w-full h-full object-cover"
          />
        
        </div>

        {/* All 3 Levels Wrapped Tightly to Their Exact Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 items-start">
          {managementLevelsData.map((lvl, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className={`bg-white rounded-xl p-4 border text-right shadow-xs h-fit ${
                idx === 0
                  ? 'border-t-4 border-t-[#062A5A] border-slate-200'
                  : idx === 1
                  ? 'border-t-4 border-t-[#D4AF37] border-slate-200'
                  : 'border-t-4 border-t-slate-500 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  المستوى 0{idx + 1}
                </span>
                <span className="text-[11px] font-bold text-[#D4AF37]">
                  {lvl.timeHorizon}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-[#062A5A] mb-1">
                {lvl.level}
              </h3>
              <h4 className="text-xs font-bold text-slate-500 mb-2">
                {lvl.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                {lvl.focus}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
