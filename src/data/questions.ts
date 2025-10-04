export interface Question {
  id: number
  kapitel: string
  frage: string
  antwort: string
  tags: string[]
  translations?: {
    [key: string]: {
      frage: string
      antwort: string
    }
  }
}

export const questionsData: Question[] = [
  {
    "id": 1,
    "kapitel": "PBefG",
    "frage": "Welche Beförderungen von Personen unterliegen dem Personenbeförderungsgesetz (PBefG)?",
    "antwort": "Alle entgeltlichen oder geschäftsmäßigen Beförderungen von Personen mit Kraftfahrzeugen. Das heißt: Sobald eine Fahrt bezahlt wird oder regelmäßig mit Gewinnerzielungsabsicht durchgeführt wird, gilt das PBefG. Private Mitfahrten ohne Entgelt fallen nicht darunter.",
    "tags": ["grundlagen", "entgeltlich"],
    "translations": {
      "en": {
        "frage": "Which passenger transportation falls under the Passenger Transportation Act (PBefG)?",
        "antwort": "All commercial or business passenger transportation with motor vehicles. This means: As soon as a trip is paid for or regularly carried out with the intention of making a profit, the PBefG applies. Private rides without payment are not included."
      },
      "tr": {
        "frage": "Hangi yolcu taşımacılığı Yolcu Taşımacılık Yasası (PBefG) kapsamına girer?",
        "antwort": "Motorlu araçlarla yapılan tüm ticari veya işletmecilik amaçlı yolcu taşımacılığı. Bu şu anlama gelir: Bir yolculuk için ücret alındığında veya kâr amacıyla düzenli olarak yapıldığında PBefG uygulanır. Ücretsiz özel yolculuklar buna dahil değildir."
      },
      "ar": {
        "frage": "أي نقل للركاب يخضع لقانون نقل الركاب (PBefG)؟",
        "antwort": "جميع عمليات نقل الركاب التجارية أو التجارية بالمركبات الآلية. هذا يعني: بمجرد دفع رسوم الرحلة أو القيام بها بانتظام بقصد تحقيق ربح، ينطبق PBefG. الرحلات الخاصة بدون دفع غير مشمولة."
      },
      "fr": {
        "frage": "Quels transports de voyageurs relèvent de la loi sur les transports de voyageurs (PBefG) ?",
        "antwort": "Tous les transports de voyageurs commerciaux ou d'affaires avec des véhicules à moteur. Cela signifie : dès qu'un voyage est payé ou effectué régulièrement dans l'intention de faire du profit, le PBefG s'applique. Les trajets privés sans paiement ne sont pas inclus."
      },
      "es": {
        "frage": "¿Qué transporte de pasajeros está sujeto a la Ley de Transporte de Pasajeros (PBefG)?",
        "antwort": "Todo transporte de pasajeros comercial o empresarial con vehículos de motor. Esto significa: tan pronto como se pague un viaje o se realice regularmente con la intención de obtener ganancias, se aplica el PBefG. Los viajes privados sin pago no están incluidos."
      },
      "ur": {
        "frage": "مسافر ٹرانسپورٹیشن ایکٹ (PBefG) کے تحت کون سی مسافر نقل و حمل آتی ہے؟",
        "antwort": "موٹر گاڑیوں کے ساتھ تمام تجارتی یا کاروباری مسافر نقل و حمل۔ اس کا مطلب یہ ہے: جیسے ہی کسی سفر کے لیے ادائیگی کی جاتی ہے یا منافع کے ارادے سے باقاعدگی سے کی جاتی ہے، PBefG لاگو ہوتا ہے۔ ادائیگی کے بغیر نجی سواری شامل نہیں ہے۔"
      }
    }
  },
  {
    "id": 2,
    "kapitel": "PBefG",
    "frage": "Zählen Sie die Ihnen bekannten Verkehrsarten auf.",
    "antwort": "Nach PBefG: Linienverkehr, Gelegenheitsverkehr (Taxi, Mietwagen, Ausflugsfahrten, Ferienziel-Reisen), Sonderformen (z. B. Schülerverkehr, Werksverkehr)",
    "tags": ["verkehrsarten", "linienverkehr", "gelegenheitsverkehr"],
    "translations": {
      "en": {
        "frage": "List the types of transport you know.",
        "antwort": "According to PBefG: Regular passenger service, occasional transport (taxi, rental car, excursions, holiday destination travel), special forms (e.g. school transport, company transport)"
      },
      "tr": {
        "frage": "Bildiğiniz ulaşım türlerini sayın.",
        "antwort": "PBefG'ye göre: Hat taşımacılığı, rastgele taşımacılık (taksi, kiralık araç, geziler, tatil yeri seyahatleri), özel formlar (örneğin okul taşımacılığı, işyeri taşımacılığı)"
      },
      "ar": {
        "frage": "اذكر أنواع النقل التي تعرفها.",
        "antwort": "وفقاً لـ PBefG: النقل المنتظم، النقل العرضي (سيارة أجرة، سيارة مستأجرة، رحلات استطلاعية، سفر إلى وجهات العطلات)، أشكال خاصة (مثل نقل المدارس، نقل الشركات)"
      },
      "fr": {
        "frage": "Énumérez les types de transport que vous connaissez.",
        "antwort": "Selon le PBefG : Transport de ligne, transport occasionnel (taxi, voiture de location, excursions, voyages vers des destinations de vacances), formes spéciales (par exemple transport scolaire, transport d'entreprise)"
      },
      "es": {
        "frage": "Enumere los tipos de transporte que conoce.",
        "antwort": "Según PBefG: Transporte de línea, transporte ocasional (taxi, coche de alquiler, excursiones, viajes a destinos vacacionales), formas especiales (por ejemplo, transporte escolar, transporte de empresa)"
      },
      "ur": {
        "frage": "آپ کو معلوم نقل و حمل کی اقسام بتائیں۔",
        "antwort": "PBefG کے مطابق: لائن ٹرانسپورٹ، کبھی کبھار ٹرانسپورٹ (ٹیکسی، کرائے کی کار، سیر و تفریح، تعطیلات کے مقام کا سفر)، خصوصی شکل (جیسے اسکول ٹرانسپورٹ، کمپنی ٹرانسپورٹ)"
      }
    }
  },
  {
    "id": 3,
    "kapitel": "PBefG",
    "frage": "Was versteht man unter „Gelegenheitsverkehr\"?",
    "antwort": "Verkehr, der nicht nach einem festen Fahrplan oder Linienweg durchgeführt wird, sondern nach Bedarf.",
    "tags": ["gelegenheitsverkehr", "definition"]
  },
  {
    "id": 4,
    "kapitel": "PBefG",
    "frage": "Welche Formen des Gelegenheitsverkehrs kennen Sie?",
    "antwort": "Taxiverkehr, Mietwagenverkehr, Ausflugsfahrten, Ferienziel-Reisen.",
    "tags": ["gelegenheitsverkehr", "formen"]
  },
  {
    "id": 5,
    "kapitel": "PBefG",
    "frage": "Was ist unter „Taxiverkehr\" zu verstehen?",
    "antwort": "Beförderung von Personen mit Pkw, die an behördlich zugelassenen Taxenständen bereitgehalten werden oder während der Fahrt bestellt/angehalten werden können.",
    "tags": ["taxi", "definition"]
  },
  {
    "id": 6,
    "kapitel": "PBefG",
    "frage": "Welche Fahrzeuge dürfen als Taxi eingesetzt werden?",
    "antwort": "Nur Pkw bis 9 Sitzplätze (einschließlich Fahrer). Fahrzeuge müssen technisch einwandfrei, verkehrssicher und für den Personentransport geeignet sein.",
    "tags": ["taxi", "fahrzeuge", "technische-anforderungen"]
  },
  {
    "id": 7,
    "kapitel": "PBefG",
    "frage": "Was ist unter „Mietwagenverkehr\" zu verstehen?",
    "antwort": "Beförderung von Personen mit Pkw, die nur aufgrund von Bestellungen eingesetzt werden und nach jeder Fahrt an den Betriebssitz zurückkehren müssen.",
    "tags": ["mietwagen", "definition", "betriebssitz"]
  },
  {
    "id": 8,
    "kapitel": "PBefG",
    "frage": "Welche Genehmigungen benötigt ein Taxiunternehmer?",
    "antwort": "Konzession nach § 13 PBefG für das Unternehmen und Fahrzeugscheine nach § 15 PBefG für jedes einzelne Fahrzeug.",
    "tags": ["genehmigungen", "konzession", "fahrzeugschein"]
  },
  {
    "id": 9,
    "kapitel": "PBefG",
    "frage": "Welche persönlichen Voraussetzungen muss ein Taxiunternehmer erfüllen?",
    "antwort": "Zuverlässigkeit, fachliche Eignung (Unternehmerschein), finanzielle Leistungsfähigkeit, EU-Staatsangehörigkeit oder entsprechende Aufenthaltserlaubnis.",
    "tags": ["persönliche-voraussetzungen", "zuverlässigkeit", "unternehmerschein"]
  },
  {
    "id": 10,
    "kapitel": "PBefG",
    "frage": "Was versteht man unter „fachlicher Eignung\"?",
    "antwort": "Nachweis der erforderlichen Kenntnisse durch eine Prüfung vor der IHK (Unternehmerschein). Umfasst rechtliche, technische und kaufmännische Kenntnisse.",
    "tags": ["fachliche-eignung", "ihk-prüfung", "unternehmerschein"]
  },
  {
    "id": 47,
    "kapitel": "BOKraft",
    "frage": "Was heißt „BOKraft\"?",
    "antwort": "„Verordnung über den Betrieb von Kraftfahrunternehmen im Personenverkehr\". Sie regelt technische und betriebliche Anforderungen an Taxis, Mietwagen und deren Unternehmer.",
    "tags": ["definition", "verordnung"]
  },
  {
    "id": 76,
    "kapitel": "Straßenverkehrsrecht",
    "frage": "Nennen Sie die 3 wichtigsten Rechtsgrundlagen des deutschen Straßenverkehrsrechts.",
    "antwort": "Straßenverkehrsgesetz (StVG), Straßenverkehrs-Ordnung (StVO), Straßenverkehrs-Zulassungs-Ordnung (StVZO)",
    "tags": ["grundlagen", "gesetze"]
  },
  {
    "id": 107,
    "kapitel": "Umweltschutz",
    "frage": "Welche allgemeinen Umweltschutzregeln sollte ein Taxi- bzw. Mietwagenunternehmer beachten?",
    "antwort": "Fahrzeuge regelmäßig warten (weniger Schadstoffe, weniger Verbrauch), kraftstoffsparende Fahrweise einführen, unnötige Leerfahrten vermeiden, Abfall und Betriebsstoffe fachgerecht entsorgen, leise, umweltfreundliche Fahrzeuge bevorzugen (z. B. Hybrid, E-Autos).",
    "tags": ["umweltschutz", "wartung", "fahrweise"]
  },
  {
    "id": 119,
    "kapitel": "Versicherungen",
    "frage": "Nennen Sie die Mindestversicherungssummen für Kfz-Haftpflicht.",
    "antwort": "Gesetzlich vorgeschrieben (Stand 2024): Personenschäden: 7,5 Mio. € pro Person, Sachschäden: 1,22 Mio. €, Vermögensschäden: 50.000 € (Die meisten Versicherer bieten heute wesentlich höhere Summen an, oft pauschal 100 Mio. € Deckung).",
    "tags": ["haftpflicht", "versicherungssummen"]
  },
  {
    "id": 132,
    "kapitel": "Kaufmännische Verwaltung",
    "frage": "Was ist „Zahlungsverkehr\"?",
    "antwort": "Der gesamte Ablauf von Geldflüssen zwischen Unternehmen, Kunden, Banken und Lieferanten.",
    "tags": ["zahlungsverkehr", "definition"]
  },
  {
    "id": 249,
    "kapitel": "Kalkulation",
    "frage": "Fallbeispiel 1: Berechnung der Fahrtkosten (15 km, 5 Personen, Gepäck, Wartezeit etc.)",
    "antwort": "Beispielrechnung (Werte variieren je nach Tarifordnung): Grundpreis: 3,90 €, km-Preis: 15 km × 2,00 € = 30,00 €, Zuschlag für 5. Person: 5,00 €, Gepäck (z. B. 2 × 1,00 €): 2,00 €, Wartezeit (10 Min × 0,50 €): 5,00 € ➡️ Gesamtkosten: 45,90 €",
    "tags": ["kalkulation", "fahrtkosten", "beispiel"]
  },
  {
    "id": 100,
    "kapitel": "Grenzverkehr",
    "frage": "Ist für den grenzüberschreitenden Verkehr (EU-Mitgliedsstaaten) eine spezielle Genehmigung erforderlich?",
    "antwort": "Ja, für die gewerbliche Personenbeförderung über die Grenze hinaus ist eine Genehmigung erforderlich. Innerhalb der EU: erleichterte Regelungen, oft reicht die nationale Genehmigung + Mitführpflicht von Dokumenten. Außerhalb der EU: gesonderte Genehmigungen oder internationale Abkommen (z. B. CEMT).",
    "tags": ["grenzverkehr", "genehmigung", "eu"]
  },
  {
    "id": 71,
    "kapitel": "Verbände",
    "frage": "Welche Aufgaben haben die Verbände?",
    "antwort": "Taxi- und Mietwagenverbände vertreten die Interessen der Unternehmer gegenüber Behörden, Politik und Öffentlichkeit. Ihre Aufgaben sind u. a.: Beratung und Unterstützung der Mitglieder (rechtlich, fachlich, wirtschaftlich), Schulungen und Weiterbildung organisieren, Tarif- und Genehmigungsfragen begleiten, Lobbyarbeit, z. B. gegen ungünstige Gesetzesänderungen.",
    "tags": ["verbände", "aufgaben", "interessenvertretung"]
  }
]
