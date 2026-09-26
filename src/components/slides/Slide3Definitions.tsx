import React from 'react';
import { motion } from 'framer-motion';
import { SlideHeader } from '../SlideHeader';

export const Slide3Definitions: React.FC = () => {
  const definitions = [
    {
      num: 1,
      scholar: "فريدريك تايلور Frederick Taylor - 1911",
      quote: "الإدارة هي أن تعرف بالضبط ماذا تريد ثم تتأكد أن الأفراد يؤدونه بأحسن وأرخص طريقة ممكنة.",
      note: ""
    },
    {
      num: 2,
      scholar: "هنري فايول Henri Fayol - 1916",
      quote: "الإدارة هي التنبؤ والتخطيط والتنظيم وإصدار الأوامر والتنسيق والرقابة.",
      note: ""
    },
    {
      num: 3,
      scholar: "جيمس دونلي James Donnelly وآخرون - 1987",
      quote: "الإدارة هي عملية استخدام الموارد البشرية والمادية بفعالية وكفاءة لتحقيق الأهداف.",
      note: ""
    },
    {
      num: 4,
      scholar: "نيكلس ودورسي Nickell & Dorsey - 2002",
      quote: "إدارة المنزل هي التخطيط والتنظيم والتنفيذ والتقويم لاستخدام الموارد المتاحة لتحقيق أهداف الأسرة.",
      note:  ""
    },
    {
      num: 5,
      scholar: "جروس وكرندال Gross & Crandall - 1963",
      quote: "إدارة المنزل هي عملية عقلية تتضمن التخطيط والضبط والتقويم باستخدام الموارد لما فيه صالح الأسرة.",
      note: ""
    },
    {
      num: 6,
      scholar: "دليل جولدسميث Goldsmith - 1995",
      quote: "الإدارة هي عملية اتخاذ القرارات واستخدام الموارد لتحقيق أهداف الأسرة والمؤسسات.",
      note: ""
    },
    {
      num: 7,
      scholar: "أحدث تعريف: رايتش وويليامز - 2018",
      quote: "الإدارة هي الاستخدام الأمثل للموارد المحدودة لتحقيق أقصى إشباع ممكن لحاجات الأسرة المتغيرة.",
      note: "أحدث تأصيل أكاديمي معاصر للموارد الأسرية"
    }
  ];

  return (
    <section id="slide-3" className="slide-section relative overflow-hidden bg-slate-50 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <SlideHeader
          slideNumber={3}
          totalSlides={12}
          title="مصفوفة تعاريف الإدارة"
          
        />

        {/* Thematic Photo Banner */}
        <div className="h-32 sm:h-36 w-full rounded-2xl overflow-hidden relative shadow-xs mb-3.5 border border-slate-200">
          <img
            src="./images/slide3_definitions.jpg"
            alt="المراجع الأكاديمية وتعريفات رواد الإدارة"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062A5A]/80 via-transparent to-transparent flex items-end p-3 sm:p-4">
            
          </div>
        </div>

        {/* Clean, Simple, Direct Grid - All visible at once, No Hidden Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-2 items-start">
          {definitions.map((item) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: item.num * 0.04 }}
              className={`bg-white rounded-xl p-4 border text-right shadow-xs h-fit ${
                item.num === 7
                  ? 'md:col-span-2 border-r-4 border-r-[#D4AF37] border-slate-200 bg-amber-50/30'
                  : item.note
                  ? 'border-r-4 border-r-[#062A5A] border-slate-200'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
                <h3 className="font-extrabold text-sm sm:text-base text-[#062A5A]">
                  {item.scholar}
                </h3>
                {item.note && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#062A5A] border border-blue-100">
                    {item.note}
                  </span>
                )}
              </div>

              <blockquote className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed bg-slate-50/80 p-2.5 rounded-lg border-r-2 border-[#D4AF37]">
                "{item.quote}"
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
