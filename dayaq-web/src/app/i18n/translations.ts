export type Locale = 'en'

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
      email: string
      location: string
      reason: string
      seededReason: string
      seededFullName: string
      seededEmail: string
      seededLocation: string
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
    emailError: string
    passwordError: string
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
          fullName: 'Full name',
          email: 'Email',
          location: 'Location',
          reason: 'What brings you here?',
          seededReason: 'Looking for support balancing work and anxiety.',
          seededFullName: 'Alex Doe',
          seededEmail: 'alex.doe@example.com',
          seededLocation: 'Brooklyn, NY',
          submit: 'See matches',
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
  },
}

