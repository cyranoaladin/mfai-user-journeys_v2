/**
 * Journey Data Configuration - MFAI Cognitive Activation Protocol™
 *
 * This file contains all the user journey data structured by persona.
 * Each journey follows the Cognitive Activation Protocol™: Learn → Build → Prove → Activate → Scale
 */

export interface JourneyPhase {
  name: string;
  title: string;
  description: string;
  mission: string;
  xpReward: number;
  nftReward?: string;
  locked?: boolean;
  duration?: string;
  content: string;
  icon: string;
  zynoTip?: string;
  requirements?: string[];
}

export interface Journey {
  persona: string;
  label: string;
  icon: string;
  tagline: string;
  description: string;
  phases: JourneyPhase[];
  requiredPass: 'Free' | 'Gold' | 'Platinum' | 'Diamond';
  zynoSays: string;
  rewards: string[];
  whyItMatters: string;
  finalRole: string;
  profileType: string;
  missionType: string;
  slug: string;
}

export const journeys: Journey[] = [
  {
    persona: 'web2-hustler',
    label: 'The Web2 Hustler',
    icon: '🚀',
    tagline: 'From Web2 Hustler to Web3 Sovereign',
    description: 'Perfect for ambitious Web2 entrepreneurs seeking to monetize their skills and gain sovereign control over their economic future through the MFAI protocol.',
    profileType: 'Entrepreneur',
    missionType: 'Transform',
    slug: 'from-web2-hustler-to-web3-sovereign',
    phases: [
      {
        name: 'Cognitive Activation',
        title: 'The Awakening — Entry into the Protocol',
        description: 'Create an MFAI profile and complete Zyno\'s AEPO™ Diagnostic to determine cognitive and strategic potential.',
        mission: 'Complete AEPO™ scan and get your Skillchain Map',
        xpReward: 50,
        nftReward: 'Proof-of-Skill Token',
        duration: '30 minutes',
        content: 'Marie is a Web2 entrepreneur managing an online store. She stumbles upon mfai.app, intrigued by its vision of learning that leads to real ownership. Through Zyno\'s guidance, she discovers her cognitive potential and receives her personalized Skillchain™.',
        icon: '🧠',
        zynoTip: 'Welcome to the protocol! Your cognitive journey begins with understanding your unique strengths.',
        requirements: []
      },
      {
        name: 'Skillchain Mining',
        title: 'Learn & Build',
        description: 'Enter the Training Nexus, guided by Zyno, and start completing missions on tokenized business models, AI marketing, and smart wallets.',
        mission: 'Co-build your MVP with MFAI tools',
        xpReward: 75,
        nftReward: 'Creator Studio Access',
        duration: '2-3 hours',
        content: 'Marie enters the Training Nexus, guided by Zyno, her AI Co-Founder™. She starts completing missions on tokenized business models, AI marketing, and smart wallets. Each completed mission earns her Proof-of-Skill Tokens™.',
        icon: '⚒️',
        zynoTip: 'Focus on building something tangible. Your MVP will become your Proof-of-Vision™.',
        requirements: ['Complete Cognitive Activation']
      },
      {
        name: 'Proof-of-Vision',
        title: 'Prove & Connect',
        description: 'With Zyno\'s co-piloting, build your first prototype using smart contract templates, brand storytelling modules, and governance simulators.',
        mission: 'Share content and validate missions',
        xpReward: 100,
        nftReward: 'Skillchain Status Boost',
        duration: '3-5 hours',
        content: 'With Zyno\'s co-piloting, Marie begins building a tokenized marketplace for artisan NFTs. She uses smart contract templates, brand storytelling modules, and governance simulators to create her Proof-of-Vision™.',
        icon: '🧬',
        zynoTip: 'Your vision is taking shape. Now prove it works with real validation from the community.',
        requirements: ['Complete Skillchain Mining', 'Build functional MVP']
      },
      {
        name: 'Cognitive Lock',
        title: 'Activate & Stake',
        description: 'Contribute back to the community by mentoring newcomers and validating micro-missions. Your on-chain reputation score grows.',
        mission: 'Stake $MFAI and gain governance rights',
        xpReward: 125,
        nftReward: 'Proof-of-Activation',
        duration: '1-2 weeks',
        content: 'Marie now contributes back to the community. She mentors two newcomers and validates three micro-missions. Her on-chain reputation score grows, unlocking governance rights and Neuro-Dividends™.',
        icon: '🔗',
        zynoTip: 'Staking shows commitment. Your locked $MFAI gives you real influence in the protocol.',
        requirements: ['Complete Proof-of-Vision', 'Community validation']
      },
      {
        name: 'Synaptic Governance',
        title: 'Launch & Expand',
        description: 'Stake $MFAI via Cognitive Lock™ and submit your project to the DAO. Participate in Synaptic Governance™ and gain sovereignty.',
        mission: 'Launch your project via MFAI Launchpad',
        xpReward: 150,
        nftReward: 'Launchpad Certification',
        duration: 'Ongoing',
        content: 'Marie stakes $MFAI via a Cognitive Lock™ and submits her project to the DAO. The proposal is validated through Synaptic Governance™, backed by her Proof-of-Vision™ and reputation. She becomes a Protocol Sovereign.',
        icon: '👑',
        zynoTip: 'Congratulations! You\'re now a sovereign builder in the protocol. Your journey continues as you help others.',
        requirements: ['Complete Cognitive Lock', 'DAO approval', 'Stake minimum $MFAI']
      }
    ],
    requiredPass: 'Gold',
    zynoSays: 'You\'re not just learning. You\'re mining skills into capital.',
    rewards: ['Protocol Sovereign Status', 'Continuous Neuro-Dividends™', 'Lifetime MFAI Access'],
    whyItMatters: 'This journey transforms Web2 entrepreneurs into Web3 sovereigns, giving them ownership and control over their economic future through proven cognitive capital.',
    finalRole: 'Protocol Sovereign'
  },
  {
    persona: 'community-voice',
    label: 'The Community Voice',
    icon: '🗣️',
    tagline: 'From Community Voice to Synaptic Strategist',
    description: 'Natural communicators and community builders who want to evolve from enthusiasts to governance-capable operators recognized for their insight and influence.',
    profileType: 'Strategist',
    missionType: 'Coordinate',
    slug: 'from-community-voice-to-synaptic-strategist',
    phases: [
      {
        name: 'Social Signal Detection',
        title: 'Community Diagnostics',
        description: 'AEPO™ identifies your relational capital and strategic clarity, generating a Skillchain with emphasis on coordination psychology.',
        mission: 'Complete the Community Architect Assessment',
        xpReward: 50,
        nftReward: 'Community Architect Badge',
        duration: '1 hour',
        content: 'Upon profile creation, Zyno identifies relational capital and strategic clarity via AEPO™. A Skillchain is generated with emphasis on Coordination Psychology, Protocol Narratives, and Collective Decision Frameworks.',
        icon: '🌱',
        zynoTip: 'Your natural ability to connect people is your superpower. Let\'s formalize it.',
        requirements: []
      },
      {
        name: 'Contribution Chain',
        title: 'Network Mapping',
        description: 'Complete missions by moderating conversations, translating strategic content, and synthesizing ecosystem updates.',
        mission: 'Map your community network with MFAI tools',
        xpReward: 75,
        nftReward: 'Network Mapper Badge',
        duration: '2-3 hours',
        content: 'Complete missions by moderating conversations, translating strategic content, and synthesizing summaries of ecosystem updates. Earn Proof-of-Skill Tokens™ for Communication & Strategic Insight.',
        icon: '🔗',
        zynoTip: 'Every conversation you facilitate creates value. Track your impact.',
        requirements: ['Complete Social Signal Detection']
      },
      {
        name: 'Visibility Amplifier',
        title: 'Collective Intelligence',
        description: 'Get nominated by peers to coordinate Skillchains, host events, and review submissions using Zyno.',
        mission: 'Facilitate a collective intelligence session',
        xpReward: 100,
        nftReward: 'Collective Intelligence Badge',
        duration: '3-5 hours',
        content: 'Nominated by peers to coordinate Skillchains, host events, and review submissions. Use Zyno to auto-generate communication plans and propose new missions. Unlock Protocol Channel Rights.',
        icon: '📡',
        zynoTip: 'Your influence is growing. Use it to amplify the best ideas in the community.',
        requirements: ['Complete Contribution Chain', 'Peer nominations']
      },
      {
        name: 'Governance Intelligence',
        title: 'Community Governance',
        description: 'Stake $MFAI to activate Mission Design privileges, suggest new Skillchains, and moderate Proof-of-Vision™ validations.',
        mission: 'Implement a governance structure with MFAI',
        xpReward: 125,
        nftReward: 'Governance Architect Badge',
        duration: '1-2 weeks',
        content: 'Stake $MFAI (Cognitive Lock™) to activate Mission Design privileges, suggest new Skillchains, and moderate Proof-of-Vision™ validations. Receive reputation-weighted Neuro-Dividends™.',
        icon: '🧭',
        zynoTip: 'Governance is about creating systems that serve everyone. Design wisely.',
        requirements: ['Complete Visibility Amplifier', 'Stake $MFAI']
      },
      {
        name: 'Synaptic Strategist',
        title: 'Synaptic Strategy',
        description: 'Recognized as a protocol mind-shaper, participate in strategic cycles with access to protocol memory via RAG-Gov™.',
        mission: 'Launch your community strategy with MFAI tools',
        xpReward: 150,
        nftReward: 'Synaptic Strategist Badge',
        duration: 'Ongoing',
        content: 'Recognized as a protocol mind-shaper. Participate in strategic cycles with access to protocol memory via RAG-Gov™. Can summon Zyno Pro to co-curate thematic streams for ecosystem evolution.',
        icon: '👑',
        zynoTip: 'You\'ve become a strategic node in the protocol\'s brain. Shape the future wisely.',
        requirements: ['Complete Governance Intelligence', 'Protocol Leadership Circle nomination']
      }
    ],
    requiredPass: 'Platinum',
    zynoSays: 'Coordination is not management. It\'s strategy made relational.',
    rewards: ['Protocol Leadership Circle', 'Strategic Circle Status™', 'Royalties + Protocol Visibility'],
    whyItMatters: 'Web3 promised community ownership. Money Factory AI delivers it — with proof, rewards, and purpose. You\'ll go from facilitator to protocol-native strategist.',
    finalRole: 'Synaptic Strategist'
  },
  {
    persona: 'content-maker',
    label: 'The Content Maker',
    icon: '🎨',
    tagline: 'From Content Maker to Cognitive Publisher',
    description: 'Storytellers, visual artists, and educators who want to publish in a world where creativity is proof and attention is capital.',
    profileType: 'Creator',
    missionType: 'Create',
    slug: 'from-content-maker-to-cognitive-publisher',
    phases: [
      {
        name: 'Narrative DNA',
        title: 'Content Diagnostics',
        description: 'AEPO™ diagnostic reveals your unique creative angle: educator, analyst, artist, curator, or visionary.',
        mission: 'Complete the Creator Assessment',
        xpReward: 50,
        nftReward: 'Creator Badge',
        duration: '45 minutes',
        content: 'AEPO™ diagnostic reveals your unique creative angle: educator, analyst, artist, curator, or visionary. Zyno matches you with missions that map your creative capital. Enter the Transmission Loop™.',
        icon: '✍️',
        zynoTip: 'Your creative voice is unique. Let\'s turn it into verifiable value.',
        requirements: []
      },
      {
        name: 'Proof-of-Creation',
        title: 'Content Strategy',
        description: 'Create media with embedded proof links. Zyno checks originality, value-density, and strategic alignment.',
        mission: 'Develop your content strategy with MFAI tools',
        xpReward: 75,
        nftReward: 'Strategist Badge',
        duration: '2-4 hours',
        content: 'Create media (articles, guides, visuals, tutorials) with embedded proof links. Zyno checks originality, value-density, and strategic alignment. Every validated content piece becomes a Proof-of-Transmission™.',
        icon: '🎥',
        zynoTip: 'Quality over quantity. Each piece of content should add real value to the protocol.',
        requirements: ['Complete Narrative DNA']
      },
      {
        name: 'Integrated Creative Streams',
        title: 'Content Creation',
        description: 'Collaborate with Builders and Explorers. Your content becomes an entry point into other user journeys.',
        mission: 'Create and tokenize your first cognitive content',
        xpReward: 100,
        nftReward: 'Cognitive Creator Badge',
        duration: '5-8 hours',
        content: 'Start collaborating cross-functionally with Builders and Explorers. Your content becomes an entry point into other user journeys. Zyno tracks Content Impact Trails™, measuring protocol resonance.',
        icon: '🧠',
        zynoTip: 'Collaboration amplifies impact. Your content is now part of a larger ecosystem.',
        requirements: ['Complete Proof-of-Creation', 'Cross-functional collaboration']
      },
      {
        name: 'Creative Economy Architect',
        title: 'Content Distribution',
        description: 'Tokenize advanced content modules as Skillchain Assets™. Gain co-publishing rights with Zyno.',
        mission: 'Distribute your content through MFAI channels',
        xpReward: 125,
        nftReward: 'Distribution Master Badge',
        duration: '1-2 weeks',
        content: 'Tokenize advanced content modules as Skillchain Assets™. Educators gain co-publishing rights with Zyno. Stake $MFAI to access deeper publishing layers and reputation multiplier nodes.',
        icon: '🔗',
        zynoTip: 'Your content is now an asset. Tokenization creates sustainable value streams.',
        requirements: ['Complete Integrated Creative Streams', 'Tokenize content']
      },
      {
        name: 'Cognitive Publisher',
        title: 'Cognitive Publishing',
        description: 'Run branded creative channels under MFAI\'s protocol. Get Zyno Pro assistance and publishing deals.',
        mission: 'Launch your cognitive publishing platform',
        xpReward: 150,
        nftReward: 'Cognitive Publisher Badge',
        duration: 'Ongoing',
        content: 'Run one or more branded creative channels under MFAI\'s protocol. Zyno Pro offers asset auto-tagging, feedback analytics, and contextual publishing. Eligible for publishing deals across MFAI-aligned protocols.',
        icon: '👑',
        zynoTip: 'You\'re now a protocol-native content entrepreneur. Your narrative shapes the ecosystem.',
        requirements: ['Complete Creative Economy Architect', 'Launch publishing platform']
      }
    ],
    requiredPass: 'Gold',
    zynoSays: 'In the protocol, every visual is a vector of value.',
    rewards: ['Cognitive Publisher Rank™', 'Revenue Share', 'Launchpad Access'],
    whyItMatters: 'You\'re no longer publishing in someone else\'s garden. You\'re growing your own protocol-native brand — certified, composable, and rewarded.',
    finalRole: 'Cognitive Publisher'
  },
  {
    persona: 'data-miner',
    label: 'The Data Miner',
    icon: '🔍',
    tagline: 'From Data Miner to Intelligence Synthesizer',
    description: 'Researchers and analysts who convert complexity into collective cognition, turning intelligence into protocol-grade signal.',
    profileType: 'Researcher',
    missionType: 'Analyze',
    slug: 'from-data-miner-to-intelligence-synthesizer',
    phases: [
      {
        name: 'Research DNA Calibration',
        title: 'Data Assessment',
        description: 'AEPO™ + Insight Scanner determine your core zone: trend analysis, governance modeling, socio-economic design.',
        mission: 'Complete the Research Protocol Assessment',
        xpReward: 50,
        nftReward: 'Data Analyst Badge',
        duration: '1 hour',
        content: 'AEPO™ + Insight Scanner determine your core zone: trend analysis, governance modeling, socio-economic design, AI ethics, tokenomics. Zyno suggests Cognitive Axes™ and data streams.',
        icon: '🔎',
        zynoTip: 'Data without insight is noise. Let\'s turn your analysis into actionable intelligence.',
        requirements: []
      },
      {
        name: 'Insight Missions',
        title: 'Intelligence Mapping',
        description: 'Complete Micro-Research Challenges issued by the protocol. Deliver concise, structured cognitive payloads.',
        mission: 'Map your research domain with MFAI tools',
        xpReward: 75,
        nftReward: 'Intelligence Mapper Badge',
        duration: '2-3 hours',
        content: 'Complete Micro-Research Challenges issued by the protocol or partners. Deliver concise, structured cognitive payloads. Zyno analyzes for Insight Density™ and Relevance Scope™.',
        icon: '🧠',
        zynoTip: 'Quality research compounds. Each insight builds on the last.',
        requirements: ['Complete Research DNA Calibration']
      },
      {
        name: 'Synthesis & Signal Diffusion',
        title: 'Signal Extraction',
        description: 'Publish high-value syntheses and collaborate with other builders to inject signal into their projects.',
        mission: 'Extract and tokenize your first intelligence signal',
        xpReward: 100,
        nftReward: 'Signal Extractor Badge',
        duration: '5-8 hours',
        content: 'Publish high-value syntheses, meta-briefs, or tokenomics breakdowns. Collaborate with Builders, Creators and Architects to inject signal into their projects. Create Cross-Skillchain Reports™.',
        icon: '🧬',
        zynoTip: 'Your insights are connecting dots across the ecosystem. This is true synthesis.',
        requirements: ['Complete Insight Missions', 'Cross-collaboration']
      },
      {
        name: 'Impact & Influence',
        title: 'Protocol Integration',
        description: 'Zyno tracks impact across the protocol. Join Synaptic Research Circles™ to co-design next-gen paradigms.',
        mission: 'Integrate your intelligence into MFAI protocols',
        xpReward: 125,
        nftReward: 'Protocol Integrator Badge',
        duration: '1-2 weeks',
        content: 'Zyno tracks impact across the protocol: how your insights change missions, shape launches, influence Proofs. Join Synaptic Research Circles™ to co-design next-gen paradigms.',
        icon: '🧭',
        zynoTip: 'Your research is now shaping protocol evolution. This is true influence.',
        requirements: ['Complete Synthesis & Signal Diffusion', 'Measurable impact']
      },
      {
        name: 'Intelligence Synthesizer',
        title: 'Intelligence Synthesis',
        description: 'Tokenize a full Research Capsule™ and become a Protocol Insight Partner™ with royalty streams.',
        mission: 'Launch your intelligence synthesis platform',
        xpReward: 150,
        nftReward: 'Intelligence Synthesizer Badge',
        duration: 'Ongoing',
        content: 'Tokenize a full Research Capsule™ (on-chain report, synthesis, or simulator). Host public Insight Sessions™ and publish into the Launchpad Library. Become a Protocol Insight Partner™.',
        icon: '👑',
        zynoTip: 'You\'ve become the human API between chaos and clarity. Signal is the new oil.',
        requirements: ['Complete Impact & Influence', 'Launch Research Capsule™']
      }
    ],
    requiredPass: 'Platinum',
    zynoSays: 'Signal is the new oil. But only if it\'s composable, provable, and actionable.',
    rewards: ['Signal Architect Rank™', 'Meta-governance Role', 'Advisory Seat'],
    whyItMatters: 'In a world drowning in content, we reward synthesis. The protocol doesn\'t just store knowledge, it maps epistemic leverage.',
    finalRole: 'Intelligence Synthesizer'
  },
  {
    persona: 'project-manager',
    label: 'The Project Manager',
    icon: '⚙️',
    tagline: 'From Project Manager to Mission Commander',
    description: 'Mission orchestrators and system thinkers who turn operational fluency into protocol-native mission design power.',
    profileType: 'Operator',
    missionType: 'Orchestrate',
    slug: 'from-project-manager-to-mission-commander',
    phases: [
      {
        name: 'Ops DNA Mapping',
        title: 'Mission Assessment',
        description: 'AEPO™ identifies your execution archetype: planner, catalyst, finisher, or integrator.',
        mission: 'Complete the Operator Protocol Assessment',
        xpReward: 50,
        nftReward: 'Operator Badge',
        duration: '45 minutes',
        content: 'AEPO™ identifies your execution archetype: planner, catalyst, finisher, or integrator. You receive your Mission Ops Compass™ showing how you interact with other user types.',
        icon: '🧬',
        zynoTip: 'Operations is the engine of collective sovereignty. Let\'s map your execution style.',
        requirements: []
      },
      {
        name: 'Shadow-to-Command Training',
        title: 'Mission Design',
        description: 'Join ongoing missions as observer or co-pilot. Learn protocol logic and complete your first Flow Audit™.',
        mission: 'Design your mission architecture with MFAI tools',
        xpReward: 75,
        nftReward: 'Mission Designer Badge',
        duration: '2-3 hours',
        content: 'Join ongoing missions as observer or co-pilot. Learn protocol logic (skillchain pacing, task validation, mission loops). Complete a first Flow Audit™ using Zyno\'s metrics.',
        icon: '🧠',
        zynoTip: 'Observe first, then lead. Understanding the flow is key to commanding it.',
        requirements: ['Complete Ops DNA Mapping']
      },
      {
        name: 'Design Your First Mission Loop',
        title: 'Mission Development',
        description: 'Create a 3-phase mission for builders or creators. Define cognitive objectives and submit for Zyno Flow Simulation™.',
        mission: 'Develop your first mission components',
        xpReward: 100,
        nftReward: 'Mission Developer Badge',
        duration: '3-5 hours',
        content: 'Create a 3-phase mission for builders or creators. Define cognitive objectives, Proofs to generate, and KPIs. Submit for Zyno Flow Simulation™ to detect bottlenecks and leverage points.',
        icon: '🔧',
        zynoTip: 'A well-designed mission creates value for everyone involved. Think systems, not tasks.',
        requirements: ['Complete Shadow-to-Command Training', 'Mission design approval']
      },
      {
        name: 'Cross-Team Coordination',
        title: 'Mission Deployment',
        description: 'Lead multiple user types through orchestrated campaigns. Monitor cognitive load and upgrade to Live Ops Mode™.',
        mission: 'Deploy your mission with MFAI protocols',
        xpReward: 125,
        nftReward: 'Mission Deployer Badge',
        duration: '1-2 weeks',
        content: 'Lead multiple user types through orchestrated campaigns (builders, creators, investors). Monitor cognitive load, Proof generation, reward distribution. Upgrade to Live Ops Mode™ with AI co-pilot Zyno Pro™.',
        icon: '📡',
        zynoTip: 'Coordination at scale requires both human intuition and AI assistance. You\'re the conductor.',
        requirements: ['Complete Design Your First Mission Loop', 'Multi-team leadership']
      },
      {
        name: 'Mission Commander',
        title: 'Mission Command',
        description: 'Launch a Meta-Mission Protocol™ and apply to co-design the next evolution of MFAI\'s operational layer.',
        mission: 'Launch your full mission on the MFAI network',
        xpReward: 150,
        nftReward: 'Mission Commander Badge',
        duration: 'Ongoing',
        content: 'Launch a Meta-Mission Protocol™ (multi-week, multi-skillchain operation). Integrate with Launchpad or Research Protocol™ outputs. Apply to co-design the next evolution of MFAI\'s operational layer.',
        icon: '🚀',
        zynoTip: 'You\'ve become the connective tissue that makes the protocol work at scale. Command wisely.',
        requirements: ['Complete Cross-Team Coordination', 'Meta-Mission success']
      }
    ],
    requiredPass: 'Gold',
    zynoSays: 'In a decentralized world, operations is no longer back office. It\'s the engine of collective sovereignty.',
    rewards: ['Mission Design Council Seat', 'Revenue Stream', 'Protocol Ops Influence'],
    whyItMatters: 'Builders need orchestration. Creators need structure. Visionaries need traction. You are the connective tissue that makes the protocol work at scale.',
    finalRole: 'Mission Commander'
  },
  {
    persona: 'idea-carrier',
    label: 'The Idea Carrier',
    icon: '🛠️',
    tagline: 'From Idea Carrier to Protocol Engineer',
    description: 'Developers and technical founders who want to design with purpose, scale with logic, and build where ownership flows back to builders.',
    profileType: 'Builder',
    missionType: 'Engineer',
    slug: 'from-idea-carrier-to-protocol-engineer',
    phases: [
      {
        name: 'Cognitive Mapping & Devpath Activation',
        title: 'Builder Assessment',
        description: 'Zyno launches your AEPO™ mapping session. Your Skillchain™ highlights backend logic and smart architecture.',
        mission: 'Complete the Builder Protocol Assessment',
        xpReward: 50,
        nftReward: 'Builder Badge',
        duration: '1 hour',
        content: 'Zyno launches your AEPO™ mapping session. Your Skillchain™ highlights backend logic, smart architecture, and token mechanics. You\'re routed toward Dynamic vesting & staking systems, AI x Blockchain integrations.',
        icon: '🧬',
        zynoTip: 'Your ideas are seeds. Let\'s turn them into protocol-native assets.',
        requirements: []
      },
      {
        name: 'Proof-of-Architecture',
        title: 'Protocol Design',
        description: 'Design or fork a protocol component using MFAI\'s Smart Contract Library. Zyno auto-generates tests.',
        mission: 'Design your protocol architecture with MFAI tools',
        xpReward: 75,
        nftReward: 'Protocol Designer Badge',
        duration: '3-5 hours',
        content: 'Design or fork a protocol component using MFAI\'s Smart Contract Library. Zyno auto-generates tests + validation flows. You receive your first Proof-of-Build™ and access to the MFAI Builder Hub.',
        icon: '⚙️',
        zynoTip: 'Architecture is about creating systems that scale. Think composability from day one.',
        requirements: ['Complete Cognitive Mapping & Devpath Activation']
      },
      {
        name: 'Networked Building',
        title: 'Protocol Development',
        description: 'Co-build with other profiles. Your work feeds their Skillchains and vice versa.',
        mission: 'Develop your first protocol component',
        xpReward: 100,
        nftReward: 'Protocol Developer Badge',
        duration: '1-2 weeks',
        content: 'Co-build with other profiles (designers, creators, strategists). Your work feeds their Skillchains (and vice versa). Zyno aggregates your Proof-of-Interoperability™.',
        icon: '🔗',
        zynoTip: 'Building in isolation is old paradigm. Your code is now part of a living ecosystem.',
        requirements: ['Complete Proof-of-Architecture', 'Cross-functional collaboration']
      },
      {
        name: 'Stake, Curate, Govern',
        title: 'Protocol Testing',
        description: 'Stake $MFAI via Cognitive Lock™ to vote on upgrades, curate mission templates, and lead system improvements.',
        mission: 'Test and validate your protocol with MFAI',
        xpReward: 125,
        nftReward: 'Protocol Tester Badge',
        duration: '2-3 weeks',
        content: 'Stake $MFAI via Cognitive Lock™ to vote on upgrades to shared templates, curate or propose mission templates, and lead system-level improvements via Synaptic Governance™.',
        icon: '🧭',
        zynoTip: 'Governance is about building systems that serve builders. Your voice shapes the future.',
        requirements: ['Complete Networked Building', 'Stake $MFAI']
      },
      {
        name: 'Protocol Engineer',
        title: 'Protocol Engineering',
        description: 'Package your module and submit for Launchpad review. Access full incubation path with mentorship and funding.',
        mission: 'Launch your protocol on the MFAI network',
        xpReward: 150,
        nftReward: 'Protocol Engineer Badge',
        duration: 'Ongoing',
        content: 'Package your module, app or system and submit it for Launchpad review. Zyno prepares a Proof-of-Vision™ dossier + audit summary. Access to full incubation path: mentorship, liquidity bootstrapping, and release.',
        icon: '🚀',
        zynoTip: 'You\'re not coding on speculation. You\'re building inside a Proof Engine where every component evolves the system.',
        requirements: ['Complete Stake, Curate, Govern', 'Launchpad approval']
      }
    ],
    requiredPass: 'Platinum',
    zynoSays: 'The protocol isn\'t just built by developers. It is built for them.',
    rewards: ['Neuro-Dividends™', 'Passive Revenue Flows', 'System Reuse Royalties'],
    whyItMatters: 'You\'re not coding on speculation. You\'re building inside a Proof Engine — where every validated component becomes part of a self-evolving system.',
    finalRole: 'Protocol Engineer'
  },
  {
    persona: 'silent-watcher',
    label: 'The Silent Watcher',
    icon: '👁️',
    tagline: 'From Silent Watcher to Protocol Backer',
    description: 'Observers, investors, and analysts who want early access to a system where capital, insights, and alignment generate compounding value.',
    profileType: 'Investor',
    missionType: 'Back',
    slug: 'from-silent-watcher-to-protocol-backer',
    phases: [
      {
        name: 'Vision Mapping & Intelligence Filtering',
        title: 'Vision Assessment',
        description: 'Zyno runs your AEPO-Investor Mode™. Receive a custom Dealflow Dashboard based on Proof-of-Vision maturity.',
        mission: 'Complete the Vision Protocol Assessment',
        xpReward: 50,
        nftReward: 'Vision Badge',
        duration: '45 minutes',
        content: 'Zyno runs your AEPO-Investor Mode™. You receive a custom Dealflow Dashboard based on Proof-of-Vision maturity, Founder Reputation Layer, and Protocol-Signal Indicators™.',
        icon: '🧬',
        zynoTip: 'See before others see. Your early signal detection is your competitive advantage.',
        requirements: []
      },
      {
        name: 'Stake & Align',
        title: 'Protocol Analysis',
        description: 'Use Cognitive Lock™ to stake $MFAI into promising Skillchains and tokenized content.',
        mission: 'Analyze protocol opportunities with MFAI tools',
        xpReward: 75,
        nftReward: 'Protocol Analyst Badge',
        duration: '2-3 hours',
        content: 'Use Cognitive Lock™ to stake $MFAI into promising Skillchains, tokenized content or protocols, and Syndicated Builder Circles™. Your Proof-of-Alignment™ earns you priority access and governance credit.',
        icon: '💎',
        zynoTip: 'Alignment is more than investment. It\'s about backing intelligence before it\'s obvious.',
        requirements: ['Complete Vision Mapping & Intelligence Filtering']
      },
      {
        name: 'Activate Insight',
        title: 'Strategic Positioning',
        description: 'Publish strategic insights and market frameworks. Zyno verifies Insight Transmission Value™.',
        mission: 'Develop your strategic protocol position',
        xpReward: 100,
        nftReward: 'Strategic Positioner Badge',
        duration: '3-5 hours',
        content: 'Publish strategic insights, market frameworks, or signal reports. Zyno verifies Insight Transmission Value™. You mint Proof-of-Perception™ and gain enhanced role in Protocol Reputation Index™.',
        icon: '🧠',
        zynoTip: 'Your insights shape markets. Share your vision to amplify your influence.',
        requirements: ['Complete Stake & Align', 'Publish strategic content']
      },
      {
        name: 'Curate the Future',
        title: 'Protocol Backing',
        description: 'Serve as a Launchpad signal validator. Vote on protocol-level initiatives and join Due Diligence Circles™.',
        mission: 'Back your first protocol with MFAI',
        xpReward: 125,
        nftReward: 'Protocol Backer Badge',
        duration: '1-2 weeks',
        content: 'Serve as a Launchpad signal validator. Vote or veto on protocol-level initiatives. Join Cognitive Due Diligence Circles™ for emerging projects. Gain elevated access to the Strategic Allocation Pool™.',
        icon: '🧬',
        zynoTip: 'Curation is creation. Your choices shape what gets built.',
        requirements: ['Complete Activate Insight', 'Validator role']
      },
      {
        name: 'Protocol Backer',
        title: 'Vision Amplification',
        description: 'Back or co-design new protocol branches. Launch your Meta-Vision Vault™ and activate Zyno Pro Capital Tools.',
        mission: 'Amplify your protocol vision on the MFAI network',
        xpReward: 150,
        nftReward: 'Vision Amplifier Badge',
        duration: 'Ongoing',
        content: 'Back or co-design entirely new branches of the protocol. Launch your own Meta-Vision Vault™. Activate Zyno Pro Capital Tools to simulate futures. Become a certified Protocol Backer™.',
        icon: '👁️',
        zynoTip: 'You don\'t chase trends — you shape them. Your vision creates the future.',
        requirements: ['Complete Curate the Future', 'Launch Meta-Vision Vault™']
      }
    ],
    requiredPass: 'Diamond',
    zynoSays: 'It\'s not about investing in projects. It\'s about investing in evolution.',
    rewards: ['Vision Vault Protocol™', 'Revenue Share', 'Protocol-level Influence'],
    whyItMatters: 'You don\'t chase trends — you shape them. Money Factory AI gives you the ability to back cognitive capital, and watch it grow in on-chain influence, intelligence, and equity.',
    finalRole: 'Protocol Backer'
  }
];

/**
 * Get a journey by persona identifier
 */
export const getJourneyByPersona = (persona: string): Journey | undefined => {
  return journeys.find(journey => journey.persona === persona || journey.slug === persona);
};

/**
 * Get all available journeys
 */
export const getAllJourneys = (): Journey[] => {
  return journeys;
};

/**
 * Get recommended journey based on user preferences
 */
export const getRecommendedJourney = (goal: string, experience: string): Journey => {
  if (goal === 'learn') {
    return journeys.find(j => j.persona === 'web2-hustler') || journeys[0];
  }

  if (goal === 'build') {
    return experience === 'experienced'
      ? journeys.find(j => j.persona === 'idea-carrier') || journeys[5]
      : journeys.find(j => j.persona === 'web2-hustler') || journeys[0];
  }

  if (goal === 'invest') {
    return journeys.find(j => j.persona === 'silent-watcher') || journeys[6];
  }

  if (goal === 'create') {
    return journeys.find(j => j.persona === 'content-maker') || journeys[2];
  }

  return journeys[0];
};