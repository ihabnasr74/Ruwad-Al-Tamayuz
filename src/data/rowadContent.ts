export interface CoreValueItem {
  id: string;
  icon: 'accuracy' | 'confidentiality' | 'deadlines' | 'golden-triangle';
  en: string;
  ar: string;
}

export interface WorkflowStepItem {
  step: number;
  arDescription: string;
  enDescription: string;
  iconType: 'share' | 'respond' | 'evaluate' | 'payment' | 'dispatch' | 'receive';
  themeColor: string;
  gradientFrom: string;
  gradientTo: string;
  borderHex: string;
}

export interface ContactChannelItem {
  id: 'email' | 'whatsapp' | 'hotline';
  label: string;
  value: string;
  href: string;
  actionLabelEn: string;
  actionLabelAr: string;
}

export const ROWAD_CONTENT = {
  brand: {
    logoTitle: 'Ruwad Al Tamayuz',
    logoSubtitle: 'Translation Services',
    heroTitleAr: 'رواد التميُّز لخدمات الترجمة',
    heroTitleEn: 'Rowad Al Tamayuz Translation Services',
    references: {
      page1: '/assets/aistudio/Screenshot_2026-11-10_051808_e54f8d38.png',
      logo: '/assets/aistudio/Screenshot_2026-11-10_053436_89f59f36.png',
      page2: '/assets/aistudio/Screenshot_2026-11-10_051826_bd2b4486.png',
      workflow6: '/assets/aistudio/RT-C.P-1-open-file_8412fcd3.jpg',
    },
  },
  companyProfile: {
    titleEn: 'Company Profile',
    titleAr: 'الملف التعريفي',
    paragraphsEn: [
      'Rowad Al-Tamayuz Translation Services Company is one of the leading and most trusted providers of language solutions and services, delivered with the utmost accuracy and professionalism. We take pride in meeting the needs of the business, legal, medical, and government sectors, as well as other sectors.',
      'Our company brings together a select group of certified translators and language experts to ensure that translated documents meet the highest regulatory and professional standards, both locally and internationally.',
    ],
    paragraphsAr: [
      'تُعد شركة رواد التميُّز لخدمات الترجمة من إحدى الشركات الرائدة والموثوقة لتقديم الحلول والخدمات اللغوية المتبادلة بدقةٍ متناهية وسياق احترفي. نفخر بتلبية متطلبات القطاعات التجارية والقانونية والطبية والحكومية، إلى جانب القطاعات الأخرى.',
      'تضم شركتنا نُخبة من المترجمين المعتمدين والخبراء اللغويين، وذلك لضمان مطابقة المستندات المُترجمة لأعلى المعايير التنظيمية والمهنية على الصعيدين المحلي والدولي.',
    ],
  },
  coreValues: {
    titleEn: 'Our Core Values',
    titleAr: 'قيَمنا الجوهرية',
    items: [
      {
        id: 'accuracy',
        icon: 'accuracy',
        en: 'Exemplary linguistic and technical accuracy',
        ar: 'الدقة اللغوية والتقنية المثالية',
      },
      {
        id: 'confidentiality',
        icon: 'confidentiality',
        en: 'Complete confidentiality and protection of data and document privacy',
        ar: 'السرية التامة وحماية خصوصية البيانات والمستندات',
      },
      {
        id: 'deadlines',
        icon: 'deadlines',
        en: 'Strict adherence to specified deadlines',
        ar: 'الالتزام الدقيق بمواعيد التسليم المحددة',
      },
      {
        id: 'golden-triangle',
        icon: 'golden-triangle',
        en: '[Quality, Precision, and Craftsmanship]: The “Golden Triangle” that sets us apart from others in the industry.',
        ar: 'المثلث الذهبي الذي يُميِّزنا عن غيرنا في الـ :[الجودة والدقة والإتقان]',
      },
    ] as CoreValueItem[],
  },
  specializedServices: {
    titleEn: 'Our Specialized Services',
    titleAr: 'خدماتنا المتخصصة',
    group1: {
      number: 1,
      headingEn: 'Translation Services',
      headingAr: 'خدمات الترجمة',
      itemsEn: [
        'Legal Translation',
        'Commercial Translation',
        'Technical Translation',
        'Specialized Translation, including: [Translation of academic and university research, media materials, and marketing content, with comprehensive proofreading and editing performed professionally, accurately, and with precision]',
      ],
      itemsAr: [
        'الترجمة القانونية',
        'الترجمة التجارية',
        'الترجمة التقنية',
        'الترجمة المتخصصة، وتشمل: [ترجمة البحوث الأكاديمية والجامعية والمواد الإعلامية والمحتوى التسويقي مع التدقيق والتحرير الشاملين بمهنية ودقة وإتقان]',
      ],
    },
    group2: {
      number: 2,
      headingEn: 'Other Services',
      headingAr: 'خدماتنا الأخرى',
      itemsEn: [
        'Legal Translation',
        'Legal translation services for all documents English to Arabic and vice versa and other languages if required.',
        'Business Setup and Company formation.',
        'Drafting contracts, agreements, and memoranda of understanding (MoU)',
        'Notary Public Services',
        'Dubai Courts and Public Prosecution Services',
        'Degree Recognition Serviced',
        'Printing services',
        'Public Relations Representative Services',
        'Attestation Services',
      ],
      itemsAr: [
        'خدمات الترجمة القانونية لجميع الوثائق من الإنجليزية إلى العربية والعكس، وللغات أخرى حسب الطلب',
        'تأسيس الأعمال والشركات',
        'صياغة العقود والاتفاقيات ومذكرات التفاهم',
        'عقود التأسيس والملاحق، وما إلى ذلك',
        'خدمات الكاتب العدل',
        'خدمات محاكم دبي والنيابة العامة',
        'خدمات اعتماد الشهادات الجامعية',
        'خدمات الطباعة',
        'خدمات تمثيل العلاقات العامة',
        'خدمات التصديق',
      ],
    },
  },
  transactionsBanner: {
    titleEn: 'Transactions Processing',
    titleAr: 'تخليص المعاملات',
  },
  serviceRequestProcess: {
    titleEn: 'Translation Request Process',
    titleAr: 'إجراءات طلب الترجمة',
    steps: [
      {
        step: 1,
        arDescription: 'أرسل المستند إلينا عبر الواتساب أو البريد الإلكتروني',
        enDescription: 'Share your document with us via: WhatsApp, Email',
        iconType: 'share',
        themeColor: '#198c96',
        gradientFrom: '#38e2f2',
        gradientTo: '#198c96',
        borderHex: '#38e2f2',
      },
      {
        step: 2,
        arDescription: 'نقوم بالرد سريعًا لتأكيد استلام المستند المطلوب ترجمته',
        enDescription:
          'We respond promptly, acknowledging the receipt of the document required to be translated.',
        iconType: 'respond',
        themeColor: '#14b8a6',
        gradientFrom: '#2dd4bf',
        gradientTo: '#0f766e',
        borderHex: '#2dd4bf',
      },
      {
        step: 3,
        arDescription:
          'نقوم بمراجعة المستند وتحديد اللغة المطلوبة للترجمة، والمدة الزمنية اللازمة للتنفيذ، والتكلفة ثم نبدأ عملية الترجمة وفقًا لما تم الاتفاق عليه',
        enDescription:
          'We evaluate the document, determine the target language, turnaround time, and cost, and commence the translation process as agreed.',
        iconType: 'evaluate',
        themeColor: '#0284c7',
        gradientFrom: '#38bdf8',
        gradientTo: '#0369a1',
        borderHex: '#38bdf8',
      },
      {
        step: 4,
        arDescription: 'يتم سداد قيمة الخدمة عن طريق التحويل البنكي',
        enDescription: 'Payment is made through bank transfer',
        iconType: 'payment',
        themeColor: '#d97706',
        gradientFrom: '#fbbf24',
        gradientTo: '#b45309',
        borderHex: '#fbbf24',
      },
      {
        step: 5,
        arDescription:
          'يتم إرسال المستند المترجم إما عبر البريد الإلكتروني أو الواتساب، وفقًا لما يناسب العميل',
        enDescription:
          'Translated document shall be sent either through email or WhatsApp, as per the client convenient.',
        iconType: 'dispatch',
        themeColor: '#198c96',
        gradientFrom: '#22d3ee',
        gradientTo: '#0e7490',
        borderHex: '#22d3ee',
      },
      {
        step: 6,
        arDescription: 'يستلم العميل المستند المترجم بصيغة PDF أو مستند Word',
        enDescription:
          'Client shall receive the translated document in PDF or Word Document format',
        iconType: 'receive',
        themeColor: '#10b981',
        gradientFrom: '#34d399',
        gradientTo: '#047857',
        borderHex: '#34d399',
      },
    ] as WorkflowStepItem[],
  },
  communicationChannels: {
    titleEn: 'Communication Channels',
    titleAr: 'قنوات التواصل',
    introEn: 'You may reach us through the following communication channels:',
    introAr: 'بإمكانكم التواصل معنا عبر قنوات التواصل التالية',
    channels: [
      {
        id: 'email',
        label: 'Email',
        value: 'Sami.legal@outlook.com',
        href: 'mailto:Sami.legal@outlook.com',
        actionLabelEn: 'Send Email',
        actionLabelAr: 'إرسال بريد إلكتروني',
      },
      {
        id: 'whatsapp',
        label: 'Whatsapp',
        value: '+971 50 509 5759',
        href: 'https://wa.me/971505095759',
        actionLabelEn: 'Chat on WhatsApp',
        actionLabelAr: 'محادثة عبر واتساب',
      },
      {
        id: 'hotline',
        label: 'Hotline',
        value: '+971 50 509 5759',
        href: 'tel:+971505095759',
        actionLabelEn: 'Call Hotline',
        actionLabelAr: 'الاتصال بالخط الساخن',
      },
    ] as ContactChannelItem[],
  },
  globeLanguages: [
    'اللغة العربية',
    'English',
    'Español',
    'Français',
    'Deutsch',
    'Italiano',
    'Português',
    'Русский',
    '中国人',
    'Polski',
    'Nederlands',
    'Türkçe',
    'Norsk',
    'Română',
    'Ελληνικά',
    'हिन्दी',
  ],
};
