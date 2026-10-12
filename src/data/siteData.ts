import type {
  TimelineStory,
  FreezeComparisonRow,
  BusinessEngine,
  CaseStudy,
  DependencyStage,
  BusinessGrowthStage,
  AssessmentQuestion,
  InsightArticle
} from '../types';

export const FOUNDER_DAY_STORIES: Record<string, TimelineStory> = {
  '9:30am': {
    time: '09:30 AM',
    timeLabel: '9:30 AM',
    theme: 'The Day Begins',
    withoutAvencis: {
      title: 'The Day Starts with a Backlog.',
      subtitle: "The team is waiting for answers. Messages are piling up. Before the day begins, you're already catching up.",
      quote: '“I haven’t even opened my notebook, and there are already 4 urgent escalations waiting for my signature.”',
      description: "The team is waiting for answers. Messages are piling up. Before the day begins, you're already catching up.",
      image: '/assets/founder-stressed.jpg',
      founderMood: 'Overloaded',
      checklist: [
        'Follow up with vendor on delayed raw material...',
        'Check pending supplier payments before bank cutoff...',
        'Where is this daily production output report?',
        'Call the tier-1 client to explain shipment delay...',
        'Why is batch #892 delayed on shop floor again?'
      ],
      notifications: [
        {
          type: 'whatsapp',
          sender: 'Ops Group (Plant 2)',
          time: '9:12 AM',
          title: 'Machine 4 Line Halted',
          body: 'Line stopped since 8:15 AM. Supervisor asking if we should halt batch or re-route. Need immediate call.',
          badge: 'URGENT'
        },
        {
          type: 'phone',
          sender: 'Commercial Bank Manager',
          time: '9:25 AM',
          title: '10+ Missed Calls',
          body: 'Pending CC limit review and vendor payout clearance approval.',
          badge: 'MISSED'
        },
        {
          type: 'email',
          sender: 'Procurement Lead',
          time: '9:28 AM',
          title: 'Vendor PO #1042 Awaiting Signature',
          body: 'Supplier refusing dispatch without MD authorization for raw material delivery.'
        }
      ],
      bottleneck: 'Single Point of Operational Approval',
      timeSpentInFirefighting: '82% of morning consumed by tactical noise',
      dependencyRisk: 'Critical — Zero work progresses without founder intervention'
    },
    withAvencis: {
      title: 'The Day Starts with Clarity.',
      subtitle: "Priorities are defined. Numbers are visible. Your team knows what's expected and what needs your attention.",
      quote: '“The morning dashboard tells me every plant is within tolerance. My focus today is purely on high-margin growth.”',
      description: "Priorities are defined. Numbers are visible. Your team knows what's expected and what needs your attention.",
      image: '/assets/founder-calm.jpg',
      founderMood: 'In Control',
      outcomes: [
        'Clear Reports & Real-Time Dashboards',
        'Aligned Team with Delegated Authority',
        'Smooth Operations Within Set Tolerances',
        'Improved Profitability & Pricing Power',
        'More Time for Strategic Alliances'
      ],
      systemHighlights: [
        {
          label: 'Daily Flash Report',
          value: 'All 5 Plants Green',
          status: 'optimal',
          metric: '99.4% OTIF efficiency'
        },
        {
          label: 'EMT Autonomy',
          value: 'Level 4 Active',
          status: 'scaled',
          metric: '0 approvals needed for Tier-1 POs'
        },
        {
          label: '90-Day Cash Buffer',
          value: '₹8.4 Cr Automated',
          status: 'active',
          metric: 'Working capital automated'
        }
      ],
      strategicFocus: 'Reviewing Q4 M&A Pipeline & Key Account Expansion',
      timeOnStrategy: '85% dedicated to growth & capital allocation',
      enterpriseReadiness: 'High — Business engine operates autonomously'
    }
  },
  '12:30pm': {
    time: '12:30 PM',
    timeLabel: '12:30 PM',
    theme: 'Problem Ownership',
    withoutAvencis: {
      title: 'Every Problem Finds You.',
      subtitle: 'A delayed order. An unanswered quotation. A production issue. Everyone needs your decision before they can move.',
      quote: '“Instead of meeting prospective enterprise clients, I’m stuck arbitrating another argument between sales and production.”',
      description: 'A delayed order. An unanswered quotation. A production issue. Everyone needs your decision before they can move.',
      image: '/assets/1230 PM — WITHOUT AVENCIS.png',
      founderMood: 'Bottlenecked',
      checklist: [
        'Mediate dispute between Sales and Production leads...',
        'Authorize emergency overtime labor sign-off...',
        'Review rejected quality inspection lot #304...',
        'Answer 8 pending WhatsApp approval requests...',
        'Find replacement for resigned senior engineer...'
      ],
      notifications: [
        {
          type: 'whatsapp',
          sender: 'Head of Sales',
          time: '12:14 PM',
          title: 'Client Threatening Penalty',
          body: 'Only you can authorize overtime production to meet delivery SLA.',
          badge: 'ESCALATION'
        },
        {
          type: 'email',
          sender: 'HR Manager',
          time: '12:22 PM',
          title: 'Plant Engineer Resignation',
          body: 'Citing lack of clear KPIs and burnout. Can you speak with him before lunch?'
        },
        {
          type: 'phone',
          sender: 'Logistics Partner',
          time: '12:28 PM',
          title: '4 Missed Calls',
          body: 'GST e-way bill mismatch at state border checkpost.'
        }
      ],
      bottleneck: 'Absence of Cross-Functional EMT Cadence',
      timeSpentInFirefighting: '78% of day spent in dispute mediation',
      dependencyRisk: 'Severe — Departments lack cross-functional governance'
    },
    withAvencis: {
      title: 'Problems Have Owners.',
      subtitle: 'Your team follows defined processes, escalates exceptions and takes responsibility for moving work forward.',
      quote: '“While the EMT runs the midday production sync, I am finalizing a ₹15 Cr enterprise contract with a new strategic client.”',
      description: 'Your team follows defined processes, escalates exceptions and takes responsibility for moving work forward.',
      image: '/assets/1230 PM — WITH AVENCIS.png',
      founderMood: 'Empowered',
      outcomes: [
        'EMT Runs Weekly Operating Rhythms',
        'Standardized Cross-Functional SLAs',
        'Zero Routine Escalations to Founder',
        'Sales Conversion Velocity +42%',
        'Strategic High-Value Deal Making'
      ],
      systemHighlights: [
        {
          label: 'Cross-Functional Sync',
          value: 'EMT Governed',
          status: 'optimal',
          metric: 'Standard 30-min SLA cadence'
        },
        {
          label: 'Order SLA',
          value: '98.2% On-Time',
          status: 'scaled',
          metric: 'Zero client escalations to founder'
        },
        {
          label: 'Sales Pipeline Velocity',
          value: '+42% YoY',
          status: 'active',
          metric: '₹28 Cr qualified enterprise pipeline'
        }
      ],
      strategicFocus: 'Closing ₹15 Cr Strategic Enterprise Account',
      timeOnStrategy: 'Building institutional relationships and high-margin alliances',
      enterpriseReadiness: 'Scalable — Governance frameworks protect founder bandwidth'
    }
  },
  '3:00pm': {
    time: '03:00 PM',
    timeLabel: '3:00 PM',
    theme: 'Business Visibility',
    withoutAvencis: {
      title: "You're Busy. But Do You Have Visibility?",
      subtitle: "You chase reports, check numbers and ask for updates just to understand what's happening across the business.",
      quote: '“I built a ₹50 Crore company, so why am I spending my afternoon chasing uncollected invoices and checking inventory sheets?”',
      description: "You chase reports, check numbers and ask for updates just to understand what's happening across the business.",
      image: '/assets/1500 PM — WITHOUT AVENCIS.png',
      founderMood: 'Blindspots',
      checklist: [
        'Dial top 5 clients personally to chase overdue payments...',
        'Negotiate discounted rates with aggressive competitor...',
        'Scramble for emergency bank working capital line...',
        'Reconcile inventory discrepancy in warehouse...',
        'Review shrinking gross margins across product lines...'
      ],
      notifications: [
        {
          type: 'email',
          sender: 'Accounts Officer',
          time: '2:40 PM',
          title: 'Overdue Receivables: ₹3.2 Cr Past Due',
          body: 'Short by ₹65 Lakhs for month-end payroll buffer unless collected today.',
          badge: 'FINANCE'
        },
        {
          type: 'whatsapp',
          sender: 'Regional Sales Lead',
          time: '2:55 PM',
          title: 'Competitor Discounting by 12%',
          body: 'Should we match their rate to win the L1 tender? Need margin sign-off.'
        },
        {
          type: 'phone',
          sender: 'Statutory Auditor',
          time: '3:00 PM',
          title: '3 Missed Calls',
          body: 'Pending ledger reconciliation on inventory discrepancies.'
        }
      ],
      bottleneck: 'Weak Financial Architecture & Uncontrolled DSO',
      timeSpentInFirefighting: '88% of mindspace trapped in cash flow anxiety',
      dependencyRisk: 'High — Founder acts as collection agent and pricing desk'
    },
    withAvencis: {
      title: 'You Know What Needs Attention.',
      subtitle: 'Sales, profitability and operations are measured. Regular reviews highlight gaps, so decisions are based on facts—not guesswork.',
      quote: '“Cash flow is predictable. Our DSO is at 42 days. Today I am meeting our joint venture partner to plan international expansion.”',
      description: 'Sales, profitability and operations are measured. Regular reviews highlight gaps, so decisions are based on facts—not guesswork.',
      image: '/assets/1500 PM — WITH AVENCIS.png',
      founderMood: 'Fact-Driven',
      outcomes: [
        'Automated 13-Week Cash Forecasting',
        'DSO Compressed from 94 to 42 Days',
        'Gross Margin Defense & Pricing Gates',
        'Self-Funding Growth Engines',
        'High-Value M&A & Expansion Strategy'
      ],
      systemHighlights: [
        {
          label: 'DSO Cash Cycle',
          value: '42 Days',
          status: 'optimal',
          metric: 'Compressed from 94 days (-55%)'
        },
        {
          label: 'EBITDA Margin Defense',
          value: '16.4%',
          status: 'scaled',
          metric: '+480 bps expansion YoY'
        },
        {
          label: 'Operating Cash Flow',
          value: '+₹4.2 Cr / Mo',
          status: 'active',
          metric: 'Zero emergency borrowing'
        }
      ],
      strategicFocus: 'Evaluating Joint Venture for Geographic Expansion',
      timeOnStrategy: 'Allocating surplus cash flow into high-ROIC expansion assets',
      enterpriseReadiness: 'Institutional — Bankable financial controls & predictability'
    }
  },
  '5:00pm': {
    time: '05:00 PM',
    timeLabel: '5:00 PM',
    theme: 'End of the Workday',
    withoutAvencis: {
      title: "The Workday Isn't Over. Yours Just Got Longer.",
      subtitle: 'Approvals are pending. Follow-ups remain. The important work gets pushed to tomorrow—or after everyone leaves.',
      quote: '“Everyone is packing up to leave, but my desk is still piled high with paperwork and unresolved fires.”',
      description: 'Approvals are pending. Follow-ups remain. The important work gets pushed to tomorrow—or after everyone leaves.',
      image: '/assets/1730 PM — WITHOUT AVENCIS.png',
      founderMood: 'Exhausted',
      checklist: [
        'Clear 42 backlogged tactical emails before night...',
        'Sign 18 pending requisition vouchers on ERP...',
        'Call family to say you will miss dinner again...',
        'Worry about next quarter growth while exhausted...',
        'Realize you worked 10 hours on zero strategic goals...'
      ],
      notifications: [
        {
          type: 'whatsapp',
          sender: 'Family',
          time: '4:52 PM',
          title: 'Will you make it home for dinner?',
          body: 'You promised you would be back on time today...',
          badge: 'PERSONAL'
        },
        {
          type: 'email',
          sender: 'ERP System',
          time: '4:58 PM',
          title: '18 Unapproved Requisitions',
          body: 'System items awaiting MD login before night shift dispatch.'
        },
        {
          type: 'phone',
          sender: 'Shift Incharge',
          time: '5:00 PM',
          title: '5 Missed Calls',
          body: 'Inquiry regarding overtime authorization for night crew.'
        }
      ],
      bottleneck: 'The Founder Trap — The Business Owns You',
      timeSpentInFirefighting: '100% emotional and physical exhaustion',
      dependencyRisk: 'Existential — Zero enterprise valuation without founder presence'
    },
    withAvencis: {
      title: 'You Work on the Business, Not Every Task.',
      subtitle: 'Your team manages execution and escalates what matters. You can focus on growth, customers and the next big decision.',
      quote: '“The evening flash review took 10 minutes. The leadership team has tomorrow’s priorities locked. I am closing my laptop on time.”',
      description: 'Your team manages execution and escalates what matters. You can focus on growth, customers and the next big decision.',
      image: '/assets/1730 PM — WITH AVENCIS.png',
      founderMood: 'Strategic',
      outcomes: [
        '10-Minute Evening Flash Review',
        'Leadership Team Owns Tomorrow’s Targets',
        'Reclaimed 25+ Hours Every Week',
        'Zero Pending Sign-Off Bottlenecks',
        'Peace of Mind & Predictable Governance'
      ],
      systemHighlights: [
        {
          label: 'Founder Weekly Hours',
          value: '20 Hrs / Wk',
          status: 'optimal',
          metric: 'Liberated 45+ hours from tactical fire'
        },
        {
          label: 'Enterprise Multiple',
          value: '3.8x Industry Avg',
          status: 'scaled',
          metric: 'Independent of founder dependency'
        },
        {
          label: 'Growth Trajectory',
          value: '35% CAGR',
          status: 'active',
          metric: 'Predictable, self-funded scaling'
        }
      ],
      strategicFocus: 'Closing Laptop On Time with Complete Peace of Mind',
      timeOnStrategy: 'Building a legacy business that thrives without daily micromanagement',
      enterpriseReadiness: 'World-Class — A transferable, institutional asset'
    }
  },
  '7:00pm': {
    time: '07:00 PM',
    timeLabel: '7:00 PM',
    theme: 'Stepping Away',
    withoutAvencis: {
      title: 'You Leave the Office. The Business Follows You.',
      subtitle: "WhatsApp keeps buzzing. Tomorrow's problems are already on your mind. Switching off feels like taking a risk.",
      quote: '“I’m physically home, but my mind is still in the factory, dreading tomorrow’s cash crunch and machine status.”',
      description: "WhatsApp keeps buzzing. Tomorrow's problems are already on your mind. Switching off feels like taking a risk.",
      image: '/assets/1900 PM — WITHOUT AVENCIS.png',
      founderMood: 'Trapped',
      checklist: [
        'Respond to late night vendor payment panics...',
        'Review tomorrow morning delivery schedule...',
        'Draft responses to delayed customer shipments...',
        'Check bank balance for morning clearing...',
        'Unable to be mentally present with family...'
      ],
      notifications: [
        {
          type: 'whatsapp',
          sender: 'Night Shift Supervisor',
          time: '6:50 PM',
          title: 'Packing Material Shortfall',
          body: 'Only 3 hours of corrugated boxes left. Can you approve spot purchase?',
          badge: 'URGENT'
        },
        {
          type: 'email',
          sender: 'Vendor VP',
          time: '6:58 PM',
          title: 'Hold on Dispatch Batch #401',
          body: 'Pending ledger settlement before tomorrow 9 AM delivery.'
        },
        {
          type: 'phone',
          sender: 'Key Client Director',
          time: '7:00 PM',
          title: '2 Missed Calls',
          body: 'Checking status of escalated purchase order.'
        }
      ],
      bottleneck: 'Total Founder Enslavement',
      timeSpentInFirefighting: '24/7 mental and operational burden',
      dependencyRisk: 'Maximum — Zero life outside the business'
    },
    withAvencis: {
      title: 'The Business Has a Way Forward Without You.',
      subtitle: 'Responsibilities are clear, performance is tracked and issues have escalation paths. You can step away with greater confidence.',
      quote: '“Avencis didn’t just grow our EBITDA. They gave me back my life, my health, and my time with my family.”',
      description: 'Responsibilities are clear, performance is tracked and issues have escalation paths. You can step away with greater confidence.',
      image: '/assets/1900 PM — WITH AVENCIS.png',
      founderMood: 'Liberated',
      outcomes: [
        'Genuinely Present with Family',
        'Phone Away with Zero Panic Escalations',
        'Self-Sustaining Enterprise Engine',
        'Compounding Balance Sheet Value',
        'True Founder Autonomy & Peace'
      ],
      systemHighlights: [
        {
          label: 'Founder Autonomy',
          value: '100% Liberated',
          status: 'optimal',
          metric: 'Zero evening escalations'
        },
        {
          label: 'Enterprise Multiple',
          value: '3.8x Industry Avg',
          status: 'scaled',
          metric: 'Independent institutional asset'
        },
        {
          label: 'Growth Momentum',
          value: 'Compounding',
          status: 'active',
          metric: 'Self-governing business engines'
        }
      ],
      strategicFocus: 'Quality Family Time & True Leadership Autonomy',
      timeOnStrategy: 'A business built to thrive, scale, and compound enduring wealth',
      enterpriseReadiness: 'Institutional Grade — Enduring Enterprise Scale'
    }
  }
};

