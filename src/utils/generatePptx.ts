import pptxgen from 'pptxgenjs';
import {
  characteristicsData,
  importanceData,
  elementsData,
  managementLevelsData,
  managementStylesData,
  timelineMilestones,
  schoolsOfManagementData
} from '../data/academicContent';

// Helper to convert an image URL (from /images/...) to base64 data URL for PPTX embedding
async function urlToBase64(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function generateAndDownloadPptx(onProgress?: (msg: string) => void): Promise<void> {
  if (onProgress) onProgress('جاري إعداد عرض البوربوينت...');

  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.rtlMode = true; // 10 x 5.625 inches
  pptx.author = 'بوسي أحمد هنداوي';
  pptx.company = 'جامعة العاصمة - كلية الاقتصاد المنزلي';
  pptx.title = 'نشأة الفكر الاداري ومراحل تطوره واهم رواده';

  // Branding colors
  const NAVY = '062A5A';
  const GOLD = 'D4AF37';
  const BG_COLOR = 'F8FAFC';
  const TEXT_DARK = '1E293B';
  const TEXT_MUTED = '64748B';
  const CARD_BG = 'FFFFFF';
  const BORDER_COLOR = 'E2E8F0';

  // Helper for slide header
  const addHeader = (slide: pptxgen.Slide, slideNum: number, title: string, subtitle?: string) => {
    slide.background = { color: BG_COLOR };

    // Slide Number & University badge
    slide.addText(`0${slideNum} / 12  |  جامعة العاصمة • كلية الاقتصاد المنزلي`, {
      x: 0.6,
      y: 0.25,
      w: 8.8,
      h: 0.3,
      fontSize: 10,
      fontFace: 'Arial',
      color: GOLD,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    // Title
    slide.addText(title, {
      x: 0.6,
      y: 0.5,
      w: 8.8,
      h: 0.5,
      fontSize: 20,
      fontFace: 'Arial',
      color: NAVY,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.6,
        y: 0.95,
        w: 8.8,
        h: 0.3,
        fontSize: 10,
        fontFace: 'Arial',
        color: TEXT_MUTED,
        align: 'right',
        rtlMode: true
      });
    }

    // Divider line
    slide.addShape(pptx.ShapeType.line, {
      x: 0.6,
      y: subtitle ? 1.25 : 1.05,
      w: 8.8,
      h: 0,
      line: { color: BORDER_COLOR, width: 1 }
    });
  };

  // Helper to add banner image
  const addBanner = async (slide: pptxgen.Slide, imgUrl: string, caption: string, yPos: number, height: number = 1.3) => {
    const b64 = await urlToBase64(imgUrl);
    if (b64) {
      slide.addImage({
        data: b64,
        x: 0.6,
        y: yPos,
        w: 8.8,
        h: height,
        sizing: { type: 'cover', w: 8.8, h: height }
      });
      // Caption bar
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.6,
        y: yPos + height - 0.35,
        w: 8.8,
        h: 0.35,
        fill: { color: NAVY, transparency: 20 }
      });
      slide.addText(caption, {
        x: 0.8,
        y: yPos + height - 0.35,
        w: 8.4,
        h: 0.35,
        fontSize: 9,
        fontFace: 'Arial',
        color: 'FFFFFF',
        bold: true,
        align: 'right',
        rtlMode: true
      });
    }
  };

  // ==========================================
  // SLIDE 1: COVER
  // ==========================================
  if (onProgress) onProgress('تجهيز الشريحة 1 (الغلاف)...');
  const slide1 = pptx.addSlide();
  slide1.background = { color: BG_COLOR };

  // Top header with logo
  const logoB64 = await urlToBase64('/images/capital_university_logo.png');
  if (logoB64) {
    slide1.addImage({
      data: logoB64,
      x: 7.6,
      y: 0.35,
      w: 1.8,
      h: 0.8,
      sizing: { type: 'contain', w: 1.8, h: 0.8 }
    });
  }

  slide1.addText('جامعة العاصمة\nكلية الاقتصاد المنزلي\nقسم إدارة مؤسسات الأسرة والطفولة', {
    x: 3.5,
    y: 0.35,
    w: 3.8,
    h: 0.8,
    fontSize: 12,
    fontFace: 'Arial',
    color: NAVY,
    bold: true,
    align: 'right',
    rtlMode: true
  });

  slide1.addText('تمهيدي ماجستير  |  إدارة موارد متقدم', {
    x: 0.6,
    y: 0.5,
    w: 2.8,
    h: 0.4,
    fontSize: 10,
    fontFace: 'Arial',
    color: GOLD,
    bold: true,
    align: 'left',
    rtlMode: true
  });

  // Main Title Box
  slide1.addShape(pptx.ShapeType.rect, {
    x: 0.6,
    y: 1.35,
    w: 8.8,
    h: 1.0,
    fill: { color: CARD_BG },
    line: { color: NAVY, width: 2 }
  });

  slide1.addText('نشأة الفكر الاداري ومراحل تطوره واهم رواده', {
    x: 0.8,
    y: 1.45,
    w: 8.4,
    h: 0.8,
    fontSize: 26,
    fontFace: 'Arial',
    color: NAVY,
    bold: true,
    align: 'center',
    rtlMode: true
  });

  // Peabody Library Image
  const coverImgB64 = await urlToBase64('/images/slide1_cover.jpg');
  if (coverImgB64) {
    slide1.addImage({
      data: coverImgB64,
      x: 0.6,
      y: 2.45,
      w: 8.8,
      h: 1.9,
      sizing: { type: 'cover', w: 8.8, h: 1.9 }
    });
  }

  // Footer: Researcher & Supervision
  slide1.addShape(pptx.ShapeType.rect, {
    x: 0.6,
    y: 4.45,
    w: 8.8,
    h: 0.9,
    fill: { color: CARD_BG },
    line: { color: BORDER_COLOR, width: 1 }
  });

  slide1.addText('مقدم من الباحثة /\nبوسي أحمد هنداوي', {
    x: 5.2,
    y: 4.55,
    w: 4.0,
    h: 0.7,
    fontSize: 13,
    fontFace: 'Arial',
    color: NAVY,
    bold: true,
    align: 'right',
    rtlMode: true
  });

  slide1.addText('تحت إشراف /\nأ. د / وفاء شلبي  •  أ. م. د / مروة مسعد', {
    x: 0.8,
    y: 4.55,
    w: 4.2,
    h: 0.7,
    fontSize: 12,
    fontFace: 'Arial',
    color: TEXT_DARK,
    bold: true,
    align: 'right',
    rtlMode: true
  });

  // ==========================================
  // SLIDE 2: INTRODUCTION
  // ==========================================
  if (onProgress) onProgress('تجهيز الشريحة 2 (المقدمة)...');
  const slide2 = pptx.addSlide();
  addHeader(slide2, 2, 'المقدمة التاريخية والأكاديمية لنشأة الإدارة', 'تأصيل الفكر الإداري: من الفطرة والتعاون الإنساني إلى مواكبة التطور المجتمعي والتقني');
  await addBanner(slide2, '/images/slide2_intro.jpg', 'العمل الجماعي والتعاون البشري: النواة الفطرية الأولى لنشأة الإدارة', 1.35, 1.2);

  const pillarsSlide2 = [
    { title: 'المرتكز الأول: الإدارة قديمة بقدم الإنسان', text: 'بدأت الإدارة كممارسة فطرية مع سعي الإنسان لتأمين قوته وحماية مسكنه وتخزين المؤونة وتوزيع المسؤوليات داخل الأسرة.' },
    { title: 'المرتكز الثاني: نشوء الإدارة الحتمي مع العمل الجماعي', text: 'أدرك الإنسان عجزه المنفرد عن مواجهة تحديات الطبيعة؛ ومن هنا برزت حتمية التعاون وقيادة الجهود المشتركة.' },
    { title: 'المرتكز الثالث: تطور الإدارة التبادلي مع المجتمع', text: 'تطورت الإدارة مع الثورة الزراعية ثم الثورة الصناعية وظهور المصانع وتقسيم العمل، وصولاً إلى عصر التحول الرقمي.' },
    { title: 'المرتكز الرابع: الإدارة العنصر الحاسم للنجاح والبقاء', text: 'الموارد مهما بلغت ضخامتها تتبدد في ظل غياب الإدارة الرشيدة، بينما الإدارة الواعية تستثمر الموارد المحدودة لتحقيق الاستقرار.' }
  ];

  pillarsSlide2.forEach((p, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = col === 0 ? 5.1 : 0.6;
    const y = 2.7 + row * 1.35;

    slide2.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: 4.3,
      h: 1.25,
      rectRadius: 0.1,
      fill: { color: CARD_BG },
      line: { color: BORDER_COLOR, width: 1 }
    });

    slide2.addText(p.title, {
      x: x + 0.15,
      y: y + 0.1,
      w: 4.0,
      h: 0.35,
      fontSize: 11,
      fontFace: 'Arial',
      color: NAVY,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    slide2.addText(p.text, {
      x: x + 0.15,
      y: y + 0.45,
      w: 4.0,
      h: 0.7,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: TEXT_DARK,
      align: 'right',
      rtlMode: true
    });
  });

  // ==========================================
  // SLIDE 3: DEFINITIONS
  // ==========================================
  if (onProgress) onProgress('تجهيز الشريحة 3 (مصفوفة التعاريف)...');
  const slide3 = pptx.addSlide();
  addHeader(slide3, 3, 'مصفوفة تعاريف الإدارة', 'استعراض لأبرز التعاريف الأكاديمية التاريخية والمعاصرة في علم الإدارة وإدارة موارد الأسرة');
  await addBanner(slide3, '/images/slide3_definitions.jpg', 'التأصيل المعرفي والمراجع الأكاديمية الكبرى في علم الإدارة', 1.35, 1.05);

  const defsSlide3 = [
    { scholar: 'فريدريك تايلور (1911)', quote: 'الإدارة هي أن تعرف بالضبط ماذا تريد ثم تتأكد أن الأفراد يؤدونه بأحسن وأرخص طريقة ممكنة.' },
    { scholar: 'هنري فايول (1916)', quote: 'الإدارة هي التنبؤ والتخطيط والتنظيم وإصدار الأوامر والتنسيق والرقابة.' },
    { scholar: 'جيمس دونلي (1987)', quote: 'الإدارة هي عملية استخدام الموارد البشرية والمادية بفعالية وكفاءة لتحقيق الأهداف.' },
    { scholar: 'نيكلس ودورسي (2002)', quote: 'إدارة المنزل هي التخطيط والتنظيم والتنفيذ والتقويم لاستخدام الموارد المتاحة لتحقيق أهداف الأسرة.' },
    { scholar: 'جروس وكرندال (1963)', quote: 'إدارة المنزل هي عملية عقلية تتضمن التخطيط والضبط والتقويم باستخدام الموارد لما فيه صالح الأسرة.' },
    { scholar: 'دليل جولدسميث (1995)', quote: 'الإدارة هي عملية اتخاذ القرارات واستخدام الموارد لتحقيق أهداف الأسرة والمؤسسات.' }
  ];

  defsSlide3.forEach((d, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = col === 0 ? 5.1 : 0.6;
    const y = 2.5 + row * 0.95;

    slide3.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: 4.3,
      h: 0.88,
      rectRadius: 0.08,
      fill: { color: CARD_BG },
      line: { color: BORDER_COLOR, width: 1 }
    });

    slide3.addText(d.scholar, {
      x: x + 0.15,
      y: y + 0.08,
      w: 4.0,
      h: 0.25,
      fontSize: 10.5,
      fontFace: 'Arial',
      color: NAVY,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    slide3.addText(`"${d.quote}"`, {
      x: x + 0.15,
      y: y + 0.33,
      w: 4.0,
      h: 0.48,
      fontSize: 9,
      fontFace: 'Arial',
      color: TEXT_DARK,
      align: 'right',
      rtlMode: true
    });
  });

  // 7th definition (Wright & Williams 2018) spanning across
  slide3.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: 5.35,
    w: 8.8,
    h: 0.22,
    rectRadius: 0.05,
    fill: { color: 'FEF3C7' },
    line: { color: GOLD, width: 1 }
  });
  slide3.addText('أحدث تعريف: رايتش وويليامز (2018): "الإدارة هي الاستخدام الأمثل للموارد المحدودة لتحقيق أقصى إشباع لحاجات الأسرة المتغيرة."', {
    x: 0.8,
    y: 5.35,
    w: 8.4,
    h: 0.22,
    fontSize: 8.5,
    fontFace: 'Arial',
    color: NAVY,
    bold: true,
    align: 'center',
    rtlMode: true
  });

  // ==========================================
  // SLIDE 4: MODERN DEFINITION
  // ==========================================
  if (onProgress) onProgress('تجهيز الشريحة 4 (التعريف الحديث)...');
  const slide4 = pptx.addSlide();
  addHeader(slide4, 4, 'التعريف الحديث للإدارة وإدارة موارد الأسرة', 'تكامل الاستخدام الأمثل للموارد والاستدامة وجودة الحياة');
  await addBanner(slide4, '/images/slide4_modern.jpg', 'الاستدامة الشاملة وجودة الحياة في بيئة الأسرة والمؤسسة المعاصرة', 1.35, 1.2);

  // Master definition
  slide4.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: 2.65,
    w: 8.8,
    h: 0.95,
    rectRadius: 0.08,
    fill: { color: CARD_BG },
    line: { color: NAVY, width: 2 }
  });
  slide4.addText('التعريف المعاصر التركيبي:\n"الإدارة الحديثة هي منظومة متكاملة من القرارات والعمليات تهدف إلى الاستخدام الأمثل للموارد المتاحة (البشرية، المادية، المعرفية، والزمنية)، لضمان الاستدامة الشاملة والارتقاء المستمر بجودة الحياة ورفاهية الأسرة والمؤسسة."', {
    x: 0.8,
    y: 2.7,
    w: 8.4,
    h: 0.85,
    fontSize: 10.5,
    fontFace: 'Arial',
    color: NAVY,
    bold: true,
    align: 'right',
    rtlMode: true
  });

  // 3 Pillars
  const pillarsSlide4 = [
    { title: '1. الاستخدام الأمثل للموارد', text: '• موارد بشرية: طاقات ومهارات ووقت.\n• موارد غير بشرية: دخل وممتلكات ومرافق لمنع الهدر وتعظيم العائد.' },
    { title: '2. الاستدامة الشاملة', text: '• استدامة مالية: ادخار تحوطي وإدارة رشيدة.\n• استدامة أسرية: تماسك الروابط عبر الأجيال.' },
    { title: '3. جودة الحياة والرفاه', text: '• التوازن الحياتي: التوفيق بين العمل والأسرة.\n• الأمن النفسي: تقليل التوتر بالقضاء على العشوائية.' }
  ];

  pillarsSlide4.forEach((p, idx) => {
    const x = 0.6 + (2 - idx) * 3.0;
    slide4.addShape(pptx.ShapeType.roundRect, {
      x,
      y: 3.75,
      w: 2.8,
      h: 1.6,
      rectRadius: 0.08,
      fill: { color: CARD_BG },
      line: { color: BORDER_COLOR, width: 1 }
    });

    slide4.addText(p.title, {
      x: x + 0.15,
      y: 3.85,
      w: 2.5,
      h: 0.35,
      fontSize: 11,
      fontFace: 'Arial',
      color: NAVY,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    slide4.addText(p.text, {
      x: x + 0.15,
      y: 4.25,
      w: 2.5,
      h: 1.0,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: TEXT_DARK,
      align: 'right',
      rtlMode: true
    });
  });

  // ==========================================
  // SLIDE 5: CHARACTERISTICS
  // ==========================================
  if (onProgress) onProgress('تجهيز الشريحة 5 (الخصائص الجوهرية)...');
  const slide5 = pptx.addSlide();
  addHeader(slide5, 5, 'الخصائص الجوهرية للعملية الإدارية');
  await addBanner(slide5, '/images/slide5_characteristics.jpg', 'الديناميكية المستمرة وإدارة الندرة واستثمار الوقت والطاقات', 1.25, 1.2);

  characteristicsData.forEach((item, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const x = 0.6 + (2 - col) * 3.0;
    const y = 2.6 + row * 1.4;

    slide5.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: 2.8,
      h: 1.3,
      rectRadius: 0.08,
      fill: { color: CARD_BG },
      line: { color: BORDER_COLOR, width: 1 }
    });

    slide5.addText(`خاصية 0${idx + 1}: ${item.badge}`, {
      x: x + 0.1,
      y: y + 0.08,
      w: 2.6,
      h: 0.25,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: GOLD,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    slide5.addText(item.title, {
      x: x + 0.1,
      y: y + 0.32,
      w: 2.6,
      h: 0.35,
      fontSize: 10,
      fontFace: 'Arial',
      color: NAVY,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    slide5.addText(item.description, {
      x: x + 0.1,
      y: y + 0.68,
      w: 2.6,
      h: 0.55,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: TEXT_DARK,
      align: 'right',
      rtlMode: true
    });
  });

  // ==========================================
  // SLIDE 6: IMPORTANCE
  // ==========================================
  if (onProgress) onProgress('تجهيز الشريحة 6 (أهمية الإدارة)...');
  const slide6 = pptx.addSlide();
  addHeader(slide6, 6, 'أهمية الإدارة وجدوى الموارد', 'المحاور الستة الأساسية لأهمية الإدارة في تنظيم الموارد وتحقيق الأهداف');
  await addBanner(slide6, '/images/slide6_importance.jpg', 'تعظيم العائد من الموارد المتاحة وصناعة القرارات الرشيدة', 1.35, 1.15);

  importanceData.forEach((item, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const x = 0.6 + (2 - col) * 3.0;
    const y = 2.65 + row * 1.38;

    slide6.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: 2.8,
      h: 1.28,
      rectRadius: 0.08,
      fill: { color: CARD_BG },
      line: { color: BORDER_COLOR, width: 1 }
    });

    slide6.addText(`محور 0${idx + 1} | ${item.metric}`, {
      x: x + 0.1,
      y: y + 0.08,
      w: 2.6,
      h: 0.25,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: GOLD,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    slide6.addText(item.title, {
      x: x + 0.1,
      y: y + 0.32,
      w: 2.6,
      h: 0.35,
      fontSize: 10,
      fontFace: 'Arial',
      color: NAVY,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    slide6.addText(item.summary, {
      x: x + 0.1,
      y: y + 0.68,
      w: 2.6,
      h: 0.52,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: TEXT_DARK,
      align: 'right',
      rtlMode: true
    });
  });

  // ==========================================
  // SLIDE 7: ELEMENTS
  // ==========================================
  if (onProgress) onProgress('تجهيز الشريحة 7 (عناصر العملية الإدارية)...');
  const slide7 = pptx.addSlide();
  addHeader(slide7, 7, 'عناصر العملية الإدارية (النموذج المتكامل)', 'الوظائف الإدارية الخمس ودورها في إدارة المؤسسات والأسرة');
  await addBanner(slide7, '/images/slide7_elements.jpg', 'تكامل دورة العمل الإداري: من التخطيط والتنظيم إلى التنسيق والرقابة', 1.35, 1.15);

  elementsData.forEach((item, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const x = 0.6 + (2 - col) * 3.0;
    const y = 2.65 + row * 1.38;

    slide7.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: 2.8,
      h: 1.28,
      rectRadius: 0.08,
      fill: { color: CARD_BG },
      line: { color: BORDER_COLOR, width: 1 }
    });

    slide7.addText(`عنصر 0${item.order}: ${item.name}`, {
      x: x + 0.1,
      y: y + 0.1,
      w: 2.6,
      h: 0.35,
      fontSize: 11,
      fontFace: 'Arial',
      color: NAVY,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    slide7.addText(item.description, {
      x: x + 0.1,
      y: y + 0.48,
      w: 2.6,
      h: 0.72,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: TEXT_DARK,
      align: 'right',
      rtlMode: true
    });
  });

  // ==========================================
  // SLIDE 8: MANAGEMENT LEVELS
  // ==========================================
  if (onProgress) onProgress('تجهيز الشريحة 8 (مستويات الإدارة)...');
  const slide8 = pptx.addSlide();
  addHeader(slide8, 8, 'الهيكل الهرمي لمستويات الإدارة');
  await addBanner(slide8, '/images/slide8_levels.jpg', 'التكامل الهيكلي بين التوجيه الاستراتيجي والبرمجة التكتيكية والتنفيذ التشغيلي', 1.25, 1.3);

  managementLevelsData.forEach((lvl, idx) => {
    const x = 0.6 + (2 - idx) * 3.0;
    const y = 2.75;

    slide8.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: 2.8,
      h: 2.5,
      rectRadius: 0.08,
      fill: { color: CARD_BG },
      line: { color: idx === 0 ? NAVY : idx === 1 ? GOLD : '64748B', width: 2 }
    });

    slide8.addText(`المستوى 0${idx + 1} | ${lvl.timeHorizon}`, {
      x: x + 0.15,
      y: y + 0.15,
      w: 2.5,
      h: 0.3,
      fontSize: 9,
      fontFace: 'Arial',
      color: GOLD,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    slide8.addText(lvl.level, {
      x: x + 0.15,
      y: y + 0.45,
      w: 2.5,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Arial',
      color: NAVY,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    slide8.addText(lvl.title, {
      x: x + 0.15,
      y: y + 0.85,
      w: 2.5,
      h: 0.35,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: TEXT_MUTED,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    slide8.addText(lvl.focus, {
      x: x + 0.15,
      y: y + 1.25,
      w: 2.5,
      h: 1.1,
      fontSize: 9,
      fontFace: 'Arial',
      color: TEXT_DARK,
      align: 'right',
      rtlMode: true
    });
  });

  // ==========================================
  // SLIDE 9: MANAGEMENT STYLES
  // ==========================================
  if (onProgress) onProgress('تجهيز الشريحة 9 (الأنماط الإدارية)...');
  const slide9 = pptx.addSlide();
  addHeader(slide9, 9, 'الأنماط الإدارية الأربعة');
  await addBanner(slide9, '/images/slide9_styles.jpg', 'المرونة القيادية والمواءمة بين حسم القرار ومشاركة الفريق', 1.25, 1.2);

  managementStylesData.forEach((style, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = col === 0 ? 5.1 : 0.6;
    const y = 2.65 + row * 1.38;

    slide9.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: 4.3,
      h: 1.28,
      rectRadius: 0.08,
      fill: { color: CARD_BG },
      line: { color: BORDER_COLOR, width: 1 }
    });

    slide9.addText(`نمط 0${idx + 1} | ${style.authorityLevel}`, {
      x: x + 0.15,
      y: y + 0.08,
      w: 4.0,
      h: 0.25,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: GOLD,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    slide9.addText(`${style.name} (${style.englishName})`, {
      x: x + 0.15,
      y: y + 0.32,
      w: 4.0,
      h: 0.35,
      fontSize: 11,
      fontFace: 'Arial',
      color: NAVY,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    const chars = style.characteristics.slice(0, 2).map(c => `• ${c}`).join('\n');
    slide9.addText(chars, {
      x: x + 0.15,
      y: y + 0.68,
      w: 4.0,
      h: 0.52,
      fontSize: 9,
      fontFace: 'Arial',
      color: TEXT_DARK,
      align: 'right',
      rtlMode: true
    });
  });

  // ==========================================
  // SLIDE 10: EVOLUTION TIMELINE
  // ==========================================
  if (onProgress) onProgress('تجهيز الشريحة 10 (خط التطور التاريخي)...');
  const slide10 = pptx.addSlide();
  addHeader(slide10, 10, 'خط التطور التاريخي للفكر الإداري');
  await addBanner(slide10, '/images/slide10_timeline.jpg', 'من عبقرية التنظيم في الحضارات الإنسانية العريقة إلى عصر الإدارة الذكية المعاصرة', 1.25, 1.25);

  timelineMilestones.forEach((m, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = col === 0 ? 5.1 : 0.6;
    const y = 2.7 + row * 1.35;

    slide10.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: 4.3,
      h: 1.25,
      rectRadius: 0.08,
      fill: { color: CARD_BG },
      line: { color: BORDER_COLOR, width: 1 }
    });

    slide10.addText(`مرحلة 0${idx + 1}: ${m.era} (${m.period})`, {
      x: x + 0.15,
      y: y + 0.1,
      w: 4.0,
      h: 0.25,
      fontSize: 9,
      fontFace: 'Arial',
      color: GOLD,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    slide10.addText(m.title, {
      x: x + 0.15,
      y: y + 0.35,
      w: 4.0,
      h: 0.3,
      fontSize: 10.5,
      fontFace: 'Arial',
      color: NAVY,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    slide10.addText(m.description, {
      x: x + 0.15,
      y: y + 0.65,
      w: 4.0,
      h: 0.55,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: TEXT_DARK,
      align: 'right',
      rtlMode: true
    });
  });

  // ==========================================
  // SLIDE 11: SCHOOLS OF MANAGEMENT
  // ==========================================
  if (onProgress) onProgress('تجهيز الشريحة 11 (مدارس الفكر الإداري)...');
  const slide11 = pptx.addSlide();
  addHeader(slide11, 11, 'مدارس الفكر الإداري الكبرى');
  await addBanner(slide11, '/images/slide11_schools.jpg', 'الركائز الفكرية والأعمدة النظرية التي صاغت المدارس الإدارية الكبرى', 1.25, 1.2);

  schoolsOfManagementData.forEach((s, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const x = 0.6 + (2 - col) * 3.0;
    const y = 2.65 + row * 1.38;

    slide11.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: 2.8,
      h: 1.28,
      rectRadius: 0.08,
      fill: { color: CARD_BG },
      line: { color: BORDER_COLOR, width: 1 }
    });

    slide11.addText(`مدرسة 0${idx + 1} | ${s.era}`, {
      x: x + 0.1,
      y: y + 0.08,
      w: 2.6,
      h: 0.25,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: GOLD,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    slide11.addText(s.name.split('(')[0], {
      x: x + 0.1,
      y: y + 0.32,
      w: 2.6,
      h: 0.3,
      fontSize: 10,
      fontFace: 'Arial',
      color: NAVY,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    slide11.addText(`الرواد: ${s.keyPioneers.slice(0, 2).join('، ')}\n${s.coreIdea}`, {
      x: x + 0.1,
      y: y + 0.62,
      w: 2.6,
      h: 0.6,
      fontSize: 8,
      fontFace: 'Arial',
      color: TEXT_DARK,
      align: 'right',
      rtlMode: true
    });
  });

  // ==========================================
  // SLIDE 12: CONCLUSION
  // ==========================================
  if (onProgress) onProgress('تجهيز الشريحة 12 (الخاتمة)...');
  const slide12 = pptx.addSlide();
  addHeader(slide12, 12, 'الخاتمة والمعادلة الجوهرية للإدارة المعاصرة');
  await addBanner(slide12, '/images/slide12_conclusion.jpg', 'أفق التوازن المستدام وجودة الحياة في منظومة إدارة الموارد الأسرية والمؤسسية', 1.25, 1.2);

  // Master Formula Box
  slide12.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: 2.65,
    w: 8.8,
    h: 1.35,
    rectRadius: 0.08,
    fill: { color: CARD_BG },
    line: { color: NAVY, width: 2 }
  });

  slide12.addText('المعادلة الأكاديمية الجامعة:\nالإدارة = توازن متناغم ومستمر بين [ الإنسان ] + [ الموارد ] + [ الهدف ]', {
    x: 0.8,
    y: 2.75,
    w: 8.4,
    h: 0.55,
    fontSize: 14,
    fontFace: 'Arial',
    color: NAVY,
    bold: true,
    align: 'center',
    rtlMode: true
  });

  slide12.addText('ليست الإدارة مجرد نظريات مجردة، بل هي الفن الإنساني والعلم التطبيقي الذي يوجه موارد الأسرة والمؤسسة نحو الاستقرار والكفاءة وجودة الحياة. فإذا اختل أحد أركان هذا الثالوث (أُهمل الإنسان، أو أُهدرت الموارد، أو غاب الهدف)، فقدت المنظومة توازنها وفاعليتها.', {
    x: 0.8,
    y: 3.35,
    w: 8.4,
    h: 0.55,
    fontSize: 9.5,
    fontFace: 'Arial',
    color: TEXT_DARK,
    align: 'right',
    rtlMode: true
  });

  // 3 Pillars
  const pillarsSlide12 = [
    { title: '1. محورية الإنسان', desc: 'الإنسان هو صانع الإدارة ومستهدفها؛ وكرامته وسعادته هي معيار النجاح الأسمى في المؤسسة والبيت.' },
    { title: '2. استدامة الموارد', desc: 'ترشيد الوقت والمال والجهد، ومواجهة الندرة النسبية بالكفاءة والتخطيط الواعي.' },
    { title: '3. وضوح الغاية', desc: 'تحديد الأولويات بدقة؛ فكل جهد لا يخدم الغايات الأسرية أو المؤسسية يعد هدراً ينبغي تقويمه.' }
  ];

  pillarsSlide12.forEach((p, idx) => {
    const x = 0.6 + (2 - idx) * 3.0;
    slide12.addShape(pptx.ShapeType.roundRect, {
      x,
      y: 4.15,
      w: 2.8,
      h: 0.85,
      rectRadius: 0.08,
      fill: { color: CARD_BG },
      line: { color: BORDER_COLOR, width: 1 }
    });

    slide12.addText(p.title, {
      x: x + 0.1,
      y: 4.22,
      w: 2.6,
      h: 0.25,
      fontSize: 10,
      fontFace: 'Arial',
      color: NAVY,
      bold: true,
      align: 'right',
      rtlMode: true
    });

    slide12.addText(p.desc, {
      x: x + 0.1,
      y: 4.47,
      w: 2.6,
      h: 0.48,
      fontSize: 8,
      fontFace: 'Arial',
      color: TEXT_DARK,
      align: 'right',
      rtlMode: true
    });
  });

  // Footer credits
  slide12.addText('مقدم من الباحثة / بوسي أحمد هنداوي  •  تحت إشراف: أ. د / وفاء شلبي  •  أ. م. د / مروة مسعد', {
    x: 0.6,
    y: 5.15,
    w: 8.8,
    h: 0.3,
    fontSize: 9.5,
    fontFace: 'Arial',
    color: GOLD,
    bold: true,
    align: 'center',
    rtlMode: true
  });

  // Save the PowerPoint file
  if (onProgress) onProgress('جاري حفظ وتنزيل الملف...');
  await pptx.writeFile({ fileName: 'نشأة_الفكر_الاداري_ومراحل_تطوره_جامعة_العاصمة.pptx' });
}
