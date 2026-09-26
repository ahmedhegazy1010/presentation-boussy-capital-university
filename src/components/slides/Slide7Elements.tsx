import React from 'react';
import { motion } from 'framer-motion';
import { SlideHeader } from '../SlideHeader';
import { elementsData } from '../../data/academicContent';

export const Slide7Elements: React.FC = () => {
  return (
    <section id="slide-7" className="slide-section relative overflow-hidden bg-slate-50 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <SlideHeader
          slideNumber={7}
          totalSlides={12}
          title="عناصر العملية الإدارية (النموذج المتكامل)"
          
        />

        {/* Thematic Photo Banner */}
        <div className="h-32 sm:h-36 w-full rounded-2xl overflow-hidden relative shadow-xs mb-3.5 border border-slate-200">
          <img
            src="./images/slide7_elements.jpg"
            alt="تخطيط وتنظيم وتوجيه العمليات"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062A5A]/80 via-transparent to-transparent flex items-end p-3 sm:p-4">
            
          </div>
        </div>

        {/* 5 Elements Displayed Directly and Clearly - Tightly Fitted to Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-2 items-start">
          {elementsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`bg-white rounded-xl p-4 border text-right shadow-xs h-fit ${
                idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              } border-slate-200`}
            >
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
                <span className="w-6 h-6 rounded-md text-xs font-mono font-bold flex items-center justify-center bg-[#062A5A] text-white">
                  0{item.order}
                </span>
                <span className="text-xs font-bold text-[#D4AF37]">
                  {item.name.split('(')[1]?.replace(')', '') || ''}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-[#062A5A] mb-1.5">
                {item.name.split('(')[0]}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
