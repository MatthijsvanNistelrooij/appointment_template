
export const navLinks = [
  { name: "Home", path: "/" },
  { name: "Over", path: "/over-ons" },
  { name: "Behandelingen", path: "/behandelingen" },
  { name: "Beauty", path: "/beauty" },
]

export const services = [
  /// KNIPPEN
  { name: "Heren knippen", price: "€ 28,50", category: "knippen" },
  { name: "Dames kort haar knippen", price: "€ 28,50", category: "knippen" },

  /// COSMETOLOGIE
  {
    name: "Specialistisch Consult",
    price: "€ 30,00",
    category: "cosmetologie",
  },

  /// GEZICHTSMASSAGE
  {
    name: "Sculpting gezichtsmassage",
    price: "€ 60,00",
    time: "40 min",
    category: "gezichtsmassage",
  },
  {
    name: "Lymfedrainage massage",
    price: "€ 60,00",
    time: "40 min",
    category: "gezichtsmassage",
  },
  {
    name: "Myofasciale gezichtsmassage",
    price: "€ 65,00",
    time: "50 min",
    category: "gezichtsmassage",
  },
  {
    name: "Verjongende massage",
    price: "€ 65,00",
    time: "60 min",
    category: "gezichtsmassage",
  },

  /// HYDRAFACIAL
  {
    name: "Hydrafacial + LED-roodlichttherapie",
    price: "€ 90,00",
    category: "hydrafacial",
  },
  {
    name: "HydraFacial SPA – voor het behoud van een gezonde gezichtshuid",
    price: "€ 59,00",
    time: "45 min",
    category: "hydrafacial",
  },
  {
    name: "HydraFacial – voor een zakenvrouw (Business Beauty)",
    price: "€ 59,00",
    time: "45 min",
    category: "hydrafacial",
  },
  {
    name: "HydraFacial – Hollywoodsterbehandeling – Rode Loper + CADEAU voor lippen",
    price: "€ 89,00",
    time: "60 min",
    category: "hydrafacial",
  },
  {
    name: "HydraFacial – voor een problematische en vette huid (Oily MD)",
    price: "€ 69,00",
    time: "45 min",
    category: "hydrafacial",
  },
  { name: "Deluxe Hydrafacial", price: "€ 99,00", category: "hydrafacial" },
  {
    name: "HydraFacial – verjonging (Anti-Age)",
    price: "€ 85,00",
    time: "60 min",
    category: "hydrafacial",
  },
  {
    name: "HydraFacial – luxe verjonging (Luxe)",
    price: "€ 89,00",
    time: "90 min",
    category: "hydrafacial",
  },
  {
    name: "HydraFacial – behandeling voor mannen",
    price: "€ 89,00",
    time: "60 min",
    category: "hydrafacial",
  },
  {
    name: "HydraFacial – diamanthydrodermabrasie",
    price: "€ 79,00",
    time: "60 min",
    category: "hydrafacial",
  },
  {
    name: "Hydrafacial + Kobido-massage: Anti-Age, hydraterend, voedend, dieptereiniging",
    price: "€ 89,00",
    category: "hydrafacial",
  },

  /// PEELINGS
  { name: "Jessner peeling", price: "€ 75,00", category: "peelings" },
  {
    name: "Speciaal masker na de Jalupro peeling",
    price: "€ 25,00",
    category: "peelings",
  },
  {
    name: "Medische chemische peeling van het gezicht",
    price: "€ 58 - € 87",
    category: "peelings",
  },
  {
    name: "Medische chemische peeling van de rug",
    price: "€ 73 - € 87",
    category: "peelings",
  },

  /// LICHAAMSMASSAGE
  {
    name: "Ontspannende lichaamsmassage",
    price: "€ 60 / € 80",
    time: "1 uur / 1,5 uur",
    category: "lichaamsmassage",
  },
  {
    name: "Lichaamsverstevigende massage",
    price: "€ 60 / € 80",
    time: "1 uur / 1,5 uur",
    category: "lichaamsmassage",
  },
  {
    name: "Lymfedrainage lichaamsmassage",
    price: "€ 59,00",
    time: "1 uur",
    category: "lichaamsmassage",
  },
  {
    name: "Nek- en kraagzonemassage",
    price: "€ 50,00",
    time: "45 min",
    category: "lichaamsmassage",
  },
  {
    name: "Volledige lichaamsmassage",
    price: "€ 79,00",
    time: "1,5 uur",
    category: "lichaamsmassage",
  },

  /// LIPOSUCTIE
  {
    name: "Laser liposuctie",
    price: "€ 50,00",
    time: "30 minuten",
    category: "liposuctie",
  },
  {
    name: "Laser liposuctie + cavitation",
    price: "€ 80,00",
    category: "liposuctie",
  },
  {
    name: "Laser liposuctie + RF body lifting",
    price: "€ 80,00",
    category: "liposuctie",
  },

  /// WENKBRAUWEN & WIMPERS
  { name: "Wenkbrauwen modelleren", price: "€ 30,00", category: "wenkbrauwen" },
  { name: "Wenkbrauwen lamineren", price: "€ 40,00", category: "wenkbrauwen" },
  { name: "Wimper lamineren", price: "€ 45,00", category: "wimpers" },
  {
    name: "Wenkbrauwcorrectie en -voorbereiding",
    price: "€ 45,00",
    category: "wenkbrauwen",
  },
  {
    name: "Wenkbrauwen corrigeren met pincet/hars + verven",
    price: "€ 35,00",
    category: "wenkbrauwen",
  },

  /// MANICURE
  {
    name: "Nagelverlenging in kleur + manicure",
    price: "€ 89,00",
    category: "manicure",
  },
  {
    name: "Naakte nagelverlengingen + manicure",
    price: "€ 79,00",
    category: "manicure",
  },
  {
    name: "Complexe Oekraïense manicure (combi + gellak coating)",
    price: "€ 60,00",
    category: "manicure",
  },
  {
    name: "Complexe manicure (combi + gellak coating)",
    price: "€ 55,00",
    category: "manicure",
  },
  {
    name: "Manicure en gellak",
    price: "€ 55,00",
    category: "manicure",
  },
  { name: "Lak en biab-coating", price: "€ 50,00", category: "manicure" },
  { name: "Spa manicure", price: "€ 45,00", category: "manicure" },
  { name: "Oekraïense manicure", price: "€ 40,00", category: "manicure" },
  { name: "Manicuristische diensten", price: "€ 40,00", category: "manicure" },
  { name: "Nagel ontwerp", price: "€ 35,00", category: "manicure" },
  {
    name: "Verwijderen van verlengde nagels",
    price: "€ 32,00",
    category: "manicure",
  },
  { name: "Franse manicure", price: "€ 30,00", category: "manicure" },

  {
    name: "Correctie van nagelcoating",
    price: "€ 30,00",
    category: "manicure",
  },
  { name: "Basismanicure", price: "€ 25,00", category: "manicure" },

  { name: "Gellak coating", price: "€ 45,00", category: "manicure" },
  { name: "Gellak verwijderen", price: "€ 29,00", category: "manicure" },
]

