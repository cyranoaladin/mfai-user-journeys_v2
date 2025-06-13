/**
 * Journey Data Configuration
 *
 * This file contains all the user journey data structured by persona.
 * Each journey follows the Cognitive Activation Protocol™: Learn → Build → Prove → Activate → Scale
 */

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
}

export interface JourneyPhase {
  name?: string;
  title: 'Learn' | 'Build' | 'Prove' | 'Activate' | 'Scale';
  description: string;
  mission: string;
  xpReward: number;
  nftReward?: string;
  locked?: boolean;
  duration?: string;
  content?: string;
  icon?: string;
}

export const journeys: Journey[] = [
  {
    persona: 'student',
    label: 'The Curious Student',
    icon: '🎓',
    tagline: 'From Web2 knowledge seeker to Web3 passive earner',
    description:
      'Perfect for Web2-native, knowledge seekers who are time-rich and looking to gain concrete skills, passive income, and join a DAO.',
    phases: [
      {
        title: 'Learn',
        description: 'Understand the basics of Web3 and blockchain technology',
        mission: "Complete 'What is Web3?' 5-min animated intro + quiz",
        xpReward: 50,
        nftReward: 'Web3 Explorer',
        duration: '1-2 hours',
      },
      {
        title: 'Build',
        description: 'Create your first Web3 wallet and dashboard',
        mission: 'Create a Solana wallet with Zyno guidance',
        xpReward: 100,
        duration: '30-60 min',
      },
      {
        title: 'Prove',
        description: 'Demonstrate your understanding of Web3 foundations',
        mission: "Pass the 'Web3 Foundations' challenge",
        xpReward: 150,
        nftReward: 'Proof-of-Skill™ NFT',
        duration: '1-2 hours',
        locked: true,
      },
      {
        title: 'Activate',
        description: 'Participate in your first DAO governance',
        mission: 'Join your first DAO vote',
        xpReward: 200,
        duration: '1 hour',
        locked: true,
      },
      {
        title: 'Scale',
        description: 'Start earning passive income through staking',
        mission: 'Stake $MFAI + share testimonial',
        xpReward: 250,
        nftReward: 'Neuro-Dividends™',
        duration: 'Ongoing',
        locked: true,
      },
    ],
    requiredPass: 'Gold',
    zynoSays: "You're not just learning. You're mining skills into capital.",
    rewards: ['NFT Résumé', 'DAO Role', 'Passive Income Starter Pack'],
    whyItMatters:
      'This journey is important because it helps students understand Web3 and blockchain technology, which is a key part of the future of the internet.',
    finalRole: 'Web3 Educator',
  },
  {
    persona: 'entrepreneur',
    label: 'The Web2 Entrepreneur',
    icon: '👨‍💼',
    tagline: 'Transform your business with Web3 revenue models',
    description:
      'Designed for product owners and Web2 business builders looking to tokenize a business idea and create sustainable Web3 revenue.',
    phases: [
      {
        title: 'Learn',
        description: 'Discover how NFTs can transform your business model',
        mission: "Complete 'NFTs for Loyalty 101' visual case studies + self-assessment",
        xpReward: 75,
        duration: '2-3 hours',
      },
      {
        title: 'Build',
        description: 'Design your own tokenized business model',
        mission: 'Create your own gated content or NFT coupon model with MFAI templates',
        xpReward: 150,
        nftReward: 'Business Model Canvas',
        duration: '3-5 hours',
        locked: true,
      },
      {
        title: 'Prove',
        description: 'Validate your Web3 business concept',
        mission: 'Pitch your idea to Zyno + community preview',
        xpReward: 200,
        nftReward: 'Proof-of-Vision™ NFT',
        duration: '1-2 hours',
        locked: true,
      },
      {
        title: 'Activate',
        description: 'Implement your first Web3 integration',
        mission: 'Integrate your Web3 layer into an existing product + DAO feedback',
        xpReward: 250,
        duration: '5-10 hours',
        locked: true,
      },
      {
        title: 'Scale',
        description: 'Secure funding and grow your Web3 business',
        mission: 'Apply to Launchpad / raise funding from Synaptic DAO',
        xpReward: 300,
        nftReward: "Founder's Token",
        duration: 'Ongoing',
        locked: true,
      },
    ],
    requiredPass: 'Platinum',
    zynoSays: 'Turn your audience into stakeholders.',
    rewards: ['NFT Blueprint', 'Vision NFT', 'Launchpad Ticket'],
    whyItMatters:
      'This journey is important because it helps entrepreneurs understand how to tokenize their business ideas and create sustainable Web3 revenue.',
    finalRole: 'Web3 Entrepreneur',
  },
  {
    persona: 'investor',
    label: 'The Aspiring Investor',
    icon: '💰',
    tagline: 'Navigate DeFi and earn through governance',
    description:
      "For financially driven individuals curious about DeFi & passive yield who want to discover, stake, vote, and earn within MFAI's economy.",
    phases: [
      {
        title: 'Learn',
        description: 'Master the fundamentals of DeFi and DAOs',
        mission: "Complete 'Intro to DeFi, DAOs and Yield Mechanics' course + staking simulator",
        xpReward: 75,
        duration: '2-3 hours',
      },
      {
        title: 'Build',
        description: 'Create your optimal staking strategy',
        mission: 'Simulate staking scenarios and optimize portfolio with Zyno',
        xpReward: 125,
        duration: '1-2 hours',
        locked: true,
      },
      {
        title: 'Prove',
        description: 'Demonstrate your governance knowledge',
        mission: 'Complete the Governance Certification',
        xpReward: 175,
        nftReward: 'DAO Voter Badge',
        duration: '2-3 hours',
        locked: true,
      },
      {
        title: 'Activate',
        description: 'Participate in protocol governance',
        mission: 'Stake $MFAI & vote in proposal #01',
        xpReward: 225,
        nftReward: 'Governance NFT',
        duration: '1 hour',
        locked: true,
      },
      {
        title: 'Scale',
        description: 'Expand your influence and rewards',
        mission: 'Refer 2 investors + unlock Neuro-Dividends™ NFT',
        xpReward: 275,
        nftReward: 'Referral NFT',
        duration: 'Ongoing',
        locked: true,
      },
    ],
    requiredPass: 'Gold',
    zynoSays: 'Stake not only tokens, but your vision.',
    rewards: ['Governance XP', 'Staking Rewards', 'Referral NFT'],
    whyItMatters:
      'This journey is important because it helps investors understand how to navigate DeFi and earn through governance.',
    finalRole: 'Web3 Investor',
  },
  {
    persona: 'builder',
    label: 'The Web3 Builder',
    icon: '🧑‍💻',
    tagline: 'Build dApps and modules within the MFAI ecosystem',
    description:
      'For developers or technical users ready to build tools, create a dApp or module within the MFAI ecosystem.',
    phases: [
      {
        title: 'Learn',
        description: 'Master smart contract development',
        mission: "Complete 'Smart Contract Fast Track' with MFAI SDK + Zyno prompts",
        xpReward: 100,
        duration: '5-10 hours',
      },
      {
        title: 'Build',
        description: 'Create your first functional smart contract',
        mission: 'Fork & deploy vesting or staking module',
        xpReward: 200,
        duration: '10-15 hours',
        locked: true,
      },
      {
        title: 'Prove',
        description: 'Validate your code through peer review',
        mission: 'Audit by peer + Zyno',
        xpReward: 250,
        nftReward: 'Proof-of-Build™ NFT',
        duration: '2-3 hours',
        locked: true,
      },
      {
        title: 'Activate',
        description: 'Present your project to the community',
        mission: 'DAO Demo Day: present MVP to protocol community',
        xpReward: 300,
        duration: '1-2 hours',
        locked: true,
      },
      {
        title: 'Scale',
        description: 'Secure funding and grow your project',
        mission: 'Enter Builder DAO Circle + apply for protocol grant',
        xpReward: 350,
        nftReward: 'Builder Grant NFT',
        duration: 'Ongoing',
        locked: true,
      },
    ],
    requiredPass: 'Platinum',
    zynoSays: 'Your code is your identity.',
    rewards: ['Dev NFT Badge', 'Git-linked Portfolio', 'Launch Boost'],
    whyItMatters:
      'This journey is important because it helps builders understand how to build tools and modules within the MFAI ecosystem.',
    finalRole: 'Web3 Builder',
  },
  {
    persona: 'mentor',
    label: 'The Community Mentor',
    icon: '🧑‍🏫',
    tagline: 'Train, lead, and grow the ecosystem from inside',
    description:
      'For teachers, coaches, and content creators who want to train, lead, and grow the ecosystem from inside.',
    phases: [
      {
        title: 'Learn',
        description: "Master MFAI's teaching methodology",
        mission: 'Complete MFAI Pedagogy Bootcamp (Zyno + course builder)',
        xpReward: 100,
        duration: '5-8 hours',
      },
      {
        title: 'Build',
        description: 'Create your first educational content',
        mission: "Launch your first 'Zyno-Led Course' with reward modules",
        xpReward: 200,
        duration: '10-15 hours',
        locked: true,
      },
      {
        title: 'Prove',
        description: 'Get validated by the community',
        mission: 'Get community feedback score + NFT Certificate',
        xpReward: 250,
        nftReward: 'Educator NFT',
        duration: '1-2 weeks',
        locked: true,
      },
      {
        title: 'Activate',
        description: 'Take an active role in the community',
        mission: 'Join as Verified Mentor + moderate Discord DAO cohort',
        xpReward: 300,
        duration: 'Ongoing',
        locked: true,
      },
      {
        title: 'Scale',
        description: 'Monetize your educational content',
        mission: 'Monetize your learning path as NFT series',
        xpReward: 350,
        nftReward: 'Course Creator NFT',
        duration: 'Ongoing',
        locked: true,
      },
    ],
    requiredPass: 'Diamond',
    zynoSays: 'Teach to scale. Share to lead.',
    rewards: ['Educator NFT', 'Training Revenue Share', 'DAO Speaker Role'],
    whyItMatters:
      'This journey is important because it helps educators understand how to train and grow the ecosystem from inside.',
    finalRole: 'Web3 Educator',
  },
  {
    persona: 'visionary',
    label: 'The Visionary Creator',
    icon: '🎨',
    tagline: 'Validate and incubate your Web3 vision',
    description:
      'For inventors with strong ideas but no execution path who want to validate and incubate a powerful Web3 vision.',
    phases: [
      {
        title: 'Learn',
        description: 'Structure and refine your vision',
        mission: "Complete 'From Vision to Protocol': Self-assessment + Canvas with Zyno",
        xpReward: 100,
        duration: '3-5 hours',
      },
      {
        title: 'Build',
        description: 'Create a visual representation of your vision',
        mission: 'Create the Vision Board NFT and share with early supporters',
        xpReward: 200,
        nftReward: 'Vision Board NFT',
        duration: '5-8 hours',
        locked: true,
      },
      {
        title: 'Prove',
        description: 'Validate your vision with the community',
        mission: 'Mint Proof-of-Vision™ + pre-DAO voting test',
        xpReward: 250,
        nftReward: 'Proof-of-Vision™ NFT',
        duration: '1-2 weeks',
        locked: true,
      },
      {
        title: 'Activate',
        description: 'Secure resources for your vision',
        mission: 'Win access to MFAI Incubation via community traction',
        xpReward: 300,
        duration: '2-4 weeks',
        locked: true,
      },
      {
        title: 'Scale',
        description: 'Build a team and develop your MVP',
        mission: 'Assemble DAO Co-founders, co-build MVP, apply for grant',
        xpReward: 350,
        nftReward: "Founder's Vision NFT",
        duration: 'Ongoing',
        locked: true,
      },
    ],
    requiredPass: 'Diamond',
    zynoSays: "Ideas are seeds. Let's scale your forest.",
    rewards: ['Vision NFT', 'Incubation Access', 'DAO Startup Role'],
    whyItMatters:
      'This journey is important because it helps inventors validate and incubate a powerful Web3 vision.',
    finalRole: 'Web3 Visionary',
  },
];

/**
 * Get a journey by persona identifier
 */
export const getJourneyByPersona = (persona: string): Journey | undefined => {
  return journeys.find(journey => journey.persona === persona);
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
  // Simple recommendation logic based on inputs
  // In a real app, this would be more sophisticated

  if (goal === 'learn') {
    return journeys.find(j => j.persona === 'student') || journeys[0];
  }

  if (goal === 'build') {
    return experience === 'experienced'
      ? journeys.find(j => j.persona === 'builder') || journeys[3]
      : journeys.find(j => j.persona === 'entrepreneur') || journeys[1];
  }

  if (goal === 'invest') {
    return journeys.find(j => j.persona === 'investor') || journeys[2];
  }

  if (goal === 'teach') {
    return journeys.find(j => j.persona === 'mentor') || journeys[4];
  }

  // Default fallback
  return journeys[0];
};
