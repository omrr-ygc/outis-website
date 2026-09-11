"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export type Locale = "en" | "tr";

const translations = {
  nav: {
    howItWorks: { en: "How It Works", tr: "Nasıl Çalışır" },
    whyUs: { en: "Why Us", tr: "Neden Biz" },
    faq: { en: "FAQ", tr: "SSS" },
    contact: { en: "Contact", tr: "İletişim" },
    becomeClipper: { en: "Become a Clipper", tr: "Clipper Ol" },
    bookCall: { en: "Book a Call", tr: "Görüşme Ayarla" },
  },

  hero: {
    subtitle: {
      en: "Your content, cut into clips and spread by independent creators across TikTok, Instagram and YouTube — you only pay for the views that hold up.",
      tr: "İçerikleriniz bağımsız içerik üreticileri tarafından kısa videolara dönüştürülüp TikTok, Instagram ve YouTube'da yayılıyor. Siz sadece gerçek izlenmeler için ödüyorsunuz.",
    },
    ctaPrimary: { en: "Book a Strategy Call", tr: "Strateji Görüşmesi Ayarla" },
    ctaSecondary: { en: "See How It Works", tr: "Nasıl Çalışır?" },
  },

  videoBanner: {
    categories: {
      en: ["MUSIC", "PODCASTS", "BRANDS", "PUBLIC FIGURES"],
      tr: ["MÜZİK", "PODCAST", "MARKALAR", "ÜNLÜLER"],
    },
  },

  howItWorks: {
    badge: { en: "HOW IT WORKS", tr: "NASIL ÇALIŞIR" },
    title: { en: "Three Steps to", tr: "Kitlesel Erişime" },
    titleHighlight: { en: " Massive Reach", tr: " Üç Adımda" },
    subtitle: {
      en: "From raw footage to thousands of posts across every major platform.",
      tr: "Ham içerikten büyük platformlarda binlerce paylaşıma.",
    },
    steps: {
      en: [
        {
          number: "01",
          title: "YOU SHARE",
          description: "Send us your existing content — podcasts, livestreams, product demos, music videos, whatever you already have. We take it from here.",
        },
        {
          number: "02",
          title: "WE ENGINEER",
          description: "We design the campaign rules, define the short-video formats, and brief our creator network. Every clip is built to stop the scroll.",
        },
        {
          number: "03",
          title: "THEY SPREAD",
          description: "Independent creators post your clips from their own accounts across TikTok, Instagram and YouTube. You open your phone, and you're everywhere.",
        },
      ],
      tr: [
        {
          number: "01",
          title: "SİZ PAYLAŞIN",
          description: "Elinizde ne varsa bize gönderin. Podcast, canlı yayın, ürün tanıtımı, müzik videosu. Gerisini biz hallederiz.",
        },
        {
          number: "02",
          title: "BİZ TASARLIYORUZ",
          description: "Kampanya kurallarını koyar, kısa video formatlarını belirler ve içerik üretici ağımızı harekete geçiririz. Her clip scroll'u durduracak şekilde kurgulanır.",
        },
        {
          number: "03",
          title: "ONLAR YAYIYOR",
          description: "Bağımsız içerik üreticileri clip'lerinizi kendi hesaplarından TikTok, Instagram ve YouTube'da paylaşıyor. Telefonunuza baktığınızda her yerde sizi görüyorsunuz.",
        },
      ],
    },
  },

  comparison: {
    badge: { en: "THE NUMBERS", tr: "RAKAMLAR" },
    title: { en: "Why Clipping", tr: "Clipping Neden" },
    titleHighlight: { en: " Outperforms ", tr: " Daha Etkili?" },
    titleEnd: { en: "Paid Ads", tr: "" },
    subtitle: {
      en: "Traditional paid social burns budget for borrowed attention. Clipping builds organic reach that compounds over time.",
      tr: "Klasik reklam geçici ilgi için bütçe yakar. Clipping ise zamanla katlanan organik erişim inşa eder.",
    },
    headers: {
      paidAds: { en: "PAID ADS", tr: "REKLAMLAR" },
      clipping: { en: "CLIPPING", tr: "CLIPPING" },
    },
    rows: {
      en: [
        { label: "Cost per 1,000 views", paid: "$8 – $30", clipping: "$0.30 – $2", highlight: "Up to 100x cheaper" },
        { label: "View type", paid: "Paid impressions", clipping: "Organic views", highlight: "Real engagement" },
        { label: "After campaign ends", paid: "Reach stops immediately", clipping: "Clips stay up & keep earning", highlight: "Evergreen content" },
        { label: "Platforms", paid: "1–2 per campaign", clipping: "TikTok, Instagram, YouTube simultaneously", highlight: "Multi-platform" },
      ],
      tr: [
        { label: "1.000 izlenme başı maliyet", paid: "$8 – $30", clipping: "$0.30 – $2", highlight: "100 kat daha düşük maliyet" },
        { label: "İzlenme türü", paid: "Ücretli gösterim", clipping: "Organik izlenme", highlight: "Gerçek etkileşim" },
        { label: "Kampanya bitince", paid: "Erişim anında durur", clipping: "Clip'ler kalır, izlenme devam eder", highlight: "Kalıcı içerik" },
        { label: "Platformlar", paid: "Kampanya başına 1–2", clipping: "TikTok, Instagram, YouTube aynı anda", highlight: "Multi-platform" },
      ],
    },
    stats: {
      en: [
        { value: 74, suffix: "%", label: "of brands shifting budgets to creator programs in 2026" },
        { value: 32.55, suffix: "B", prefix: "$", label: "global creator economy size", decimals: 2 },
        { value: 700, suffix: "%", label: "organic growth vs. paid media at 1/5 the cost" },
      ],
      tr: [
        { value: 74, suffix: "%", label: "markaların 2026 itibarıyla reklam bütçelerini içerik üreticilerine kaydırma oranı" },
        { value: 32.55, suffix: "B", prefix: "$", label: "küresel içerik üretici ekonomisi", decimals: 2 },
        { value: 700, suffix: "%", label: "reklamın 1/5'i maliyetle elde edilen organik büyüme oranı" },
      ],
    },
    sources: {
      en: "Sources: Influencer Marketing Hub 2026, Clouted / a16z case studies, industry CPM benchmarks.",
      tr: "Kaynaklar: Influencer Marketing Hub 2026, Clouted / a16z vaka çalışmaları, sektörel CPM verileri.",
    },
  },

  whoWeServe: {
    badge: { en: "WHO WE SERVE", tr: "ÇÖZÜM ALANLARI" },
    title: { en: "Built for Brands That", tr: "İnovasyon Odaklı" },
    titleHighlight: { en: " Move Fast", tr: " Markalar İçin" },
    subtitle: {
      en: "Whether you have hours of raw footage or a single trailer — if it can be clipped, we can spread it.",
      tr: "Elinizde saatlerce ham görüntü de olsa tek bir trailer da olsa fark etmez. Clip'e dönüşen her şeyi yayarız.",
    },
    segments: {
      en: [
        { title: "Gaming", description: "Turn gameplay footage, trailers and esports highlights into viral short-form clips that drive downloads and community growth." },
        { title: "Music & Entertainment", description: "Seed new releases across thousands of creator accounts so the algorithm picks up the sound before you spend a dollar on ads." },
        { title: "Podcasts & Talk Shows", description: "Extract the sharpest moments from long-form conversations and spread them as standalone clips that pull listeners back to the full episode." },
        { title: "Apps & SaaS", description: "Demo your product through native short-form content that feels organic — not like an ad — and drives installs at a fraction of paid CPI." },
        { title: "Personal Brands", description: "Scale your presence without scaling your workload. Coaches, founders and creators get clips posted from dozens of accounts simultaneously." },
      ],
      tr: [
        { title: "GAMING", description: "Gameplay görüntüleri, trailer'lar ve espor highlight'ları viral kısa videolara dönüşsün. İndirme sayılarınız ve topluluğunuz büyüsün." },
        { title: "MÜZİK & EĞLENCE", description: "Yeni çıkışlarınız binlerce hesapta aynı anda yayılsın, daha reklama para harcamadan algoritma sesinizi yakalasın." },
        { title: "PODCAST & TALK SHOW", description: "Uzun sohbetlerden en vurucu anları kesip dinleyiciyi tam bölüme geri çeken clip'ler olarak yayıyoruz." },
        { title: "UYGULAMA & SAAS", description: "Ürününüzü reklam gibi değil, organik hissettiren kısa videolarla tanıtıyoruz. Üstelik ücretli CPI'ın çok altında bir maliyetle." },
        { title: "KİŞİSEL MARKA", description: "İş yükünüz artmasın ama görünürlüğünüz katlansın. Koçlar, kurucular ve içerik üreticileri onlarca hesaptan aynı anda yayında." },
      ],
    },
  },

  bentoGrid: {
    badge: { en: "WHY US", tr: "NEDEN BİZ" },
    title: { en: "The Distribution Engine", tr: "Dağıtım Motoru" },
    subtitle: {
      en: "A managed clipping service built for performance — from campaign design to creator coordination to quality control.",
      tr: "Performans için kurgulanmış yönetimli bir clipping servisi. Kampanya tasarımından içerik üretici koordinasyonuna ve kalite kontrolüne kadar her şey dahil.",
    },
    features: {
      en: [
        { title: "Turkey's First Clipping Agency", description: "We pioneered the managed clipping model in Turkey — bridging a fast-growing creator talent pool with brands that need global short-form distribution." },
        { title: "Verified Views Only", description: "Every view is tracked and reported by the platforms themselves. No bots, no inflation. You see exactly what performed and what didn't." },
        { title: "Multi-Platform Distribution", description: "Your clips go live on TikTok, Instagram Reels and YouTube Shorts simultaneously — posted from real creator accounts, not ad placements." },
        { title: "Pay Only for Results", description: "No upfront production fees or retainers. Your budget goes directly into distribution — you pay per verified view, nothing more." },
        { title: "Full Content Approval", description: "Every clip is reviewed against your campaign guidelines before it goes live. You control the message — we handle the scale." },
        { title: "Transparent Reporting", description: "Detailed campaign reports with per-clip breakdowns, platform metrics and spend tracking. No hidden numbers, no vanity metrics." },
      ],
      tr: [
        { title: "Türkiye'nin İlk Clipping Ajansı", description: "Türkiye'de yönetimli clipping modelini biz başlattık. Hızla büyüyen içerik üretici havuzunu, küresel kısa video dağıtımına ihtiyaç duyan markalarla buluşturuyoruz." },
        { title: "Sadece Doğrulanmış İzlenmeler", description: "Her izlenme platformların kendi sistemleriyle takip edilir ve raporlanır. Bot yok, şişirme yok. Neyin tuttuğunu, neyin tutmadığını net görürsünüz." },
        { title: "Multi-Platform Dağıtım", description: "Clip'leriniz TikTok, Instagram Reels ve YouTube Shorts'ta aynı anda yayına girer. Reklam alanından değil, gerçek hesaplardan." },
        { title: "Sadece Sonuç İçin Ödeme", description: "Peşin prodüksiyon ücreti ya da aylık sabit ödeme yok. Bütçeniz doğrudan dağıtıma gidiyor. Doğrulanmış izlenme başı ödüyorsunuz, o kadar." },
        { title: "Tam İçerik Onayı", description: "Her clip yayına çıkmadan önce kampanya kurallarınıza göre kontrol edilir. Mesajın kontrolü sizde, ölçek bizde." },
        { title: "Şeffaf Raporlama", description: "Clip bazında detaylı kampanya raporları, platform metrikleri ve harcama takibi. Gizli rakam yok, göstermelik metrik yok." },
      ],
    },
  },

  faq: {
    badge: { en: "FAQ", tr: "SSS" },
    title: { en: "Frequently Asked Questions", tr: "Sıkça Sorulan Sorular" },
    items: {
      en: [
        {
          question: "What is Clipping?",
          answer: "Creators cut your existing content into short vertical videos and post them from their own accounts across TikTok, Instagram and YouTube. You pay per verified view. It's distribution, not ad buying.",
        },
        {
          question: "How is the process?",
          answer: "You share your brand details, content assets and campaign goals with us. We then design a tailored set of campaign rules — defining the short-video formats, style guidelines and posting requirements that creators need to follow. Our creator network produces content that matches those rules and publishes it on their own social media accounts. Every submission is personally reviewed by our team to make sure it meets the campaign standards before any view counts toward your spend.",
        },
        {
          question: "How does this compare to running paid ads?",
          answer: "Paid social typically runs $8–$30 CPM, and the moment you stop paying, the reach stops. Our campaigns deliver at around $0.30–$2 CPM. The clips also stay up and keep earning views long after the campaign ends. And because the content is posted from real creator accounts — not a brand ad slot — every view you get is organic. It shows up in people's feeds as native content, not as a promoted post they scroll past.",
        },
        {
          question: "How is this different from influencer or UGC work?",
          answer: "An influencer rents you their audience for a single post, and it reads as an ad. UGC gives you creative you then have to distribute yourself. Clipping is the distribution layer: many creators posting your content at once, in a format that looks native to the feed rather than like advertising.",
        },
        {
          question: "Are the views real?",
          answer: "Yes. Every view comes from real short-form platform traffic on real accounts run by real people. Our clippers post from their own TikTok, Instagram, YouTube, X and Facebook accounts, so views, likes, comments and shares are reported by the platforms themselves. We never buy views, we never use bot farms, and we never inflate a report. If a clip underperforms, it shows up as underperformance in the numbers we send you — not as padding.",
        },
        {
          question: "How much does it cost?",
          answer: "Pricing scales with your ad budget. We take a fixed percentage of your total campaign budget as a service fee — the rest goes directly into creator payouts and distribution. This means you always know exactly how your money is split between management and actual reach. The minimum campaign budget is $1,000.",
        },
        {
          question: "What platforms do you distribute on?",
          answer: "We focus on TikTok, Instagram Reels and YouTube Shorts — the three platforms currently driving the most reach and cultural impact in the world. Content is posted across multiple accounts per platform, multiple times per day.",
        },
        {
          question: "Can I become a clipper?",
          answer: "clipper-cta",
        },
      ],
      tr: [
        {
          question: "Clipping nedir?",
          answer: "İçerik üreticileri mevcut içeriklerinizi kısa dikey videolara dönüştürüp kendi hesaplarından TikTok, Instagram ve YouTube'da paylaşıyor. Siz de doğrulanmış izlenme başına ödeme yapıyorsunuz. Reklam satın alma değil, dağıtım.",
        },
        {
          question: "Süreç nasıl işliyor?",
          answer: "Marka bilgilerinizi, içeriklerinizi ve kampanya hedeflerinizi bizimle paylaşıyorsunuz. Biz de size özel kampanya kuralları hazırlıyoruz. Kısa video formatları, stil rehberi ve paylaşım kuralları belirliyoruz. İçerik üretici ağımız bu kurallara uygun clip'ler üretip kendi sosyal medya hesaplarında yayınlıyor. Her gönderim, harcamanıza sayılmadan önce ekibimiz tarafından tek tek kontrol ediliyor.",
        },
        {
          question: "Reklamla karşılaştırınca durum ne?",
          answer: "Ücretli sosyal medya reklamları genelde $8–$30 CPM bandında seyrediyor ve ödemeyi kestiğiniz an erişim duruyor. Bizim kampanyalarımız $0.30–$2 CPM civarında sonuç veriyor. Üstelik clip'ler kampanya bittikten sonra da yayında kalıp izlenmeye devam ediyor. İçerik reklam alanından değil gerçek hesaplardan paylaşıldığı için her izlenme organik. İnsanların feed'inde doğal içerik olarak çıkıyor, reklam olarak değil.",
        },
        {
          question: "Influencer veya UGC'den farkı ne?",
          answer: "Influencer tek bir paylaşım için size kitlesini kiralar ve sonuç genelde reklam gibi durur. UGC size içerik verir ama dağıtımı kendiniz yapmak zorundasınız. Clipping ise doğrudan dağıtımdır: birçok içerik üretici sizin içeriğinizi aynı anda feed'de doğal görünen formatta paylaşıyor.",
        },
        {
          question: "İzlenmeler gerçek mi?",
          answer: "Evet. Her izlenme, gerçek kişilerin yönettiği gerçek hesaplarda organik trafikten geliyor. Clipper'larımız kendi TikTok, Instagram, YouTube, X ve Facebook hesaplarından paylaşıyor, bu yüzden izlenmeler, beğeniler ve yorumlar platformların kendi sistemleri tarafından raporlanıyor. Asla izlenme satın almıyoruz, bot kullanmıyoruz, rapor şişirmiyoruz. Bir clip düşük performans gösteriyorsa rakamlarda da öyle yansıyor. Kağıt üstünde şişirme yapmıyoruz.",
        },
        {
          question: "Maliyeti ne kadar?",
          answer: "Fiyatlandırma reklam bütçenize göre şekilleniyor. Toplam kampanya bütçenizden sabit bir yüzdeyi hizmet bedeli olarak alıyoruz, geri kalanı doğrudan içerik üretici ödemelerine ve dağıtıma gidiyor. Paranızın ne kadarının yönetime ne kadarının gerçek erişime gittiğini her zaman net görüyorsunuz. Minimum kampanya bütçesi $1,000.",
        },
        {
          question: "Hangi platformlarda dağıtım yapıyorsunuz?",
          answer: "TikTok, Instagram Reels ve YouTube Shorts. Şu an dünyada en fazla erişim ve kültürel etki yaratan üç platform. İçerikler her platformda birden fazla hesaptan, günde birden fazla kez paylaşılıyor.",
        },
        {
          question: "Clipper olabilir miyim?",
          answer: "clipper-cta",
        },
      ],
    },
    clipperCtaText: {
      en: "Yes. Our clipper community runs on Whop and we're always taking new people.",
      tr: "Evet! Clipper topluluğumuz Whop üzerinden yürüyor ve sürekli yeni kişileri aramıza alıyoruz.",
    },
    clipperCtaLink: {
      en: "Join on Whop",
      tr: "Whop'tan Katıl",
    },
  },

  booking: {
    badge: { en: "GET STARTED", tr: "BAŞLAYIN" },
    title: { en: "Book a Strategy Call", tr: "Strateji Görüşmesi Ayarlayın" },
    subtitle: {
      en: "Tell us about your brand and goals. We'll build a custom campaign plan on the call.",
      tr: "Markanızdan ve hedeflerinizden bahsedin. Görüşmede size özel kampanya planınızı birlikte oluşturalım.",
    },
    duration: { en: "30 min", tr: "30 dk" },
    videoCall: { en: "Video call", tr: "Video görüşme" },
    selectTime: { en: "SELECT TIME", tr: "SAAT SEÇİN" },
    selectDate: { en: "SELECT A DATE", tr: "TARİH SEÇİN" },
    selectDateHint: {
      en: "Pick a date from the calendar to see available time slots.",
      tr: "Uygun saatleri görmek için takvimden bir tarih seçin.",
    },
    noSlots: {
      en: "No slots available on this day.",
      tr: "Bugün için uygun saat bulunmuyor.",
    },
    backToCalendar: { en: "Back to calendar", tr: "Takvime dön" },
    formName: { en: "NAME", tr: "İSİM" },
    formNamePlaceholder: { en: "Your name", tr: "Adınız" },
    formEmail: { en: "EMAIL", tr: "E-POSTA" },
    formEmailPlaceholder: { en: "you@company.com", tr: "siz@sirket.com" },
    formCompany: { en: "COMPANY / BRAND", tr: "ŞİRKET / MARKA" },
    formCompanyPlaceholder: { en: "Your brand or company name", tr: "Marka veya şirket adınız" },
    formMessage: { en: "ANYTHING TO HELP US PREPARE?", tr: "EKLEMEK İSTEDİĞİNİZ BİR ŞEY VAR MI?" },
    formMessagePlaceholder: {
      en: "Tell us about your content, goals, or any questions...",
      tr: "İçeriklerinizden, hedeflerinizden veya sorularınızdan bahsedin...",
    },
    submitButton: { en: "Schedule Call", tr: "Görüşmeyi Planla" },
    successTitle: { en: "Call Booked!", tr: "Görüşme Ayarlandı!" },
    successSubtitle: {
      en: "A confirmation has been sent to your email. We look forward to speaking with you.",
      tr: "E-postanıza onay gönderdik. Görüşmede buluşmak üzere!",
    },
    errorNameEmail: {
      en: "Please fill in your name and email.",
      tr: "Lütfen adınızı ve e-postanızı girin.",
    },
    errorEmail: {
      en: "Please enter a valid email address.",
      tr: "Lütfen geçerli bir e-posta adresi girin.",
    },
    errorDateTime: {
      en: "Please select a date and time.",
      tr: "Lütfen bir tarih ve saat seçin.",
    },
    errorGeneric: {
      en: "Something went wrong. Please try again.",
      tr: "Bir şeyler ters gitti. Lütfen tekrar deneyin.",
    },
    errorGenericLong: {
      en: "Something went wrong. Please try again or email us at info@outisclips.com.",
      tr: "Bir şeyler ters gitti. Lütfen tekrar deneyin veya info@outisclips.com adresine yazın.",
    },
  },

  footer: {
    privacy: { en: "Privacy Policy", tr: "Gizlilik Politikası" },
    terms: { en: "Terms of Service", tr: "Kullanım Koşulları" },
  },
} as const;

type Translations = typeof translations;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: translations,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const handleSetLocale = useCallback((l: Locale) => {
    setLocale(l);
  }, []);

  return (
    <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, t: translations }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
