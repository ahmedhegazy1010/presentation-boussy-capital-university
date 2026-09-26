import React from 'react';
import { motion } from 'framer-motion';
import { SlideHeader } from '../SlideHeader';
import { timelineMilestones } from '../../data/academicContent';

export const Slide10EvolutionTimeline: React.FC = () => {
  return (
    <section id="slide-10" className="slide-section relative overflow-hidden bg-slate-50 py-3 sm:py-5 px-3 sm:px-6">
      <div className="max-w-[1550px] mx-auto w-full">
        <SlideHeader
          slideNumber={10}
          totalSlides={12}
          title="خط التطور التاريخي للفكر الإداري"
        />

        {/* Thematic Photo Banner */}
        <div className="h-36 sm:h-44 w-full rounded-2xl overflow-hidden relative shadow-xs mb-3.5 border border-slate-200">
          <img
            src="./images/slide10_timeline.jpg"
            alt="الأهرامات المصرية شاهداً على عبقرية الإدارة والتنظيم في الحضارات القديمة"
            className="w-full h-full object-cover"
          />
          
        </div>

        {/* All 4 Historical Milestones Visible Directly - No Clicks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2 items-start">
          {timelineMilestones.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              className="bg-white rounded-xl p-4 border border-slate-200 text-right shadow-xs h-fit"
            >
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#062A5A]/5 text-[#062A5A]">
                  مرحلة 0{idx + 1}
                </span>
                <span className="text-[11px] font-bold text-[#D4AF37]">
                  {m.period}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-[#062A5A] mb-1">
                {m.era}
              </h3>
              <h4 className="text-xs font-bold text-slate-500 mb-2">
                {m.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                {m.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
