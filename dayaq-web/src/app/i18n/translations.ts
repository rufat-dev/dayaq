export type Locale = 'en' | 'az' | 'tr' | 'ru'

type Pillar = {
  title: string
  description: string
}

type Service = {
  title: string
  description: string
  cta: string
}

type Step = {
  title: string
  body: string
}

type Testimonial = {
  name: string
  quote: string
}

type FaqItem = {
  question: string
  answer: string
}

type LandingTranslations = {
  nav: {
    therapy: string
    medications: string
    treatments: string
    coverage: string
    clinicians: string
  }
  header: {
    login: string
    getStarted: string
  }
    hero: {
      pill: string
      heading: string
      accent: string
      lede: string
      ctaPrimary: string
      ctaSecondary: string
      highlight: string
      form: {
        title: string
        subtitle: string
        fullName: string
        phoneNumber: string
        email: string
        finCode: string
        finHint: string
        seededFullName: string
        seededPhoneNumber: string
        seededEmail: string
        seededFinCode: string
        submit: string
        disclaimer: string
      }
    }
  headings: {
    pillars: string
    services: string
    steps: string
    testimonials: string
    faq: string
    coverageSnapshot: string
    servicesLead: string
  }
  pillars: Pillar[]
  services: Service[]
  steps: Step[]
  testimonials: Testimonial[]
  faqs: FaqItem[]
  coverage: {
    pill: string
    heading: string
    lede: string
    plans: string[]
    checklist: string[]
    verify: string
  }
  footer: {
    heading: string
    exploreHeading: string
    body: string
    emergency: string
    explore: string[]
    clinicians: {
      heading: string
      body: string
      cta: string
    }
    privacy: string
    terms: string
    accessibility: string
    copyright: (year: number) => string
  }
}

type LoginTranslations = {
  existingMembers: string
  heading: string
  lede: string
  form: {
    email: string
    password: string
    rememberMe: string
    submit: string
    submitting: string
    disclaimer: string
    success: string
    error: string
    emailError: string
    passwordError: string
  }
  backHome: string
}

type UserCategorySelectionTranslations = {
  heading: string
  lede: string
  categories: {
    organization: string
    professional: string
    client: string
  }
  backHome: string
}

type AdminLoginTranslations = {
  heading: string
  lede: string
  form: {
    username: string
    password: string
    usernamePlaceholder: string
    passwordPlaceholder: string
    submit: string
    error: string
  }
  backHome: string
}

type AdminPanelTranslations = {
  heading: string
  lede: string
  signOut: string
}

type RegistrationTranslations = {
  heading: string
  lede: string
  form: {
    name: string
    surname: string
    fatherName: string
    birthDate: string
    email: string
    phoneNumber: string
    password: string
    submit: string
    submitting: string
    success: string
    error: string
  }
  backHome: string
}

type CommonTranslations = {
  brand: string
}

export type AppTranslations = {
  common: CommonTranslations
  landing: LandingTranslations
  login: LoginTranslations
  userCategorySelection: UserCategorySelectionTranslations
  adminLogin: AdminLoginTranslations
  adminPanel: AdminPanelTranslations
  registration: RegistrationTranslations
}

