// Übersetzungs-Service für Fragen und Antworten
export interface TranslatedQuestion {
  id: number
  kapitel: string
  frage: string
  antwort: string
  tags: string[]
  translations?: {
    [languageCode: string]: {
      frage: string
      antwort: string
      kapitel: string
      tags: string[]
    }
  }
}

// Übersetzungen für die ersten paar Fragen mit Urdu
export const questionTranslations: { [questionId: number]: { [lang: string]: any } } = {
  1: {
    en: {
      frage: "Which passenger transport services are subject to the Passenger Transport Act (PBefG)?",
      antwort: "All commercial or business passenger transport services with motor vehicles. This means: As soon as a trip is paid for or regularly carried out with the intention of making a profit, the PBefG applies. Private rides without payment do not fall under this.",
      kapitel: "PBefG",
      tags: ["basics", "commercial"]
    },
    tr: {
      frage: "Hangi yolcu taşımacılığı hizmetleri Yolcu Taşımacılığı Yasası'na (PBefG) tabidir?",
      antwort: "Motorlu araçlarla yapılan tüm ücretli veya ticari yolcu taşımacılığı hizmetleri. Yani: Bir yolculuk için ücret alındığı veya kâr amacıyla düzenli olarak yapıldığı anda PBefG geçerlidir. Ücretsiz özel yolculuklar buna dahil değildir.",
      kapitel: "PBefG",
      tags: ["temel bilgiler", "ticari"]
    },
    ar: {
      frage: "ما هي خدمات نقل الركاب التي تخضع لقانون نقل الركاب (PBefG)؟",
      antwort: "جميع خدمات نقل الركاب التجارية أو التجارية بالمركبات الآلية. هذا يعني: بمجرد دفع ثمن الرحلة أو القيام بها بانتظام بقصد تحقيق الربح، ينطبق PBefG. الرحلات الخاصة بدون دفع لا تندرج تحت هذا.",
      kapitel: "PBefG",
      tags: ["أساسيات", "تجاري"]
    },
    fr: {
      frage: "Quels services de transport de passagers sont soumis à la Loi sur le transport de passagers (PBefG) ?",
      antwort: "Tous les services de transport de passagers commerciaux ou d'affaires avec des véhicules à moteur. Cela signifie : Dès qu'un voyage est payé ou effectué régulièrement dans l'intention de réaliser un profit, le PBefG s'applique. Les trajets privés sans paiement ne relèvent pas de cette loi.",
      kapitel: "PBefG",
      tags: ["bases", "commercial"]
    },
    es: {
      frage: "¿Qué servicios de transporte de pasajeros están sujetos a la Ley de Transporte de Pasajeros (PBefG)?",
      antwort: "Todos los servicios comerciales o empresariales de transporte de pasajeros con vehículos de motor. Esto significa: Tan pronto como se pague un viaje o se realice regularmente con la intención de obtener ganancias, se aplica el PBefG. Los viajes privados sin pago no caen bajo esto.",
      kapitel: "PBefG",
      tags: ["básicos", "comercial"]
    },
    ur: {
      frage: "کون سی مسافر نقل و حمل کی خدمات مسافر نقل و حمل قانون (PBefG) کے تابع ہیں؟",
      antwort: "موٹر گاڑیوں کے ساتھ تمام تجارتی یا کاروباری مسافر نقل و حمل کی خدمات۔ اس کا مطلب یہ ہے: جیسے ہی کسی سفر کے لیے رقم ادا کی جائے یا باقاعدگی سے منافع کی نیت سے کیا جائے، PBefG لاگو ہوتا ہے۔ بغیر ادائیگی کے نجی سفر اس میں شامل نہیں ہیں۔",
      kapitel: "PBefG",
      tags: ["بنیادی باتیں", "تجارتی"]
    }
  },
  2: {
    en: {
      frage: "What types of passenger transport are there according to PBefG?",
      antwort: "Regular service (fixed routes and schedules), occasional service (charter transport), taxi transport, and rental car transport with driver.",
      kapitel: "PBefG",
      tags: ["types", "classification"]
    },
    tr: {
      frage: "PBefG'ye göre hangi tür yolcu taşımacılığı vardır?",
      antwort: "Düzenli servis (sabit güzergahlar ve programlar), ara sıra servis (charter nakliyat), taksi nakliyat ve şoförlü kiralık araç nakliyatı.",
      kapitel: "PBefG",
      tags: ["türler", "sınıflandırma"]
    },
    ar: {
      frage: "ما أنواع نقل الركاب الموجودة وفقاً لـ PBefG؟",
      antwort: "الخدمة المنتظمة (طرق وجداول زمنية ثابتة)، الخدمة العرضية (النقل المستأجر)، نقل سيارات الأجرة، ونقل السيارات المؤجرة مع السائق.",
      kapitel: "PBefG",
      tags: ["أنواع", "تصنيف"]
    },
    fr: {
      frage: "Quels types de transport de passagers existe-t-il selon PBefG ?",
      antwort: "Service régulier (itinéraires et horaires fixes), service occasionnel (transport affrété), transport de taxi et transport de voiture de location avec chauffeur.",
      kapitel: "PBefG",
      tags: ["types", "classification"]
    },
    es: {
      frage: "¿Qué tipos de transporte de pasajeros existen según PBefG?",
      antwort: "Servicio regular (rutas y horarios fijos), servicio ocasional (transporte charter), transporte de taxi y transporte de coche de alquiler con conductor.",
      kapitel: "PBefG",
      tags: ["tipos", "clasificación"]
    },
    ur: {
      frage: "PBefG کے مطابق مسافر نقل و حمل کی کتنی اقسام ہیں؟",
      antwort: "باقاعدہ خدمات (مقرر کردہ راستے اور وقت)، کبھی کبھار خدمات (چارٹر ٹرانسپورٹ)، ٹیکسی ٹرانسپورٹ، اور ڈرائیور کے ساتھ کرایے کی کار ٹرانسپورٹ۔",
      kapitel: "PBefG",
      tags: ["اقسام", "تصنیف"]
    }
  },
  3: {
    en: {
      frage: "What is the difference between regular and occasional passenger transport?",
      antwort: "Regular transport: Fixed routes, schedules, and public accessibility. Occasional transport: No fixed routes or schedules, chartered for specific occasions or groups.",
      kapitel: "PBefG",
      tags: ["regular", "occasional", "difference"]
    },
    tr: {
      frage: "Düzenli ve ara sıra yolcu taşımacılığı arasındaki fark nedir?",
      antwort: "Düzenli taşımacılık: Sabit güzergahlar, programlar ve kamuya açık erişim. Ara sıra taşımacılık: Sabit güzergah veya program yok, belirli durumlar veya gruplar için kiralanır.",
      kapitel: "PBefG",
      tags: ["düzenli", "ara sıra", "fark"]
    },
    ar: {
      frage: "ما الفرق بين النقل المنتظم والعرضي للركاب؟",
      antwort: "النقل المنتظم: طرق وجداول زمنية ثابتة وإمكانية وصول عامة. النقل العرضي: لا توجد طرق أو جداول زمنية ثابتة، مستأجر لمناسبات أو مجموعات محددة.",
      kapitel: "PBefG",
      tags: ["منتظم", "عرضي", "فرق"]
    },
    fr: {
      frage: "Quelle est la différence entre le transport régulier et occasionnel de passagers ?",
      antwort: "Transport régulier : Itinéraires, horaires fixes et accessibilité publique. Transport occasionnel : Pas d'itinéraires ou d'horaires fixes, affrété pour des occasions ou groupes spécifiques.",
      kapitel: "PBefG",
      tags: ["régulier", "occasionnel", "différence"]
    },
    es: {
      frage: "¿Cuál es la diferencia entre el transporte regular y ocasional de pasajeros?",
      antwort: "Transporte regular: Rutas, horarios fijos y accesibilidad pública. Transporte ocasional: Sin rutas o horarios fijos, fletado para ocasiones o grupos específicos.",
      kapitel: "PBefG",
      tags: ["regular", "ocasional", "diferencia"]
    },
    ur: {
      frage: "باقاعدہ اور کبھی کبھار مسافر نقل و حمل کے درمیان کیا فرق ہے؟",
      antwort: "باقاعدہ ٹرانسپورٹ: مقرر کردہ راستے، وقت اور عوامی رسائی۔ کبھی کبھار ٹرانسپورٹ: کوئی مقرر کردہ راستہ یا وقت نہیں، خاص مواقع یا گروپس کے لیے کرایے پر لیا جاتا ہے۔",
      kapitel: "PBefG",
      tags: ["باقاعدہ", "کبھی کبھار", "فرق"]
    }
  }
}