export const FREEZE_COMPARISON_ROWS: FreezeComparisonRow[] = [
  { without: 'Still inside the business', with: 'Building the business' },
  { without: 'Firefighting tactical fires', with: 'Leading strategic growth' },
  { without: 'Managing daily problems', with: 'Creating tomorrow’s opportunities' },
  { without: 'Founder-dependent bottleneck', with: 'System-driven autonomous engines' },
  { without: 'Business consumes your life', with: 'Business supports your freedom' }
];

export const BUSINESS_ENGINES: BusinessEngine[] = [
  {
    id: 'revenue-engine',
    number: '01',
    title: 'Revenue & Sales Engine',
    tagline: 'Predictable Pipeline & Pricing Discipline',
    symptom: 'Founder is the primary rainmaker; revenue lumpy, customer concentration risk high, sales team struggles to close without founder in the room.',
    transformation: 'Institutionalized sales playbook, value-based pricing matrix, key account management frameworks, and trained sales leaders who close independently.',
    deliverables: [
      'Multi-tier Sales Compensation & KPI Playbook',
      'Account Mining & Cross-Sell Retention Architecture',
      'Value-Based Pricing Gate & Margin Defenses',
      'Enterprise Pipeline Velocity Dashboard'
    ],
    metricImpact: '+35% to +60% Qualified Deal Flow with Zero Founder Sales Dependency'
  },
  {
    id: 'operations-engine',
    number: '02',
    title: 'Operations & Fulfilment Engine',
    tagline: 'System-Driven Delivery & Zero Firefighting',
    symptom: 'Continuous production delays, quality defects, inventory mismatches, and constant founder intervention to arbitrate operational friction.',
    transformation: 'Standardized SOPs, visual management boards, capacity planning systems, and root-cause error-proofing that runs autonomously.',
    deliverables: [
      'Cross-Functional SLA & Fulfilment Architecture',
      'OEE / Delivery On-Time In-Full (OTIF) Controls',
      'Inventory Optimization & Working Capital Rationalization',
      'Quality Gate Matrix & Defect Prevention Protocols'
    ],
    metricImpact: '98%+ OTIF Delivery & 45% Reduction in Scrap / Rework Costs'
  },
  {
    id: 'finance-engine',
    number: '03',
    title: 'Financial Architecture & Cash Engine',
    tagline: 'Predictable Cash Flow & EBITDA Expansion',
    symptom: 'Growing top-line but shrinking cash reserves; high DSO, unpredictable working capital cycles, and last-minute panic for vendor or payroll payouts.',
    transformation: 'Institutional cash-flow forecasting, DSO compression mechanisms, margin leakage audits, and strategic unit-economics modeling.',
    deliverables: [
      '13-Week Rolling Cash Flow & Liquidity Predictor',
      'Automated Dunning & Collections Escalation Engine',
      'Product/Customer Gross Margin Contribution Analysis',
      'Banking Facility & Cost of Capital Optimization'
    ],
    metricImpact: '35-50% Reduction in DSO & +300 to +600 bps EBITDA Margin Expansion'
  },
  {
    id: 'emt-engine',
    number: '04',
    title: 'Extended Management Team (EMT) Engine',
    tagline: 'High-Ownership Leadership Tier Below Founder',
    symptom: 'Founder overwhelmed because middle managers act like clerks awaiting instructions, lack business ownership, and escalate every small decision.',
    transformation: 'Build, coach, and empower an accountable 2nd-tier leadership team with clear decision rights, OKR alignment, and performance incentives.',
    deliverables: [
      'EMT Decision Rights Matrix (RACI & Authority Limits)',
      'Weekly Operating Rhythm & Review Cadences',
      'Scorecards & Value-Linked Incentive Architecture',
      'Executive Shadowing & Leadership Competency Coaching'
    ],
    metricImpact: 'Reclaims 20-30 Hours of Founder Time Weekly by Month 4'
  },
  {
    id: 'governance-engine',
    number: '05',
    title: 'Governance & Strategic Intelligence Engine',
    tagline: 'Real-Time Visibility & Board-Level Discipline',
    symptom: 'Managing by gut feeling, lagged monthly reports, disconnected spreadsheets, and no visibility until the financial quarter is already over.',
    transformation: 'Executive flash dashboards, early-warning risk radar, monthly governance reviews, and board-ready strategic alignment.',
    deliverables: [
      'Single-Screen Executive Flash Dashboard',
      'Leading Indicator Warning Systems',
      'Monthly Strategic Business Review (SBR) Protocols',
      'Annual Operating Plan (AOP) Execution Tracking'
    ],
    metricImpact: 'Real-Time Operational Visibility & 100% Strategic Alignment'
  }
];

