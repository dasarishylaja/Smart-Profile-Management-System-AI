import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentCompleteProfile,
  UserAccount,
  PersonalInfo,
  CollegeDetails,
  AcademicRecord,
  AttendanceRecord,
  ProjectItem,
  CertificateItem,
  SkillItem,
  AchievementItem,
  SportItem,
  ExtracurricularItem,
  InternshipItem,
  EventWorkshopItem,
  DocumentItem,
  PrivacySettings,
  NavSection,
} from '../types';
import {
  INITIAL_POOJA_PROFILE,
  INITIAL_ADMIN_USER,
  INITIAL_OTHER_STUDENTS,
  DEMO_USER_ID,
  ADMIN_USER_ID,
  ASSETS,
} from '../data/demoData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

export interface ProfileCompletionSection {
  key: string;
  label: string;
  completed: boolean;
  navTarget: NavSection;
  suggestion: string;
}

interface ProfileContextType {
  currentUser: UserAccount | null;
  activeProfile: StudentCompleteProfile;
  allUsers: UserAccount[];
  activeNav: NavSection;
  setActiveNav: (nav: NavSection) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  toasts: ToastMessage[];
  notify: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
  // Auth
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (data: {
    fullName: string;
    email: string;
    password: string;
    collegeName: string;
    department: string;
    academicYear: string;
  }) => { ok: boolean; error?: string };
  resetPassword: (email: string, newPassword: string) => { ok: boolean; error?: string };
  loginAsDemoStudent: () => void;
  loginAsDemoAdmin: () => void;
  logout: () => void;
  deleteCurrentAccount: () => void;
  resetToDemoData: () => void;
  // Profile Completion
  completionPercentage: number;
  completionSections: ProfileCompletionSection[];
  // Module Updaters
  updatePersonalInfo: (info: PersonalInfo) => void;
  updateCollegeDetails: (details: CollegeDetails) => void;
  saveAcademicRecord: (rec: Omit<AcademicRecord, 'id' | 'userId'> & { id?: string }) => void;
  deleteAcademicRecord: (id: string) => void;
  saveAttendanceRecord: (rec: Omit<AttendanceRecord, 'id' | 'userId'> & { id?: string }) => void;
  deleteAttendanceRecord: (id: string) => void;
  saveProject: (proj: Omit<ProjectItem, 'id' | 'userId'> & { id?: string }) => void;
  deleteProject: (id: string) => void;
  saveCertificate: (cert: Omit<CertificateItem, 'id' | 'userId'> & { id?: string }) => void;
  deleteCertificate: (id: string) => void;
  saveSkill: (skill: Omit<SkillItem, 'id' | 'userId'> & { id?: string }) => void;
  deleteSkill: (id: string) => void;
  saveAchievement: (ach: Omit<AchievementItem, 'id' | 'userId'> & { id?: string }) => void;
  deleteAchievement: (id: string) => void;
  saveSport: (sport: Omit<SportItem, 'id' | 'userId'> & { id?: string }) => void;
  deleteSport: (id: string) => void;
  saveExtracurricular: (item: Omit<ExtracurricularItem, 'id' | 'userId'> & { id?: string }) => void;
  deleteExtracurricular: (id: string) => void;
  saveInternship: (item: Omit<InternshipItem, 'id' | 'userId'> & { id?: string }) => void;
  deleteInternship: (id: string) => void;
  saveEvent: (item: Omit<EventWorkshopItem, 'id' | 'userId'> & { id?: string }) => void;
  deleteEvent: (id: string) => void;
  saveDocument: (item: Omit<DocumentItem, 'id' | 'userId'> & { id?: string }) => void;
  deleteDocument: (id: string) => void;
  updatePrivacy: (privacy: PrivacySettings) => void;
  // Admin actions
  updateUserStatus: (userId: string, status: 'active' | 'reported' | 'suspended', reason?: string) => void;
  systemCategories: string[];
  addSystemCategory: (cat: string) => void;
  removeSystemCategory: (cat: string) => void;
}

const STORAGE_KEYS = {
  PROFILES: 'spms_profiles_map_v1',
  USERS: 'spms_users_list_v1',
  CURRENT_USER_ID: 'spms_active_user_id_v1',
  DARK_MODE: 'spms_dark_mode_v1',
  CATEGORIES: 'spms_system_categories_v1',
};

