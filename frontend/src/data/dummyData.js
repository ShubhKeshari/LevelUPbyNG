// Dummy data for the application

export const CAMPUSES = [
  'BCA Himachal',
  'Dharamshala',
  'Pune',
  'Dantewada',
  'Jashpur',
  'Sarjapur',
  'Thakurganj',
  'Raigarh'
];

export const dummyUsers = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'student@example.com',
    password: 'password123',
    role: 'Student',
    branch: 'Computer Science',
    year: 4,
    CGPA: 8.5,
    skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
    campus: 'BCA Himachal',
    createdAt: new Date('2023-01-15'),
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'Admin',
    branch: '',
    year: null,
    CGPA: null,
    skills: [],
    campus: '',
    createdAt: new Date('2023-01-10'),
  },
  {
    _id: '3',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'password123',
    role: 'Student',
    branch: 'Electronics',
    year: 3,
    CGPA: 8.2,
    skills: ['Python', 'Machine Learning', 'Data Science'],
    campus: 'Dharamshala',
    createdAt: new Date('2023-02-01'),
  },
  {
    _id: '4',
    name: 'Bob Williams',
    email: 'bob@example.com',
    password: 'password123',
    role: 'Student',
    branch: 'Computer Science',
    year: 4,
    CGPA: 8.3,
    skills: ['React', 'Node.js', 'JavaScript'],
    campus: 'Pune',
    createdAt: new Date('2023-02-05'),
  },
  {
    _id: '5',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    password: 'password123',
    role: 'Student',
    branch: 'Information Technology',
    year: 3,
    CGPA: 7.8,
    skills: ['React', 'MongoDB', 'JavaScript'],
    campus: 'Dantewada',
    createdAt: new Date('2023-02-10'),
  },
  {
    _id: '6',
    name: 'Diana Prince',
    email: 'diana@example.com',
    password: 'password123',
    role: 'Student',
    branch: 'Computer Science',
    year: 4,
    CGPA: 8.7,
    skills: ['React', 'Node.js', 'TypeScript'],
    campus: 'Jashpur',
    createdAt: new Date('2023-02-15'),
  },
  {
    _id: '7',
    name: 'Edward Norton',
    email: 'edward@example.com',
    password: 'password123',
    role: 'Student',
    branch: 'Information Technology',
    year: 3,
    CGPA: 8.0,
    skills: ['Node.js', 'MongoDB', 'JavaScript'],
    campus: 'Sarjapur',
    createdAt: new Date('2023-02-20'),
  },
  {
    _id: '8',
    name: 'Fiona Green',
    email: 'fiona@example.com',
    password: 'password123',
    role: 'Student',
    branch: 'Computer Science',
    year: 4,
    CGPA: 8.4,
    skills: ['React', 'JavaScript', 'MongoDB'],
    campus: 'Thakurganj',
    createdAt: new Date('2023-02-25'),
  },
  {
    _id: '9',
    name: 'George Martin',
    email: 'george@example.com',
    password: 'password123',
    role: 'Student',
    branch: 'Electronics',
    year: 3,
    CGPA: 7.9,
    skills: ['Python', 'JavaScript', 'React'],
    campus: 'Raigarh',
    createdAt: new Date('2023-03-01'),
  },
  {
    _id: '10',
    name: 'Hannah Smith',
    email: 'hannah@example.com',
    password: 'password123',
    role: 'Student',
    branch: 'Computer Science',
    year: 4,
    CGPA: 8.6,
    skills: ['React', 'Node.js', 'MongoDB'],
    campus: 'BCA Himachal',
    createdAt: new Date('2023-03-05'),
  },
];

// Get current date for reference - ensure dates are set to midnight UTC
const today = new Date();
today.setHours(0, 0, 0, 0);
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);
nextWeek.setHours(0, 0, 0, 0);
const nextMonth = new Date(today);
nextMonth.setDate(today.getDate() + 30);
nextMonth.setHours(0, 0, 0, 0);
const lastWeek = new Date(today);
lastWeek.setDate(today.getDate() - 7);
lastWeek.setHours(0, 0, 0, 0);
const lastMonth = new Date(today);
lastMonth.setDate(today.getDate() - 30);
lastMonth.setHours(0, 0, 0, 0);