export const treatmentSections = [
  {
    title: "Gezichtscosmetologie",
    items: [
      "Specialistische consultatie",
      "Gezichtsreiniging en andere gebieden (gezicht / rug / decolleté)",
      "Handmatige, mechanische reiniging – comedonen, milia, acne-verzorging",
      "Aanbevolen aanvullende verzorging door specialist na reiniging",
    ],
  },
  {
    title: "Gezichtsmassage",
    items: [
      "Lymfedrainage, myofasciaal, lifting",
      "Verjongingsmassage - stimulatie van de huidstructuur en -elasticiteit",
    ],
  },
  {
    title: "HydraFacial & Hardwareverzorging",
    items: [
      "Basisprocedure voor diep huidvoorbereiding (reiniging, peeling, hydratatie, stimulatie)",
      "Verjongingsprotocol met exfoliatie, serum en optioneel masker",
      "Pigmentbehandeling – dermabrasie, serums, vitaminen",
      "Diamond microdermabrasie, Jessner peelings, glycolzuur, retinol",
      "Glyco 3 peel – alternatief voor injectie, effect van carboxytherapie",
    ],
  },
  {
    title: "Manicure",
    items: [
      "Hardware manicure, gecombineerde manicure",
      "Gelnagelverlenging en design",
      "Verzorgende hand- en voetbehandelingen voor verjonging",
      "Groot aanbod lakken, coatings en spa-behandelingen",
    ],
  },
  {
    title: "Wimpers & Wenkbrauwen",
    items: [
      "Laminatie van wimpers en wenkbrauwen voor langdurige verzorging",
      "Natuurlijke lift en krul met keratine en vitaminen",
      "Versteviging zonder schade, resultaat tot 6-8 weken",
    ],
  },
  {
    title: "Huidproblemen & Peelings",
    items: [
      "Behandeling van acne, post-acne littekens en grove poriën",
      "Verminderen van rimpels, pigmentatie en ruwe huid",
      "Herstel van huidtextuur, hydratatie en kleur",
    ],
  },
]