export const METHODOLOGY_STAGES = [
  {
    stage: '01',
    phase: 'DIAGNOSTIC & BLUEPRINT',
    duration: 'Weeks 1 – 4',
    title: 'Deep Operational Audit & Value Leak Identification',
    description: 'We conduct a 360-degree forensic scan across your 5 business engines, map founder time allocation, interview key department leads, and identify immediate EBITDA leakage points.',
    outputs: [
      'Comprehensive Founder Dependency Audit',
      'Financial & Margin Leakage Map',
      '90-Day Quick-Win Priority Roadmap',
      'Customized Business Engine Blueprint'
    ]
  },
  {
    stage: '02',
    phase: 'EMBEDDED EXECUTION & EMT ALIGNMENT',
    duration: 'Months 2 – 6',
    title: 'Systemization & Leadership Team Enablement',
    description: 'We do not hand over a slide deck and leave. Avencis senior operators embed within your company, restructuring workflows, installing dashboards, and coaching your 2nd-tier leaders in weekly operating rhythms.',
    outputs: [
      'Active Extended Management Team (EMT) Rhythm',
      'Automated Executive Flash Dashboard',
      'Standardized Cross-Functional SLAs',
      'Cash Flow Compression Protocols'
    ]
  },
  {
    stage: '03',
    phase: 'SCALE & AUTONOMOUS GOVERNANCE',
    duration: 'Months 7 – 12',
    title: 'Founder Bandwidth Liberation & Valuation Multiplier',
    description: 'Your business engines operate with minimal founder supervision. You shift your primary focus from daily firefighting to capital allocation, strategic alliances, M&A, or new market expansion.',
    outputs: [
      'Self-Sustaining Enterprise Governance',
      'Predictable EBITDA & Free Cash Flow',
      'Institutional Readiness for Investors/Bankers',
      'Reclaimed 60%+ Founder Bandwidth'
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'manufacturing-scale',
    clientSector: 'Precision Engineering & Auto Components',
    revenueBracket: '₹85 Cr → ₹142 Cr (in 24 Months)',
    challenge: 'Founder was spending 65+ hours weekly handling shop-floor delivery escalations, raw material purchase approvals, and customer disputes. EBITDA was stagnating at 7.2% despite rising demand.',
    intervention: 'Installed EMT operating cadence, built automated OTIF tracking, restructured production planning with buffer management, and instituted pricing review matrix.',
    results: {
      ebitda: '7.2% → 14.8% (+760 bps)',
      revenue: '₹85 Cr to ₹142 Cr (67% growth)',
      bandwidth: 'Founder hours cut from 65h to 20h/wk',
      workingCapital: 'DSO reduced from 92 to 44 days'
    },
    quote: 'Avencis did what three different consulting agencies failed to do. They did not just give us theories; they stood on our shop floor, coached our plant heads, and built an engine that runs without me.',
    quoteAuthor: 'Rajesh Sharma',
    quoteRole: 'Managing Director & Founder'
  },
  {
    id: 'distribution-b2b',
    clientSector: 'B2B Industrial Equipment & Distribution',
    revenueBracket: '₹120 Cr → ₹185 Cr',
    challenge: 'Massive working capital blockage of ₹28 Cr trapped in slow-moving inventory and overdue client receivables. Founder was personally chasing payments while sales team had zero margin accountability.',
    intervention: 'Designed automated dunning engine, revamped sales incentive structure linked to gross margin collected rather than billed revenue, and set up daily stock velocity monitors.',
    results: {
      ebitda: '5.8% → 11.4%',
      revenue: '₹120 Cr to ₹185 Cr',
      bandwidth: 'Founder stepped out of daily credit approvals',
      workingCapital: '₹14.2 Cr cash unlocked in 120 days'
    },
    quote: 'The cash flow engine Avencis installed unlocked liquidity we did not know existed. Our business went from a stressful cash trap to a high-margin compounding machine.',
    quoteAuthor: 'Anand Kulkarni',
    quoteRole: 'Promoter & CEO'
  },
  {
    id: 'd2c-specialty',
    clientSector: 'Specialty Chemicals & Formulation',
    revenueBracket: '₹45 Cr → ₹98 Cr',
    challenge: 'Fast top-line growth created severe quality bottlenecks, high employee turnover in middle management, and founder burnout. Inability to delegate created frequent delivery failures.',
    intervention: 'Built and institutionalized the Extended Management Team (EMT) across R&D, Operations, and Institutional Sales with clear RACI matrices and monthly governance scorecards.',
    results: {
      ebitda: '12.1% → 18.5%',
      revenue: '118% revenue scaling in 18 months',
      bandwidth: '80% reduction in founder escalations',
      workingCapital: 'Zero customer churn during scale'
    },
    quote: 'Avencis helped us build our second line of leadership. For the first time in 12 years, I took a 2-week family vacation without receiving a single panic call from the plant.',
    quoteAuthor: 'Vikramaditya Singhania',
    quoteRole: 'Founder & Chairman'
  }
];

export const DEPENDENCY_STAGES: DependencyStage[] = [
  {
    level: 1,
    name: 'Solo Operator / Absolute Dependency',
    subtitle: 'Founder is the entire business engine',
    revenueRange: '₹2 Cr – ₹10 Cr',
    keySymptom: 'If you take a 7-day vacation, billing stops, clients complain, and operations grind to a halt.',
    founderInvolvement: '100% of all decisions, sales, client delivery, and cash management.',
    riskScore: 95,
    avencisIntervention: 'Install core operating templates, basic delegation protocols, and basic billing controls.'
  },
  {
    level: 2,
    name: 'The Delegation Trap / Bottleneck Hub',
    subtitle: 'Tasks are delegated, but all decisions bottleneck at you',
    revenueRange: '₹10 Cr – ₹40 Cr',
    keySymptom: 'You have hired 20-50 people, but your phone rings all day for approvals, sign-offs, and dispute arbitration.',
    founderInvolvement: '80% of time spent answering questions, approving purchase orders, and firefighting.',
    riskScore: 80,
    avencisIntervention: 'Build decision-rights matrix (RACI), SLA definitions, and Tier-1 authority delegation.'
  },
  {
    level: 3,
    name: 'Supervised EMT / Operational Cadence',
    subtitle: 'Second tier leadership manages routine operations',
    revenueRange: '₹40 Cr – ₹150 Cr',
    keySymptom: 'Managers run day-to-day operations using standardized dashboards, escalating only pre-defined exceptions.',
    founderInvolvement: '30% involvement in strategic oversight and key stakeholder relationships.',
    riskScore: 35,
    avencisIntervention: 'Install cross-functional governance rhythms, value-linked incentives, and margin defense tools.'
  },
  {
    level: 4,
    name: 'Institutional Enterprise / Scalable Autonomy',
    subtitle: 'Self-governing engines that compound enterprise value',
    revenueRange: '₹150 Cr+',
    keySymptom: 'The enterprise scales predictably; leadership team owns P&L outcomes, founder focuses purely on vision and capital allocation.',
    founderInvolvement: '< 15% operational involvement (Board Governance, Capital Allocation, M&A).',
    riskScore: 10,
    avencisIntervention: 'Board governance structuring, strategic M&A integration, and valuation multiplier optimization.'
  }
];

export const BUSINESS_STAGES: BusinessGrowthStage[] = [
  {
    stage: 'Stage 1',
    threshold: '₹5 Cr – ₹15 Cr',
    theTrap: 'The Founder Rainmaker Trap',
    whatBreaks: 'Sales rely entirely on the founder’s personal charisma and networks. Operations run on WhatsApp and ad-hoc memory.',
    avencisFix: 'Build structured Sales Funnel Playbook & Standardized Delivery SOPs.',
    targetOutcome: 'First Tier-2 managers execute standard orders independently.'
  },
  {
    stage: 'Stage 2',
    threshold: '₹15 Cr – ₹50 Cr',
    theTrap: 'The Operational Friction Ceiling',
    whatBreaks: 'Informal communication fails. Quality issues spike. Working capital gets trapped in unpaid receivables.',
    avencisFix: 'Install 5 Core Business Engines + Cash Flow Compression Architecture.',
    targetOutcome: 'Predictable monthly cash flow & error-free operational SLAs.'
  },
  {
    stage: 'Stage 3',
    threshold: '₹50 Cr – ₹150 Cr',
    theTrap: 'The Middle Management Void',
    whatBreaks: 'Supervisors lack strategic ownership. Department silos emerge (Sales vs Production vs Accounts).',
    avencisFix: 'Form and coach the Extended Management Team (EMT) with weekly governance rhythms.',
    targetOutcome: 'Cross-functional alignment & 20+ hours of liberated founder bandwidth.'
  },
  {
    stage: 'Stage 4',
    threshold: '₹150 Cr – ₹500 Cr+',
    theTrap: 'The Capital Allocation & Governance Plateau',
    whatBreaks: 'Decisions are too slow for enterprise scale. Lack of board-level visibility and institutional governance.',
    avencisFix: 'Deploy Strategic Business Review (SBR) systems, M&A readiness & Board Governance.',
    targetOutcome: 'Institutional enterprise multiple & sustainable industry leadership.'
  }
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    category: 'Founder Bandwidth',
    engineId: 'emt-engine',
    question: 'If you were completely unavailable for 3 consecutive weeks without phone or email access, what would happen to the business?',
    options: [
      { text: 'Billing, deliveries, and decisions would freeze; significant client escalations.', score: 1, diagnosis: 'Extreme Founder Dependency' },
      { text: 'Basic operations continue, but major client issues, approvals, and cash collection stall.', score: 2, diagnosis: 'High Operational Bottleneck' },
      { text: 'Team handles 80% of operations; only major strategic decisions are delayed.', score: 3, diagnosis: 'Moderate Autonomy' },
      { text: 'The business runs smoothly with zero disruption and meets its monthly targets.', score: 4, diagnosis: 'Full Institutional Scale' }
    ]
  },
  {
    id: 2,
    category: 'Sales & Revenue',
    engineId: 'revenue-engine',
    question: 'How are new high-value client deals and renewals primarily originated and closed?',
    options: [
      { text: 'Founder personal relationships and founder closing in almost all instances.', score: 1, diagnosis: 'Founder-Led Sales Trap' },
      { text: 'Sales team generates leads, but founder must step in to close and negotiate pricing.', score: 2, diagnosis: 'Assisted Sales Model' },
      { text: 'Sales leaders close 70%+ of deals using structured pricing playbooks.', score: 3, diagnosis: 'Systemized Sales Team' },
      { text: 'Autonomous sales engine with multi-tiered team, predictable CAC, and high retention.', score: 4, diagnosis: 'Predictable Revenue Engine' }
    ]
  },
  {
    id: 3,
    category: 'Operations & Fulfilment',
    engineId: 'operations-engine',
    question: 'How are operational delays, quality defects, and customer delivery friction managed?',
    options: [
      { text: 'Constant firefighting; founder arbitrates daily disputes and fixes mistakes.', score: 1, diagnosis: 'Reactive Firefighting' },
      { text: 'Managers handle small issues, but frequent escalations reach the founder.', score: 2, diagnosis: 'Frequent Escalation' },
      { text: 'Clear SOPs and cross-functional SLAs resolve 90% of issues at the team level.', score: 3, diagnosis: 'Process-Driven Delivery' },
      { text: 'Visual KPI tracking, root-cause mistake-proofing (Poka-Yoke), 99%+ OTIF delivery.', score: 4, diagnosis: 'Autonomous Operations Engine' }
    ]
  },
  {
    id: 4,
    category: 'Cash Flow & Financials',
    engineId: 'finance-engine',
    question: 'How predictable is your monthly cash flow, working capital cycle, and EBITDA margin?',
    options: [
      { text: 'High cash stress at month-end; high DSO (75+ days); frequent scramble for vendor payouts.', score: 1, diagnosis: 'Severe Cash Flow Friction' },
      { text: 'Profitable on paper, but cash is constantly blocked in receivables and slow inventory.', score: 2, diagnosis: 'Working Capital Lockup' },
      { text: '13-week cash forecasting in place; DSO maintained under 45 days; steady margins.', score: 3, diagnosis: 'Controlled Financial Architecture' },
      { text: 'Self-funding growth with robust EBITDA margins, automated collections, and cash buffer.', score: 4, diagnosis: 'Compounding Cash Engine' }
    ]
  },
  {
    id: 5,
    category: 'Leadership & EMT',
    engineId: 'emt-engine',
    question: 'How would you describe your 2nd-tier management team (HODs / Department Leads)?',
    options: [
      { text: 'Task executors who wait for instructions; little to no business ownership.', score: 1, diagnosis: 'Clerk Mentality' },
      { text: 'Competent individually, but work in silos with frequent friction and finger-pointing.', score: 2, diagnosis: 'Siloed Department Heads' },
      { text: 'Collaborative leadership team that runs weekly rhythm meetings and owns departmental KPIs.', score: 3, diagnosis: 'Emerging EMT' },
      { text: 'High-ownership Extended Management Team driving strategic initiatives autonomously.', score: 4, diagnosis: 'World-Class EMT' }
    ]
  }
];

