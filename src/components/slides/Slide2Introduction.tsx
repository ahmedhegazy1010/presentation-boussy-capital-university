import React from 'react';
import { motion } from 'framer-motion';
import { SlideHeader } from '../SlideHeader';

export const Slide2Introduction: React.FC = () => {
  const pillars = [
    {
      step: "المرتكز الأول",
      title: "الإدارة قديمة بقدم الإنسان والوجود البشري",
      text: "بدأت الإدارة كممارسة فطرية مع سعي الإنسان لتأمين قوته وحماية مسكنه وتخزين المؤونة وتوزيع المسؤوليات داخل الأسرة، فالحاجة لتنظيم الجهد وتفادي المخاطر دفعت الإنسان لابتكار أساليب أولية للتخطيط وتوزيع الأدوار.",
      familyImpact: "الفطرة التنظيمية هي النواة الأولى لإدارة الكيان الأسري والمنزلي عبر التاريخ."
    },
    {
      step: "المرتكز الثاني",
      title: "نشوء الإدارة الحتمي مع العمل الجماعي والتعاون",
      text: "أدرك الإنسان عجزه المنفرد عن مواجهة تحديات الطبيعة؛ ومن هنا برزت حتمية التعاون. وحين يجتمع الأفراد لتحقيق هدف مشترك تبرز الحاجة لمن يقود ويوزع المهام ويحدد المعايير، فالإدارة هي الغراء التنظيمي للعمل المشترك.",
      familyImpact: "الأسرة هي النموذج الأوضح للتعاون التشاركي وتكامل الأدوار."
    },
    {
      step: "المرتكز الثالث",
      title: "تطور الإدارة التبادلي مع المجتمع والتقدم التقني",
      text: "تطورت الإدارة مع الثورة الزراعية ثم الثورة الصناعية وظهور المصانع وتقسيم العمل، وصولاً إلى عصر الإدارة الذكية والتحول الرقمي وإدارة البيانات التي جعلت الإدارة علماً متجدداً يواكب تغيرات الحياة.",
      familyImpact: "تطورت أدوات التدبير المنزلي من الوسائل التقليدية إلى الأنظمة الرقمية الذكية."
    },
    {
      step: "المرتكز الرابع",
      title: "أصبحت الإدارة العنصر الحاسم للنجاح والبقاء",
      text: "الموارد مهما بلغت ضخامتها تتبدد في ظل غياب الإدارة الرشيدة، بينما تستطيع الإدارة الواعية استثمار الموارد المحدودة وتحقيق الاستقرار، وهذا المبدأ ينطبق على المؤسسات والأسرة لحماية مقدراتها.",
      familyImpact: "الإدارة الواعية تضمن استقرار الأسرة النفسي والمالي وتفادي الأزمات."
    }
  ];

  return (
    <section id="slide-2" className="slide-section relative overflow-hidden bg-slate-50 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <SlideHeader
          slideNumber={2}
          totalSlides={12}
          title="المقدمة التاريخية والأكاديمية لنشأة الإدارة"
          
        />

        {/* Thematic Photo Banner */}
        <div className="h-32 sm:h-40 w-full rounded-2xl overflow-hidden relative shadow-xs mb-3.5 border border-slate-200">
          <img
            src="./images/slide2_intro.jpg"
            alt="العمل الجماعي والتعاون الإنساني"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062A5A]/80 via-transparent to-transparent flex items-end p-3 sm:p-4">
            
          </div>
        </div>

        {/* 4 Pillars Grid - Clean, Concise, No hidden clicks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-2 items-start">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white rounded-xl p-4 border border-slate-200 text-right shadow-xs h-fit"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#062A5A]/5 text-[#062A5A]">
                    {pillar.step}
                  </span>
                </div>

                <h3 className="font-extrabold text-sm sm:text-base text-[#062A5A] mb-2 leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed text-justify mb-3">
                  {pillar.text}
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