export const translations: Record<Locale, AppTranslations> = {
  en: {
    common: {
      brand: 'Dayaq Care',
    },
    landing: {
      nav: {
        therapy: 'Therapy',
        medications: 'Medications',
        treatments: 'Treatments',
        coverage: 'Coverage',
        clinicians: 'For clinicians',
      },
      header: {
        login: 'Log in',
        getStarted: 'Get started',
      },
      hero: {
        pill: 'Most insured members have a $0 copay',
        heading: 'Space to figure things out',
        accent: ' with flexible therapy and medication support.',
        lede:
          'Connect with licensed clinicians by video, audio, or messaging—on your schedule and without long waitlists.',
        ctaPrimary: 'Check your coverage',
        ctaSecondary: 'Browse therapists',
        highlight: '60,000+ 5-star experiences from people who got started quickly.',
        form: {
          title: 'Get matched now',
          subtitle: 'We prefilled a few details so you can see how matching works.',
          fullName: 'Name, surname, patronymic',
          phoneNumber: 'Phone number',
          email: 'Email',
          finCode: 'FIN code',
          finHint: '6-character code with letters and numbers only',
          seededFullName: 'Alex Doe Aliyev',
          seededPhoneNumber: '+1 (555) 123-4567',
          seededEmail: 'alex.doe@example.com',
          seededFinCode: 'A1B2C3',
          submit: 'Register',
          disclaimer: 'No commitment. We won’t save these details.',
        },
      },
      headings: {
        pillars: 'What you get with Dayaq',
        services: 'Care options built for real life',
        steps: 'How it works',
        testimonials: 'People are finding their footing',
        faq: 'Questions, answered',
        coverageSnapshot: 'Coverage snapshot',
        servicesLead: 'Care options built for real life',
      },
      pillars: [
        {
          title: 'Access in days, not weeks',
          description:
            'Messaging, live video, or audio sessions with licensed clinicians matched to your needs.',
        },
        {
          title: 'Flexible care built around you',
          description:
            'Choose how you want to engage: ongoing therapy, medication management, or both.',
        },
        {
          title: 'Insurance friendly',
          description:
            'Most members see low or $0 copays. We help you check eligibility without the paperwork.',
        },
      ],
      services: [
        {
          title: 'Individual therapy',
          description: 'One-to-one support for anxiety, depression, burnout, and life changes.',
          cta: 'Start therapy',
        },
        {
          title: 'Teen therapy',
          description: 'Licensed specialists for ages 13–17 with messaging or live sessions.',
          cta: 'Support a teen',
        },
        {
          title: 'Couples therapy',
          description: 'Strengthen communication and navigate conflict with a neutral partner.',
          cta: 'Book couples care',
        },
        {
          title: 'Medication management',
          description: 'Psychiatry and prescriptions with careful follow-up and monitoring.',
          cta: 'Explore medication',
        },
      ],
      steps: [
        {
          title: 'Check eligibility',
          body: 'Tell us where you are and what you need. We surface coverage details automatically.',
        },
        {
          title: 'Get matched fast',
          body: 'We pair you with a clinician who fits your goals, preferences, and schedule.',
        },
        {
          title: 'Start sessions',
          body: 'Message anytime and add live sessions when you want deeper time together.',
        },
      ],
      testimonials: [
        {
          name: 'Sasha',
          quote: '“Messaging between sessions keeps me moving forward. I feel seen without waiting weeks.”',
        },
        {
          name: 'Devon',
          quote: '“Switching therapists was simple. I found the right fit without starting over.”',
        },
        {
          name: 'Priya',
          quote:
            '“Adding medication management alongside therapy gave me a balanced plan that finally works.”',
        },
      ],
      faqs: [
        {
          question: 'Is online therapy effective?',
          answer:
            'Yes. Research shows outcomes comparable to in‑person care when delivered by licensed clinicians with secure messaging and live sessions.',
        },
        {
          question: 'Can I use insurance?',
          answer:
            'Most major plans are supported. We check eligibility up front and show your estimated copay before you start.',
        },
        {
          question: 'How fast can I start?',
          answer:
            'Most people are matched within two days. You can message as soon as you’re matched and schedule live time shortly after.',
        },
        {
          question: 'Can I change providers?',
          answer: 'Absolutely. If the first match is not a fit, you can switch at no extra cost.',
        },
      ],
      coverage: {
        pill: 'Insurance-ready',
        heading: 'Most members see $0 copays',
        lede:
          'Choose your insurer to learn more. We support major plans and show costs up front so there are no surprises.',
        plans: ['Aetna', 'Cigna', 'Optum', 'Anthem', 'TRICARE', 'Medicare'],
        checklist: [
          'Live sessions and unlimited messaging',
          'Switch therapists anytime',
          'Medication management where available',
          'HIPAA-compliant and private',
        ],
        verify: 'Verify benefits',
      },
      footer: {
        heading: 'Dayaq Care',
        exploreHeading: 'Explore',
        body:
          'Convenient access to licensed therapists, psychiatrists, and coaches who meet you where you are.',
        emergency: 'Not for emergencies. If you need immediate help, call 988.',
        explore: ['Therapy', 'Medication', 'Teen support', 'Couples'],
        clinicians: {
          heading: 'For clinicians',
          body: 'Partner with us to reach clients nationwide. Flexible schedules, strong support.',
          cta: 'Join the network',
        },
        privacy: 'Privacy',
        terms: 'Terms',
        accessibility: 'Accessibility',
        copyright: (year: number) => `© ${year} Dayaq Care. All rights reserved.`,
      },
    },
    login: {
      existingMembers: 'Existing members',
      heading: 'Log in',
      lede: 'Access your care team, sessions, and messages securely.',
      backHome: 'Back to home',
      form: {
        email: 'Email',
        password: 'Password',
        rememberMe: 'Keep me signed in on this device',
        submit: 'Continue',
        submitting: 'Signing in...',
        disclaimer: 'We will verify your credentials securely. Nothing is stored in this demo flow.',
        success:
          'Login is ready to connect to the auth service. We will direct you after verification once the backend is wired up.',
        emailError: 'Enter a valid email address',
        passwordError: 'Password must be at least 8 characters',
      },
    },
    userCategorySelection: {
      heading: 'Choose your account type',
      lede: 'Select the category that best describes you to continue registration.',
      categories: {
        organization: 'Organization',
        professional: 'Professional',
        client: 'Client',
      },
      backHome: 'Back to home',
    },
    adminLogin: {
      heading: 'Admin access',
      lede: 'Enter your admin credentials to continue.',
      form: {
        username: 'Admin username',
        password: 'Admin password',
        usernamePlaceholder: 'Enter admin username',
        passwordPlaceholder: 'Enter admin password',
        submit: 'Sign in',
        error: 'We could not sign you in. Please check your details and try again.',
      },
      backHome: 'Back to home',
    },
    adminPanel: {
      heading: 'Admin panel',
      lede: 'You are signed in with administrative access.',
      signOut: 'Sign out',
    },
    registration: {
      heading: 'Create your account',
      lede: 'Share a few details to get started.',
      form: {
        name: 'First name',
        surname: 'Last name',
        fatherName: 'Father name',
        birthDate: 'Birth date',
        email: 'Email',
        phoneNumber: 'Phone number',
        password: 'Password',
        submit: 'Create account',
        submitting: 'Submitting...',
        success: 'Registration submitted. We will be in touch shortly.',
        error: 'We could not complete registration. Please try again.',
      },
      backHome: 'Back to home',
    },
  },
  az: {
    common: {
      brand: 'Dayaq Care',
    },
    landing: {
      nav: {
        therapy: 'Terapiya',
        medications: 'Dərmanlar',
        treatments: 'Müalicələr',
        coverage: 'Əhatə dairəsi',
        clinicians: 'Kliniklər üçün',
      },
      header: {
        login: 'Daxil ol',
        getStarted: 'Başlayın',
      },
      hero: {
        pill: 'Sığortalı üzvlərin əksəriyyəti $0 ödəniş ödəyir',
        heading: 'İşləri aydınlaşdırmaq üçün yer',
        accent: ' çevik terapiya və dərman dəstəyi ilə.',
        lede:
          'Lisenziyalı kliniklərlə video, audio və ya mesaj vasitəsilə cədvəlinizə uyğun əlaqə qurun.',
        ctaPrimary: 'Əhatə dairəsini yoxlayın',
        ctaSecondary: 'Terapevtləri nəzərdən keçirin',
        highlight:
          '60,000+ 5 ulduzlu təcrübə, tez başlamağa hazır olan insanlardan.',
        form: {
          title: 'İndi uyğunluğu görün',
          subtitle:
            'Uyğunluğun necə işlədiyini görmək üçün bəzi məlumatları əvvəlcədən doldurduq.',
          fullName: 'Ad, soyad, ata adı',
          phoneNumber: 'Telefon nömrəsi',
          email: 'Email',
          finCode: 'FIN kodu',
          finHint: 'Yalnız hərf və rəqəmlərdən ibarət 6 simvollu kod',
          seededFullName: 'Alex Doe Aliyev',
          seededPhoneNumber: '+994 12 345 6789',
          seededEmail: 'alex.doe@example.com',
          seededFinCode: 'A1B2C3',
          submit: 'Qeydiyyatdan keç',
          disclaimer: 'Öhdəlik yoxdur. Bu məlumatları saxlamırıq.',
        },
      },
      headings: {
        pillars: 'Dayaq ilə əldə etdikləriniz',
        services: 'Həqiqi həyat üçün hazırlanmış qayğı variantları',
        steps: 'Necə işləyir',
        testimonials: 'İnsanlar öz mövqelərini tapır',
        faq: 'Suallar, cavablandı',
        coverageSnapshot: 'Əhatə görüntüsü',
        servicesLead: 'Həqiqi həyat üçün hazırlanmış qayğı variantları',
      },
      pillars: [
        {
          title: 'Giriş günlər, həftələr yox',
          description:
            'Mesaj, canlı video və ya audio sessiyalarla ehtiyaclarınıza uyğun lisenziyalı kliniklərlə əlaqə saxlayın.',
        },
        {
          title: 'Sizə uyğun çevik qayğı',
          description:
            'Davamlı terapiya, dərman idarəçiliyi və ya hər ikisini seçin.',
        },
        {
          title: 'Sığorta dostu',
          description:
            'Əksər üzvlər aşağı və ya $0 ödənişlə xidmət alır. Uyğunluğu sənəd işi olmadan göstəririk.',
        },
      ],
      services: [
        {
          title: 'Fərdi terapiya',
          description:
            'Narahatlıq, depressiya, tüstülənmə və həyat dəyişiklikləri üçün birə-bir dəstək.',
          cta: 'Terapiyaya başlayın',
        },
        {
          title: 'Yeniyetmə terapiyası',
          description:
            '13–17 yaş arası lisenziyalı mütəxəssislər mesaj və canlı sessiyalarla dəstək verir.',
          cta: 'Yeniyetməyə dəstək olun',
        },
        {
          title: 'Cütlük terapiyası',
          description:
            'Ünsiyyəti gücləndirin və konfliktləri neytral tərəfdaşla müzakirə edin.',
          cta: 'Birlikdə qayğıya rezerv edin',
        },
        {
          title: 'Dərman idarəçiliyi',
          description: 'Psixiatriya və reseptlərlə diqqətli izləmə.',
          cta: 'Dərmanları araşdırın',
        },
      ],
      steps: [
        {
          title: 'Uyğunluğu yoxlayın',
          body:
            'Harada olduğunuzu və nəyə ehtiyacınız olduğunu deyin. Əhatə dairəsini avtomatik göstəririk.',
        },
        {
          title: 'Sürətlə uyğunlaşın',
          body:
            'Məqsədinizə, üstünlüklərinizə və cədvəlinizə uyğun kliniklərlə sizi tanış edirik.',
        },
        {
          title: 'Sessiyalara başlayın',
          body:
            'İstədiyiniz zaman mesaj yazın və daha dərin məqsəd üçün canlı sessiyalar əlavə edin.',
        },
      ],
      testimonials: [
        {
          name: 'Saşa',
          quote:
            '“Sessiyalar arasında mesajlaşmaq məni irəli aparır. Gözləmədən görünən hiss edirəm.”',
        },
        {
          name: 'Devon',
          quote:
            '“Terapevti dəyişmək sadə oldu. Yenidən başlamağa ehtiyac qalmadı.”',
        },
        {
          name: 'Priya',
          quote:
            '“Terapiya ilə yanaşı dərman idarəçiliyi balanslı plan yaratdı.”',
        },
      ],
      faqs: [
        {
          question: 'Onlayn terapiya effektivdirmi?',
          answer:
            'Bəli. Lisenziyalı kliniklərlə təhlükəsiz mesajlar və canlı sessiyalar ənənəvi qayğı ilə müqayisədə bənzər nəticələr təqdim edir.',
        },
        {
          question: 'Sığortanı istifadə edə bilərəm?',
          answer:
            'Əksər böyük planlar dəstəklənir. Biz uyğunluğu dərhal göstərir və əlavə sənəd tələb etmirik.',
        },
        {
          question: 'Nə qədər tez başlaya bilərəm?',
          answer:
            'Əksər insanlar iki gün ərzində uyğunlaşır. Uyğunlaşmadan sonra dərhal mesajlaşmağa başlaya bilərsiniz.',
        },
        {
          question: 'Provayderi dəyişə bilərəm?',
          answer:
            'Bəli. İlk uyğunluq uyğun deyilsə, əlavə ödənişsiz dəyişə bilərsiniz.',
        },
      ],
      coverage: {
        pill: 'Sığorta hazır',
        heading: 'Əksər üzvlər $0 ödəniş görür',
        lede:
          'Sığortanızı seçin və xərcləri öncədən görün. Əsas planları dəstəkləyirik.',
        plans: ['Aetna', 'Cigna', 'Optum', 'Anthem', 'TRICARE', 'Medicare'],
        checklist: [
          'Canlı sessiyalar və limitsiz mesajlaşma',
          'İstənilən vaxt terapevt dəyişdirə bilərsiniz',
          'Mümkün olduğu yerlərdə dərman idarəçiliyi',
          'HIPAA uyğun və özəl',
        ],
        verify: 'Qaydaları təsdiq edin',
      },
      footer: {
        heading: 'Dayaq Care',
        exploreHeading: 'Kəşf edin',
        body:
          'Lisenziyalı terapevtlər, psixiatrlar və məşqçilərlə rahat əlaqə qurun, harada olmağınızdan asılı olmayaraq.',
        emergency: 'Təcili yardım üçün 988-ə zəng edin.',
        explore: ['Terapiya', 'Dərman', 'Yeniyetmə dəstəyi', 'Cütlüklər'],
        clinicians: {
          heading: 'Kliniklər üçün',
          body:
            'Milli səviyyədə müştərilərlə işləyin. Elastik cədvəllər və güclü dəstək sizi gözləyir.',
          cta: 'Şəbəkəyə qoşul',
        },
        privacy: 'Məxfilik',
        terms: 'Şərtlər',
        accessibility: 'Əlçatanlıq',
        copyright: (year: number) =>
          `© ${year} Dayaq Care. Bütün hüquqlar qorunur.`,
      },
    },
    login: {
      existingMembers: 'Mövcud üzvlər',
      heading: 'Daxil ol',
      lede: 'Qayğınızı, sessiyalarınızı və mesajlarınızı təhlükəsiz idarə edin.',
      backHome: 'Ana səhifəyə qayıt',
      form: {
        email: 'Email',
        password: 'Şifrə',
        rememberMe: 'Bu cihazda məni daxil saxla',
        submit: 'Davam et',
        submitting: 'Giriş edilir...',
        disclaimer:
          'Kimlik məlumatlarınız təhlükəsiz yoxlanacaq. Bu təcrübədə məlumat saxlanmır.',
        success:
          'Giriş auth xidmətinə qoşulmağa hazırdır. Backend hazır olduqdan sonra yönləndiriləcəksiniz.',
        error: 'Giriş alınmadı. Məlumatlarınızı yoxlayıb yenidən cəhd edin.',
        emailError: 'Etibarlı email daxil edin',
        passwordError: 'Şifrə ən az 8 simvol olmalıdır',
      },
    },
    userCategorySelection: {
      heading: 'Hesab növünü seçin',
      lede: 'Qeydiyyata davam etmək üçün sizə uyğun kateqoriyanı seçin.',
      categories: {
        organization: 'Təşkilat',
        professional: 'Peşəkar',
        client: 'Müştəri',
      },
      backHome: 'Ana səhifəyə qayıt',
    },
    adminLogin: {
      heading: 'Admin girişi',
      lede: 'Davam etmək üçün admin məlumatlarınızı daxil edin.',
      form: {
        username: 'Admin istifadəçi adı',
        password: 'Admin şifrəsi',
        usernamePlaceholder: 'Admin istifadəçi adını daxil edin',
        passwordPlaceholder: 'Admin şifrəsini daxil edin',
        submit: 'Daxil ol',
        error: 'Giriş alınmadı. Məlumatlarınızı yoxlayıb yenidən cəhd edin.',
      },
      backHome: 'Ana səhifəyə qayıt',
    },
    adminPanel: {
      heading: 'Admin paneli',
      lede: 'Siz admin səlahiyyətləri ilə daxil oldunuz.',
      signOut: 'Çıxış et',
    },
    registration: {
      heading: 'Hesab yaradın',
      lede: 'Başlamaq üçün bir neçə məlumat paylaşın.',
      form: {
        name: 'Ad',
        surname: 'Soyad',
        fatherName: 'Ata adı',
        birthDate: 'Doğum tarixi',
        email: 'Email',
        phoneNumber: 'Telefon nömrəsi',
        password: 'Şifrə',
        submit: 'Hesab yarat',
        submitting: 'Göndərilir...',
        success: 'Qeydiyyat göndərildi. Tezliklə sizinlə əlaqə saxlayacağıq.',
        error: 'Qeydiyyat tamamlanmadı. Yenidən cəhd edin.',
      },
      backHome: 'Ana səhifəyə qayıt',
    },
  },
  tr: {
    common: {
      brand: 'Dayaq Care',
    },
    landing: {
      nav: {
        therapy: 'Terapi',
        medications: 'İlaçlar',
        treatments: 'Tedaviler',
        coverage: 'Kapsam',
        clinicians: 'Klinisyenler için',
      },
      header: {
        login: 'Giriş yap',
        getStarted: 'Başlayın',
      },
      hero: {
        pill: 'Çoğu sigortalı üyenin katkı payı 0 $',
        heading: 'Her şeyi çözmek için alan',
        accent: ' esnek terapi ve ilaç desteğiyle.',
        lede:
          'Lisanslı klinisyenlerle video, ses veya mesajla — programınıza göre bağlantı kurun.',
        ctaPrimary: 'Kapsamınızı kontrol edin',
        ctaSecondary: 'Terapistlere göz atın',
        highlight:
          '60.000+ 5 yıldızlı deneyim, hızlı başlamak isteyenlerden.',
        form: {
          title: 'Şimdi eşleşmeyi görün',
          subtitle:
            'Eşleşmenin nasıl çalıştığını görmek için bazı alanları önceden doldurduk.',
          fullName: 'Ad, soyad, patronimik',
          phoneNumber: 'Telefon numarası',
          email: 'E-posta',
          finCode: 'FIN kodu',
          finHint: 'Sadece harf ve rakam içeren 6 karakter',
          seededFullName: 'Alex Doe Aliyev',
          seededPhoneNumber: '+90 (555) 123-4567',
          seededEmail: 'alex.doe@example.com',
          seededFinCode: 'A1B2C3',
          submit: 'Kaydol',
          disclaimer: 'Taahhüt yok. Bu bilgileri saklamıyoruz.',
        },
      },
      headings: {
        pillars: 'Dayaq ile sahip olduklarınız',
        services: 'Gerçek hayat için oluşturulmuş bakım seçenekleri',
        steps: 'Nasıl çalışır',
        testimonials: 'İnsanlar dengesini buluyor',
        faq: 'Sorular, yanıtlar',
        coverageSnapshot: 'Kapsam özeti',
        servicesLead: 'Gerçek hayat için oluşturulmuş bakım seçenekleri',
      },
      pillars: [
        {
          title: 'Giriş haftalar değil günler içinde',
          description:
            'İhtiyaçlarınıza uygun lisanslı klinisyenlerle mesaj, canlı video veya ses oturumları.',
        },
        {
          title: 'Kendiniz için esnek bakım',
          description:
            'Süreçli terapi, ilaç yönetimi veya her ikisini seçin.',
        },
        {
          title: 'Sigorta dostu',
          description:
            'Çoğu üye düşük veya 0 $ katkı payı görüyor. Evrak işi olmadan uygunluğu gösteriyoruz.',
        },
      ],
      services: [
        {
          title: 'Bireysel terapi',
          description:
            'Kaygı, depresyon, tükenmişlik ve yaşam değişiklikleri için bire bir destek.',
          cta: 'Terapiye başlayın',
        },
        {
          title: 'Ergen terapisi',
          description:
            '13–17 yaş için lisanslı uzmanlar mesaj ve canlı oturumlarla destek sağlar.',
          cta: 'Ergen desteği al',
        },
        {
          title: 'Çift terapisi',
          description:
            'İletişimi güçlendirin ve tarafsız bir partnerle çatışmaları çözün.',
          cta: 'Çift bakımı ayarla',
        },
        {
          title: 'İlaç yönetimi',
          description:
            'Psikiyatri ve reçetelerle dikkatle takip edilen süreç.',
          cta: 'İlaçları keşfet',
        },
      ],
      steps: [
        {
          title: 'Uygunluğu kontrol edin',
          body:
            'Nerede olduğunuzu ve neye ihtiyacınız olduğunu söyleyin. Kapsamı otomatik gösteriyoruz.',
        },
        {
          title: 'Hızlı eşleşme',
          body:
            'Hedeflerinize, tercihlerinize ve programınıza uygun klinisyenlerle eşleşiyoruz.',
        },
        {
          title: 'Oturumlara başlayın',
          body:
            'İstediğiniz zaman mesaj atın ve daha derinleşmek için canlı oturumlar ekleyin.',
        },
      ],
      testimonials: [
        {
          name: 'Saşa',
          quote:
            '“Seanslar arası mesajlaşma beni ilerletiyor. Beklemeden görülüyorum.”',
        },
        {
          name: 'Devon',
          quote:
            '“Terapisti değiştirmek kolaydı. Baştan başlamak zorunda kalmadım.”',
        },
        {
          name: 'Priya',
          quote:
            '“Terapiye ilaç yönetimi eklemek dengeli bir plan sundu.”',
        },
      ],
      faqs: [
        {
          question: 'Çevrimiçi terapi etkili mi?',
          answer:
            'Evet. Lisanslı klinisyenler ile güvenli mesajlaşma ve canlı seanslar sayesinde sonuçlar yüz yüze bakım kadar güçlü.',
        },
        {
          question: 'Sigortayı kullanabilir miyim?',
          answer:
            'Çoğu büyük plan desteklenir. Uygunluk sonuçları hızlı gösterilir, ek evrak gerekmez.',
        },
        {
          question: 'Ne kadar hızlı başlayabilirim?',
          answer:
            'Çoğu kişi iki gün içinde eşleşir ve hemen mesajlaşmaya başlayabilir.',
        },
        {
          question: 'Sağlayıcıyı değiştirebilir miyim?',
          answer:
            'Evet. İlk eşleşme uygun değilse ekstra ücret olmadan değiştirebilirsiniz.',
        },
      ],
      coverage: {
        pill: 'Sigortaya hazır',
        heading: 'Çoğu üye 0 $ katkı payı görüyor',
        lede:
          'Sigortanızı seçin, maliyetleri önceden görün. Önde gelen planları destekliyoruz.',
        plans: ['Aetna', 'Cigna', 'Optum', 'Anthem', 'TRICARE', 'Medicare'],
        checklist: [
          'Canlı oturumlar ve limitsiz mesajlaşma',
          'İstediğiniz zaman terapisti değiştirin',
          'Uygun olduğunda ilaç yönetimi',
          'HIPAA uyumlu ve gizli',
        ],
        verify: 'Kapsamı doğrulayın',
      },
      footer: {
        heading: 'Dayaq Care',
        exploreHeading: 'Keşfet',
        body:
          'Lisanslı terapistler, psikiyatristler ve koçlarla nerede olursanız olun kolay erişim.',
        emergency: 'Acil durumlarda 988’i arayın.',
        explore: ['Terapi', 'İlaç', 'Ergen desteği', 'Çiftler'],
        clinicians: {
          heading: 'Klinisyenler için',
          body:
            'Ülke çapında danışanlara ulaşın. Esnek çalışma saatleri ve güçlü destek sizi bekliyor.',
          cta: 'Ağımıza katıl',
        },
        privacy: 'Gizlilik',
        terms: 'Şartlar',
        accessibility: 'Erişilebilirlik',
        copyright: (year: number) =>
          `© ${year} Dayaq Care. Tüm hakları saklıdır.`,
      },
    },
    login: {
      existingMembers: 'Mevcut üyeler',
      heading: 'Giriş yap',
      lede: 'Bakım ekibinize, seanslarınıza ve mesajlarınıza güvenli erişim sağlayın.',
      backHome: 'Ana sayfaya dön',
      form: {
        email: 'E-posta',
        password: 'Şifre',
        rememberMe: 'Bu cihazda beni açık tut',
        submit: 'Devam et',
        submitting: 'Giriş yapılıyor...',
        disclaimer:
          'Kimlik bilgilerinizi güvenle doğruluyoruz. Bu demo akışında bilgi saklamıyoruz.',
        success:
          'Giriş, kimlik doğrulama hizmetine bağlanmaya hazır. Backend hazır olduğunda yönlendirileceksiniz.',
        error: 'Giriş yapılamadı. Bilgilerinizi kontrol edip tekrar deneyin.',
        emailError: 'Geçerli bir e-posta girin',
        passwordError: 'Şifre en az 8 karakter olmalıdır',
      },
    },
    userCategorySelection: {
      heading: 'Hesap türünü seçin',
      lede: 'Kayda devam etmek için size uygun kategoriyi seçin.',
      categories: {
        organization: 'Kurum',
        professional: 'Profesyonel',
        client: 'Danışan',
      },
      backHome: 'Ana sayfaya dön',
    },
    adminLogin: {
      heading: 'Yönetici girişi',
      lede: 'Devam etmek için yönetici bilgilerinizi girin.',
      form: {
        username: 'Yönetici kullanıcı adı',
        password: 'Yönetici şifresi',
        usernamePlaceholder: 'Yönetici kullanıcı adını girin',
        passwordPlaceholder: 'Yönetici şifresini girin',
        submit: 'Giriş yap',
        error: 'Giriş yapılamadı. Bilgilerinizi kontrol edip tekrar deneyin.',
      },
      backHome: 'Ana sayfaya dön',
    },
    adminPanel: {
      heading: 'Yönetici paneli',
      lede: 'Yönetici erişimiyle giriş yaptınız.',
      signOut: 'Çıkış yap',
    },
    registration: {
      heading: 'Hesap oluşturun',
      lede: 'Başlamak için birkaç bilgi paylaşın.',
      form: {
        name: 'Ad',
        surname: 'Soyad',
        fatherName: 'Baba adı',
        birthDate: 'Doğum tarihi',
        email: 'E-posta',
        phoneNumber: 'Telefon numarası',
        password: 'Şifre',
        submit: 'Hesap oluştur',
        submitting: 'Gönderiliyor...',
        success: 'Kayıt gönderildi. Yakında sizinle iletişime geçeceğiz.',
        error: 'Kayıt tamamlanamadı. Lütfen tekrar deneyin.',
      },
      backHome: 'Ana sayfaya dön',
    },
  },
  ru: {
    common: {
      brand: 'Dayaq Care',
    },
    landing: {
      nav: {
        therapy: 'Терапия',
        medications: 'Препараты',
        treatments: 'Лечение',
        coverage: 'Покрытие',
        clinicians: 'Для клиницистов',
      },
      header: {
        login: 'Войти',
        getStarted: 'Начать',
      },
      hero: {
        pill: 'У большинства застрахованных $0 доплаты',
        heading: 'Пространство, чтобы разобраться',
        accent: ' с гибкой поддержкой терапии и медикаментов.',
        lede:
          'Связывайтесь с лицензированными клиницистами по видео, аудио или сообщениям в удобное время и без долгого ожидания.',
        ctaPrimary: 'Проверьте покрытие',
        ctaSecondary: 'Посмотреть терапевтов',
        highlight:
          '60 000+ 5-звездочных отзывов от тех, кто быстро начал.',
        form: {
          title: 'Посмотреть подборки сейчас',
          subtitle:
            'Мы предварительно заполнили несколько полей, чтобы показать, как работает подбор.',
          fullName: 'Имя, фамилия, отчество',
          phoneNumber: 'Номер телефона',
          email: 'Email',
          finCode: 'FIN-код',
          finHint: '6 символов, только буквы и цифры',
          seededFullName: 'Алексей Доу Алиев',
          seededPhoneNumber: '+7 (495) 123-45-67',
          seededEmail: 'alex.doe@example.com',
          seededFinCode: 'A1B2C3',
          submit: 'Зарегистрироваться',
          disclaimer: 'Без обязательств. Мы не сохраняем эти данные.',
        },
      },
      headings: {
        pillars: 'Что вы получаете с Dayaq',
        services: 'Варианты ухода для реальной жизни',
        steps: 'Как это работает',
        testimonials: 'Люди находят опору',
        faq: 'Вопросы и ответы',
        coverageSnapshot: 'Снимок покрытия',
        servicesLead: 'Варианты ухода для реальной жизни',
      },
      pillars: [
        {
          title: 'Доступ за дни, а не недели',
          description:
            'Сообщения, живое видео или аудио с лицензированными клиницистами, соответствующими вашим потребностям.',
        },
        {
          title: 'Гибкий уход под вас',
          description:
            'Выбирайте между постоянной терапией, управлением медикаментами или обоими.',
        },
        {
          title: 'Дружелюбно к страховке',
          description:
            'Большинство участников платят мало или ничего. Показываем покрытие без бумажной волокиты.',
        },
      ],
      services: [
        {
          title: 'Индивидуальная терапия',
          description:
            'Поддержка при тревоге, депрессии, выгорании и жизненных изменениях.',
          cta: 'Начать терапию',
        },
        {
          title: 'Терапия для подростков',
          description:
            'Лицензированные специалисты для 13–17 лет с сообщениями или живыми сессиями.',
          cta: 'Поддержать подростка',
        },
        {
          title: 'Парная терапия',
          description:
            'Укрепите общение и решайте конфликты с нейтральным партнёром.',
          cta: 'Запланировать парную помощь',
        },
        {
          title: 'Управление медикаментами',
          description:
            'Психиатрия и рецепты с тщательным контролем.',
          cta: 'Изучить медикаменты',
        },
      ],
      steps: [
        {
          title: 'Проверьте покрытие',
          body:
            'Расскажите, где вы и что вам нужно. Мы автоматически показываем детали покрытия.',
        },
        {
          title: 'Быстрый подбор',
          body:
            'Мы подбираем клиницистов, подходящих по целям, предпочтениям и расписанию.',
        },
        {
          title: 'Начните сессии',
          body:
            'Пишите сообщения в любое время и добавляйте живые сессии для более глубокого взаимодействия.',
        },
      ],
      testimonials: [
        {
          name: 'Саша',
          quote:
            '«Сообщения между сессиями помогают мне двигаться вперёд. Я чувствую себя увиденным без ожидания.»',
        },
        {
          name: 'Девон',
          quote:
            '«Сменить терапевта было просто. Не пришлось начинать заново.»',
        },
        {
          name: 'Прия',
          quote:
            '«Добавление управления медикаментами к терапии подарило сбалансированный план.»',
        },
      ],
      faqs: [
        {
          question: 'Онлайн-терапия эффективна?',
          answer:
            'Да. Исследования подтверждают сопоставимые результаты с очной помощью при работе лицензированных специалистов через безопасные сообщения и живые сессии.',
        },
        {
          question: 'Могу ли я использовать страховку?',
          answer:
            'Поддерживаются большинство крупных планов. Мы проверяем покрытие заранее и показываем предполагаемый взнос.',
        },
        {
          question: 'Как быстро можно начать?',
          answer:
            'Большинство людей получает подбор в течение двух дней. После подбора можно сразу писать сообщения.',
        },
        {
          question: 'Могу ли сменить клинициста?',
          answer:
            'Конечно. Если первый подбор не подходит, вы можете поменять его без доплаты.',
        },
      ],
      coverage: {
        pill: 'Готово к страховке',
        heading: 'Большинство участников платят $0',
        lede:
          'Выберите страховщика и заранее увидьте расходы. Мы поддерживаем ведущие планы.',
        plans: ['Aetna', 'Cigna', 'Optum', 'Anthem', 'TRICARE', 'Medicare'],
        checklist: [
          'Живые сессии и безлимитные сообщения',
          'Меняйте терапевтов в любое время',
          'Управление медикаментами там, где это возможно',
          'Соответствует HIPAA и конфиденциально',
        ],
        verify: 'Проверить покрытие',
      },
      footer: {
        heading: 'Dayaq Care',
        exploreHeading: 'Изучайте',
        body:
          'Удобный доступ к лицензированным терапевтам, психиатрам и тренерам, которые поддерживают вас там, где вы есть.',
        emergency: 'Не для экстренных случаев. При необходимости звоните 988.',
        explore: ['Терапия', 'Медикаменты', 'Поддержка подростков', 'Для пар'],
        clinicians: {
          heading: 'Для клиницистов',
          body:
            'Работайте с клиентами по всей стране. Гибкий график, надежная поддержка.',
          cta: 'Присоединиться к сети',
        },
        privacy: 'Конфиденциальность',
        terms: 'Условия',
        accessibility: 'Доступность',
        copyright: (year: number) =>
          `© ${year} Dayaq Care. Все права защищены.`,
      },
    },
    login: {
      existingMembers: 'Действующие участники',
      heading: 'Войти',
      lede:
        'Безопасно получите доступ к своей команде ухода, сессиям и сообщениям.',
      backHome: 'Вернуться на главную',
      form: {
        email: 'Email',
        password: 'Пароль',
        rememberMe: 'Оставаться в системе на этом устройстве',
        submit: 'Продолжить',
        submitting: 'Входим...',
        disclaimer:
          'Мы безопасно проверим ваши данные. В этом демо ничего не сохраняется.',
        success:
          'Вход готов подключиться к службе аутентификации. Когда backend будет готов, мы перенаправим вас.',
        error: 'Не удалось войти. Проверьте данные и попробуйте снова.',
        emailError: 'Введите корректный e-mail',
        passwordError: 'Пароль должен содержать минимум 8 символов',
      },
    },
    userCategorySelection: {
      heading: 'Выберите тип аккаунта',
      lede: 'Выберите категорию, которая лучше всего описывает вас, чтобы продолжить регистрацию.',
      categories: {
        organization: 'Организация',
        professional: 'Специалист',
        client: 'Клиент',
      },
      backHome: 'На главную',
    },
    adminLogin: {
      heading: 'Админ-доступ',
      lede: 'Введите учетные данные администратора, чтобы продолжить.',
      form: {
        username: 'Имя администратора',
        password: 'Пароль администратора',
        usernamePlaceholder: 'Введите имя администратора',
        passwordPlaceholder: 'Введите пароль администратора',
        submit: 'Войти',
        error: 'Не удалось войти. Проверьте данные и попробуйте снова.',
      },
      backHome: 'На главную',
    },
    adminPanel: {
      heading: 'Админ-панель',
      lede: 'Вы вошли с административным доступом.',
      signOut: 'Выйти',
    },
    registration: {
      heading: 'Создайте аккаунт',
      lede: 'Укажите несколько данных, чтобы начать.',
      form: {
        name: 'Имя',
        surname: 'Фамилия',
        fatherName: 'Отчество',
        birthDate: 'Дата рождения',
        email: 'Email',
        phoneNumber: 'Телефон',
        password: 'Пароль',
        submit: 'Создать аккаунт',
        submitting: 'Отправка...',
        success: 'Регистрация отправлена. Мы скоро свяжемся с вами.',
        error: 'Не удалось завершить регистрацию. Попробуйте еще раз.',
      },
      backHome: 'На главную',
    },
  },
}