export const WHY_AVENCIS_PILLARS = [
  {
    number: '01',
    title: 'Operators, Not Theorists',
    description: 'We do not employ fresh MBA graduates armed with PowerPoint templates. Our partners are battle-tested operators who have scaled businesses and managed P&Ls.'
  },
  {
    number: '02',
    title: 'Embedded Execution Model',
    description: 'We roll up our sleeves and work inside your company alongside your team. We install systems, run operating cadences, and coach your EMT on the ground.'
  },
  {
    number: '03',
    title: 'SME & Mid-Market DNA',
    description: 'We understand the unique realities of Indian promoter-led enterprises: working capital cycles, family dynamics, talent scarcity, and rapid scaling pressures.'
  },
  {
    number: '04',
    title: 'Skin in the Game & Measurable ROI',
    description: 'Our transformation engagements are directly tied to tangible milestones: EBITDA margin expansion, DSO compression, and founder bandwidth liberation.'
  },
  {
    number: '05',
    title: 'The Extended Management Team (EMT) Framework',
    description: 'Our proprietary methodology bridges the massive gap between founder vision and shop-floor execution, building a resilient 2nd tier leadership tier.'
  },
  {
    number: '06',
    title: 'Long-Term Institutional Enterprise Value',
    description: 'We transform promoter-dependent businesses into transferable, bankable, institutional-grade assets that command premium valuation multiples.'
  }
];

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: 'founders-trap',
    title: 'The Founder’s Trap: Why ₹50 Crore Companies Hit an Invisible Wall',
    category: 'Founder Leadership',
    readTime: '6 min read',
    summary: 'Why the exact habits that took your enterprise from ₹0 to ₹20 Crore become the fatal bottlenecks preventing scale to ₹100 Crore.',
    date: 'October 2026'
  },
  {
    id: 'building-emt',
    title: 'Building Your Extended Management Team: Moving from Clerks to Leaders',
    category: 'Organization Architecture',
    readTime: '8 min read',
    summary: 'A step-by-step framework to establish decision-rights matrices (RACI) and weekly operating rhythms for promoter-led businesses.',
    date: 'September 2026'
  },
  {
    id: 'working-capital-engineering',
    title: 'Cash Flow Engineering: Compressing DSO from 90 Days to 45 Days',
    category: 'Financial Architecture',
    readTime: '5 min read',
    summary: 'Practical tactical playbooks to unlock hidden liquidity from receivables, inventory velocity, and supplier credit structures.',
    date: 'August 2026'
  }
];

