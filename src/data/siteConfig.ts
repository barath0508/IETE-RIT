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
  seatsLeft: number;
  isUpcoming: boolean;
  registrationOpen: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Workshop' | 'Seminar' | 'Hackathon' | 'Industrial Visit' | 'Competition';
  date: string;
  image: string;
  description: string;
}

export interface CoreMember {
  id: string;
  name: string;
  position: string;
  category: 'Faculty' | 'Executive Board' | 'Domain Lead';
  department: string;
  year: string;
  photo: string;
  email: string;
  linkedin: string;
  github?: string;
  bio: string;
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
  collegeName: "National Institute of Technology & Engineering",
  collegeCode: "NITE",
  chapterName: "IETE Student Forum (ISF)",
  chapterTagline: "Inspiring Innovation, Learning and Leadership in Electronics, Communication and Emerging Technologies.",
  foundedYear: "2019",
  ieteCenter: "Recognized Chapter under IETE Main Center",
  
  // Statistics
  stats: [
    { label: "Active Members", value: 100, prefix: "", suffix: "+" },
    { label: "Technical Events", value: 25, prefix: "", suffix: "+" },
    { label: "Workshops Conducted", value: 15, prefix: "", suffix: "+" },
    { label: "Years of Excellence", value: 5, prefix: "", suffix: "+" },
  ],