export const beautyPageVariables = {
  headerText:
    "Je gezicht weer laten stralen met schoonheidsbehandelingen in Groningen",
  subText:
    "Onze diensten: Huidverzorging, vacuüm gezichtsreiniging, SOS schoonheidsprocedures, darsonval, liftende gezichtsmassage, sculpturale gezichtsmassage, anti-aging gezichtsmassage, pellen, manicuristische diensten, correctie van nagelcoating, basismanicure, Franse manicure, spamanicure, lak en biab-coating, nagel ontwerp",
  sectionTitle1: "De ultieme beauty ervaring bij kapsalon Four Seasons",
  sectionDescription1:
    "Bij Kapsalon Four Seasons in Groningen geloven we dat de perfecte beauty behandeling begint bij een gezonde basis. Daarom bieden we naast onze haarbehandelingen ook een scala aan schoonheidsbehandelingen aan. Of je nu op zoek bent naar een ontspannende gezichtsbehandeling, een verjongende huidbehandeling of een professionele make-up sessie, wij hebben alles in huis om jouw schoonheid naar een hoger niveau te tillen. Onze schoonheidsspecialiste is getraind in de nieuwste technieken en werkt uitsluitend met hoogwaardige producten. Bij Kapsalon Four Seasons kun je rekenen op een professionele en persoonlijke service, zodat jij je na elke behandeling stralend en vol zelfvertrouwen voelt.",
  sectionTitle2:
    "Perfect verzorgde nagels in Groningen: straal tot in de vingertoppen",
  sectionDescription2:
    " Bij Four Seasons ben je aan het juiste adres voor professionele nagelverzorging en stijlvolle nagelstyling. Of je nu kiest voor een klassieke manicure, een verzorgde French manicure of een opvallend nagelontwerp, wij zorgen ervoor dat jouw handen er altijd tiptop uitzien. Onze specialisten werken met hoogwaardige producten en nemen de tijd voor een nauwkeurige afwerking. Laat jezelf verwennen met een spa-manicure of geef je nagels extra stevigheid met een BIAB-coating. Kom langs en ervaar hoe mooie nagels bijdragen aan jouw uitstraling!",
  sectionTitle3:
    "Perfect gevormde wenkbrauwen in Groningen: laat je natuurlijke schoonheid naar voren brengen",
  sectionDescription3:
    "Wij weten als geen ander dat perfect gevormde wenkbrauwen de sleutel zijn tot een verzorgde uitstraling. Onze getrainde schoonheidsspecialisten bieden een breed scala aan wenkbrauw behandelingen aan, waaronder waxen, threading en verven. Wij accentueren de natuurlijke vorm van jouw wenkbrauwen om jouw gezicht perfect te complementeren en te laten stralen. Of je nu op zoek bent naar een subtiele of dramatische verandering, ons team staat klaar om jouw wenkbrauwen perfect te vormen.",
  sectionTitle4:
    "Ontspan en geniet van een luxueuze gezichtsbehandeling in Groningen",
  sectionDescription4:
    "Heb je een speciale gelegenheid waarvoor je er stralend wil uitzien? Onze visagiste staat klaar om een prachtige make-up look te maken die volledig is afgestemd op jouw wensen. Je kan kiezen om langs te komen in onze zaak aan het Reitemakersrijge of laat onze visagiste bij je thuis komen.Benieuwd wat we voor jou kunnen betekenen? Neem vandaag nog contact met ons op.",
}

export const infoPageVariables = {
  headerText:
    "Klaar om te stralen? Boek nu een afspraak bij onze kapsalon met schoonheidsspecialiste in Groningen en ontdek onze exclusieve behandelingen",
}

export const aboutPageVariables = {
  headerText:
    "Welkom bij Four Seasons: De kapper in Groningen die weet wat je nodig hebt!",
  subText:
    "Wij zitten al meer dan 35 jaar in het vak en hebben veel ervaring met het knippen, kleuren en stijlen van haar. Daarnaast bieden we ook tal van schoonheidsbehandelingen aan. Wil jij helemaal herboren weer naar buiten lopen? Dan ben je bij ons aan het juiste adres! Kom je snel een keer langs?",
}
