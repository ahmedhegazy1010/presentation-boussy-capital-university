import React from 'react';
import { motion } from 'framer-motion';
import { SlideHeader } from '../SlideHeader';

export const Slide4ModernDefinition: React.FC = () => {
  return (
    <section id="slide-4" className="slide-section relative overflow-hidden bg-slate-50 py-3 sm:py-5 px-3 sm:px-6">
      <div className="max-w-[1550px] mx-auto w-full">
        <SlideHeader
          slideNumber={4}
          totalSlides={12}
          title="التعريف الحديث للإدارة وإدارة موارد الأسرة"
          subtitle="تكامل الاستخدام الأمثل للموارد والاستدامة وجودة الحياة"
        />

        {/* Thematic Photo Banner */}
        <div className="h-36 sm:h-44 w-full rounded-2xl overflow-hidden relative shadow-xs mb-4 border border-slate-200">
          <img
            src="./images/slide4_modern.jpg"
            alt="الاستدامة وجودة الحياة الأسرية المعاصرة"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062A5A]/80 via-transparent to-transparent flex items-end p-3 sm:p-4">
            
          </div>
        </div>

        {/* Master Definition Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-5 border-r-4 border-r-[#062A5A] border-slate-200 shadow-xs mb-4 text-right"
        >
          <span className="text-[11px] font-bold text-[#D4AF37] block mb-1">
            التعريف المعاصر التركيبي
          </span>
          <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed text-justify">
            "الإدارة الحديثة هي منظومة متكاملة من القرارات والعمليات تهدف إلى الاستخدام الأمثل للموارد المتاحة (البشرية، المادية، المعرفية، والزمنية)، لضمان الاستدامة الشاملة والارتقاء المستمر بجودة الحياة ورفاهية الأسرة والمؤسسة."
          </p>
        </motion.div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 items-start">
          <div className="bg-white rounded-xl p-4 border border-slate-200 text-right shadow-xs h-fit">
            <h3 className="font-extrabold text-sm sm:text-base text-[#062A5A] mb-1.5 pb-1 border-b border-slate-100">
              1. الاستخدام الأمثل للموارد
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              منع الهدر وتحقيق أعلى عائد بأقل استهلاك للطاقات:
            </p>
            <ul className="space-y-1 text-xs text-slate-700">
              <li>• <strong>موارد بشرية:</strong> طاقات ومهارات ووقت.</li>
              <li>• <strong>موارد غير بشرية:</strong> دخل وممتلكات ومرافق.</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 text-right shadow-xs h-fit">
            <h3 className="font-extrabold text-sm sm:text-base text-[#062A5A] mb-1.5 pb-1 border-b border-slate-100">
              2. الاستدامة الشاملة
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              حماية الموارد للحاضر والمستقبل:
            </p>
            <ul className="space-y-1 text-xs text-slate-700">
              <li>• <strong>استدامة مالية:</strong> ادخار تحوطي وإدارة رشيدة.</li>
              <li>• <strong>استدامة أسرية:</strong> تماسك الروابط عبر الأجيال.</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 text-right shadow-xs h-fit">
            <h3 className="font-extrabold text-sm sm:text-base text-[#062A5A] mb-1.5 pb-1 border-b border-slate-100">
              3. جودة الحياة والرفاه
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              الغاية الإنسانية السامية للإدارة:
            </p>
            <ul className="space-y-1 text-xs text-slate-700">
              <li>• <strong>التوازن الحياتي:</strong> التوفيق بين العمل والأسرة.</li>
              <li>• <strong>الأمن النفسي:</strong> تقليل التوتر بالقضاء على العشوائية.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