/* ==========================================================================
   APPROVED WEBSITE CONTENT & PAGE-WISE FRAMEWORK
   Source of Truth: Avencis Website content (2).md
   ========================================================================== */

export const SECTION_1_CONTENT = {
  brandName: 'AVENCIS',
  brandTagline: 'Avencis : Your Extended Management Team',
  positioningStatement:
    '“Avencis partners with founder-led businesses to bring structure, accountability, execution discipline, and operational visibility across the business without requiring the founder to micromanage daily operations.”',
  headline: "Build a Business That Doesn't Need You for Everything.",
  introLines: "You didn't start your business to spend your day:",
  checklist: [
    'Chasing people',
    'Following up on tasks',
    'Checking every quotation',
    'Solving the same problem again',
    'Asking for reports',
    'Wondering where the money went',
    "Finding out about problems after they've already become expensive"
  ],
  transition: 'Yet as the business grows, this is exactly what happens.',
  complexityLines: [
    'More revenue creates more complexity.',
    'More people create more coordination.',
    'More customers create more follow-ups.',
    'More growth creates more things that need your attention.'
  ],
  realizationLead: 'Until one day, you realize:',
  realizationHighlight: 'You have built a bigger business — but not a better business.',
  solutionText:
    'At Avencis, we work as your Extended Management Team to help you build the systems, reviews, people, processes and growth engines required to scale without everything depending on you.',
  ctaAssessmentText: 'Take the Free Business Assessment',
  ctaWhatsAppKeyword: 'ASSESSMENT',
  ctaWhatsAppDisplay: 'WhatsApp Avencis → "ASSESSMENT"'
};