  // Logos & Visual Assets (High Quality Royalty-free / SVG vectors)
  logos: {
    ieteLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=160&q=80",
    collegeLogo: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=160&q=80",
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
      id: "ev-1",
      title: "RoboTech 2.0: Autonomous Robotics & Microcontrollers Bootcamp",
      category: "Workshop",
      date: "October 18-19, 2026",
      time: "09:30 AM - 04:30 PM",
      venue: "Electronics Innovation Lab (Block C)",
      description: "A 2-day intensive hands-on workshop on building autonomous line-following and obstacle-avoiding robots using ESP32 and sensor arrays.",
      fullDetails: "Join us for RoboTech 2.0! Learn how to program ESP32 microcontrollers, interface ultrasonic/IR sensors, program PID controllers for motor drivers, and build your custom autonomous robot from scratch. Hardware kits provided for all teams of 4.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      seatsLeft: 12,
      isUpcoming: true,
      registrationOpen: true
    },
    {
      id: "ev-2",
      title: "IETE National Hardware Hackathon 'ElectroHack 2026'",
      category: "Hackathon",
      date: "November 05-06, 2026",
      time: "24-Hour Non-Stop",
      venue: "Main Auditorium & MakerSpace",
      description: "Compete with top engineering minds across the region to solve real-world problems in Smart Energy, Healthcare IoT, and Defense Electronics.",
      fullDetails: "ElectroHack 2026 brings together over 40 student teams for 24 hours of innovation. Prize pool worth ₹75,000 + Internship opportunities with industry sponsors. Mentorship provided by Senior Hardware Engineers.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      seatsLeft: 8,
      isUpcoming: true,
      registrationOpen: true
    },
    {
      id: "ev-3",
      title: "Guest Lecture: 'Future of 6G Networks & Terahertz Communication'",
      category: "Seminar",
      date: "November 22, 2026",
      time: "02:00 PM - 04:00 PM",
      venue: "Seminar Hall 1 & Online Stream",
      description: "Keynote presentation by Dr. A. K. Sharma, Chief Research Scientist at Telecom Regulatory Research Labs.",
      fullDetails: "An enlightening discussion on next-gen wireless communication protocols, intelligent reflecting surfaces, and spectrum allocation in 6G architectures. Includes an interactive Q&A session for aspiring telecom researchers.",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
      seatsLeft: 45,
      isUpcoming: true,
      registrationOpen: true
    },
    {
      id: "ev-4",
      title: "Industrial Visit to Semiconductor Manufacturing Facility",
      category: "Industrial Visit",
      date: "December 10, 2026",
      time: "08:00 AM - 05:00 PM",
      venue: "State Microelectronics Fab Park",
      description: "Exclusive field exposure to cleanrooms, wafer fabrication equipment, chip testing, and packaging processes.",
      fullDetails: "Selected ISF student members will tour India's leading microelectronics fabrication facility. Bus transportation and safety gear provided. Prior registration mandatory.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      seatsLeft: 5,
      isUpcoming: true,
      registrationOpen: true
    }
  ] as EventItem[],

  // Past Events Gallery
  gallery: [
    {
      id: "g1",
      title: "PCB Design & Fabrication Masterclass",
      category: "Workshop",
      date: "August 2026",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      description: "Students learned KiCAD schematic layout, routing, and etched their double-sided PCBs in the lab."
    },
    {
      id: "g2",
      title: "IoT Smart Agriculture Hackathon",
      category: "Hackathon",
      date: "July 2026",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      description: "Winning teams demonstrated LoRaWAN soil moisture monitoring and automated irrigation valves."
    },
    {
      id: "g3",
      title: "VLSI Architecture & SystemVerilog Seminar",
      category: "Seminar",
      date: "May 2026",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      description: "Expert session on ASIC design flow, RTL synthesis, and physical verification techniques."
    },
    {
      id: "g4",
      title: "Field Visit to ISRO Satellite Tracking Station",
      category: "Industrial Visit",
      date: "April 2026",
      image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80",
      description: "Students observed deep space dish antennas, telemetry receivers, and orbit tracking control rooms."
    },
    {
      id: "g5",
      title: "Circuit Debugging & Hardware Quest",
      category: "Competition",
      date: "March 2026",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      description: "High-speed troubleshooting competition diagnosing faulty analog and digital breadboard setups."
    },
    {
      id: "g6",
      title: "Embedded Systems with Raspberry Pi 5",
      category: "Workshop",
      date: "February 2026",
      image: "https://images.unsplash.com/photo-1608564697071-ddf911d81370?auto=format&fit=crop&w=800&q=80",
      description: "Computer vision and OpenCV edge AI processing implemented on single-board computers."
    },
    {
      id: "g7",
      title: "Annual Tech Expo & Prototype Fair",
      category: "Competition",
      date: "January 2026",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      description: "Over 35 working student hardware models showcased to industry evaluators and faculty."
    },
    {
      id: "g8",
      title: "Drone Telemetry & Flight Dynamics Workshop",
      category: "Workshop",
      date: "November 2025",
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
      description: "Quadcontroller assembly, ESC calibration, and radio frequency telemetry setup."
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

  // Core Members
  coreMembers: [
    {
      id: "m1",
      name: "Dr. R. K. Viswanathan",
      position: "Faculty Coordinator & Mentor",
      category: "Faculty",
      department: "Dept. of Electronics & Communication Engineering",
      year: "Faculty Mentor",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      email: "rk.viswanathan@college.edu",
      linkedin: "https://linkedin.com",
      bio: "Professor in Microwave Engineering & Embedded Systems with 20+ years of research and teaching experience."
    },
    {
      id: "m2",
      name: "Aditya Sharma",
      position: "Student Chairperson",
      category: "Executive Board",
      department: "ECE, 4th Year",
      year: "Final Year",
      photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
      email: "aditya.sharma@student.college.edu",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      bio: "Passionate embedded systems engineer & team leader. Specializes in IoT architectures and ARM Cortex MCUs."
    },
    {
      id: "m3",
      name: "Sneha Reddy",
      position: "Vice Chairperson",
      category: "Executive Board",
      department: "ECE, 4th Year",
      year: "Final Year",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      email: "sneha.reddy@student.college.edu",
      linkedin: "https://linkedin.com",
      bio: "VLSI design enthusiast focusing on SystemVerilog and digital signal processing hardware acceleration."
    },
    {
      id: "m4",
      name: "Rohan Kulkarni",
      position: "Secretary",
      category: "Executive Board",
      department: "ECE, 3rd Year",
      year: "Pre-Final Year",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      email: "rohan.kulkarni@student.college.edu",
      linkedin: "https://linkedin.com",
      bio: "Event manager and robotics robotics enthusiast. Coordinates workshops, industry liaisons, and chapter logistics."
    },
    {
      id: "m5",
      name: "Ananya Iyer",
      position: "Joint Secretary",
      category: "Executive Board",
      department: "ECE, 3rd Year",
      year: "Pre-Final Year",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
      email: "ananya.iyer@student.college.edu",
      linkedin: "https://linkedin.com",
      bio: "Active researcher in optical fiber networks. Leads student outreach, documentation, and academic affairs."
    },
    {
      id: "m6",
      name: "Karthik Verma",
      position: "Treasurer",
      category: "Executive Board",
      department: "ECE, 3rd Year",
      year: "Pre-Final Year",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      email: "karthik.verma@student.college.edu",
      linkedin: "https://linkedin.com",
      bio: "Manages financial budgeting, event sponsorships, hardware inventory, and membership accounts."
    },
    {
      id: "m7",
      name: "Priya Nair",
      position: "Technical Lead",
      category: "Domain Lead",
      department: "ECE, 3rd Year",
      year: "Pre-Final Year",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      email: "priya.nair@student.college.edu",
      linkedin: "https://linkedin.com",
      bio: "Leads technical curriculum design, hardware kit preparations, and hackathon judging criteria."
    },
    {
      id: "m8",
      name: "Devanshu Patel",
      position: "Web & Digital Lead",
      category: "Domain Lead",
      department: "CSE / ECE, 3rd Year",
      year: "Pre-Final Year",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
      email: "devanshu.patel@student.college.edu",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      bio: "Full-stack developer building modern web applications, portal infrastructure, and UI design systems."
    },
    {
      id: "m9",
      name: "Meera Sen",
      position: "Media & PR Lead",
      category: "Domain Lead",
      department: "ECE, 2nd Year",
      year: "Second Year",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      email: "meera.sen@student.college.edu",
      linkedin: "https://linkedin.com",
      bio: "Directs social media presence, poster designs, event photography, and public relations."
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
      answer: "You can click on the 'Join ISF' button on the website and fill out the online registration form. Alternatively, you can visit the ECE Department ISF Desk during working hours to complete your membership registration."
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
    facultyCoordinator: "Dr. R. K. Viswanathan",
    facultyEmail: "iete.isf@college.edu",
    facultyPhone: "+91 98765 43210 / 044-24567890",
    department: "Department of Electronics & Communication Engineering",
    building: "Block C, 3rd Floor, Room C-302",
    address: "National Institute of Technology & Engineering, Knowledge City Campus, Tech Park Road, Pin: 600001",
    googleMapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.00123456789!2d80.234567!3d13.012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAwJzQ0LjQiTiA4MMKwMTQnMDQuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
    socials: {
      linkedin: "https://linkedin.com/company/iete-student-forum",
      instagram: "https://instagram.com/iete_isf_official",
      facebook: "https://facebook.com/iete.student.forum",
      youtube: "https://youtube.com/@iete_student_forum",
      github: "https://github.com/iete-student-forum"
    }
  }
};
