export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Competition' | 'Workshop' | 'Seminar' | 'Hackathon' | 'Inauguration';
  date: string;
  formattedDate: string;
  readTime: string;
  venue: string;
  time: string;
  image: string;
  blurHash?: string;
  participation: {
    teams?: string;
    participants: string;
    departments: string;
    institutions?: string;
  };
  summary: string;
  quote?: string;
  rounds?: {
    roundNumber: string;
    title: string;
    subtitle: string;
    description: string;
    details?: string[];
  }[];
  keyTopics?: string[];
  resourcePersons?: {
    name: string;
    designation: string;
    role: string;
  }[];
  winners?: {
    rank: 'Winner' | 'Runner-Up';
    badge: string;
    members: {
      name: string;
      class: string;
    }[];
  }[];
  officeBearers?: {
    position: string;
    department: string;
    year: string;
    section: string;
    name: string;
  }[];
  studentCoordinators?: {
    name: string;
    class: string;
  }[];
  facultyCoordinators: {
    name: string;
    role: string;
  }[];
  fullReport: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-ideacraft-2026",
    slug: "ideacraft-2026",
    title: "🏆 THE IDEA CRAFT 2026 – Crafting Innovation Across Silicon & Code",
    subtitle: "Inter-College On-Spot Technical Pitch Competition Across 10 Innovation Tracks",
    category: "Competition",
    date: "2026-10-28",
    formattedDate: "October 28, 2026",
    readTime: "5 min read",
    venue: "4th Floor, Green Building, Rajalakshmi Institute of Technology",
    time: "8:00 AM – 3:00 PM",
    image: "/images/events/idea-craft-synapse.webp",
    blurHash: "LUOgA[tRS%xu_Nj[xBt6ITRioIt7",
    participation: {
      teams: "Inter-College Teams (2 Members per Team)",
      participants: "Engineering Undergraduates Across Multiple Institutions",
      departments: "ECE, VLSI, CSE, IT, EEE & Allied Engineering Branches",
      institutions: "Engineering Colleges Across Chennai & Tamil Nadu"
    },
    summary: "The Department of Electronics and Communication Engineering in association with the IETE Student Forum (ISF) at Rajalakshmi Institute of Technology successfully organized 'THE IDEA CRAFT 2026', a premier inter-college on-spot technical pitch competition. Challenging student duos across 10 randomized innovation tracks spanning Silicon & Code, the event featured on-spot revealed problem statements, a high-octane 1-hour slide preparation sprint, parallel preliminary pitching across 10 breakout rooms, and an electric Grand Finale for the ₹10,000 prize pool.",
    quote: "Think. Create. Pitch. Win! 🚀 — True engineering innovation shines brightest when technical mastery meets fast-paced impromptu problem solving.",
    keyTopics: [
      "Semiconductor Hardware & Next-Gen VLSI Architectures",
      "Embedded Systems, Edge AI & IoT Cyber-Physical Networks",
      "Applied Artificial Intelligence & Machine Learning Algorithms",
      "Sustainable Green Technologies & Clean Energy Innovations",
      "Rapid 1-Hour Prototyping & Technical Solution Slide Crafting",
      "High-Impact Executive Pitching & Fast-Paced Technical Defense"
    ],
    rounds: [
      {
        roundNumber: "01",
        title: "ON-SPOT CHALLENGE & REGISTRATION",
        subtitle: "Reporting, Verification & Badge Collection",
        description: "Teams of exactly two registered and assembled before 8:00 AM at the Green Building 4th Floor to collect official badges and participate in the briefing.",
        details: [
          "Strict verification of 2-member engineering student duos from various colleges",
          "Distribution of participant credentials, evaluation rubrics, and technical guidelines",
          "Orientation on the event flow, rules, presentation guidelines, and judging criteria"
        ]
      },
      {
        roundNumber: "02",
        title: "TRACK DRAW (1 TO 10)",
        subtitle: "Randomized Innovation Domain Assignment",
        description: "Each team drew a randomized numbered token (1–10) allocating them to one of ten distinct innovation tracks to ensure broad technical diversity.",
        details: [
          "Allocation into 1 of 10 tracks including AI, Embedded Systems, VLSI, IoT, CleanTech, and Robotics",
          "Capped at balanced team distribution per track to foster intense intra-domain competition",
          "Official reveal of mentors and room allocation for preliminary breakout rooms"
        ]
      },
      {
        roundNumber: "03",
        title: "THE 1-HOUR SPRINT",
        subtitle: "Live Problem Statements Revealed & PPT Preparation",
        description: "Problem statements were unveiled live. Teams had exactly 60 minutes to analyze the challenge, brainstorm solutions, and prepare concise slide decks on their laptops.",
        details: [
          "Zero advance preparation permitted — testing impromptu engineering and ideation capability",
          "Sprint to synthesize architecture, methodology, feasibility, and market impact into a presentation deck",
          "Strict time management under timed countdown overseen by student coordinators"
        ]
      },
      {
        roundNumber: "04",
        title: "PARALLEL PRELIMINARY ROUND",
        subtitle: "10 Breakout Rooms • 5-Min Pitch + 5-Min Q&A",
        description: "Conducted simultaneously across 10 breakout rooms where each team pitched their solution directly to an expert jury panel.",
        details: [
          "5-minute sharp elevator pitch followed by a 5-minute rigorous technical Q&A defense",
          "Comprehensive evaluation covering innovation, technical feasibility, presentation clarity, and impact",
          "The top winning team from each breakout room advanced to the coveted Grand Finale"
        ]
      },
      {
        roundNumber: "05",
        title: "GRAND FINALE",
        subtitle: "Top 10 Finalists on the Main Stage",
        description: "The 10 breakout room champions faced off on the main auditorium stage in front of the grand jury and audience for the ₹10,000 prize pool.",
        details: [
          "5-minute live stage presentation accompanied by a 3-minute executive cross-examination",
          "Evaluated by senior faculty and industry mentors for overall technical excellence and execution",
          "Celebration of winners with cash awards, merit certificates, and institution-wide accolades"
        ]
      }
    ],
    studentCoordinators: [
      { name: "Harini R M", class: "IV ECE A" },
      { name: "Bhavani Sankar M", class: "III ECE A" },
      { name: "Padmapriya", class: "Event Coordinator" },
      { name: "Yogavarathan", class: "Event Coordinator" },
      { name: "Eknath Nuvvula", class: "Event Coordinator" },
      { name: "Gowarthan", class: "Event Coordinator" },
      { name: "Legavarshini", class: "Event Coordinator" },
      { name: "Priyadharashini", class: "Event Coordinator" }
    ],
    facultyCoordinators: [
      { name: "Ms. S. Kalaivani", role: "RIT IETE Coordinator & Faculty Mentor" },
      { name: "Dr. S. Sheeba", role: "HOD - ECE" },
      { name: "Dr. S. Sasikumar", role: "Dean - ECE" }
    ],
    fullReport: [
      "The Department of Electronics and Communication Engineering in association with the IETE Student Forum (ISF) at Rajalakshmi Institute of Technology successfully hosted 'THE IDEA CRAFT 2026' on October 28, 2026, at the 4th Floor Green Building.",
      "Conceived as a premier inter-college on-spot technical pitch competition, the event invited student teams of two to put their conceptual depth and rapid prototyping skills to the test across the twin domains of 'Silicon & Code'.",
      "Beginning promptly with early morning registration before 8:00 AM, teams drew tokens assigning them to one of ten specialized innovation tracks. When problem statements were unveiled on-spot, participants dove into an intensive 1-hour preparation sprint, distilling complex challenges into crisp, impactful PowerPoint solution decks.",
      "The competition then moved into parallel preliminary rounds conducted concurrently in ten designated breakout rooms. Each team presented a 5-minute pitch followed by 5 minutes of intensive questions from faculty evaluators. The single top-ranking team from each room qualified for the Grand Finale.",
      "During the Grand Finale, the Top 10 finalist teams took the central stage to pitch before a combined panel of esteemed judges, faculty, and peers. The session demonstrated exceptional creativity, analytical acumen, and poise under pressure.",
      "The event drew to a celebratory close with a valedictory session awarding cash prizes from the ₹10,000 prize pool, recognizing exceptional talent, and awarding participation certificates to all contenders. The IETE ISF leadership commended the coordinators and participants for setting a benchmark in student-driven technical excellence."
    ]
  },
  {
    id: "blog-research-articulation-2026",
    slug: "research-articulation-workshop",
    title: "📚 Research Articulation: From Ideas to Publication",
    subtitle: "A Step-by-Step Guide for UG & PG Students",
    category: "Workshop",
    date: "2026-08-24",
    formattedDate: "August 24, 2026",
    readTime: "5 min read",
    venue: "Wozniak Auditorium, Rajalakshmi Institute of Technology",
    time: "9:00 AM – 3:40 PM",
    image: "/images/events/research-articulation-workshop.webp",
    blurHash: "LDH-lX_LE3[wyEtlD%xZ^zV]M{tk",
    participation: {
      participants: "99 Participants",
      departments: "Multiple Engineering Departments",
      institutions: "Multiple Higher Education Institutions"
    },
    summary: "A comprehensive state-level one-day workshop designed to guide undergraduate and postgraduate students through the entire research lifecycle — from developing a research idea and formulating a meaningful problem statement to structuring and publishing high-impact research papers in reputed indexed journals.",
    quote: "Research is a journey — articulate it well, share it widely!",
    keyTopics: [
      "Research Problem Formulation & Identifying Real-World Gaps",
      "Comprehensive Literature Review, Research Novelty & State-of-the-Art Analysis",
      "Formulating Research Questions, Objectives & Sound Methodology",
      "Research Articulation, Technical Writing, & Scientific Paper Anatomy",
      "Interactive Hands-on Session: Transforming Ideas into Structured Paper Outlines",
      "Publication Strategy, Scopus/SCI Journal Selection, & Navigating Peer Review"
    ],
    resourcePersons: [
      {
        name: "Dr. V. Thulasi Bai",
        designation: "Professor, Department of ECE, KCG College of Engineering",
        role: "Executive Committee Member & Past Chairperson, IETE Chennai Centre"
      },
      {
        name: "Dr. R. Karthikeyan",
        designation: "Assistant Professor, Department of EEE, KCG College of Engineering",
        role: "Honorary Secretary, IETE Chennai Centre"
      }
    ],
    studentCoordinators: [
      { name: "Bhavani Sankar M", class: "III ECE A" },
      { name: "Barath R", class: "III ECE A" },
      { name: "Harini R M", class: "III ECE A" },
      { name: "Madesh S", class: "III ECE B" },
      { name: "Nishal Priyan", class: "III ECE B" },
      { name: "Sheshwar S V", class: "III ECE C" },
      { name: "Santhosh Prem", class: "III ECE C" }
    ],
    facultyCoordinators: [
      { name: "Ms. S. Kalaivani", role: "RIT IETE Coordinator & Mentor" }
    ],
    fullReport: [
      "The one-day state-level workshop on 'Research Articulation: From Ideas to Publication' was organized by the Department of Electronics and Communication Engineering in association with IETE Chennai Centre at Rajalakshmi Institute of Technology.",
      "The workshop gathered 99 enthusiastic undergraduate and postgraduate students from multiple engineering disciplines and academic institutions across Chennai, creating an engaging and collaborative academic environment.",
      "The resource persons, Dr. V. Thulasi Bai and Dr. R. Karthikeyan, delivered structured, actionable insights into formulating research questions, drafting IEEE/Elsevier-compliant manuscripts, and understanding the review process of peer-reviewed journals.",
      "A key highlight was the interactive hands-on session titled 'From Research Idea to Paper Outline', where participants actively drafted their own research outlines with step-by-step mentor guidance.",
      "The programme concluded with an inspiring Valedictory Session, participant feedback collection, and certificate distribution, celebrating the spirit of research and technical writing."
    ]
  },
  {
    id: "blog-silicon-maze-2026",
    slug: "silicon-maze-2026",
    title: "🧩 SILICON MAZE – A Technical Quiz Event",
    subtitle: "Think. Decode. Connect. Conquer.",
    category: "Competition",
    date: "2026-08-13",
    formattedDate: "August 13, 2026",
    readTime: "4 min read",
    venue: "Room C702, Rajalakshmi Institute of Technology",
    time: "10:30 AM – 12:30 PM",
    image: "/images/events/silicon-maze.webp",
    blurHash: "LQHo8zxFXTj]_NslxDRj_Lt8RPWX",
    participation: {
      teams: "21 Teams",
      participants: "41 Participants",
      departments: "Multiple Departments Across RIT"
    },
    summary: "SILICON MAZE brought together 21 teams comprising 41 participants from various engineering departments, providing students with an exciting opportunity to demonstrate their technical knowledge, logical reasoning, problem-solving skills, observation, and teamwork across three competitive quiz rounds.",
    quote: "A successful technical quiz that brought together knowledge, logic, teamwork and competitive spirit under one platform — SILICON MAZE.",
    rounds: [
      {
        roundNumber: "01",
        title: "SILICON CIPHER",
        subtitle: "Picture-Based Identification Round",
        description: "A visual challenge featuring 25 picture-based questions covering electronic gadgets, icons, basic electronic components, and simple circuits.",
        details: [
          "Identify electronic devices and semiconductor components",
          "Recognize industry symbols and circuit icons",
          "Solve 'Who Am I?' technical clues and identify basic electronic elements from real-world imagery"
        ]
      },
      {
        roundNumber: "02",
        title: "CIRCUIT CHALLENGE ⚡",
        subtitle: "Circuit-Based Identification Round",
        description: "A 15-question circuit challenge based on fundamental analog, digital, and logic circuits.",
        details: [
          "Analyse incomplete and unfamiliar circuit schematics",
          "Identify missing components, connections, and logic gates",
          "Trace signals from input to output to verify truth tables and outputs under timed pressure"
        ]
      },
      {
        roundNumber: "03",
        title: "MAINFRAME OVERRIDE",
        subtitle: "Riddle → Binary → Logic → Decimal Round",
        description: "A four-stage final challenge combining technical riddles and number-system reasoning.",
        details: [
          "Solve multi-step technical riddles to unlock binary data",
          "Perform binary conversions and logic-gate evaluations",
          "Execute decimal conversions testing speed, precision, and foundational digital electronics mastery"
        ]
      }
    ],
    winners: [
      {
        rank: "Winner",
        badge: "🏆 1st Place Champions",
        members: [
          { name: "Tharun Raj P", class: "III ECE C" },
          { name: "Sanmugapriya V", class: "III ECE C" }
        ]
      },
      {
        rank: "Runner-Up",
        badge: "🥈 2nd Place Runners-Up",
        members: [
          { name: "Harish Maduraimani", class: "III ECE A" },
          { name: "Girri Raagav", class: "III ECE A" }
        ]
      }
    ],
    studentCoordinators: [
      { name: "Harini S", class: "IV ECE A" },
      { name: "Bhavani Sankar M", class: "III ECE A" },
      { name: "Madesh S", class: "III ECE B" },
      { name: "Yoganandh J", class: "III ECE C" },
      { name: "Preethi B", class: "III ECE B" },
      { name: "Barath R", class: "III ECE A" },
      { name: "Nishal Priyan A", class: "III ECE B" },
      { name: "Sanjay Y", class: "III ECE C" }
    ],
    facultyCoordinators: [
      { name: "Ms. S. Kalaivani", role: "IETE-Coordinator" },
      { name: "Ms. A. Vaanathi", role: "Co-Coordinator" },
      { name: "Ms. S. Sangeetha", role: "Co-Coordinator" }
    ],
    fullReport: [
      "The Department of Electronics and Communication Engineering, in association with the IETE ISF Professional Society at Rajalakshmi Institute of Technology, successfully conducted the flagship event SILICON MAZE.",
      "The event progressed through multiple rounds, with teams competing through increasingly challenging technical and logical tasks. The participation of 41 students across 21 teams from different departments created an energetic and competitive atmosphere throughout the day.",
      "In Round 1 (Silicon Cipher), teams tackled 25 rapid visual identification questions. The top-scoring teams advanced to Round 2 (Circuit Challenge), where they had to analyze real electronic circuit schematics and debug missing links.",
      "The grand finale, Round 3 (Mainframe Override), challenged the finalists with a sequential 'Riddle → Binary → Logic → Decimal' test of wit and digital electronics comprehension.",
      "The event concluded with a felicitation ceremony recognizing the top-performing teams with trophies and certificates for all participants."
    ]
  },
  {
    id: "blog-higher-ed-pathways-2026",
    slug: "higher-education-opportunities-career-pathways",
    title: "🎓 Higher Education: Opportunities and Career Pathways",
    subtitle: "Navigating Global Master’s Programs, Scholarships & Overseas Career Trajectories",
    category: "Seminar",
    date: "2026-07-29",
    formattedDate: "July 29, 2026",
    readTime: "4 min read",
    venue: "Wozniak Auditorium, Rajalakshmi Institute of Technology",
    time: "9:00 AM – 12:00 PM",
    image: "/images/events/higher-ed-pathways.webp",
    blurHash: "LRIhW}^+_2~q0dxukDad02xaxZbI",
    participation: {
      participants: "160+ Students & Faculty",
      departments: "ECE, VLSI, EEE & Allied Engineering Branches",
      institutions: "Rajalakshmi Institute of Technology"
    },
    summary: "The Department of Electronics and Communication Engineering in association with the IETE ISF Professional Society organized an insightful guest lecture on 'Higher Education: Opportunities and Career Pathways' delivered by industry expert Mr. Mohamed Razik (Insha Consulting Experts Private Limited, Tamilnadu & Sri Lanka) at Wozniak Auditorium. The session demystified foreign education, scholarships, visa procedures, and global core tech careers.",
    quote: "Global higher education is within your reach — with structured planning, genuine passion, and strategic scholarship targeting, every determined engineer can conquer global frontiers.",
    keyTopics: [
      "Debunking Top Myths Surrounding Foreign Education & Cost Expectations",
      "Country-Specific Admission Frameworks: Germany, UK, France, Ireland & North America",
      "Targeting Full Scholarships: DAAD, Erasmus Mundus, Chevening & University Grants",
      "Profile Building: High-Impact SOP Drafting, Academic CV & Recommendation Letters",
      "Mastering English Proficiency (IELTS/TOEFL/PTE) & Technical Interview Readiness",
      "Post-Study Work Visas & Core Career Trajectories in Semiconductor, VLSI & Embedded Systems"
    ],
    resourcePersons: [
      {
        name: "Mr. Mohamed Razik",
        designation: "Insha Consulting Experts Private Limited, Tamilnadu & Srilanka",
        role: "International Higher Education Expert & Keynote Speaker"
      }
    ],
    studentCoordinators: [
      { name: "Harini S", class: "IV ECE A" },
      { name: "Jeyanandh V S", class: "IV VLSI A" }
    
    ],
    facultyCoordinators: [
      { name: "Ms. S. Kalaivani", role: "IETE-Coordinator" },
    ],
    fullReport: [
      "The Management, Principal, Staff, and Students of Rajalakshmi Institute of Technology witnessed an inspiring and highly informative guest lecture on 'Higher Education: Opportunities and Career Pathways', organized by the Department of Electronics and Communication Engineering in association with the IETE ISF Professional Society on July 29, 2026, at the Wozniak Auditorium.",
      "The 3-hour power session, held from 9:00 AM to 12:00 PM, brought together over 160 students from ECE, VLSI, and allied engineering disciplines eager to explore post-undergraduate opportunities across global research institutions and industry leaders.",
      "Keynote speaker Mr. Mohamed Razik, representing Insha Consulting Experts Private Limited (Tamilnadu & Sri Lanka), engaged the audience with real-world case studies, effectively debunking pervasive myths regarding the exorbitant costs of overseas master's programs by highlighting fully-funded scholarships like DAAD, Erasmus+, and university-funded assistantships.",
      "Mr. Razik systematically guided students through the nuances of profile building, crafting compelling Statements of Purpose (SOP), securing impactful Letters of Recommendation (LOR), and clearing standard English proficiency benchmarks such as IELTS and TOEFL.",
      "The lecture concluded with a vibrant open Q&A interaction where students clarified queries on STEM extension visas, European tuition-free universities, and high-demand career pathways in semiconductor design, embedded systems, and telecommunications."
    ]
  },
  {
    id: "blog-vision-of-skill-2026",
    slug: "vision-of-skill-2026",
    title: "🚀 Vision of Skill 2026 – Future-Ready Tech Challenge",
    subtitle: "Youth is the Hope of Our Future: Bridging the Digital Divide with Real-World Engineering",
    category: "Competition",
    date: "2026-07-20",
    formattedDate: "July 20, 2026",
    readTime: "4 min read",
    venue: "Seminar Hall & Embedded Systems Lab, Rajalakshmi Institute of Technology",
    time: "9:30 AM – 3:30 PM",
    image: "/images/events/vision-of-skill-2026.webp",
    blurHash: "LTG[s5xBkDod_1xtbJxt~UNHNIog",
    participation: {
      teams: "28 Teams",
      participants: "85+ Participants",
      departments: "ECE, VLSI, CSE & Allied Engineering Departments",
      institutions: "Rajalakshmi Institute of Technology"
    },
    summary: "The Department of Electronics and Communication Engineering in association with the IETE ISF Professional Society organized 'Vision of Skill 2026' commemorating World Youth Skills Day. 28 teams competed across multi-round technical diagnosis, circuit debugging, and innovation pitch challenges.",
    quote: "True engineering skill is not merely memorizing formulas, but applying imagination and technology to solve real-world community challenges.",
    keyTopics: [
      "Bridging Industry 4.0 Skill Gaps in Embedded Systems & AI",
      "Rapid Prototyping, Circuit Troubleshooting & Microcontroller Interfacing",
      "Future-Ready Digital Literacy, Cybersecurity & Cloud Computing Concepts",
      "Technical Poster Presentation & Product Pitching to Industry Evaluators"
    ],
    rounds: [
      {
        roundNumber: "1",
        title: "Skill Aptitude & Tech Trivia",
        subtitle: "Multi-domain logic and diagnostic quiz",
        description: "Preliminary evaluation covering core electronics concepts, digital logic, IoT architectures, and analytical problem-solving."
      },
      {
        roundNumber: "2",
        title: "Circuit Blueprint & Debugging",
        subtitle: "Hands-on schematic verification",
        description: "Teams received real-world circuit schematics with deliberate design faults, requiring systematic breadboard troubleshooting and verification."
      },
      {
        roundNumber: "3",
        title: "Innovation Pitch & Jury Defense",
        subtitle: "Grand Finale Presentation",
        description: "Finalists defended their working prototypes and technical posters before a distinguished faculty and student jury."
      }
    ],
    studentCoordinators: [
      { name: "Harini S", class: "IV ECE A" },
      { name: "Jeyanandh V S", class: "IV VLSI A" },
      { name: "Madesh S", class: "III ECE B" },
      { name: "Kavipriya D", class: "III VLSI B" }
    ],
    facultyCoordinators: [
      { name: "Ms. S. Kalaivani", role: "IETE-Coordinator & Mentor" },
      { name: "Dr. S. Sheeba", role: "HOD - ECE" }
    ],
    fullReport: [
      "On July 20, 2026, the IETE ISF Student Forum at Rajalakshmi Institute of Technology organized 'Vision of Skill 2026', a flagship technical symposium celebrating youth ingenuity and hands-on skill development.",
      "The theme 'Youth is the Hope of Our Future' resonated across three competitive rounds designed to test theoretical fundamentals, practical circuit assembly, and innovation pitching.",
      "More than 85 engineering undergraduates across 28 teams participated with immense enthusiasm, demonstrating sharp debugging skills in the embedded systems lab.",
      "The final jury round featured high-caliber presentations addressing automated agriculture, intelligent biomedical telemetry, and smart energy optimization.",
      "The event concluded with a grand valedictory ceremony recognizing the champions with medals, merit certificates, and trophies."
    ]
  },
  {
    id: "blog-energize-2026",
    slug: "energize-2026-hackathon",
    title: "⚡ Energize 2026 – Smart Energy & CleanTech Hackathon",
    subtitle: "Innovating Sustainable Energy Harvesting, Smart Grids & Green Electronics",
    category: "Hackathon",
    date: "2026-04-21",
    formattedDate: "April 21, 2026",
    readTime: "5 min read",
    venue: "4th Floor Innovation Lab, Green Building, Rajalakshmi Institute of Technology",
    time: "8:30 AM – 5:00 PM",
    image: "/images/events/energize-2026.webp",
    blurHash: "L6Fh@p?vbwjD00kZD*IU?=-;-V%f",
    participation: {
      teams: "32 Teams",
      participants: "110+ Innovators",
      departments: "ECE, EEE, VLSI & Allied Engineering Disciplines",
      institutions: "Rajalakshmi Institute of Technology"
    },
    summary: "The Department of Electronics and Communication Engineering in association with the IETE ISF Professional Society organized ENERGIZE 2026, an intensive full-day Smart Energy Hackathon at the 4th Floor Green Building. 32 teams engineered working hardware and IoT solutions for renewable power management and green electronics.",
    quote: "Clean energy and smart electronics are the dual engines of a sustainable future — engineering innovation begins where conservation meets computation.",
    keyTopics: [
      "Smart Microgrid Monitoring & Bidirectional Power Flow Automation",
      "Piezoelectric & Solar Energy Harvesting Circuit Design",
      "IoT Sensor Nodes for Industrial Power Consumption Profiling",
      "Battery Management Systems (BMS) for Next-Gen Electric Mobility",
      "Low-Power Embedded Firmwares & Energy-Efficient Wireless Sensor Networks"
    ],
    rounds: [
      {
        roundNumber: "1",
        title: "Abstract Scrutiny & Architecture Review",
        subtitle: "Idea Pitch & Feasibility Check",
        description: "Evaluation of 32 submitted technical proposals based on originality, circuit topology, and alignment with UN SDG 7."
      },
      {
        roundNumber: "2",
        title: "6-Hour Prototyping Sprint",
        subtitle: "Live Hardware & Firmware Assembly",
        description: "Intensive lab sprint where teams soldered circuits, programmed microcontrollers, and recorded power efficiency metrics."
      },
      {
        roundNumber: "3",
        title: "Grand Jury Demo & Stress Testing",
        subtitle: "Final Working Proof-of-Concept",
        description: "Live functional demonstration of the green energy prototype under dynamic load conditions before the evaluation panel."
      }
    ],
    studentCoordinators: [
      { name: "Harini S", class: "IV ECE A" },
      { name: "Yoganandh", class: "III ECE C" },
      { name: "Harishwar PN", class: "III VLSI A" },
      { name: "Preethi B", class: "III ECE B" }
    ],
    facultyCoordinators: [
      { name: "Ms. S. Kalaivani", role: "IETE-Coordinator" },
      { name: "Dr. S. Sasikumar", role: "Dean - ECE" },
      { name: "Dr. S. Sheeba", role: "HOD - ECE" }
    ],
    fullReport: [
      "The IETE Student Forum at Rajalakshmi Institute of Technology organized 'ENERGIZE 2026', a high-octane one-day Smart Energy Hackathon on April 21, 2026, hosted at the 4th Floor Green Building Innovation Lab.",
      "Focusing on the global transition to clean energy and smart electronics, the hackathon brought together 32 competitive teams comprising over 110 engineering students.",
      "Teams built working prototypes incorporating solar MPPT trackers, piezoelectric energy harvesters, intelligent battery monitoring nodes, and cloud telemetry dashboards.",
      "The evaluation panel praised the high standard of engineering rigor, firmware optimization, and practical market feasibility demonstrated across all participating teams.",
      "The symposium concluded with certificate distribution, trophy awards, and cash prizes, reinforcing RIT IETE's mission of nurturing hands-on technology innovators."
    ]
  },
  {
    id: "blog-digital-twin-2026",
    slug: "digital-twin-of-everything",
    title: "🌐 Guest Lecture on “Digital Twin of Everything”",
    subtitle: "Cyber-Physical Systems, IoT Telemetry & Virtual Replicas in Modern Engineering",
    category: "Seminar",
    date: "2026-02-20",
    formattedDate: "February 20, 2026",
    readTime: "4 min read",
    venue: "Department of ECE, Rajalakshmi Institute of Technology",
    time: "10:00 AM – 12:30 PM",
    image: "/images/events/digital-twin-of-everything.webp",
    blurHash: "L5DIwYqG;40d3DELRQbv00%~KN~W",
    participation: {
      participants: "180+ Students",
      departments: "III & IV Year ECE & VLSI Design",
      institutions: "Rajalakshmi Institute of Technology"
    },
    summary: "The Department of Electronics and Communication Engineering organized an engaging guest lecture on “Digital Twin of Everything” delivered by Dr. D. Vijendra Babu (VIT Vellore & IETE Executive Committee Member, Chennai), empowering III and IV Year ECE and VLSI students with practical insights into cyber-physical models, IoT telemetry, and digital twins.",
    quote: "A digital twin is not merely a simulation — it is a living, bidirectional virtual entity that evolves in real time alongside its physical counterpart.",
    keyTopics: [
      "Foundational Architecture of Digital Twins & Cyber-Physical Systems (CPS)",
      "Bidirectional IoT Sensor Telemetry & Real-Time Data Streaming",
      "Virtual Prototyping and Lifecycle Monitoring in Semiconductor & VLSI Systems",
      "Edge Computing & Machine Learning Integration for Predictive Analytics",
      "Industry 4.0 Applications: Smart Grids, Connected Vehicles & Smart Cities"
    ],
    resourcePersons: [
      {
        name: "Dr. D. Vijendra Babu",
        designation: "Associate Professor Grade I, Department of Embedded Technology, Vellore Institute of Technology (VIT), Vellore",
        role: "IETE Executive Committee Member, Chennai Centre & Resource Person"
      }
    ],
    studentCoordinators: [
      { name: "Harini S", class: "IV ECE A" },
      { name: "Jeyanandh V S", class: "IV VLSI" },
      { name: "Bhavani Sankar M", class: "III ECE A" },
      { name: "Barath R", class: "III ECE A" }
    ],
    facultyCoordinators: [
      { name: "Ms. S. Kalaivani", role: "IETE Coordinator & Faculty Mentor" }
    ],
    fullReport: [
      "The Department of Electronics and Communication Engineering at Rajalakshmi Institute of Technology conducted an illuminating guest lecture titled 'Digital Twin of Everything' on 20th February 2026 from 10:00 AM to 12:30 PM.",
      "Held following the official inauguration of the IETE Professional Society chapter, the session witnessed enthusiastic participation from over 180 students across 3rd and 4th Year ECE and VLSI Design departments.",
      "The keynote speaker, Dr. D. Vijendra Babu, Associate Professor Grade I at VIT Vellore and IETE Executive Committee Member (Chennai Centre), provided an in-depth exploration of cyber-physical systems, hardware-in-the-loop testing, and cloud-connected sensor arrays.",
      "Through real-world case studies in smart manufacturing, aerospace telemetry, and embedded electronics, Dr. Vijendra Babu demonstrated how live operational data continuously feeds digital twins to predict failures and optimize performance before hardware deployment.",
      "The lecture stimulated profound discussions during the interactive Q&A session, inspiring students to explore project ideas, research papers, and core industry careers at the intersection of IoT, VLSI, and Digital Twins."
    ]
  },
  {
    id: "blog-inauguration-2026",
    slug: "iete-inauguration-2026",
    title: "🏛️ Inauguration of IETE Professional Society & Office Bearers",
    subtitle: "Installation of Student Forum (ISF) & Investiture Ceremony",
    category: "Inauguration",
    date: "2026-02-20",
    formattedDate: "February 20, 2026",
    readTime: "3 min read",
    venue: "Department of ECE, Rajalakshmi Institute of Technology",
    time: "9:00 AM – 10:00 AM",
    image: "/images/events/iete-office-bearers-inauguration.webp",
    blurHash: "L2CZIl_NqG=%08%gVZr;00H@LMD}",
    participation: {
      participants: "200+ Students & Faculty",
      departments: "Department of ECE, VLSI & Allied Streams",
      institutions: "Rajalakshmi Institute of Technology"
    },
    summary: "The official inauguration of The Institution of Electronics and Telecommunication Engineers (IETE) ISF professional society chapter at Rajalakshmi Institute of Technology, featuring the badge investiture ceremony and installation of the student office bearers.",
    quote: "Inspiring Innovation, Learning, and Leadership in Electronics, Communication, and Emerging Technologies.",
    keyTopics: [
      "Inaugural Address & Genesis of IETE Student Forum Chapter",
      "Installation of Student Office Bearers & Badge Investiture",
      "Annual Roadmap of Technical Workshops, Hackathons & Seminars",
      "IETE Student Membership Benefits, Journals & Regional Conferences"
    ],
    officeBearers: [
      { position: "Chairman", department: "ECE", year: "IV", section: "A", name: "HARINI S" },
      { position: "Vice-Chairman", department: "VLSI", year: "IV", section: "A", name: "JEYANANDH V S" },
      { position: "Honorary Secretary", department: "ECE", year: "III", section: "A", name: "KARTHIK S" },
      { position: "Joint Secretary", department: "VLSI", year: "III", section: "C", name: "SASIKUMAR M" },
      { position: "Treasurer", department: "ECE", year: "III", section: "B", name: "MADESH S" },
      { position: "Treasurer", department: "VLSI", year: "III", section: "B", name: "KAVIPRIYA D" },
      { position: "Executive-Technical", department: "ECE", year: "III", section: "A", name: "BHAVANI SANKAR M" },
      { position: "Executive-Technical", department: "ECE", year: "III", section: "A", name: "BARATH R" },
      { position: "Executive-Technical", department: "VLSI", year: "III", section: "C", name: "SUJI V" },
      { position: "Executive-Technical", department: "VLSI", year: "III", section: "C", name: "SUPRRAJA D" },
      { position: "Executive Media and Creatives", department: "ECE", year: "III", section: "C", name: "YOGANANDH" },
      { position: "Executive Media and Creatives", department: "VLSI", year: "III", section: "A", name: "HARISHWAR PN" },
      { position: "Documentation", department: "ECE", year: "III", section: "B", name: "PREETHI.B" },
      { position: "Documentation", department: "VLSI", year: "III", section: "B", name: "JEEVITHA A G" }
    ],
    facultyCoordinators: [
      { name: "Ms. S. Kalaivani", role: "IETE Coordinator & Faculty Mentor" }
    ],
    fullReport: [
      "The Department of Electronics and Communication Engineering at Rajalakshmi Institute of Technology commemorated the official inauguration of The Institution of Electronics and Telecommunication Engineers (IETE) ISF Professional Society Chapter on 20th February 2026.",
      "The inaugural ceremony commenced with a welcome address outlining the mission of the forum to bridge academic curriculum with cutting-edge industry practices in VLSI, Embedded Systems, IoT, and Telecommunications.",
      "A key highlight of the event was the badge investiture ceremony and official announcement of the student office bearer postings across ECE and VLSI Design departments, followed by their leadership oath of commitment to technical excellence.",
      "The ceremony set an ambitious tone for the academic year, immediately followed by the expert guest lecture on 'Digital Twin of Everything' delivered by Dr. D. Vijendra Babu."
    ]
  }
];
