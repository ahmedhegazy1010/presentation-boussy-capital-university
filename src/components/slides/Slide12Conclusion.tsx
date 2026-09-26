import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideHeader } from '../SlideHeader';
import { FileDown, Loader2, Download } from 'lucide-react';

interface Slide12ConclusionProps {
  onOpenExportModal: () => void;
  onRestart: () => void;
}

export const Slide12Conclusion: React.FC<Slide12ConclusionProps> = ({
  onOpenExportModal,
  onRestart
}) => {
  const [isDownloadingPptx, setIsDownloadingPptx] = useState(false);
  const [pptxStatus, setPptxStatus] = useState<string>('');

  const handleDownloadPptx = async () => {
    if (isDownloadingPptx) return;
    setIsDownloadingPptx(true);
    try {
      const { generateAndDownloadPptx } = await import('../../utils/generatePptx');
      await generateAndDownloadPptx((msg) => setPptxStatus(msg));
    } catch (error) {
      console.error('Failed to export PPTX:', error);
      alert('حدث خطأ أثناء تنزيل ملف البوربوينت. يرجى إعادة المحاولة.');
    } finally {
      setIsDownloadingPptx(false);
      setPptxStatus('');
    }
  };
  return (
    <section id="slide-12" className="slide-section relative overflow-hidden bg-slate-50 py-3 sm:py-5 px-3 sm:px-6">
      <div className="max-w-[1550px] mx-auto w-full">
        <SlideHeader
          slideNumber={12}
          totalSlides={12}
          title="الخاتمة والمعادلة الجوهرية للإدارة المعاصرة"
        />

        {/* Thematic Photo Banner */}
        <div className="h-36 sm:h-44 w-full rounded-2xl overflow-hidden relative shadow-xs mb-4 border border-slate-200">
          <img
            src="./images/slide12_conclusion.jpg"
            alt="أفق التوازن المتناغم بين الإنسان والموارد والهدف"
            className="w-full h-full object-cover"
          />
          
        </div>

        {/* Master Formula Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border-t-8 border-t-[#062A5A] border-x border-b border-slate-200 text-right shadow-md mb-5"
        >
          <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100">
            <span className="text-xs font-bold px-3 py-1 rounded bg-[#062A5A]/5 text-[#062A5A]">
              المعادلة الأكاديمية الجامعة
            </span>
            <span className="text-xs font-bold text-[#D4AF37]">
              جامعة العاصمة • كلية الاقتصاد المنزلي
            </span>
          </div>

          <h3 className="text-xl sm:text-3xl font-black text-[#062A5A] mb-3 leading-snug">
            الإدارة = توازن متناغم ومستمر بين <br className="hidden sm:inline" />
            <span className="text-[#D4AF37]">الإنسان</span> + <span className="text-[#062A5A]">الموارد</span> + <span className="text-emerald-700">الهدف</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed text-justify mb-4">
            ليست الإدارة مجرد نظريات مجردة أو إجراءات جامدة، بل هي الفن الإنساني والعلم التطبيقي الذي يوجه موارد الأسرة والمؤسسة نحو الاستقرار والكفاءة وجودة الحياة. فإذا اختل أحد أركان هذا الثالوث (أُهمل الإنسان، أو أُهدرت الموارد، أو غاب الهدف)، فقدت المنظومة توازنها وفاعليتها.
          </p>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 font-semibold bg-slate-50 p-3 rounded-xl">
            <span>مقدم من الباحثة / بوسي أحمد هنداوي</span>
            <span>إشراف: أ. د / وفاء شلبي • أ. م. د / مروة مسعد</span>
          </div>
        </motion.div>

        {/* 3 Pillars Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-5 items-start">
          <div className="bg-white rounded-xl p-4 border border-slate-200 text-right shadow-xs h-fit">
            <h4 className="font-extrabold text-sm text-[#062A5A] mb-1">1. محورية الإنسان</h4>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              الإنسان هو صانع الإدارة ومستهدفها؛ وكرامته وسعادته هي معيار النجاح الأسمى في المؤسسة والبيت.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 text-right shadow-xs h-fit">
            <h4 className="font-extrabold text-sm text-[#062A5A] mb-1">2. استدامة الموارد</h4>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              ترشيد الوقت والمال والجهد، ومواجهة الندرة النسبية بالكفاءة والتخطيط الواعي.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 text-right shadow-xs h-fit">
            <h4 className="font-extrabold text-sm text-[#062A5A] mb-1">3. وضوح الغاية</h4>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              تحديد الأولويات بدقة؛ فكل جهد لا يخدم الغايات الأسرية أو المؤسسية يعد هدراً ينبغي تقويمه.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Direct PPTX Download Button */}
            <button
              onClick={handleDownloadPptx}
              disabled={isDownloadingPptx}
              className="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#b89528] text-[#062A5A] text-xs font-black shadow-xs transition-colors disabled:opacity-60"
            >
              {isDownloadingPptx ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#062A5A]" />
                  <span>{pptxStatus || 'جاري التنزيل...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#062A5A]" />
                  <span>تحميل PowerPoint (.pptx)</span>
                </>
              )}
            </button>

            {/* Export / PDF Modal */}
            <button
              onClick={onOpenExportModal}
              className="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#062A5A] hover:bg-[#041c3d] text-white text-xs font-bold shadow-xs transition-colors"
            >
              <FileDown className="w-4 h-4 text-[#D4AF37]" />
              <span>خيارات التصدير والطباعة (PDF)</span>
            </button>

            <button
              onClick={onRestart}
              className="cursor-pointer px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              العودة للغلاف (شريحة 1)
            </button>
          </div>

          <span className="text-[11px] text-slate-500 font-medium">
            عرض أكاديمي كامل ومختصر (12 شريحة)
          </span>
        </div>
      </div>
    </section>
  );
};