export const dummyJobs = [
  {
    _id: 'j1',
    companyName: 'TechCorp Solutions',
    jobTitle: 'Software Development Engineer',
    jobDescription: 'We are looking for a talented Software Development Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining scalable web applications using modern technologies.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [4],
      minCGPA: 8.0,
      requiredSkills: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
    },
    applicationDeadline: nextWeek, // Future deadline - will appear in Available Jobs
    createdBy: '2',
    createdAt: new Date('2024-02-01'),
  },
  {
    _id: 'j2',
    companyName: 'DataAnalytics Inc',
    jobTitle: 'Data Scientist',
    jobDescription: 'Join our data science team to work on cutting-edge machine learning projects. You will analyze large datasets, build predictive models, and provide data-driven insights to drive business decisions.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Electronics', 'Mathematics'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['Python', 'Machine Learning', 'Data Science', 'Statistics'],
    },
    applicationDeadline: nextMonth, // Future deadline - will appear in Available Jobs
    createdBy: '2',
    createdAt: new Date('2024-02-05'),
  },
  {
    _id: 'j3',
    companyName: 'CloudTech Systems',
    jobTitle: 'Full Stack Developer',
    jobDescription: 'We are seeking a Full Stack Developer proficient in both frontend and backend technologies. You will work on building cloud-based applications and microservices architecture.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [4],
      minCGPA: 8.5,
      requiredSkills: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
    },
    applicationDeadline: lastWeek, // Past deadline - will appear in Deadline Over (if not applied)
    createdBy: '2',
    createdAt: new Date('2024-01-28'),
  },
  {
    _id: 'j4',
    companyName: 'FinTech Innovations',
    jobTitle: 'Backend Developer',
    jobDescription: 'Looking for an experienced Backend Developer to design and implement robust server-side applications. Experience with microservices and API development is essential.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [4],
      minCGPA: 8.0,
      requiredSkills: ['Node.js', 'Express', 'MongoDB', 'Redis', 'REST APIs'],
    },
    applicationDeadline: (() => {
      const date = new Date(nextWeek.getTime() + 3 * 24 * 60 * 60 * 1000);
      date.setHours(0, 0, 0, 0);
      return date;
    })(), // Future deadline - 3 days after nextWeek
    createdBy: '2',
    createdAt: new Date('2024-02-10'),
  },
  {
    _id: 'j5',
    companyName: 'AI Solutions Ltd',
    jobTitle: 'Machine Learning Engineer',
    jobDescription: 'Join our AI team to develop and deploy machine learning models. You will work on NLP, computer vision, and deep learning projects.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Electronics'],
      year: [3, 4],
      minCGPA: 8.0,
      requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning'],
    },
    applicationDeadline: (() => {
      const date = new Date(nextWeek.getTime() + 10 * 24 * 60 * 60 * 1000);
      date.setHours(0, 0, 0, 0);
      return date;
    })(), // Future deadline - 10 days after nextWeek
    createdBy: '2',
    createdAt: new Date('2024-02-12'),
  },
  {
    _id: 'j6',
    companyName: 'StartupXYZ',
    jobTitle: 'Frontend Developer',
    jobDescription: 'We need a creative Frontend Developer to build beautiful and responsive user interfaces. Experience with modern frameworks and design systems is required.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
    },
    applicationDeadline: lastMonth, // Past deadline - will appear in Deadline Over (if not applied)
    createdBy: '2',
    createdAt: new Date('2024-02-15'),
  },
  {
    _id: 'j7',
    companyName: 'DevOps Pro',
    jobTitle: 'DevOps Engineer',
    jobDescription: 'We are looking for a DevOps Engineer to help us build and maintain our infrastructure. Experience with CI/CD pipelines and cloud platforms is required.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'],
    },
    applicationDeadline: (() => {
      const date = new Date(nextWeek.getTime() + 5 * 24 * 60 * 60 * 1000);
      date.setHours(0, 0, 0, 0);
      return date;
    })(), // Future deadline
    createdBy: '2',
    createdAt: new Date('2024-02-18'),
  },
  {
    _id: 'j8',
    companyName: 'MobileFirst Inc',
    jobTitle: 'Mobile App Developer',
    jobDescription: 'Join our mobile development team to create amazing iOS and Android applications. Experience with React Native or Flutter is preferred.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.0,
      requiredSkills: ['React Native', 'Flutter', 'Mobile Development', 'JavaScript'],
    },
    applicationDeadline: lastWeek, // Past deadline - will appear in Deadline Over
    createdBy: '2',
    createdAt: new Date('2024-01-20'),
  },
  {
    _id: 'j9',
    companyName: 'CyberSec Solutions',
    jobTitle: 'Cybersecurity Analyst',
    jobDescription: 'We are seeking a Cybersecurity Analyst to protect our systems and networks. You will identify vulnerabilities, implement security measures, and respond to security incidents.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 8.0,
      requiredSkills: ['Cybersecurity', 'Network Security', 'Penetration Testing', 'Linux'],
    },
    applicationDeadline: new Date('2024-12-15'),
    createdBy: '2',
    createdAt: new Date('2024-11-01'),
  },
  {
    _id: 'j10',
    companyName: 'Blockchain Innovations',
    jobTitle: 'Blockchain Developer',
    jobDescription: 'Join our blockchain team to develop decentralized applications and smart contracts. Experience with Solidity, Ethereum, or other blockchain platforms is required.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [4],
      minCGPA: 8.5,
      requiredSkills: ['Solidity', 'Blockchain', 'Ethereum', 'Smart Contracts', 'Web3'],
    },
    applicationDeadline: new Date('2024-12-15'),
    createdBy: '2',
    createdAt: new Date('2024-11-05'),
  },
  {
    _id: 'j11',
    companyName: 'GameDev Studios',
    jobTitle: 'Game Developer',
    jobDescription: 'We are looking for a creative Game Developer to design and develop engaging games. Experience with Unity, Unreal Engine, or game development frameworks is preferred.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['Unity', 'C#', 'Game Development', '3D Graphics', 'Game Design'],
    },
    applicationDeadline: new Date('2024-12-15'),
    createdBy: '2',
    createdAt: new Date('2024-11-10'),
  },
  {
    _id: 'j12',
    companyName: 'CloudFirst Technologies',
    jobTitle: 'Cloud Solutions Architect',
    jobDescription: 'Join our cloud team to design and implement scalable cloud solutions. You will work with AWS, Azure, or GCP to build robust cloud infrastructure.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [4],
      minCGPA: 8.0,
      requiredSkills: ['AWS', 'Azure', 'Cloud Computing', 'DevOps', 'Infrastructure'],
    },
    applicationDeadline: new Date('2024-12-15'),
    createdBy: '2',
    createdAt: new Date('2024-11-12'),
  },
  {
    _id: 'j13',
    companyName: 'DataWarehouse Corp',
    jobTitle: 'Database Administrator',
    jobDescription: 'We need a Database Administrator to manage and optimize our database systems. Experience with SQL, NoSQL databases, and performance tuning is essential.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['SQL', 'PostgreSQL', 'MongoDB', 'Database Design', 'Performance Tuning'],
    },
    applicationDeadline: new Date('2024-12-15'),
    createdBy: '2',
    createdAt: new Date('2024-11-15'),
  },
  {
    _id: 'j14',
    companyName: 'UI/UX Design Pro',
    jobTitle: 'Frontend UI/UX Developer',
    jobDescription: 'We are seeking a Frontend Developer with strong UI/UX skills to create beautiful and intuitive user interfaces. Experience with design tools and modern frameworks is required.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['React', 'Figma', 'UI/UX Design', 'CSS', 'JavaScript'],
    },
    applicationDeadline: new Date('2024-12-15'),
    createdBy: '2',
    createdAt: new Date('2024-11-18'),
  },
  {
    _id: 'j15',
    companyName: 'Quantum Computing Labs',
    jobTitle: 'Quantum Software Engineer',
    jobDescription: 'Join our quantum computing team to develop algorithms and software for quantum systems. Background in quantum mechanics and programming is preferred.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Mathematics', 'Electronics'],
      year: [4],
      minCGPA: 8.5,
      requiredSkills: ['Quantum Computing', 'Python', 'Qiskit', 'Linear Algebra', 'Algorithms'],
    },
    applicationDeadline: new Date('2024-12-15'),
    createdBy: '2',
    createdAt: new Date('2024-11-20'),
  },
  // Jobs with January 30 deadline
  {
    _id: 'j16',
    companyName: 'TechStart Innovations',
    jobTitle: 'Senior Software Engineer',
    jobDescription: 'We are looking for an experienced Senior Software Engineer to lead our development team. You will architect solutions, mentor junior developers, and drive technical excellence.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [4],
      minCGPA: 8.0,
      requiredSkills: ['Java', 'Spring Boot', 'Microservices', 'System Design', 'Leadership'],
    },
    applicationDeadline: new Date('2025-01-30'),
    createdBy: '2',
    createdAt: new Date('2024-12-01'),
  },
  {
    _id: 'j17',
    companyName: 'AI Research Labs',
    jobTitle: 'AI Research Engineer',
    jobDescription: 'Join our research team to develop cutting-edge AI solutions. You will work on machine learning models, neural networks, and AI algorithms for real-world applications.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Electronics', 'Mathematics'],
      year: [3, 4],
      minCGPA: 8.5,
      requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Research', 'AI Algorithms'],
    },
    applicationDeadline: new Date('2025-01-30'),
    createdBy: '2',
    createdAt: new Date('2024-12-05'),
  },
  {
    _id: 'j18',
    companyName: 'CloudScale Systems',
    jobTitle: 'Cloud Infrastructure Engineer',
    jobDescription: 'We need a Cloud Infrastructure Engineer to design and maintain our cloud infrastructure. Experience with containerization, orchestration, and cloud platforms is essential.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    },
    applicationDeadline: new Date('2025-01-30'),
    createdBy: '2',
    createdAt: new Date('2024-12-10'),
  },
  {
    _id: 'j19',
    companyName: 'DataFlow Analytics',
    jobTitle: 'Big Data Engineer',
    jobDescription: 'Join our big data team to process and analyze large-scale datasets. You will work with Hadoop, Spark, and other big data technologies to extract valuable insights.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [4],
      minCGPA: 8.0,
      requiredSkills: ['Hadoop', 'Spark', 'Scala', 'Big Data', 'Data Pipeline'],
    },
    applicationDeadline: new Date('2025-01-30'),
    createdBy: '2',
    createdAt: new Date('2024-12-12'),
  },
  {
    _id: 'j20',
    companyName: 'SecureNet Technologies',
    jobTitle: 'Security Engineer',
    jobDescription: 'We are seeking a Security Engineer to protect our systems from threats. You will implement security measures, conduct security audits, and respond to incidents.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['Cybersecurity', 'Penetration Testing', 'Security Auditing', 'Network Security'],
    },
    applicationDeadline: new Date('2025-01-30'),
    createdBy: '2',
    createdAt: new Date('2024-12-15'),
  },
  {
    _id: 'j21',
    companyName: 'MobileTech Solutions',
    jobTitle: 'iOS Developer',
    jobDescription: 'Join our iOS development team to create amazing mobile applications. Experience with Swift, UIKit, and iOS frameworks is required.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['Swift', 'iOS', 'UIKit', 'SwiftUI', 'Xcode'],
    },
    applicationDeadline: new Date('2025-01-30'),
    createdBy: '2',
    createdAt: new Date('2024-12-18'),
  },
  {
    _id: 'j22',
    companyName: 'WebDev Masters',
    jobTitle: 'Full Stack Web Developer',
    jobDescription: 'We need a Full Stack Web Developer to build end-to-end web applications. You will work with modern frameworks and technologies to create scalable solutions.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'REST APIs', 'TypeScript'],
    },
    applicationDeadline: new Date('2025-01-30'),
    createdBy: '2',
    createdAt: new Date('2024-12-20'),
  },
  {
    _id: 'j23',
    companyName: 'Automation Pro',
    jobTitle: 'QA Automation Engineer',
    jobDescription: 'Join our QA team to automate testing processes. You will write test scripts, set up CI/CD pipelines, and ensure software quality.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.0,
      requiredSkills: ['Selenium', 'Test Automation', 'Java', 'Python', 'CI/CD'],
    },
    applicationDeadline: new Date('2025-01-30'),
    createdBy: '2',
    createdAt: new Date('2024-12-22'),
  },
  {
    _id: 'j24',
    companyName: 'Network Solutions Inc',
    jobTitle: 'Network Engineer',
    jobDescription: 'We are looking for a Network Engineer to design and maintain our network infrastructure. Experience with routing, switching, and network protocols is essential.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology', 'Electronics'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['Networking', 'CCNA', 'Routing', 'Switching', 'Network Security'],
    },
    applicationDeadline: new Date('2025-01-30'),
    createdBy: '2',
    createdAt: new Date('2024-12-25'),
  },
  {
    _id: 'j25',
    companyName: 'CodeCraft Studios',
    jobTitle: 'Software Architect',
    jobDescription: 'Join our architecture team to design scalable software systems. You will create technical designs, evaluate technologies, and guide development teams.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [4],
      minCGPA: 8.5,
      requiredSkills: ['System Design', 'Architecture', 'Cloud Computing', 'Microservices', 'Leadership'],
    },
    applicationDeadline: new Date('2025-01-30'),
    createdBy: '2',
    createdAt: new Date('2024-12-28'),
  },
  // Additional jobs with various deadlines for pagination
  {
    _id: 'j26',
    companyName: 'DevOps Masters',
    jobTitle: 'Senior DevOps Engineer',
    jobDescription: 'We need a Senior DevOps Engineer to lead our infrastructure team. You will design CI/CD pipelines, manage cloud resources, and ensure system reliability.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [4],
      minCGPA: 8.0,
      requiredSkills: ['DevOps', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
    },
    applicationDeadline: new Date('2024-12-15'),
    createdBy: '2',
    createdAt: new Date('2024-11-25'),
  },
  {
    _id: 'j27',
    companyName: 'Frontend Experts',
    jobTitle: 'Senior Frontend Developer',
    jobDescription: 'Join our frontend team to build modern, responsive user interfaces. Experience with React, Vue, or Angular and modern design principles is required.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['React', 'Vue.js', 'TypeScript', 'CSS', 'Web Design'],
    },
    applicationDeadline: new Date('2024-12-15'),
    createdBy: '2',
    createdAt: new Date('2024-11-28'),
  },
  {
    _id: 'j28',
    companyName: 'Backend Specialists',
    jobTitle: 'Backend API Developer',
    jobDescription: 'We are seeking a Backend API Developer to build robust RESTful and GraphQL APIs. Experience with server-side technologies and database design is essential.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['Node.js', 'Express', 'GraphQL', 'MongoDB', 'REST APIs'],
    },
    applicationDeadline: new Date('2024-12-15'),
    createdBy: '2',
    createdAt: new Date('2024-12-01'),
  },
  {
    _id: 'j29',
    companyName: 'ML Innovations',
    jobTitle: 'Machine Learning Specialist',
    jobDescription: 'Join our ML team to develop and deploy machine learning models. You will work on data preprocessing, model training, and deployment pipelines.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Electronics', 'Mathematics'],
      year: [3, 4],
      minCGPA: 8.0,
      requiredSkills: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'ML Models'],
    },
    applicationDeadline: new Date('2024-12-15'),
    createdBy: '2',
    createdAt: new Date('2024-12-03'),
  },
  {
    _id: 'j30',
    companyName: 'System Architects',
    jobTitle: 'Systems Engineer',
    jobDescription: 'We need a Systems Engineer to design and maintain complex software systems. Experience with distributed systems and scalability is preferred.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [4],
      minCGPA: 8.0,
      requiredSkills: ['System Design', 'Distributed Systems', 'Scalability', 'Performance', 'Architecture'],
    },
    applicationDeadline: new Date('2024-12-15'),
    createdBy: '2',
    createdAt: new Date('2024-12-05'),
  },
  // Jobs with January 30, 2026 deadline
  {
    _id: 'j31',
    companyName: 'NextGen Software',
    jobTitle: 'Senior Full Stack Developer',
    jobDescription: 'Join our team as a Senior Full Stack Developer to build cutting-edge web applications. You will work with modern technologies and lead development initiatives.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [4],
      minCGPA: 8.0,
      requiredSkills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2025-12-01'),
  },
  {
    _id: 'j32',
    companyName: 'DataDriven Solutions',
    jobTitle: 'Senior Data Engineer',
    jobDescription: 'We are looking for a Senior Data Engineer to design and build data pipelines. Experience with big data technologies and cloud platforms is essential.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology', 'Mathematics'],
      year: [4],
      minCGPA: 8.0,
      requiredSkills: ['Node.js', 'MongoDB', 'Data Pipeline', 'Cloud', 'JavaScript'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2025-12-05'),
  },
  {
    _id: 'j33',
    companyName: 'CloudNative Inc',
    jobTitle: 'Kubernetes Specialist',
    jobDescription: 'Join our cloud team as a Kubernetes Specialist. You will manage container orchestration, design microservices architecture, and ensure high availability.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['Kubernetes', 'Docker', 'Node.js', 'CI/CD', 'Linux'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2025-12-10'),
  },
  {
    _id: 'j34',
    companyName: 'AI Vision Tech',
    jobTitle: 'Computer Vision Engineer',
    jobDescription: 'We need a Computer Vision Engineer to develop image processing and recognition systems. Experience with deep learning frameworks and computer vision libraries is required.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Electronics'],
      year: [3, 4],
      minCGPA: 8.0,
      requiredSkills: ['JavaScript', 'React', 'Node.js', 'Computer Vision', 'Deep Learning'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2025-12-12'),
  },
  {
    _id: 'j35',
    companyName: 'Blockchain Ventures',
    jobTitle: 'Smart Contract Developer',
    jobDescription: 'Join our blockchain team to develop and audit smart contracts. You will work on DeFi protocols, NFT platforms, and blockchain applications.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [4],
      minCGPA: 8.0,
      requiredSkills: ['Solidity', 'Ethereum', 'JavaScript', 'Smart Contracts', 'Blockchain'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2025-12-15'),
  },
  {
    _id: 'j36',
    companyName: 'Mobile Innovations',
    jobTitle: 'Flutter Developer',
    jobDescription: 'We are seeking a Flutter Developer to build cross-platform mobile applications. Experience with Dart, Flutter framework, and mobile app architecture is preferred.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['Flutter', 'Dart', 'React', 'REST APIs', 'JavaScript'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2025-12-18'),
  },
  {
    _id: 'j37',
    companyName: 'Security First',
    jobTitle: 'Penetration Tester',
    jobDescription: 'Join our security team as a Penetration Tester. You will identify vulnerabilities, conduct security assessments, and help secure our systems.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['Penetration Testing', 'Ethical Hacking', 'Node.js', 'Network Security', 'Linux'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2025-12-20'),
  },
  {
    _id: 'j38',
    companyName: 'Game Studio Pro',
    jobTitle: 'Unreal Engine Developer',
    jobDescription: 'We need an Unreal Engine Developer to create immersive gaming experiences. Experience with C++, Blueprints, and game development is essential.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['Unreal Engine', 'C++', 'JavaScript', '3D Graphics', 'Game Development'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2025-12-22'),
  },
  {
    _id: 'j39',
    companyName: 'API Gateway Corp',
    jobTitle: 'API Developer',
    jobDescription: 'Join our API team to design and develop RESTful and GraphQL APIs. You will work on API gateway, microservices, and integration solutions.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['REST APIs', 'GraphQL', 'Node.js', 'API Design', 'Microservices'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2025-12-25'),
  },
  {
    _id: 'j40',
    companyName: 'Database Masters',
    jobTitle: 'Database Architect',
    jobDescription: 'We are looking for a Database Architect to design scalable database solutions. Experience with SQL, NoSQL, and database optimization is required.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [4],
      minCGPA: 8.0,
      requiredSkills: ['SQL', 'Database Design', 'PostgreSQL', 'MongoDB', 'Performance Tuning'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2025-12-28'),
  },
  {
    _id: 'j41',
    companyName: 'Frontend Masters',
    jobTitle: 'React Native Developer',
    jobDescription: 'Join our mobile team as a React Native Developer. You will build cross-platform mobile apps using React Native and modern mobile development practices.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['React Native', 'JavaScript', 'Mobile Development', 'Redux', 'APIs'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2025-12-30'),
  },
  {
    _id: 'j42',
    companyName: 'Backend Experts',
    jobTitle: 'Go Developer',
    jobDescription: 'We need a Go Developer to build high-performance backend services. Experience with Go, microservices, and cloud platforms is preferred.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['Go', 'Microservices', 'Node.js', 'REST APIs', 'Docker'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2026-01-02'),
  },
  {
    _id: 'j43',
    companyName: 'ML Production',
    jobTitle: 'MLOps Engineer',
    jobDescription: 'Join our MLOps team to deploy and maintain machine learning models in production. Experience with ML pipelines, model serving, and monitoring is essential.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Electronics', 'Mathematics'],
      year: [3, 4],
      minCGPA: 8.0,
      requiredSkills: ['MLOps', 'Node.js', 'Docker', 'Kubernetes', 'JavaScript'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2026-01-05'),
  },
  {
    _id: 'j44',
    companyName: 'Cloud Security Pro',
    jobTitle: 'Cloud Security Engineer',
    jobDescription: 'We are seeking a Cloud Security Engineer to secure our cloud infrastructure. You will implement security policies, conduct audits, and respond to threats.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['Cloud Security', 'AWS', 'Node.js', 'Security Policies', 'Compliance'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2026-01-08'),
  },
  {
    _id: 'j45',
    companyName: 'UI Design Studio',
    jobTitle: 'UI/UX Designer Developer',
    jobDescription: 'Join our design team as a UI/UX Designer Developer. You will create beautiful interfaces and implement them using modern frontend technologies.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['UI/UX Design', 'Figma', 'React', 'CSS', 'Design Systems'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2026-01-10'),
  },
  {
    _id: 'j46',
    companyName: 'DevOps Automation',
    jobTitle: 'CI/CD Engineer',
    jobDescription: 'We need a CI/CD Engineer to automate our deployment pipelines. Experience with Jenkins, GitLab CI, GitHub Actions, and automation tools is required.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['CI/CD', 'Jenkins', 'Node.js', 'Docker', 'Automation'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2026-01-12'),
  },
  {
    _id: 'j47',
    companyName: 'Data Analytics Hub',
    jobTitle: 'Business Intelligence Developer',
    jobDescription: 'Join our BI team to develop dashboards and analytics solutions. You will work with data visualization tools and create insights for business decisions.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology', 'Mathematics'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['BI Tools', 'SQL', 'JavaScript', 'Data Visualization', 'Analytics'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2026-01-15'),
  },
  {
    _id: 'j48',
    companyName: 'Serverless Solutions',
    jobTitle: 'Serverless Architect',
    jobDescription: 'We are looking for a Serverless Architect to design serverless applications. Experience with AWS Lambda, Azure Functions, and serverless patterns is essential.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [4],
      minCGPA: 8.0,
      requiredSkills: ['Serverless', 'AWS Lambda', 'Azure Functions', 'Cloud Functions', 'Architecture'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2026-01-18'),
  },
  {
    _id: 'j49',
    companyName: 'Performance Engineers',
    jobTitle: 'Performance Engineer',
    jobDescription: 'Join our performance team to optimize application performance. You will conduct load testing, identify bottlenecks, and improve system efficiency.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['Performance Testing', 'Load Testing', 'Node.js', 'Monitoring', 'JavaScript'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2026-01-20'),
  },
  {
    _id: 'j50',
    companyName: 'Microservices Pro',
    jobTitle: 'Microservices Developer',
    jobDescription: 'We need a Microservices Developer to build scalable microservices architecture. Experience with service mesh, API gateway, and distributed systems is preferred.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [4],
      minCGPA: 8.0,
      requiredSkills: ['Microservices', 'Service Mesh', 'Node.js', 'Distributed Systems', 'Cloud'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2026-01-22'),
  },
  {
    _id: 'j51',
    companyName: 'IoT Solutions',
    jobTitle: 'IoT Developer',
    jobDescription: 'Join our IoT team to develop Internet of Things solutions. You will work with embedded systems, sensors, and IoT platforms.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Electronics', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['IoT', 'Embedded Systems', 'Node.js', 'MQTT', 'JavaScript'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2026-01-24'),
  },
  {
    _id: 'j52',
    companyName: 'AR/VR Studio',
    jobTitle: 'AR/VR Developer',
    jobDescription: 'We are seeking an AR/VR Developer to create immersive experiences. Experience with Unity, Unreal Engine, or AR/VR frameworks is required.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['AR/VR', 'Unity', 'JavaScript', 'Game Development', 'React'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2026-01-26'),
  },
  {
    _id: 'j53',
    companyName: 'Test Automation Lab',
    jobTitle: 'Test Automation Engineer',
    jobDescription: 'Join our QA team as a Test Automation Engineer. You will develop automated test frameworks and ensure software quality.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.0,
      requiredSkills: ['Test Automation', 'Selenium', 'JavaScript', 'Testing Frameworks', 'Node.js'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2026-01-28'),
  },
  {
    _id: 'j54',
    companyName: 'Content Management Systems',
    jobTitle: 'CMS Developer',
    jobDescription: 'We need a CMS Developer to build and customize content management systems. Experience with WordPress, Drupal, or headless CMS is preferred.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['CMS', 'WordPress', 'Headless CMS', 'PHP', 'JavaScript'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2026-01-30'),
  },
  {
    _id: 'j55',
    companyName: 'E-commerce Platform',
    jobTitle: 'E-commerce Developer',
    jobDescription: 'Join our e-commerce team to build online shopping platforms. You will work with payment gateways, shopping carts, and e-commerce frameworks.',
    eligibilityCriteria: {
      branch: ['Computer Science', 'Information Technology'],
      year: [3, 4],
      minCGPA: 7.5,
      requiredSkills: ['E-commerce', 'Payment Gateways', 'React', 'Web Development', 'Node.js'],
    },
    applicationDeadline: new Date('2026-01-30'),
    createdBy: '2',
    createdAt: new Date('2026-02-01'),
  },
];

export const dummyApplications = [
  {
    _id: 'a1',
    studentId: '1',
    jobId: 'j1',
    status: 'Shortlisted',
    appliedAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    _id: 'a2',
    studentId: '1',
    jobId: 'j2',
    status: 'Applied',
    appliedAt: new Date('2024-02-08'),
    updatedAt: new Date('2024-02-08'),
  },
  {
    _id: 'a3',
    studentId: '1',
    jobId: 'j3',
    status: 'Rejected',
    appliedAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-05'),
  },
  {
    _id: 'a4',
    studentId: '3',
    jobId: 'j2',
    status: 'Selected',
    appliedAt: new Date('2024-02-06'),
    updatedAt: new Date('2024-02-12'),
  },
  {
    _id: 'a5',
    studentId: '3',
    jobId: 'j5',
    status: 'Applied',
    appliedAt: new Date('2024-02-13'),
    updatedAt: new Date('2024-02-13'),
  },
  {
    _id: 'a6',
    studentId: '1',
    jobId: 'j4',
    status: 'Selected',
    appliedAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    _id: 'a7',
    studentId: '1',
    jobId: 'j7',
    status: 'Selected',
    appliedAt: new Date('2024-02-18'),
    updatedAt: new Date('2024-02-25'),
  },
  {
    _id: 'a8',
    studentId: '1',
    jobId: 'j9',
    status: 'Selected',
    appliedAt: new Date('2024-11-05'),
    updatedAt: new Date('2024-11-15'),
  },
];

// Helper function to check if student is eligible for a job
export const isEligible = (student, job) => {
  if (!student || !job || !job.eligibilityCriteria) {
    return false;
  }
  
  const { eligibilityCriteria } = job;
  
  // Check branch
  if (eligibilityCriteria.branch.length > 0 && !eligibilityCriteria.branch.includes(student.branch)) {
    return false;
  }
  
  // Check year
  if (eligibilityCriteria.year.length > 0 && !eligibilityCriteria.year.includes(student.year)) {
    return false;
  }
  
  // Check CGPA
  if (student.CGPA < eligibilityCriteria.minCGPA) {
    return false;
  }
  
  // Check skills (at least one required skill should match)
  const hasRequiredSkill = eligibilityCriteria.requiredSkills.some(skill =>
    student.skills.some(studentSkill => 
      studentSkill.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(studentSkill.toLowerCase())
    )
  );
  
  if (!hasRequiredSkill && eligibilityCriteria.requiredSkills.length > 0) {
    return false;
  }
  
  return true;
};

// Helper function to get application status for a student and job
export const getApplicationStatus = (studentId, jobId, applications) => {
  const application = applications.find(
    app => app.studentId === studentId && app.jobId === jobId
  );
  return application ? application.status : null;
};

