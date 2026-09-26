import React, { useState } from 'react';
import { X, Printer, Check, Sparkles, Presentation, Copy, Loader2, FileDown } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isExportingPptx, setIsExportingPptx] = useState(false);
  const [pptxStatus, setPptxStatus] = useState<string>('');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPptx = async () => {
    if (isExportingPptx) return;
    setIsExportingPptx(true);
    try {
      const { generateAndDownloadPptx } = await import('../utils/generatePptx');
      await generateAndDownloadPptx((msg) => setPptxStatus(msg));
    } catch (error) {
      console.error('Failed to export PPTX:', error);
      alert('حدث خطأ أثناء تنزيل ملف البوربوينت. يرجى إعادة المحاولة.');
    } finally {
      setIsExportingPptx(false);
      setPptxStatus('');
    }
  };

  const handleCopyOutline = () => {
    const text = `تحليل الإدارة وإدارة موارد الأسرة - هيكل الشرائح الأكاديمي (12 شريحة):
1. شريحة 01: المقدمة وعنوان البحث الأكاديمي
2. شريحة 02: المقدمة التاريخية وتأصيل نشأة الإدارة
3. شريحة 03: مصفوفة التعاريف الأكاديمية (تايلور، فايول، دراكر، منظمة العمل الدولية، نيكل ودورسي، غروس وكراندال)
4. شريحة 04: التعريف الحديث للإدارة وتكامل الموارد والاستدامة وجودة الحياة
5. شريحة 05: الخصائص الجوهرية للعملية الإدارية (الاستمرارية، العنصر البشري، الغائية، الكفاءة، الندرة)
6. شريحة 06: المحاور الستة لأهمية الإدارة وجدوى الموارد
7. شريحة 07: عناصر العملية الإدارية (التخطيط، التنظيم، التوجيه، التنسيق، الرقابة)
8. شريحة 08: الهيكل الهرمي لمستويات الإدارة (العليا، الوسطى، التنفيذية) ونموذج مهارات كاتز
9. شريحة 09: الأنماط القيادية والإدارية الأربعة ومصفوفة المزايا والعيوب
10. شريحة 10: خط التطور التاريخي للفكر الإداري (الحضارات القديمة -> الثورة الصناعية -> الإدارة العلمية -> المدارس الحديثة)
11. شريحة 11: المدارس الإدارية الخمس الكبرى (الكلاسيكية، السلوكية، الكمية، النظم، الموقفية)
12. شريحة 12: الخاتمة والمعادلة الذهبية للإدارة المعاصرة`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm no-print">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-5 left-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-right mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#062A5A]/5 text-[#062A5A] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>جاهزية التحويل إلى عرض تقديمي (PowerPoint / PDF)</span>
          </div>
          <h3 className="text-2xl font-black text-[#062A5A]">
            تصدير العرض التقديمي وتحويله لشرائح
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            لقد صُممت كل صفحة وقسم في هذا الموقع بنسب الأبعاد التقديمية 16:9 مع فواصل صفحات ذكية (Page Breaks) لتحويل مباشر بنقرة واحدة.
          </p>
        </div>

        {/* Conversion Steps / Options */}
        <div className="space-y-4 text-right">
          {/* Option 1: Direct 16:9 PDF Export */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Printer className="w-5 h-5 text-[#062A5A]" />
                <h4 className="font-bold text-sm sm:text-base text-gray-900">
                  1. طباعة أو حفظ مباشر كملف PDF للشرائح (موصى به)
                </h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                الملف مبرمج تلقائياً على مقاس العرض التقديمي Full HD بأبعاد دقيقة 1920 × 1080 (16:9 Landscape)؛ عند النقر على الزر، اختر "حفظ بتنسيق PDF" (Save as PDF) مع تمكين "الرسومات الخلفية" للحصول على 12 شريحة كاملة بأعلى جودة.
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="cursor-pointer flex-shrink-0 px-4 py-2.5 rounded-xl bg-[#062A5A] hover:bg-[#041c3d] text-white text-xs font-bold shadow-md transition-all"
            >
              طباعة / حفظ PDF
            </button>
          </div>

          {/* Option 2: Direct PowerPoint Download */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <Presentation className="w-5 h-5 text-[#D4AF37]" />
                <h4 className="font-bold text-sm sm:text-base text-gray-900">
                  2. تنزيل ملف PowerPoint (.pptx) أصلي ومباشر
                </h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                توليد ملف بوربوينت كامل (12 شريحة) متوافق مع كافة إصدارات مايكروسوفت أوفيس بنسب أبعاد 16:9 العريضة، شاملاً هوية جامعة العاصمة، والصور عالية الدقة وتنسيقات النصوص العربية الأصيلة.
              </p>
              {isExportingPptx && (
                <div className="mt-2 text-xs font-bold text-[#062A5A] flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                  <span>{pptxStatus || 'جاري تجهيز وتنزيل ملف البوربوينت...'}</span>
                </div>
              )}
            </div>
            <button
              onClick={handleDownloadPptx}
              disabled={isExportingPptx}
              className="cursor-pointer flex-shrink-0 px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#b89528] text-[#062A5A] text-xs font-black shadow-md transition-all flex items-center gap-2 disabled:opacity-60"
            >
              {isExportingPptx ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#062A5A]" />
                  <span>جاري التحميل...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 text-[#062A5A]" />
                  <span>تحميل PowerPoint (.pptx)</span>
                </>
              )}
            </button>
          </div>

          {/* Option 3: Copy Structured Outline */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-gray-900 mb-0.5">
                نسخ فهرس الشرائح الـ 12 المعتمد
              </h4>
              <p className="text-[11px] text-gray-500">
                لإدراجه في مذكرة العرض أو مخطط تقديم البوربوينت
              </p>
            </div>
            <button
              onClick={handleCopyOutline}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-gray-700 text-xs font-bold border border-gray-300 transition-all shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">تم النسخ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ الفهرس</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
