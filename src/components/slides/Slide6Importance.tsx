import React from 'react';
import { motion } from 'framer-motion';
import { SlideHeader } from '../SlideHeader';
import { importanceData } from '../../data/academicContent';

export const Slide6Importance: React.FC = () => {
  return (
    <section id="slide-6" className="slide-section relative overflow-hidden bg-slate-50 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <SlideHeader
          slideNumber={6}
          totalSlides={12}
          title="أهمية الإدارة وجدوى الموارد"
          
        />

        {/* Thematic Photo Banner */}
        <div className="h-32 sm:h-36 w-full rounded-2xl overflow-hidden relative shadow-xs mb-3.5 border border-slate-200">
          <img
            src="/images/slide6_importance.jpg"
            alt="كفاءة الموارد والتحليل الاستراتيجي"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062A5A]/80 via-transparent to-transparent flex items-end p-3 sm:p-4">
            
          </div>
        </div>

        {/* All 6 Importance Pillars Visible Directly - No Click to Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-2 items-start">
          {importanceData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl p-4 border border-slate-200 text-right shadow-xs h-fit"
            >
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#062A5A]/5 text-[#062A5A]">
                  محور 0{index + 1}
                </span>
                <span className="text-[11px] font-bold text-[#D4AF37]">
                  {item.metric}
                </span>
              </div>

              <h3 className="font-extrabold text-sm sm:text-base text-[#062A5A] mb-1.5">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                {item.summary}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