function createBlankProfileForUser(user: UserAccount): StudentCompleteProfile {
  const slug = user.fullName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return {
    user,
    personalInfo: {
      userId: user.id,
      fullName: user.fullName,
      profilePhoto: ASSETS.avatarPooja,
      dateOfBirth: '',
      gender: '',
      email: user.email,
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      country: 'India',
      linkedIn: '',
      github: '',
      portfolioWebsite: `https://smartprofile.edu/profile/${slug || 'student'}`,
      aboutMe: '',
      careerObjective: '',
    },
    collegeDetails: {
      userId: user.id,
      collegeName: user.collegeName,
      university: 'Anna University, Chennai',
      collegeIdRollNo: '',
      registerNumber: '',
      department: user.department,
      degree: 'B.Tech / B.E.',
      academicYear: user.academicYear,
      batch: '2024 – 2028',
      section: 'A',
      semester: 'Semester 4',
      admissionYear: '2024',
      expectedGraduationYear: '2028',
    },
    academicRecords: [],
    attendance: [],
    projects: [],
    certificates: [],
    skills: [],
    achievements: [],
    sports: [],
    extracurricular: [],
    internships: [],
    events: [],
    documents: [],
    privacy: {
      userId: user.id,
      isPublicProfile: true,
      profileSlug: slug || 'student',
      showPhoneNumber: false,
      showAddress: false,
      showDateOfBirth: false,
      showStudentId: false,
      showPrivateDocuments: false,
      showEducation: true,
      showAcademicPerformance: true,
      showAttendance: true,
      showSkills: true,
      showProjects: true,
      showInternships: true,
      showCertificates: true,
      showAchievements: true,
      showSports: true,
      showExtracurricular: true,
      showEvents: true,
      emailAlerts: true,
      semesterReminders: true,
      portfolioViewNotifications: true,
    },
  };
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profilesMap, setProfilesMap] = useState<Record<string, StudentCompleteProfile>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed[DEMO_USER_ID]) {
          // Ensure fresh generated image references stay valid
          parsed[DEMO_USER_ID].personalInfo.profilePhoto =
            parsed[DEMO_USER_ID].personalInfo.profilePhoto || ASSETS.avatarPooja;
          return parsed;
        }
      }
    } catch {
      // ignore storage errors
    }
    return {
      [DEMO_USER_ID]: INITIAL_POOJA_PROFILE,
    };
  });

  const [allUsers, setAllUsers] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return [INITIAL_POOJA_PROFILE.user, INITIAL_ADMIN_USER, ...INITIAL_OTHER_STUDENTS];
  });

  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    } catch {
      return null;
    }
  });

  const [activeNav, setActiveNav] = useState<NavSection>('dashboard');

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.DARK_MODE) === 'true';
    } catch {
      return false;
    }
  });

  const [systemCategories, setSystemCategories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      'Internship',
      'Workshop',
      'Course',
      'NPTEL',
      'Hackathon',
      'Symposium',
      'Paper Presentation',
      'Technical Event',
      'Online Certification',
      'Sports & Athletics',
      'NSS & Community Service',
    ];
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profilesMap));
    } catch {
      // ignore quota error
    }
  }, [profilesMap]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(allUsers));
    } catch {
      // ignore
    }
  }, [allUsers]);

  useEffect(() => {
    try {
      if (currentUserId) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
      }
    } catch {
      // ignore
    }
  }, [currentUserId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, String(darkMode));
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // ignore
    }
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(systemCategories));
    } catch {
      // ignore
    }
  }, [systemCategories]);

  const notify = (title: string, message?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const currentUser = allUsers.find((u) => u.id === currentUserId) || null;

  // For Admin or fallback, show Pooja's profile as the active student profile
  const activeStudentUserId =
    currentUser && currentUser.role === 'student' ? currentUser.id : DEMO_USER_ID;

  const activeProfile: StudentCompleteProfile =
    profilesMap[activeStudentUserId] || INITIAL_POOJA_PROFILE;

  const updateActiveProfile = (updater: (prev: StudentCompleteProfile) => StudentCompleteProfile) => {
    setProfilesMap((prev) => {
      const current = prev[activeStudentUserId] || INITIAL_POOJA_PROFILE;
      return {
        ...prev,
        [activeStudentUserId]: updater(current),
      };
    });
  };

  // Auth handlers
  const login = (email: string, password: string): { ok: boolean; error?: string } => {
    const trimmedEmail = email.trim().toLowerCase();
    const user = allUsers.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (!user) {
      return { ok: false, error: 'No account found with that email address.' };
    }
    if (user.passwordHash !== password) {
      return { ok: false, error: 'Incorrect password. Please try again or reset your password.' };
    }
    if (user.status === 'suspended') {
      return { ok: false, error: 'This account has been suspended by an administrator.' };
    }
    setCurrentUserId(user.id);
    setActiveNav(user.role === 'admin' ? 'admin' : 'dashboard');
    notify(`Welcome back, ${user.fullName}`, 'Your digital profile workspace is ready.');
    return { ok: true };
  };

  const register = (data: {
    fullName: string;
    email: string;
    password: string;
    collegeName: string;
    department: string;
    academicYear: string;
  }): { ok: boolean; error?: string } => {
    const trimmedEmail = data.email.trim().toLowerCase();
    if (allUsers.some((u) => u.email.toLowerCase() === trimmedEmail)) {
      return { ok: false, error: 'An account with this email is already registered.' };
    }
    const newId = `user_${Date.now()}`;
    const newUser: UserAccount = {
      id: newId,
      fullName: data.fullName.trim(),
      email: trimmedEmail,
      passwordHash: data.password,
      role: 'student',
      collegeName: data.collegeName.trim(),
      department: data.department.trim(),
      academicYear: data.academicYear.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
      status: 'active',
    };
    const newProfile = createBlankProfileForUser(newUser);
    setAllUsers((prev) => [...prev, newUser]);
    setProfilesMap((prev) => ({ ...prev, [newId]: newProfile }));
    setCurrentUserId(newId);
    setActiveNav('dashboard');
    notify('Account Created Successfully', `Welcome to Smart Profile Management System, ${newUser.fullName}!`);
    return { ok: true };
  };

  const resetPassword = (email: string, newPassword: string): { ok: boolean; error?: string } => {
    const trimmedEmail = email.trim().toLowerCase();
    const userExists = allUsers.some((u) => u.email.toLowerCase() === trimmedEmail);
    if (!userExists) {
      return { ok: false, error: 'No registered student or admin found with that email.' };
    }
    setAllUsers((prev) =>
      prev.map((u) => (u.email.toLowerCase() === trimmedEmail ? { ...u, passwordHash: newPassword } : u))
    );
    notify('Password Updated', 'You can now sign in using your new password.');
    return { ok: true };
  };

  const loginAsDemoStudent = () => {
    setCurrentUserId(DEMO_USER_ID);
    setActiveNav('dashboard');
    notify('Signed in as Pooja Dasari', "St. Peter's College of Engineering and Technology · 2nd Year CSBS");
  };

  const loginAsDemoAdmin = () => {
    setCurrentUserId(ADMIN_USER_ID);
    setActiveNav('admin');
    notify('Signed in as Administrator', 'Admin Governance & Student Verification Console');
  };

  const logout = () => {
    setCurrentUserId(null);
    setActiveNav('dashboard');
    notify('Signed Out', 'You have been safely logged out of your session.', 'info');
  };

  const deleteCurrentAccount = () => {
    if (!currentUserId) return;
    if (currentUserId === DEMO_USER_ID) {
      notify('Demo Protection', 'Pooja Dasari demo account cannot be permanently deleted. Resetting to defaults instead.', 'info');
      resetToDemoData();
      return;
    }
    const idToDelete = currentUserId;
    setCurrentUserId(null);
    setAllUsers((prev) => prev.filter((u) => u.id !== idToDelete));
    setProfilesMap((prev) => {
      const next = { ...prev };
      delete next[idToDelete];
      return next;
    });
    notify('Account Deleted', 'Your account and associated records have been removed.', 'info');
  };

  const resetToDemoData = () => {
    setProfilesMap((prev) => ({
      ...prev,
      [DEMO_USER_ID]: INITIAL_POOJA_PROFILE,
    }));
    setAllUsers([INITIAL_POOJA_PROFILE.user, INITIAL_ADMIN_USER, ...INITIAL_OTHER_STUDENTS]);
    notify('Demo Data Restored', 'Pooja Dasari sample profile has been reset to initial state.');
  };

  // Profile Completion Calculation
  const completionSections: ProfileCompletionSection[] = [
    {
      key: 'personal',
      label: 'Personal Information',
      completed: Boolean(
        activeProfile.personalInfo.fullName &&
          activeProfile.personalInfo.email &&
          activeProfile.personalInfo.phoneNumber &&
          activeProfile.personalInfo.aboutMe
      ),
      navTarget: 'personal-info',
      suggestion: 'Add your phone number, bio, and social profile links.',
    },
    {
      key: 'college',
      label: 'College Details',
      completed: Boolean(
        activeProfile.collegeDetails.collegeName &&
          activeProfile.collegeDetails.collegeIdRollNo &&
          activeProfile.collegeDetails.department
      ),
      navTarget: 'college-details',
      suggestion: 'Complete your Roll Number, Register Number, and Batch details.',
    },
    {
      key: 'academic',
      label: 'Academic Details',
      completed: activeProfile.academicRecords.length > 0,
      navTarget: 'academic-performance',
      suggestion: 'Log your semester-wise subject grades and CGPA.',
    },
    {
      key: 'attendance',
      label: 'Attendance Records',
      completed: activeProfile.attendance.length > 0,
      navTarget: 'attendance',
      suggestion: 'Track your subject-wise classes attended and percentage.',
    },
    {
      key: 'skills',
      label: 'Skills',
      completed: activeProfile.skills.length >= 3,
      navTarget: 'skills',
      suggestion: 'Add at least 3 technical or communication skills.',
    },
    {
      key: 'projects',
      label: 'Projects',
      completed: activeProfile.projects.length > 0,
      navTarget: 'projects',
      suggestion: 'Showcase your academic or personal software projects.',
    },
    {
      key: 'certificates',
      label: 'Certificates',
      completed: activeProfile.certificates.length > 0,
      navTarget: 'certificates',
      suggestion: 'Upload NPTEL, hackathon, or course certifications.',
    },
    {
      key: 'achievements',
      label: 'Achievements',
      completed: activeProfile.achievements.length > 0,
      navTarget: 'achievements',
      suggestion: 'Record competition awards, scholarships, or paper prizes.',
    },
    {
      key: 'internships',
      label: 'Internships',
      completed: activeProfile.internships.length > 0,
      navTarget: 'internships',
      suggestion: 'Add your industry internship or winter externship experience.',
    },
    {
      key: 'sports',
      label: 'Sports & Extracurricular',
      completed: activeProfile.sports.length > 0 || activeProfile.extracurricular.length > 0,
      navTarget: 'sports',
      suggestion: 'Include your sports tournaments, NSS, or club leadership roles.',
    },
  ];

  const completedCount = completionSections.filter((s) => s.completed).length;
  const completionPercentage = Math.round((completedCount / completionSections.length) * 100);

  // Module CRUD implementations
  const updatePersonalInfo = (info: PersonalInfo) => {
    updateActiveProfile((prev) => ({
      ...prev,
      personalInfo: info,
      user: {
        ...prev.user,
        fullName: info.fullName,
        email: info.email,
      },
    }));
    setAllUsers((prev) =>
      prev.map((u) =>
        u.id === activeStudentUserId ? { ...u, fullName: info.fullName, email: info.email } : u
      )
    );
    notify('Personal Information Saved', 'Your identity and contact details have been updated.');
  };

  const updateCollegeDetails = (details: CollegeDetails) => {
    updateActiveProfile((prev) => ({
      ...prev,
      collegeDetails: details,
      user: {
        ...prev.user,
        collegeName: details.collegeName,
        department: details.department,
        academicYear: details.academicYear,
      },
    }));
    setAllUsers((prev) =>
      prev.map((u) =>
        u.id === activeStudentUserId
          ? {
              ...u,
              collegeName: details.collegeName,
              department: details.department,
              academicYear: details.academicYear,
            }
          : u
      )
    );
    notify('College Details Updated', 'Institution and academic enrollment records saved.');
  };

  const saveAcademicRecord = (rec: Omit<AcademicRecord, 'id' | 'userId'> & { id?: string }) => {
    updateActiveProfile((prev) => {
      const exists = rec.id && prev.academicRecords.some((r) => r.id === rec.id);
      const nextRecord: AcademicRecord = {
        ...rec,
        id: rec.id || `acad_${Date.now()}`,
        userId: activeStudentUserId,
      };
      return {
        ...prev,
        academicRecords: exists
          ? prev.academicRecords.map((r) => (r.id === rec.id ? nextRecord : r))
          : [...prev.academicRecords, nextRecord],
      };
    });
    notify(rec.id ? 'Academic Record Updated' : 'Subject Record Added', `${rec.subjectName} (${rec.semester})`);
  };

  const deleteAcademicRecord = (id: string) => {
    updateActiveProfile((prev) => ({
      ...prev,
      academicRecords: prev.academicRecords.filter((r) => r.id !== id),
    }));
    notify('Academic Record Removed', 'The subject entry has been deleted.', 'info');
  };

  const saveAttendanceRecord = (rec: Omit<AttendanceRecord, 'id' | 'userId'> & { id?: string }) => {
    updateActiveProfile((prev) => {
      const exists = rec.id && prev.attendance.some((r) => r.id === rec.id);
      const nextRecord: AttendanceRecord = {
        ...rec,
        id: rec.id || `att_${Date.now()}`,
        userId: activeStudentUserId,
      };
      return {
        ...prev,
        attendance: exists
          ? prev.attendance.map((r) => (r.id === rec.id ? nextRecord : r))
          : [...prev.attendance, nextRecord],
      };
    });
    notify(rec.id ? 'Attendance Updated' : 'Attendance Entry Logged', `${rec.subject} — ${rec.attendancePercentage.toFixed(1)}%`);
  };

  const deleteAttendanceRecord = (id: string) => {
    updateActiveProfile((prev) => ({
      ...prev,
      attendance: prev.attendance.filter((r) => r.id !== id),
    }));
    notify('Attendance Entry Deleted', 'Subject attendance record removed.', 'info');
  };

  const saveProject = (proj: Omit<ProjectItem, 'id' | 'userId'> & { id?: string }) => {
    updateActiveProfile((prev) => {
      const exists = proj.id && prev.projects.some((p) => p.id === proj.id);
      const nextItem: ProjectItem = {
        ...proj,
        id: proj.id || `proj_${Date.now()}`,
        userId: activeStudentUserId,
        image: proj.image || ASSETS.projectFintechImg,
      };
      return {
        ...prev,
        projects: exists
          ? prev.projects.map((p) => (p.id === proj.id ? nextItem : p))
          : [nextItem, ...prev.projects],
      };
    });
    notify(proj.id ? 'Project Updated' : 'Project Added', proj.title);
  };

  const deleteProject = (id: string) => {
    updateActiveProfile((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
    notify('Project Deleted', 'Project has been removed from your profile.', 'info');
  };

  const saveCertificate = (cert: Omit<CertificateItem, 'id' | 'userId'> & { id?: string }) => {
    updateActiveProfile((prev) => {
      const exists = cert.id && prev.certificates.some((c) => c.id === cert.id);
      const nextItem: CertificateItem = {
        ...cert,
        id: cert.id || `cert_${Date.now()}`,
        userId: activeStudentUserId,
        fileImage: cert.fileImage || ASSETS.projectIotImg,
      };
      return {
        ...prev,
        certificates: exists
          ? prev.certificates.map((c) => (c.id === cert.id ? nextItem : c))
          : [nextItem, ...prev.certificates],
      };
    });
    notify(cert.id ? 'Certificate Updated' : 'Certificate Added', cert.name);
  };

  const deleteCertificate = (id: string) => {
    updateActiveProfile((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((c) => c.id !== id),
    }));
    notify('Certificate Deleted', 'Certificate removed from your vault.', 'info');
  };

  const saveSkill = (skill: Omit<SkillItem, 'id' | 'userId'> & { id?: string }) => {
    updateActiveProfile((prev) => {
      const exists = skill.id && prev.skills.some((s) => s.id === skill.id);
      const nextItem: SkillItem = {
        ...skill,
        id: skill.id || `skill_${Date.now()}`,
        userId: activeStudentUserId,
      };
      return {
        ...prev,
        skills: exists
          ? prev.skills.map((s) => (s.id === skill.id ? nextItem : s))
          : [...prev.skills, nextItem],
      };
    });
    notify(skill.id ? 'Skill Updated' : 'Skill Added', `${skill.name} (${skill.proficiencyLevel}%)`);
  };

  const deleteSkill = (id: string) => {
    updateActiveProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
    notify('Skill Removed', 'Skill entry deleted.', 'info');
  };

  const saveAchievement = (ach: Omit<AchievementItem, 'id' | 'userId'> & { id?: string }) => {
    updateActiveProfile((prev) => {
      const exists = ach.id && prev.achievements.some((a) => a.id === ach.id);
      const nextItem: AchievementItem = {
        ...ach,
        id: ach.id || `ach_${Date.now()}`,
        userId: activeStudentUserId,
      };
      return {
        ...prev,
        achievements: exists
          ? prev.achievements.map((a) => (a.id === ach.id ? nextItem : a))
          : [nextItem, ...prev.achievements],
      };
    });
    notify(ach.id ? 'Achievement Updated' : 'Achievement Added', ach.title);
  };

  const deleteAchievement = (id: string) => {
    updateActiveProfile((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a.id !== id),
    }));
    notify('Achievement Removed', 'Achievement record deleted.', 'info');
  };

  const saveSport = (sport: Omit<SportItem, 'id' | 'userId'> & { id?: string }) => {
    updateActiveProfile((prev) => {
      const exists = sport.id && prev.sports.some((s) => s.id === sport.id);
      const nextItem: SportItem = {
        ...sport,
        id: sport.id || `sport_${Date.now()}`,
        userId: activeStudentUserId,
      };
      return {
        ...prev,
        sports: exists
          ? prev.sports.map((s) => (s.id === sport.id ? nextItem : s))
          : [nextItem, ...prev.sports],
      };
    });
    notify(sport.id ? 'Sports Record Updated' : 'Sports Activity Added', `${sport.sportName} — ${sport.position}`);
  };

  const deleteSport = (id: string) => {
    updateActiveProfile((prev) => ({
      ...prev,
      sports: prev.sports.filter((s) => s.id !== id),
    }));
    notify('Sports Record Deleted', 'Sports entry removed.', 'info');
  };

  const saveExtracurricular = (item: Omit<ExtracurricularItem, 'id' | 'userId'> & { id?: string }) => {
    updateActiveProfile((prev) => {
      const exists = item.id && prev.extracurricular.some((e) => e.id === item.id);
      const nextItem: ExtracurricularItem = {
        ...item,
        id: item.id || `extra_${Date.now()}`,
        userId: activeStudentUserId,
      };
      return {
        ...prev,
        extracurricular: exists
          ? prev.extracurricular.map((e) => (e.id === item.id ? nextItem : e))
          : [nextItem, ...prev.extracurricular],
      };
    });
    notify(item.id ? 'Activity Updated' : 'Extracurricular Activity Added', item.activityName);
  };

  const deleteExtracurricular = (id: string) => {
    updateActiveProfile((prev) => ({
      ...prev,
      extracurricular: prev.extracurricular.filter((e) => e.id !== id),
    }));
    notify('Activity Deleted', 'Extracurricular record removed.', 'info');
  };

  const saveInternship = (item: Omit<InternshipItem, 'id' | 'userId'> & { id?: string }) => {
    updateActiveProfile((prev) => {
      const exists = item.id && prev.internships.some((i) => i.id === item.id);
      const nextItem: InternshipItem = {
        ...item,
        id: item.id || `intern_${Date.now()}`,
        userId: activeStudentUserId,
      };
      return {
        ...prev,
        internships: exists
          ? prev.internships.map((i) => (i.id === item.id ? nextItem : i))
          : [nextItem, ...prev.internships],
      };
    });
    notify(item.id ? 'Internship Updated' : 'Internship Added', `${item.role} at ${item.companyOrganization}`);
  };

  const deleteInternship = (id: string) => {
    updateActiveProfile((prev) => ({
      ...prev,
      internships: prev.internships.filter((i) => i.id !== id),
    }));
    notify('Internship Deleted', 'Internship entry removed.', 'info');
  };

  const saveEvent = (item: Omit<EventWorkshopItem, 'id' | 'userId'> & { id?: string }) => {
    updateActiveProfile((prev) => {
      const exists = item.id && prev.events.some((e) => e.id === item.id);
      const nextItem: EventWorkshopItem = {
        ...item,
        id: item.id || `evt_${Date.now()}`,
        userId: activeStudentUserId,
      };
      return {
        ...prev,
        events: exists
          ? prev.events.map((e) => (e.id === item.id ? nextItem : e))
          : [nextItem, ...prev.events],
      };
    });
    notify(item.id ? 'Event Updated' : 'Workshop / Event Added', item.eventName);
  };

  const deleteEvent = (id: string) => {
    updateActiveProfile((prev) => ({
      ...prev,
      events: prev.events.filter((e) => e.id !== id),
    }));
    notify('Event Deleted', 'Workshop/Event entry removed.', 'info');
  };

  const saveDocument = (item: Omit<DocumentItem, 'id' | 'userId'> & { id?: string }) => {
    updateActiveProfile((prev) => {
      const exists = item.id && prev.documents.some((d) => d.id === item.id);
      const nextItem: DocumentItem = {
        ...item,
        id: item.id || `doc_${Date.now()}`,
        userId: activeStudentUserId,
      };
      return {
        ...prev,
        documents: exists
          ? prev.documents.map((d) => (d.id === item.id ? nextItem : d))
          : [nextItem, ...prev.documents],
      };
    });
    notify(item.id ? 'Document Updated' : 'Document Uploaded', item.fileName);
  };

  const deleteDocument = (id: string) => {
    updateActiveProfile((prev) => ({
      ...prev,
      documents: prev.documents.filter((d) => d.id !== id),
    }));
    notify('Document Deleted', 'File removed from your document storage.', 'info');
  };

  const updatePrivacy = (privacy: PrivacySettings) => {
    updateActiveProfile((prev) => ({
      ...prev,
      privacy,
    }));
    notify('Privacy & Sharing Preferences Saved', 'Your public portfolio visibility rules are active.');
  };

  const updateUserStatus = (
    userId: string,
    status: 'active' | 'reported' | 'suspended',
    reason?: string
  ) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status, reportReason: reason } : u))
    );
    notify('User Status Updated', `Account status set to ${status}.`);
  };

  const addSystemCategory = (cat: string) => {
    const trimmed = cat.trim();
    if (!trimmed || systemCategories.includes(trimmed)) return;
    setSystemCategories((prev) => [...prev, trimmed]);
    notify('Category Added', `"${trimmed}" is now available across student modules.`);
  };

  const removeSystemCategory = (cat: string) => {
    setSystemCategories((prev) => prev.filter((c) => c !== cat));
    notify('Category Removed', `"${cat}" removed from system taxonomy.`, 'info');
  };

  return (
    <ProfileContext.Provider
      value={{
        currentUser,
        activeProfile,
        allUsers,
        activeNav,
        setActiveNav,
        darkMode,
        toggleDarkMode,
        toasts,
        notify,
        dismissToast,
        login,
        register,
        resetPassword,
        loginAsDemoStudent,
        loginAsDemoAdmin,
        logout,
        deleteCurrentAccount,
        resetToDemoData,
        completionPercentage,
        completionSections,
        updatePersonalInfo,
        updateCollegeDetails,
        saveAcademicRecord,
        deleteAcademicRecord,
        saveAttendanceRecord,
        deleteAttendanceRecord,
        saveProject,
        deleteProject,
        saveCertificate,
        deleteCertificate,
        saveSkill,
        deleteSkill,
        saveAchievement,
        deleteAchievement,
        saveSport,
        deleteSport,
        saveExtracurricular,
        deleteExtracurricular,
        saveInternship,
        deleteInternship,
        saveEvent,
        deleteEvent,
        saveDocument,
        deleteDocument,
        updatePrivacy,
        updateUserStatus,
        systemCategories,
        addSystemCategory,
        removeSystemCategory,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
};