export const SECTION_2_CONTENT = {
  badge: 'THE PROBLEM',
  headingLine1: 'Your Business May Be Growing.',
  headingLine2: 'But Is It Actually Scaling?',
  subtext: [
    'There is a difference.',
    'A business is growing when revenue increases.',
    'A business is scaling when revenue increases without complexity increasing at the same rate.'
  ],
  leadQuestion: 'Ask yourself:',
  questions: [
    'Can your business run for 7 days without you?',
    'Do you know exactly what happened in sales last week — and why?',
    'Do you know which customers, products or projects are actually profitable?',
    'Does every department know what they are responsible for?',
    'Do you get reports on time — or do you have to chase people for them?',
    'When something goes wrong, does the system identify it — or do you have to find it yourself?',
    'Can your team execute without waiting for you to tell them what to do?'
  ],
  verdictLead: 'If you answered "No" to several of these...',
  verdictLine1: 'You may not have a growth problem.',
  verdictLine2: 'You may have a business operating system problem.'
};

export const SECTION_3_CONTENT = {
  badge: 'THE AVENCIS IDEA',
  headline: "Revenue Doesn't Fix a Broken Business.",
  subheadline: 'It often exposes it.',
  revenueProgression: 'A business can go from:\n₹50 Lakhs → ₹1 Crore → ₹3 Crore → ₹5 Crore\nand still have:',
  symptoms: [
    'Poor cash flow',
    'Weak profitability',
    'Founder dependency',
    'Operational chaos',
    'Delayed reporting',
    'Unclear accountability',
    'Poor execution'
  ],
  conclusionLead: 'Because revenue is only one part of the business.',
  underneathHeading: 'We look at what is underneath it.',
  hierarchySteps: [
    'Revenue',
    'Profitability',
    'Cash Flow',
    'People',
    'Processes',
    'Reviews',
    'Execution',
    'Systems',
    'Scalable Business'
  ]
};

export const SECTION_4_CONTENT = {
  badge: 'WHAT WE ACTUALLY DO',
  headline: "We Don't Just Give You a Strategy.",
  subheadline: 'We Help You Make It Work.',
  comparisonPoints: [
    'Most consultants give you a report.',
    'Most agencies give you a service.',
    'Most software companies give you a tool.',
    'You still have to make everything work.'
  ],
  differenceHighlight: 'How Avencis Is Different',
  alongsideIntro: 'We work alongside management to:',
  actionSteps: [
    { title: 'Understand', description: 'What is actually happening inside the business.' },
    { title: 'Diagnose', description: 'Where revenue, profit, time and execution are leaking.' },
    { title: 'Design', description: 'The processes, KPIs, reviews and systems required.' },
    { title: 'Implement', description: 'The changes with your team.' },
    { title: 'Monitor', description: 'Whether the system is actually being followed.' },
    { title: 'Review', description: "What is working, what isn't and what needs to change." },
    { title: 'Refine', description: 'The system as the business grows.' }
  ],
  summaryStatement: 'Strategy → Execution → Review → Improvement.',
  summarySubtext: 'Not strategy alone.'
};

export const APPROVED_BUSINESS_ENGINES: import('../types').ApprovedBusinessEngine[] = [
  {
    number: '01',
    title: 'GROWTH ENGINE',
    subheading: 'Get the right customers.',
    bullets: [
      'Growth strategy',
      'Sales strategy',
      'Marketing systems',
      'Lead generation',
      'Outbound systems',
      'Performance marketing',
      'Conversion systems',
      'CRM',
      'Sales reviews'
    ],
    goal: 'Goal: More predictable revenue.'
  },
  {
    number: '02',
    title: 'PROFIT ENGINE',
    subheading: 'Make sure revenue actually creates money.',
    bullets: [
      'Product profitability',
      'Customer profitability',
      'Pricing',
      'Quotation systems',
      'Product mix',
      'Cost control',
      'Wastage control',
      'Margin monitoring'
    ],
    goal: 'Goal: Better revenue quality.'
  },
  {
    number: '03',
    title: 'OPERATING ENGINE',
    subheading: 'Make execution predictable.',
    bullets: [
      'Process mapping',
      'SOPs',
      'Production systems',
      'Procurement',
      'Inventory',
      'Dispatch',
      'Quality',
      'Workflow management',
      'Automation'
    ],
    goal: 'Goal: Less firefighting.'
  },
  {
    number: '04',
    title: 'MANAGEMENT ENGINE',
    subheading: 'Make performance visible.',
    bullets: [
      'KPIs',
      'MIS',
      'Dashboards',
      'Weekly reviews',
      'Monthly reviews',
      'Accountability',
      'Action tracking',
      'Management reporting'
    ],
    goal: 'Goal: Faster decisions.'
  },
  {
    number: '05',
    title: 'PEOPLE ENGINE',
    subheading: "Build a team that doesn't need to be chased.",
    bullets: [
      'Organisation structure',
      'Role clarity',
      'Hiring',
      'Performance systems',
      'Accountability',
      'Check-ins',
      'Review mechanisms',
      'Delegation',
      'Founder dependency reduction'
    ],
    goal: 'Goal: A team that owns outcomes.'
  }
];

export const SERVICE_PILLARS: import('../types').ServicePillar[] = [
  { pillar: 'Management Systems', whatYouDo: 'Reporting, KPIs, review systems' },
  { pillar: 'Execution Governance', whatYouDo: 'Monitoring, accountability, follow-ups' },
  { pillar: 'Operational Structuring', whatYouDo: 'SOPs, workflows, coordination' },
  { pillar: 'Founder Support', whatYouDo: 'Visibility, planning, management assistance' }
];

export const APPROVED_METHODOLOGY_STEPS: import('../types').MethodologyStep[] = [
  {
    step: 'STEP 1',
    title: 'DIAGNOSE',
    intro: 'We understand the business before recommending anything.',
    items: [
      'Sales.',
      'Marketing.',
      'Operations.',
      'Finance.',
      'People.',
      'Processes.',
      'Reporting.',
      'Profitability.',
      'Founder dependency.'
    ]
  },
  {
    step: 'STEP 2',
    title: 'PRIORITISE',
    intro: 'Not everything needs fixing at once.',
    bullets: [
      'What is hurting the business now?',
      'What is preventing growth?',
      'What can create the fastest meaningful improvement?'
    ]
  },
  {
    step: 'STEP 3',
    title: 'BUILD',
    intro: 'We create the required:',
    bullets: [
      'Processes',
      'KPIs',
      'Reviews',
      'Dashboards',
      'SOPs',
      'Accountability structures',
      'Growth systems'
    ]
  },
  {
    step: 'STEP 4',
    title: 'IMPLEMENT',
    intro: 'This is where most plans fail.',
    conclusion: 'We work with the team to actually put the system into operation.'
  },
  {
    step: 'STEP 5',
    title: 'REVIEW',
    intro: 'What gets reviewed gets improved.',
    items: [
      'Weekly.',
      'Monthly.',
      'Function-wise.',
      'Management-wise.'
    ]
  },
  {
    step: 'STEP 6',
    title: 'REFINE',
    intro: 'The system evolves as the business evolves.',
    conclusion: 'Because a ₹1 Crore business and a ₹10 Crore business cannot operate exactly the same way.'
  }
];

