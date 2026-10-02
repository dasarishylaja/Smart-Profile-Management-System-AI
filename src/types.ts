export type NavSection =
  | 'dashboard'
  | 'my-profile'
  | 'personal-info'
  | 'college-details'
  | 'academic-performance'
  | 'attendance'
  | 'projects'
  | 'certificates'
  | 'skills'
  | 'achievements'
  | 'sports'
  | 'extracurricular'
  | 'internships'
  | 'events'
  | 'documents'
  | 'resume'
  | 'public-portfolio'
  | 'analytics'
  | 'settings'
  | 'admin';

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role: 'student' | 'admin';
  collegeName: string;
  department: string;
  academicYear: string;
  createdAt: string;
  status: 'active' | 'reported' | 'suspended';
  reportReason?: string;
}

export interface PersonalInfo {
  userId: string;
  fullName: string;
  profilePhoto: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  linkedIn: string;
  github: string;
  portfolioWebsite: string;
  aboutMe: string;
  careerObjective: string;
}

export interface CollegeDetails {
  userId: string;
  collegeName: string;
  university: string;
  collegeIdRollNo: string;
  registerNumber: string;
  department: string;
  degree: string;
  academicYear: string;
  batch: string;
  section: string;
  semester: string;
  admissionYear: string;
  expectedGraduationYear: string;
}

export interface AcademicRecord {
  id: string;
  userId: string;
  academicYear: string;
  semester: string;
  subjectName: string;
  subjectCode: string;
  marks: number;
  grade: string;
  credits: number;
  gpa: number;
  cgpa: number;
  percentage: number;
  backlogs: number;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  academicYear: string;
  semester: string;
  subject: string;
  subjectCode: string;
  totalClasses: number;
  classesAttended: number;
  classesAbsent: number;
  attendancePercentage: number;
}

export interface ProjectItem {
  id: string;
  userId: string;
  title: string;
  description: string;
  problemStatement: string;
  objective: string;
  technologiesUsed: string[];
  role: string;
  teamMembers: string;
  duration: string;
  status: 'Completed' | 'In Progress' | 'Prototype';
  githubLink: string;
  liveDemoLink: string;
  image: string;
  outcome: string;
  year: string;
}

export type CertificateCategory =
  | 'Internship'
  | 'Workshop'
  | 'Course'
  | 'NPTEL'
  | 'Hackathon'
  | 'Symposium'
  | 'Paper Presentation'
  | 'Technical Event'
  | 'Online Certification'
  | 'Other';

export interface CertificateItem {
  id: string;
  userId: string;
  name: string;
  category: CertificateCategory;
  issuingOrganization: string;
  issueDate: string;
  certificateId: string;
  skillsTopics: string[];
  fileImage: string;
  verificationLink: string;
  description: string;
}

export type SkillCategory =
  | 'Programming'
  | 'Web Development'
  | 'Database'
  | 'AI/ML'
  | 'Data Science'
  | 'Cloud'
  | 'Tools'
  | 'Soft Skills'
  | 'Communication'
  | 'Other';

export interface SkillItem {
  id: string;
  userId: string;
  name: string;
  category: SkillCategory;
  proficiencyLevel: number; // 1 to 100
  yearsExperience: string;
  description: string;
}

export interface AchievementItem {
  id: string;
  userId: string;
  title: string;
  category: string;
  description: string;
  date: string;
  organization: string;
  eventName: string;
  positionAward: string;
  prize: string;
  proofFile: string;
  verificationLink: string;
}

export type SportLevel =
  | 'College'
  | 'University'
  | 'District'
  | 'State'
  | 'National'
  | 'International';

export interface SportItem {
  id: string;
  userId: string;
  sportName: string;
  eventName: string;
  level: SportLevel;
  position: string;
  achievement: string;
  organization: string;
  date: string;
  certificate: string;
  description: string;
}

export interface ExtracurricularItem {
  id: string;
  userId: string;
  activityName: string;
  category: string;
  organization: string;
  role: string;
  date: string;
  description: string;
  achievement: string;
  certificateProof: string;
}

export interface InternshipItem {
  id: string;
  userId: string;
  companyOrganization: string;
  role: string;
  internshipType: 'On-site' | 'Remote' | 'Hybrid';
  startDate: string;
  endDate: string;
  duration: string;
  technologiesSkills: string[];
  description: string;
  certificate: string;
  offerLetter: string;
  projectTitle: string;
  verificationLink: string;
}

export interface EventWorkshopItem {
  id: string;
  userId: string;
  eventName: string;
  eventType: 'Workshop' | 'Symposium' | 'Seminar' | 'Conference' | 'Bootcamp' | 'Hackathon';
  organization: string;
  date: string;
  location: string;
  roleParticipation: string;
  description: string;
  certificate: string;
  proof: string;
}

export type DocumentCategory =
  | 'Certificates'
  | 'Resume'
  | 'Internship documents'
  | 'Project documents'
  | 'Achievement proofs'
  | 'Other academic documents';

export interface DocumentItem {
  id: string;
  userId: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  category: DocumentCategory;
  isPrivate: boolean;
  fileUrl: string;
  notes: string;
}

export interface PrivacySettings {
  userId: string;
  isPublicProfile: boolean;
  profileSlug: string;
  // Sensitive personal fields - MUST be false by default per privacy requirement
  showPhoneNumber: boolean;
  showAddress: boolean;
  showDateOfBirth: boolean;
  showStudentId: boolean;
  showPrivateDocuments: boolean;
  // Section visibility controls
  showEducation: boolean;
  showAcademicPerformance: boolean;
  showAttendance: boolean;
  showSkills: boolean;
  showProjects: boolean;
  showInternships: boolean;
  showCertificates: boolean;
  showAchievements: boolean;
  showSports: boolean;
  showExtracurricular: boolean;
  showEvents: boolean;
  // Notification preferences
  emailAlerts: boolean;
  semesterReminders: boolean;
  portfolioViewNotifications: boolean;
}

export interface StudentCompleteProfile {
  user: UserAccount;
  personalInfo: PersonalInfo;
  collegeDetails: CollegeDetails;
  academicRecords: AcademicRecord[];
  attendance: AttendanceRecord[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  skills: SkillItem[];
  achievements: AchievementItem[];
  sports: SportItem[];
  extracurricular: ExtracurricularItem[];
  internships: InternshipItem[];
  events: EventWorkshopItem[];
  documents: DocumentItem[];
  privacy: PrivacySettings;
}
