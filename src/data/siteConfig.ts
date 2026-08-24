export interface EventItem {
  id: string;
  title: string;
  category: 'Workshop' | 'Seminar' | 'Hackathon' | 'Industrial Visit' | 'Competition';
  date: string;
  time: string;
  venue: string;
  description: string;
  fullDetails: string;
  image: string;
  blurHash?: string;
  seatsLeft: number | string;
  isUpcoming: boolean;
  registrationOpen: boolean;
  registrationLink?: string;
  teamSize?: string;
  eligibility?: string;
  perks?: string;
  rounds?: {
    roundNumber: string;
    title: string;
    description: string;
  }[];
  coordinators?: {
    name: string;
    phone?: string;
    role?: string;
  }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Workshop' | 'Seminar' | 'Hackathon' | 'Industrial Visit' | 'Competition';
  date: string;
  image: string;
  thumb?: string;
  blurHash?: string;
  aspectRatio?: number;
  description: string;
}

export interface CoreMember {
  id: string;
  name: string;
  position: string;
  category: string;
  department: string;
  year: string;
  photo?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  bio?: string;
}

export interface MissionItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  frequency: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  value: string;
  description: string;
  iconName: string;
  year: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  department: string;
  year: string;
  photo: string;
  quote: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const SITE_CONFIG = {
  collegeName: "Rajalakshmi Institute of Technology",
  collegeCode: "RIT",
  chapterName: "IETE Student Forum (ISF)",
  chapterTagline: "Inspiring Innovation, Learning and Leadership in Electronics, Communication and Emerging Technologies at Rajalakshmi Institute of Technology.",
  foundedYear: "2019",
  ieteCenter: "Recognized Chapter under IETE Chennai Center",
  membershipLink: "https://chat.whatsapp.com/LFAeERPhyuVJq1W7oIxXbJ",
  whatsappGroupLink: "https://chat.whatsapp.com/LFAeERPhyuVJq1W7oIxXbJ",

  // Statistics
  stats: [
    { label: "Active Members", value: 100, prefix: "", suffix: "+" },
    { label: "Technical Events", value: 25, prefix: "", suffix: "+" },
    { label: "Workshops Conducted", value: 15, prefix: "", suffix: "+" },
    { label: "Years of Excellence", value: 5, prefix: "", suffix: "+" },
  ],

  // Logos & Visual Assets
  logos: {
    ieteLogo: "/iete-logo.png",
    collegeLogo: "/rit-logo.png",
  },

  // About Section
  about: {
    title: "About the Student Forum",
    subtitle: "Empowering Next-Generation Engineers and Innovators",
    description: "The Institution of Electronics and Telecommunication Engineers (IETE) is India's leading recognized professional society devoted to the advancement of Science and Technology in Electronics, Telecommunication & IT. Founded in 1953, IETE serves more than 1,25,000 members worldwide.",
    isfDescription: "The IETE Student Forum (ISF) at our institution serves as a vibrant platform for engineering undergraduates to bridge theoretical learning with industry-grade practical engineering, research, and leadership.",
    objectives: [
      "Conduct regular technical workshops on embedded systems, VLSI, IoT, AI, and Signal Processing.",
      "Facilitate direct interaction between students and industry experts through guest lectures and industrial visits.",
      "Encourage student research publications, patent filings, and national hackathon participation.",
      "Nurture leadership, project management, and soft skills through student-organized symposiums."
    ]
  },

  // Vision Statement
  vision: {
    title: "Our Vision",
    statement: "To empower students with technical excellence, innovation, leadership and professional ethics while contributing to society through technology."
  },

  // Mission Cards
  missions: [
    {
      id: "m1",
      title: "Promote Technical Learning",
      description: "Organize hands-on training sessions on cutting-edge hardware platforms, microcontrollers, and software suites.",
      iconName: "Cpu"
    },
    {
      id: "m2",
      title: "Conduct Workshops",
      description: "Deliver immersive workshops on IoT, Robotics, Signal Processing, VLSI Design, and Cloud Integration.",
      iconName: "Wrench"
    },
    {
      id: "m3",
      title: "Industry Interaction",
      description: "Bridge academia and industry by organizing industrial visits, tech talks, and internship guidance sessions.",
      iconName: "Building2"
    },
    {
      id: "m4",
      title: "Research Culture",
      description: "Incentivize undergraduate research paper publications in peer-reviewed journals and IETE conferences.",
      iconName: "Microscope"
    },
    {
      id: "m5",
      title: "Innovation & Leadership",
      description: "Foster entrepreneurial mindsets, hackathon teams, and project incubation support under faculty mentorship.",
      iconName: "Lightbulb"
    },
    {
      id: "m6",
      title: "Professional Networking",
      description: "Connect students with a nationwide network of IETE professional members, alumni, and research scientists.",
      iconName: "Users"
    }
  ] as MissionItem[],

  // Activities Section
  activities: [
    {
      id: "a1",
      title: "Technical Workshops",
      category: "Skill Building",
      description: "Hands-on bootcamps covering Arduino, STM32, Raspberry Pi, MATLAB, Antenna Simulation, and PCB Designing.",
      iconName: "Cpu",
      frequency: "Bi-Weekly"
    },
    {
      id: "a2",
      title: "Hackathons & Innovation Challenges",
      category: "Competitive",
      description: "24-hour hardware and software hackathons targeting IoT solutions, Smart Agriculture, and Assistive Tech.",
      iconName: "Zap",
      frequency: "Bi-Annual"
    },
    {
      id: "a3",
      title: "Guest Lectures & Keynotes",
      category: "Mentorship",
      description: "Engaging sessions with eminent scientists from ISRO, DRDO, Intel, Texas Instruments, and top universities.",
      iconName: "GraduationCap",
      frequency: "Monthly"
    },
    {
      id: "a4",
      title: "Industrial Visits",
      category: "Exposure",
      description: "Field trips to semiconductor fabrication labs, satellite earth stations, and telecommunication hubs.",
      iconName: "Factory",
      frequency: "Semester-wise"
    },
    {
      id: "a5",
      title: "Project Expo & Demo Day",
      category: "Showcase",
      description: "Annual project showcase where student teams present working prototypes to industry evaluators.",
      iconName: "Sparkles",
      frequency: "Annual"
    },
    {
      id: "a6",
      title: "Coding & Simulation Competitions",
      category: "Coding",
      description: "Challenges in Embedded C/C++, Verilog, Python for AI/ML, and Circuit Simulation software.",
      iconName: "Code2",
      frequency: "Monthly"
    },
    {
      id: "a7",
      title: "Seminars & Paper Presentations",
      category: "Academic",
      description: "Forums for presenting IEEE/IETE format research papers, receiving constructive reviewer feedback.",
      iconName: "FileText",
      frequency: "Quarterly"
    },
    {
      id: "a8",
      title: "Inter-College Competitions",
      category: "Excellence",
      description: "RoboWars, Circuit Debugging, Line Follower Bot challenges, and Quiz competitions.",
      iconName: "Trophy",
      frequency: "Annual Fest"
    },
    {
      id: "a9",
      title: "Professional Development",
      category: "Career",
      description: "Resume writing, technical interview prep, GATE guidance, and higher education orientation.",
      iconName: "TrendingUp",
      frequency: "Ongoing"
    }
  ] as ActivityItem[],

  // Upcoming Events
  upcomingEvents: [
    {
      id: "ev-silicon-maze",
      title: "SILICON MAZE",
      category: "Competition",
      date: "August 13, 2026 (Thursday)",
      time: "10:30 AM – 12:30 PM",
      venue: "C702, RIT",
      teamSize: "Maximum 2 Members per Team",
      eligibility: "Open to All Departments",
      perks: "Trophies for Winners & E-Certificates for All Participants",
      seatsLeft: "Strictly Limited to 20 Teams Only!",
      isUpcoming: true,
      registrationOpen: true,
      registrationLink: "https://chat.whatsapp.com/LFAeERPhyuVJq1W7oIxXbJ",
      description: "Think. Decode. Connect. Conquer. An exciting technical & logical challenge hosted by the Department of ECE in association with IETE ISF Professional Society.",
      fullDetails: `🏆 Event: SILICON MAZE — An Exciting Technical & Logical Challenge
📅 Date: August 13, 2026 (Thursday)
⏰ Time: 10:30 AM – 12:30 PM
📍 Venue: Room C702, Rajalakshmi Institute of Technology
👥 Team Size: Maximum 2 Members per Team
👨‍🎓 Eligibility: Open to All Departments
📜 Rewards: Trophies for Winners & E-Certificates for All Participants
⚠️ Limitation: Strictly Limited to 20 Teams Only! (Registration closes once 20 teams are registered)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 EVENT ROUNDS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
01. SILICON CIPHER
A fun puzzle round with simple technical clues, logical reasoning, and pattern-based questions to qualify for the next stage.

02. CIRCUIT DETECTIVE
Observe diagrams and identify missing connections, components, or simple circuit-related clues. Focus is on keen observation and logical thinking.

03. MAINFRAME OVERRIDE
An exciting final round featuring easy binary conversions, basic logic gate questions, and quick problem-solving challenges.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 STUDENT COORDINATORS:
• Harini S (+91 63830 78169)
• Yoganandh J (+91 94456 30998)
• Bhavani Sankar M (91 97908 96599)
• Madesh S (+91 94453 96430)

👩‍🏫 FACULTY COORDINATORS:
• Ms. S. Kalaivani (IETE-Coordinator)
• Ms. A. Vaanathi (Coordinator)
• Ms. S. Sangeetha (Coordinator)

🏛️ DEPARTMENT LEADERSHIP:
• Dr. S. Sheeba (HOD-ECE)
• Dr. S. Sasikumar (Dean-ECE)
• Dr. R. Maheswari (Principal)`,
      image: "/images/events/silicon-maze.webp",
      blurHash: "L8O4Vf%g~D~q0#$*~C^k01NFwes;",
      rounds: [
        {
          roundNumber: "01",
          title: "Silicon Cipher",
          description: "A fun puzzle round with simple technical clues, logical reasoning, and pattern-based questions."
        },
        {
          roundNumber: "02",
          title: "Circuit Detective",
          description: "Observe diagrams and identify missing connections, components, or simple circuit-related clues."
        },
        {
          roundNumber: "03",
          title: "Mainframe Override",
          description: "An exciting final round featuring easy binary conversions, basic logic gates, and quick problem solving."
        }
      ],
      coordinators: [
        { name: "Harini S", phone: "+91 63830 78169", role: "Student Coordinator" },
        { name: "Yoganandh J", phone: "+91 94456 30998", role: "Student Coordinator" },
        { name: "Bhavani Sankar M", phone: "91 97908 96599", role: "Student Coordinator" },
        { name: "Madesh S", phone: "+91 94453 96430", role: "Student Coordinator" },
      ]
    }
  ] as EventItem[],

  // Past Events Gallery (Moments & Key Milestones - 3 Key Events)
  gallery: [
    {
      id: "g-higher-ed-pathways",
      title: "Higher Education & Career Pathways",
      category: "Seminar",
      date: "July 29, 2026",
      image: "/images/events/higher-ed-pathways.jpg",
      description: "Guest lecture by Mr. Mohamed Razik (Insha Consulting Experts) on European study pathways, post-study work visas, cost myth-busting, and oral communication skills."
    },
    {
      id: "g-vision-skill-2026",
      title: "Vision of Skill 2026",
      category: "Competition",
      date: "July 20, 2026",
      image: "/images/events/vision-of-skill-2026.jpg",
      description: "Theme: 'Youth is the hope of our future'. Focused on bridging the digital divide with future-ready skills in AI, robotics, cybersecurity, and cloud computing."
    },
    {
      id: "g-energize-2026",
      title: "Energize 2026 Hackathon",
      category: "Hackathon",
      date: "April 21, 2026",
      image: "/images/events/energize-2026.jpg",
      description: "Smart Energy hackathon at 4th Floor Green Building focused on sustainable energy solutions with certificate and trophy awards for top innovations."
    }
  ] as GalleryItem[],

  // Achievements
  achievements: [
    {
      id: "ac1",
      title: "National Competition Wins",
      value: "14+",
      description: "Top positions secured in Smart India Hackathon, IEEE, and National Tech Fests.",
      iconName: "Trophy",
      year: "2023 - 2026"
    },
    {
      id: "ac2",
      title: "Research Papers Published",
      value: "18+",
      description: "Student-authored research papers in peer-reviewed IEEE, Springer & IETE Journals.",
      iconName: "FileCheck",
      year: "2022 - 2026"
    },
    {
      id: "ac3",
      title: "Patents & Utility Models",
      value: "4",
      description: "Student innovation patents filed under institute IPR incubation cell.",
      iconName: "Lightbulb",
      year: "2024 - 2026"
    },
    {
      id: "ac4",
      title: "Core Student Projects",
      value: "45+",
      description: "Functional hardware prototypes developed with industry and college funding.",
      iconName: "Cpu",
      year: "2020 - 2026"
    },
    {
      id: "ac5",
      title: "Core Industry Placements",
      value: "95%",
      description: "ISF student office bearers placed in top semiconductor & telecom majors.",
      iconName: "Briefcase",
      year: "2025 - 2026"
    },
    {
      id: "ac6",
      title: "Best ISF Chapter Award",
      value: "Top 3",
      description: "Ranked among top 3 ISF Student Chapters in the region by IETE Executive Council.",
      iconName: "Award",
      year: "2025"
    }
  ] as AchievementItem[],

  // Core Members (Office Bearers)
  coreMembers: [
    {
      id: "m0",
      name: "Ms. Kalaivani S",
      position: "Faculty Coordinator & Mentor",
      category: "Office Bearer",
      department: "Dept. of Electronics & Communication Engineering",
      year: "Faculty Mentor"
    },
    {
      id: "m1",
      name: "Harini S",
      position: "Chairman",
      category: "Office Bearer",
      department: "Dept. of ECE",
      year: "Student Office Bearer"
    },
    {
      id: "m2",
      name: "Jeyanandh V S",
      position: "Vice Chairman",
      category: "Office Bearer",
      department: "Dept. of ECE",
      year: "Student Office Bearer"
    },
    {
      id: "m3",
      name: "Bhavani Sankar M",
      position: "Secretary",
      category: "Office Bearer",
      department: "Dept. of ECE",
      year: "Student Office Bearer"
    },

    {
      id: "m4",
      name: "Yoganandh",
      position: "Guest Care & Sponsorship Lead",
      category: "Office Bearer",
      department: "Dept. of ECE",
      year: "Student Office Bearer"
    },
    {
      id: "m5",
      name: "Kavipriya D",
      position: "Event Planner & Management Lead",
      category: "Office Bearer",
      department: "Dept. of ECE",
      year: "Student Office Bearer"
    },
    {
      id: "m6",
      name: "Barath R",
      position: "Technical Head",
      category: "Office Bearer",
      department: "Dept. of ECE",
      year: "Student Office Bearer"
    },
    {
      id: "m7",
      name: "Preethi B",
      position: "Documentation Lead",
      category: "Office Bearer",
      department: "Dept. of ECE",
      year: "Student Office Bearer"
    },
    {
      id: "m8",
      name: "Suji V",
      position: "Social Media Lead",
      category: "Office Bearer",
      department: "Dept. of ECE",
      year: "Student Office Bearer"
    },
    {
      id: "m9",
      name: "Jeevitha",
      position: "Volunteer Management Lead",
      category: "Office Bearer",
      department: "Dept. of ECE",
      year: "Student Office Bearer"
    },
    {
      id: "m10",
      name: "Harisudhan",
      position: "Registration Lead",
      category: "Office Bearer",
      department: "Dept. of ECE",
      year: "Student Office Bearer"
    },
    {
      id: "m11-a",
      name: "Madesh S",
      position: "Designing Team Lead",
      category: "Office Bearer",
      department: "Dept. of ECE",
      year: "Student Office Bearer"
    },
    {
      id: "m11-b",
      name: "Nishal Priyan",
      position: "Designing Team Lead",
      category: "Office Bearer",
      department: "Dept. of ECE",
      year: "Student Office Bearer"
    },
    {
      id: "m12",
      name: "Sasikumar M",
      position: "Editing Lead",
      category: "Office Bearer",
      department: "Dept. of ECE",
      year: "Student Office Bearer"
    }
  ] as CoreMember[],

  // Membership Benefits
  benefits: [
    {
      id: "b1",
      title: "Certified Opportunities",
      description: "Receive officially accredited certificates from IETE Headquarters for workshop completion and event participation.",
      iconName: "Award"
    },
    {
      id: "b2",
      title: "Global Professional Network",
      description: "Connect with thousands of senior engineers, researchers, professors, and industry pioneers worldwide.",
      iconName: "Globe"
    },
    {
      id: "b3",
      title: "Industrial & Lab Exposure",
      description: "Priority access to advanced hardware equipment, specialized testing gear, microcontrollers, and fab visits.",
      iconName: "Cpu"
    },
    {
      id: "b4",
      title: "Hands-on Technical Skills",
      description: "Master practical skills in PCB layout, IoT programming, FPGA coding, signal processing, and robotics.",
      iconName: "Wrench"
    },
    {
      id: "b5",
      title: "Hackathons & Competitions",
      description: "Discounted or free entry to all ISF hackathons, paper presentations, and hardware challenges with cash prizes.",
      iconName: "Zap"
    },
    {
      id: "b6",
      title: "Leadership & Management",
      description: "Take on executive board positions, manage large-scale events, sponsorships, and build management skills.",
      iconName: "Users"
    },
    {
      id: "b7",
      title: "Project & Research Mentorship",
      description: "Direct guidance from senior faculty and industry experts for mini-projects, capstone projects, and paper publications.",
      iconName: "Sparkles"
    },
    {
      id: "b8",
      title: "Internship & Career Boost",
      description: "Exclusive access to internship leads, referral networks, resume reviews, and placement preparation sessions.",
      iconName: "Briefcase"
    }
  ] as BenefitItem[],

  // Testimonials
  testimonials: [
    {
      id: "t1",
      name: "Siddharth Verma",
      department: "Electronics & Communication Engineering",
      year: "Alumni (Batch of 2025) • Placed at Texas Instruments",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      quote: "Being part of ISF was the highlight of my college life. The hands-on workshops in PCB design and microcontroller interfacing gave me a massive edge during technical interviews for core hardware roles.",
      rating: 5
    },
    {
      id: "t2",
      name: "Harini Sundaram",
      department: "Electronics & Telecommunication",
      year: "Final Year Student",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      quote: "The mentorship I received while organizing ElectroHack helped me build confidence, teamwork skills, and land an internship at a top semiconductor design company.",
      rating: 5
    },
    {
      id: "t3",
      name: "Varun Malhotra",
      department: "ECE (Embedded Systems Specialization)",
      year: "3rd Year Student",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
      quote: "ISF is not just a student club; it is a thriving ecosystem of tech enthusiasts. The industrial visits and peer-learning culture are unmatched!",
      rating: 5
    }
  ] as TestimonialItem[],

  // FAQs
  faqs: [
    {
      id: "faq-1",
      question: "How do I join the IETE Student Forum (ISF)?",
      answer: "You can click on any 'Join ISF' or 'Become a Member' button on the website to immediately join our official WhatsApp Community and register for upcoming events and student memberships. Alternatively, you can visit the ECE Department ISF Desk during working hours."
    },
    {
      id: "faq-2",
      question: "What is the membership fee and validity?",
      answer: "The student membership fee is nominal (typically ₹500 for a 4-year institutional student membership). Valid for your entire duration of undergraduate study, it grants full access to all ISF activities, workshops, and IETE e-journals."
    },
    {
      id: "faq-3",
      question: "Who is eligible to become an ISF member?",
      answer: "All undergraduate students enrolled in Engineering streams (ECE, EEE, CSE, IT, Instrumentation, Robotics, AI/ML, Telecom, etc.) are eligible and welcome to join the ISF chapter."
    },
    {
      id: "faq-4",
      question: "What benefits do I get as an active ISF member?",
      answer: "Members enjoy discounted workshop fees, priority seating for guest lectures, hardware kit access, eligibility to apply for executive board roles, research paper guidance, and official IETE certification."
    },
    {
      id: "faq-5",
      question: "Can I publish research papers through IETE?",
      answer: "Yes! IETE conducts regional and national conferences with proceedings indexed in reputable databases. ISF faculty mentors guide student members in drafting, formatting, and submitting high-quality research papers."
    },
    {
      id: "faq-6",
      question: "How can I become an Executive Office Bearer or Domain Lead?",
      answer: "Executive board selections are held annually at the start of the academic session. Active members who have contributed to event organizing, demonstrated leadership, and maintained good academic standing can apply."
    }
  ] as FAQItem[],

  // Contact Info
  contact: {
    facultyCoordinator: "Ms. Kalaivani S",
    facultyEmail: "iete_ece@ritchennai.edu.in",
    facultyPhone: "+91 9486966148",
    department: "Department of Electronics & Communication Engineering",
    building: "ECE Block, 2nd Floor, ISF Center",
    address: "Rajalakshmi Institute of Technology, Kuthambakkam Post, Bengaluru Highway, Chennai, Tamil Nadu - 600124",
    googleMapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.815648473398!2d80.0453935!3d13.0382427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a528bae35449d29%3A0x37d13f08d672385b!2sRajalakshmi%20Institute%20of%20Technology!5e1!3m2!1sen!2sin!4v1786019649248!5m2!1sen!2sin",
    socials: {
      whatsapp: "https://chat.whatsapp.com/LFAeERPhyuVJq1W7oIxXbJ",
      linkedin: "https://linkedin.com/company/iete-student-forum-rit",
      instagram: "https://www.instagram.com/rit_iete_official?igsi=MTNtZGNudjJ4eWZicQ==",
      facebook: "https://facebook.com/iete.student.forum.rit",
      youtube: "https://youtube.com/@iete_student_forum_rit",
      github: "https://github.com/iete-student-forum-rit"
    }
  }
};