export const APPROVED_CASE_STUDIES: import('../types').ApprovedCaseStudy[] = [
  {
    id: 'case-study-01',
    number: 'CASE STUDY 01',
    title: 'A Manufacturing Business With ₹1–5 Cr Monthly Revenue',
    context: [
      'Revenue was coming in.',
      'But profitability was weak.',
      'Cash flow was under pressure.',
      'Wastage was around 9–10%.',
      'Production was driven largely by incoming orders.',
      'Management reviews were inconsistent.'
    ],
    interventionTitle: 'We changed the system.',
    interventionItems: [
      'Business reviews',
      'KPI monitoring',
      'Product profitability analysis',
      'Product mix planning',
      'Quality controls',
      'Wastage monitoring',
      'Standardized quotations',
      'Production planning'
    ],
    resultHighlight: 'Wastage moved from approximately 9–10% to ~1%.',
    resultParagraph:
      'The business achieved approximately 6% month-on-month growth and reached break-even during the transformation period.',
    whatsappKeyword: 'MANUFACTURING'
  },
  {
    id: 'case-study-02',
    number: 'CASE STUDY 02',
    title: 'An Affiliate Marketing Business That Was Trapped by Its Founder',
    context: [
      'The founder tried building a team.',
      'Instead of freedom, he got: More follow-ups. More meetings. More chaos. Eventually, burnout.',
      'He dismantled the team and went back to doing everything himself.',
      'Then Avencis entered.'
    ],
    interventionTitle: 'We helped build:',
    interventionItems: [
      'Growth roadmap',
      'Hiring system',
      'Team structure',
      'SOPs',
      'KPIs',
      'Reviews',
      'Accountability',
      'Reporting'
    ],
    resultHighlight: '₹1 Cr/year → nearly ₹1 Cr/month | 200–250 campaigns → 1,000+ campaigns | Founder-led → 15+ member team',
    resultParagraph:
      "The objective wasn't to make the founder a better manager. It was to make the business less dependent on the founder.",
    whatsappKeyword: 'SCALE'
  },
  {
    id: 'case-study-03',
    number: 'CASE STUDY 03',
    title: 'An Industrial Capital Goods Company That Needed 30% Sales Growth',
    context: [
      'Sales had become flat.',
      'FY 2025–26 saw approximately 2% decline.',
      'The target? 30% annual growth.',
      'Instead of simply telling the sales team to "bring more leads", we rebuilt the sales engine.'
    ],
    interventionTitle: 'We introduced:',
    interventionItems: [
      'Lead validation',
      'High-value opportunity verification',
      'Outbound email sequences',
      'Calling sequences',
      'Better quotations',
      'Conversion scripts',
      'Management verification',
      'CRM discipline',
      'Weekly sales reviews'
    ],
    resultHighlight: 'Within two months: Qualified enquiries started coming from the new outbound engine.',
    resultParagraph:
      'The sales system was becoming measurable. The goal now is to build the system required to support 30% annual growth.',
    whatsappKeyword: 'SALES'
  },
  {
    id: 'case-study-04',
    number: 'CASE STUDY 04',
    title: "A Premium Interior Design Firm That Didn't Need More Leads. It needed better leads.",
    context: [
      'Approximately: ₹20,000 Meta Ad Spend generated: ~200 leads of which: 50+ were qualified.',
      'Approximately 3–4 projects moved towards closure with potential value of around ₹50–60+ Lakhs.'
    ],
    interventionTitle: 'We worked on:',
    interventionItems: [
      'Content strategy',
      'Social media',
      'Conversion-focused scripts',
      'Reels',
      'Meta Ads',
      'Premium audience targeting',
      'Campaign refinement',
      'Month-on-month creative optimization'
    ],
    resultHighlight: 'The objective wasn\'t: "Spend more on Meta." It was: Make every marketing rupee work harder.',
    resultParagraph:
      'Approximately 3–4 projects moved towards closure with potential value of around ₹50–60+ Lakhs.',
    whatsappKeyword: 'MARKETING'
  }
];

export const ASSESSMENT_10_CATEGORIES = [
  '1. Revenue & Growth',
  '2. Sales & Conversion',
  '3. Marketing',
  '4. Profitability',
  '5. Cash Flow',
  '6. Operations',
  '7. People & Organisation',
  '8. Management & Reviews',
  '9. Systems & Automation',
  '10. Founder Dependency'
];

export const SECTION_10_ILLUSTRATIVE_RESULT = {
  score: '67 / 100',
  summary:
    'Your business has a growth foundation — but some systems may not yet be ready for the next level of scale.',
  categories: [
    { area: 'Revenue & Growth', score: 78 },
    { area: 'Sales', score: 64 },
    { area: 'Marketing', score: 71 },
    { area: 'Profitability', score: 52 },
    { area: 'Operations', score: 69 },
    { area: 'People', score: 58 },
    { area: 'Management Reviews', score: 44 },
    { area: 'Systems', score: 61 },
    { area: 'Founder Dependency', score: 38 }
  ],
  topOpportunities: [
    {
      number: '01',
      title: 'Management Reviews',
      description:
        'Your business may be generating information without converting it into regular management decisions.'
    },
    {
      number: '02',
      title: 'Profitability',
      description: 'Revenue growth may not be translating proportionately into profit.'
    },
    {
      number: '03',
      title: 'Founder Dependency',
      description: 'Critical decisions may still be waiting for you.'
    }
  ],
  whatsappPrompt: 'Want us to walk you through your score?',
  whatsappCta: 'WhatsApp SCORE to Avencis.',
  whatsappKeyword: 'SCORE'
};

export const SECTION_12_CONTENT = {
  badge: 'FOUNDER DEPENDENCY',
  headline: 'If You Disappear for 7 Days,',
  subheadline: 'Does Your Business Keep Moving?',
  introParagraph: 'This is one of the strongest sections I would put on the website.\nTry this:',
  scenarioHeading: "Imagine you're unavailable for one week.",
  scenarioItems: [
    'No calls.',
    'No approvals.',
    'No follow-ups.',
    'No WhatsApp.',
    'No daily intervention.'
  ],
  scenarioQuestion: 'What happens?',
  options: [
    {
      label: 'A.',
      title: 'Business continues normally.',
      explanation: 'Good. Your systems are working.'
    },
    {
      label: 'B.',
      title: 'Some things slow down.',
      explanation: 'You have some systems. But there are dependency gaps.'
    },
    {
      label: 'C.',
      title: 'Everything starts waiting for you.',
      explanation: "That's not a people problem. It's a business design problem."
    }
  ],
  avencisObjectiveIntro: 'At Avencis, one of our core objectives is to help businesses move from:',
  fromState: 'Founder → Decision Maker → Firefighter',
  toIntro: 'to:',
  toState: 'Founder → Strategic Leader',
  underneathNote: 'with systems handling the execution underneath.',
  ctaText: 'Check My Founder Dependency →',
  whatsappKeyword: 'FOUNDER'
};

