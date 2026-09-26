import React from 'react';
import { motion } from 'framer-motion';

export const Slide1Hero: React.FC = () => {
  return (
    <section id="slide-1" className="slide-section relative overflow-hidden bg-slate-50 flex flex-col justify-center min-h-screen py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto w-full">
        {/* Main Clean Academic Slide Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl border-t-8 border-t-[#062A5A] border-x border-b border-slate-200/80 text-right relative overflow-hidden"
        >
          {/* Top Header: Logo + Faculty & Department */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <img
                src="./images/capital_university_logo.png"
                alt="لوجو جامعة العاصمة"
                className="h-16 sm:h-20 w-auto object-contain drop-shadow-sm"
              />
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#062A5A] leading-tight">
                  جامعة العاصمة
                </h3>
                <h4 className="text-sm sm:text-base font-bold text-slate-800">
                  كلية الاقتصاد المنزلي
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                  قسم إدارة مؤسسات الأسرة والطفولة
                </p>
              </div>
            </div>

            <div className="text-left font-mono">
              <span className="inline-block px-3 py-1 rounded-lg text-xs sm:text-sm font-bold bg-[#062A5A]/5 text-[#062A5A] border border-[#062A5A]/15 mb-1">
                تمهيدي ماجستير
              </span>
              <span className="block text-xs font-bold text-[#D4AF37]">
                إدارة موارد متقدم
              </span>
            </div>
          </div>

          {/* Central Title */}
          <div className="py-6 sm:py-8 text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#062A5A] tracking-tight leading-tight">
              نشأة الفكر الاداري ومراحل تطوره واهم رواده
            </h1>
          </div>

          {/* Academic Visual Showcase */}
          <div className="h-44 sm:h-56 w-full rounded-2xl overflow-hidden relative shadow-sm mb-6 border border-slate-200">
            <img
              src="./images/slide1_cover.jpg"
              alt="صرح أكاديمي ومعرفي"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#062A5A]/80 via-transparent to-transparent flex items-end p-4">
              
            </div>
          </div>

          {/* Bottom Footer: Researcher & Academic Supervision */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50/70 p-5 rounded-2xl">
            {/* Researcher */}
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 block mb-1">
                مقدم من الباحثة /
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#062A5A]">
                بوسي أحمد هنداوي
              </h3>
            </div>

            {/* Supervisors */}
            <div className="text-right sm:border-r sm:border-slate-200 sm:pr-6">
              <span className="text-xs font-bold text-slate-400 block mb-1">
                تحت إشراف /
              </span>
              <div className="space-y-1">
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  أ. د / وفاء شلبي
                </p>
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  أ. م. د / مروة مسعد
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