// Funktion um Übersetzung für eine Frage zu bekommen
export function getTranslatedQuestion(questionId: number, language: string, originalQuestion: any) {
  const translations = questionTranslations[questionId]
  
  if (translations && translations[language]) {
    return {
      ...originalQuestion,
      frage: translations[language].frage,
      antwort: translations[language].antwort,
      kapitel: translations[language].kapitel,
      tags: translations[language].tags
    }
  }
  
  // Fallback zur deutschen Version
  return originalQuestion
}

// Funktion um alle unterstützten Sprachen zu bekommen
export function getSupportedLanguages() {
  return ['de', 'en', 'tr', 'ar', 'fr', 'es', 'ur']
}

// Interface für Übersetzungs-Hook
export interface TranslationTexts {
  // Navigation
  home: string
  learn: string
  exam: string
  profile: string
  pricing: string
  signin: string
  signup: string
  signout: string
  
  // Allgemeine Texte
  question: string
  answer: string
  next: string
  previous: string
  submit: string
  cancel: string
  save: string
  loading: string
  
  // Lern-Texte
  flashcards: string
  multipleChoice: string
  startLearning: string
  showAnswer: string
  
  // Prüfungs-Texte
  startExam: string
  timeRemaining: string
  questionsAnswered: string
  
  // Status-Texte
  correct: string
  incorrect: string
  passed: string
  failed: string
}