export const APPROVED_GROWTH_STAGES: import('../types').ApprovedGrowthStage[] = [
  {
    stage: 1,
    stageLabel: 'STAGE 1',
    title: 'Founder Does Everything',
    points: ['Revenue may be small.', 'Founder is the business.']
  },
  {
    stage: 2,
    stageLabel: 'STAGE 2',
    title: 'Founder Builds a Team',
    points: ['Revenue grows.', 'But management complexity begins.']
  },
  {
    stage: 3,
    stageLabel: 'STAGE 3',
    title: 'Team Creates More Work',
    points: ['More people.', 'More meetings.', 'More follow-ups.', 'More coordination.']
  },
  {
    stage: 4,
    stageLabel: 'STAGE 4',
    title: 'Systems Become Necessary',
    points: ['KPIs.', 'Reviews.', 'Processes.', 'Reporting.', 'Accountability.']
  },
  {
    stage: 5,
    stageLabel: 'STAGE 5',
    title: 'Business Becomes Scalable',
    points: [
      'People know what to do.',
      'Systems show what is happening.',
      'Management knows where to intervene.',
      'Founder focuses on growth.'
    ]
  }
];

export const SECTION_13_CONCLUSION = {
  notQuestion: 'The question isn\'t: "How big is your business?"',
  realQuestion: 'It\'s: "How dependent is your business on you?"'
};

export const SECTION_14_CONTENT = {
  badge: 'WHO WE WORK WITH',
  headline: 'We Work Best With Businesses That Have Already Proven Their Model.',
  intro: 'We are not primarily for someone looking for a business idea.\nWe work with businesses that already have:',
  qualifiers: [
    'Customers',
    'Revenue',
    'A product or service',
    'A team or the need to build one',
    'A proven market',
    'Ambition to grow'
  ],
  especiallyTitle: 'Especially:',
  sectors: [
    {
      title: 'Manufacturing Businesses',
      description: 'Production, profitability, capacity, quality, dispatch, systems.'
    },
    {
      title: 'Industrial & Capital Goods',
      description: 'Sales pipelines, quotations, conversion, CRM, outbound, reviews.'
    },
    {
      title: 'Founder-Led SMEs',
      description: 'Management systems, accountability, delegation, profitability.'
    },
    {
      title: 'Family-Run Businesses',
      description: 'Professionalisation, reporting, role clarity, systems.'
    },
    {
      title: 'Service Businesses',
      description: 'Team structure, delivery systems, sales, marketing and growth.'
    },
    {
      title: 'Digital & Performance Businesses',
      description: 'Campaign systems, teams, processes, reporting and scale.'
    },
    {
      title: 'Growing Businesses',
      description: 'Businesses moving from one stage of scale to another.'
    }
  ]
};

export const SECTION_15_CONTENT = {
  badge: 'WHAT MAKES AVENCIS DIFFERENT',
  headline: "We're Not Here to Give You a 60-Page Strategy Deck.",
  preferenceIntro: 'We prefer:',
  preferenceSteps: [
    'One clear problem.',
    'One clear owner.',
    'One clear KPI.',
    'One clear review.',
    'One clear next action.'
  ],
  repeatConclusion: 'Then we repeat.\nBecause a strategy that doesn\'t get executed is just a document.',
  independenceHeadline: "We Don't Want You Dependent on Us Either.",
  importanceNote: 'This is important.',
  notObjective: 'Our objective isn\'t: "Keep the consultant forever."',
  realObjective: 'Our objective is: Build capability inside your business.',
  teamUnderstandingLead: 'We help your team understand:',
  teamUnderstandingItems: [
    'What needs to happen.',
    'Who owns it.',
    'How it is measured.',
    'When it is reviewed.',
    'What happens when it goes wrong.',
    'And how the system improves.'
  ],
  notBestOutcome: 'The best outcome isn\'t that you need us forever.',
  bestOutcome: "It's that your business becomes stronger because we worked with you."
};

export const SECTION_16_CONTENT = {
  badge: 'WHY "EXTENDED MANAGEMENT TEAM"?',
  headline: "Because Sometimes You Don't Need Another Vendor.",
  subheadline: 'You Need Someone Sitting on Your Side of the Table.',
  tableQuestionsLead: 'Someone asking:',
  tableQuestions: [
    "Why didn't this happen?",
    'Where is the bottleneck?',
    'What does the data say?',
    'Who owns this?',
    'What happens next?',
    'Why are we still solving the same problem?',
    'Is this actually profitable?',
    "What happens if you aren't here?"
  ],
  roleHeading: "That's the role we play.",
  roleTitle: 'Your Extended Management Team.',
  notJustList: ['Not just advice.', 'Not just execution.'],
  conclusionPillars: 'Management thinking + execution discipline + systems.'
};

export const SECTION_17_CONTENT = {
  badge: 'THE AVENCIS PROMISE',
  headline: "We Don't Promise That Business Will Become Easy.",
  intro: 'We promise to make it:',
  promises: [
    { title: 'More Visible.', description: "You know what's happening." },
    { title: 'More Structured.', description: "People know what they're responsible for." },
    { title: 'More Measurable.', description: 'Performance can be seen.' },
    { title: 'More Profitable.', description: "Revenue isn't the only number that matters." },
    { title: 'More Scalable.', description: "Growth doesn't have to create proportional chaos." },
    { title: 'Less Founder-Dependent.', description: "The business doesn't stop every time you step away." }
  ]
};

export const SECTION_18_CONTENT = {
  badge: 'TAKE THE NEXT STEP',
  headline: "You Don't Need to Fix Everything.",
  subheadline: 'You Need to Know What to Fix First.',
  assessmentTitle: 'Take the Avencis Business Scale Assessment™.',
  helpsIdentifyIntro: 'It will help you identify:',
  identifyPoints: [
    "Where you're strong.",
    "Where you're leaking.",
    "Where you're dependent.",
    'Where growth could break the business.'
  ],
  attentionLead: 'And:',
  attentionHeadline: 'What deserves your attention first.',
  freeAssessmentHeadline: 'Free Assessment.',
  noObligationPoints: [
    'No obligation.',
    'No sales pitch required.',
    'Just clarity.'
  ],
  ctaAssessmentText: 'TAKE THE BUSINESS ASSESSMENT',
  whatsappLead: 'Or WhatsApp:',
  whatsappKeyword: 'ASSESSMENT'
};

export const GLOBAL_FOOTER_CONTENT = {
  brandName: 'AVENCIS',
  tagline: 'Your Extended Management Team',
  purposeStatement: 'Scaling Businesses with Clarity, Strategy & Purpose.',
  capabilities: [
    'Business Strategy',
    'Growth Consulting',
    'Sales Systems',
    'Marketing & Performance',
    'Business Transformation',
    'Operational Systems',
    'Management Reviews',
    'Business Analytics',
    'Digital Transformation',
    'PMO & Execution'
  ],
  location: 'Pune | India | Working with ambitious businesses',
  whatsappDisplay: '[NUMBER]',
  emailDisplay: '[EMAIL]',
  quickLinks: [
    { label: 'About Avencis', path: '/why-avencis' },
    { label: 'What We Do', path: '/what-we-do' },
    { label: 'How We Work', path: '/methodology' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'Business Assessment', path: '/diagnostics' },
    { label: 'Insights', path: '/insights' },
    { label: 'Contact', path: '/book-assessment' }
  ],
  startHere: {
    assessmentLabel: 'Take the Business Scale Assessment →',
    assessmentPath: '/diagnostics',
    whatsAppLabel: 'WhatsApp ASSESSMENT →',
    whatsAppKeyword: 'ASSESSMENT'
  },
  avencisPrinciple: {
    title: 'The Avencis Principle',
    boldText: "Don't Build a Bigger Business.",
    subText: 'Build a Business That Can Handle Being Bigger.'
  }
};
