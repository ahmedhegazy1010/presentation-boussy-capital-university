import React from 'react';
import { motion } from 'framer-motion';
import { SlideHeader } from '../SlideHeader';
import { managementStylesData } from '../../data/academicContent';

export const Slide9ManagementStyles: React.FC = () => {
  return (
    <section id="slide-9" className="slide-section relative overflow-hidden bg-slate-50 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <SlideHeader
          slideNumber={9}
          totalSlides={12}
          title="الأنماط الإدارية الأربعة"
        />

        {/* Thematic Photo Banner */}
        <div className="h-32 sm:h-36 w-full rounded-2xl overflow-hidden relative shadow-xs mb-3.5 border border-slate-200">
          <img
            src="/images/slide9_styles.jpg"
            alt="التفاعل والقيادة التشاركية"
            className="w-full h-full object-cover"
          />

        </div>

        {/* All 4 Styles Visible Directly - No Tabs or Clicks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2 items-start">
          {managementStylesData.map((style, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white rounded-xl p-4 border border-slate-200 text-right shadow-xs h-fit"
            >
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#062A5A]/5 text-[#062A5A]">
                  نمط 0{idx + 1}
                </span>
                <span className="text-[11px] font-bold text-[#D4AF37]">
                  {style.authorityLevel}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-[#062A5A] mb-1">
                {style.name}
              </h3>
              <span className="text-[11px] text-slate-400 font-mono block mb-2">
                {style.englishName}
              </span>

              <ul className="space-y-1.5 text-xs text-slate-600">
                {style.characteristics.slice(0, 2).map((char, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#062A5A] mt-1.5 flex-shrink-0"></span>
                    <span>{char}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