// Standard-Übersetzungen für UI-Texte
export const uiTranslations: { [lang: string]: TranslationTexts } = {
  de: {
    home: 'Startseite',
    learn: 'Lernen',
    exam: 'Prüfung',
    profile: 'Profil',
    pricing: 'Preise',
    signin: 'Anmelden',
    signup: 'Registrieren',
    signout: 'Abmelden',
    question: 'Frage',
    answer: 'Antwort',
    next: 'Weiter',
    previous: 'Zurück',
    submit: 'Absenden',
    cancel: 'Abbrechen',
    save: 'Speichern',
    loading: 'Lädt...',
    flashcards: 'Lernkarten',
    multipleChoice: 'Multiple Choice',
    startLearning: 'Lernen starten',
    showAnswer: 'Antwort zeigen',
    startExam: 'Prüfung starten',
    timeRemaining: 'Verbleibende Zeit',
    questionsAnswered: 'Fragen beantwortet',
    correct: 'Richtig',
    incorrect: 'Falsch',
    passed: 'Bestanden',
    failed: 'Nicht bestanden'
  },
  en: {
    home: 'Home',
    learn: 'Learn',
    exam: 'Exam',
    profile: 'Profile',
    pricing: 'Pricing',
    signin: 'Sign In',
    signup: 'Sign Up',
    signout: 'Sign Out',
    question: 'Question',
    answer: 'Answer',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    loading: 'Loading...',
    flashcards: 'Flashcards',
    multipleChoice: 'Multiple Choice',
    startLearning: 'Start Learning',
    showAnswer: 'Show Answer',
    startExam: 'Start Exam',
    timeRemaining: 'Time Remaining',
    questionsAnswered: 'Questions Answered',
    correct: 'Correct',
    incorrect: 'Incorrect',
    passed: 'Passed',
    failed: 'Failed'
  },
  ur: {
    home: 'گھر',
    learn: 'سیکھیں',
    exam: 'امتحان',
    profile: 'پروفائل',
    pricing: 'قیمتیں',
    signin: 'داخل ہوں',
    signup: 'رجسٹر',
    signout: 'باہر نکلیں',
    question: 'سوال',
    answer: 'جواب',
    next: 'اگلا',
    previous: 'پچھلا',
    submit: 'جمع کریں',
    cancel: 'منسوخ',
    save: 'محفوظ کریں',
    loading: 'لوڈ ہو رہا ہے...',
    flashcards: 'فلیش کارڈز',
    multipleChoice: 'متعدد انتخاب',
    startLearning: 'سیکھنا شروع کریں',
    showAnswer: 'جواب دکھائیں',
    startExam: 'امتحان شروع کریں',
    timeRemaining: 'باقی وقت',
    questionsAnswered: 'جوابات دیے گئے سوالات',
    correct: 'صحیح',
    incorrect: 'غلط',
    passed: 'کامیاب',
    failed: 'ناکام'
  }
}

// Hook für UI-Übersetzungen
export function useTranslations(language: string = 'de'): TranslationTexts {
  return uiTranslations[language] || uiTranslations.de
}
