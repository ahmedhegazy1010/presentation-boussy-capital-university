import React from 'react';
import { motion } from 'framer-motion';
import { SlideHeader } from '../SlideHeader';
import { schoolsOfManagementData } from '../../data/academicContent';

export const Slide11SchoolsOfManagement: React.FC = () => {
  return (
    <section id="slide-11" className="slide-section relative overflow-hidden bg-slate-50 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <SlideHeader
          slideNumber={11}
          totalSlides={12}
          title="مدارس الفكر الإداري الكبرى"
        />

        {/* Thematic Photo Banner */}
        <div className="h-32 sm:h-38 w-full rounded-2xl overflow-hidden relative shadow-xs mb-3.5 border border-slate-200">
          <img
            src="/images/slide11_schools.jpg"
            alt="أعمدة وركائز الفكر الإداري الكبرى"
            className="w-full h-full object-cover"
          />
          

        </div>

        {/* All 5 Schools of Management Visible Directly - No Clicks or Hidden Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-2 items-start">
          {schoolsOfManagementData.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`bg-white rounded-xl p-4 border border-slate-200 text-right shadow-xs h-fit ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#062A5A]/5 text-[#062A5A]">
                  مدرسة 0{idx + 1}
                </span>
                <span className="text-[11px] font-bold text-[#D4AF37]">
                  {s.era}
                </span>
              </div>

              <h3 className="font-extrabold text-sm sm:text-base text-[#062A5A] mb-1">
                {s.name.split('(')[0]}
              </h3>

              <div className="text-[11px] text-slate-500 font-semibold mb-2">
                الرواد: {s.keyPioneers.slice(0, 2).join('، ')}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                {s.coreIdea}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
