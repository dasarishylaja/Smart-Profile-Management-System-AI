import React, { useState } from 'react';
import {
  LayoutDashboard,
  User,
  UserCircle,
  Building2,
  GraduationCap,
  CalendarCheck,
  FolderGit2,
  Award,
  Code2,
  Trophy,
  Medal,
  Users,
  Briefcase,
  Presentation,
  FileArchive,
  FileText,
  Globe,
  BarChart3,
  Settings,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Share2,
  CheckCircle2,
  AlertCircle,
  Info,
} from 'lucide-react';
import { ProfileProvider, useProfile } from './context/ProfileContext';
import { NavSection } from './types';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { DashboardHome } from './components/DashboardHome';
import {
  MyProfileOverview,
  PersonalInfoModule,
  CollegeDetailsModule,
  AcademicPerformanceModule,
  AttendanceModule,
} from './components/IdentityAcademicModules';
import {
  ProjectsModule,
  CertificatesModule,
  SkillsModule,
  AchievementsModule,
  SportsModule,
  ExtracurricularModule,
  InternshipsModule,
  EventsWorkshopsModule,
  DocumentsModule,
} from './components/PortfolioModules';
import {
  ResumeModule,
  PublicPortfolioModule,
  ShareProfileModal,
  AnalyticsModule,
  SettingsModule,
  AdminPanelModule,
} from './components/ShowcaseAnalyticsAdmin';

interface SidebarItem {
  id: NavSection;
  label: string;
  icon: React.FC<{ className?: string }>;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'my-profile', label: 'My Profile', icon: User },
  { id: 'personal-info', label: 'Personal Information', icon: UserCircle },
  { id: 'college-details', label: 'College Details', icon: Building2 },
  { id: 'academic-performance', label: 'Academic Performance', icon: GraduationCap },
  { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'sports', label: 'Sports', icon: Medal },
  { id: 'extracurricular', label: 'Extracurricular', icon: Users },
  { id: 'internships', label: 'Internships', icon: Briefcase },
  { id: 'events', label: 'Events & Workshops', icon: Presentation },
  { id: 'documents', label: 'Documents', icon: FileArchive },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'public-portfolio', label: 'Public Portfolio', icon: Globe },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'admin', label: 'Admin Panel', icon: ShieldCheck },
];

const WorkspaceShell: React.FC = () => {
  const {
    currentUser,
    activeProfile,
    activeNav,
    setActiveNav,
    darkMode,
    toggleDarkMode,
    logout,
    loginAsDemoStudent,
    loginAsDemoAdmin,
    toasts,
    dismissToast,
  } = useProfile();

  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const activeItemLabel =
    SIDEBAR_ITEMS.find((i) => i.id === activeNav)?.label || 'Dashboard';

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Toast Notifications */}
      <div className="fixed bottom-16 lg:bottom-6 right-4 z-50 space-y-2 max-w-sm w-full pointer-events-none px-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto p-3.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white shadow-lg border border-slate-700 flex items-start justify-between gap-3 text-xs"
          >
            <div className="flex items-start gap-2.5">
              {t.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              ) : t.type === 'info' ? (
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-semibold">{t.title}</div>
                {t.message && <div className="text-slate-300 mt-0.5">{t.message}</div>}
              </div>
            </div>
            <button
              onClick={() => dismissToast(t.id)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Unauthenticated View -> Landing Page */}
      {!currentUser ? (
        <>
          <LandingPage
            onOpenAuth={(mode) => setAuthModalMode(mode)}
            onDemoStudentLogin={loginAsDemoStudent}
            onDemoAdminLogin={loginAsDemoAdmin}
          />
          {authModalMode && (
            <AuthModal
              initialMode={authModalMode}
              onClose={() => setAuthModalMode(null)}
            />
          )}
        </>
      ) : (
        /* Authenticated Dashboard Workspace */
        <div className="flex min-h-screen">
          {/* Desktop Sidebar (260px width) */}
          <aside className="no-print hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-30">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveNav('dashboard')}
                className="text-sm font-bold tracking-tight text-slate-900 dark:text-white text-left cursor-pointer"
              >
                Smart Profile System
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="p-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          {/* Mobile Drawer Menu */}
          {mobileMenuOpen && (
            <div className="no-print fixed inset-0 z-50 lg:hidden flex">
              <div
                className="fixed inset-0 bg-black/50"
                onClick={() => setMobileMenuOpen(false)}
              />
              <div className="relative w-72 max-w-[80vw] bg-white dark:bg-slate-900 h-full flex flex-col z-10 border-r border-slate-200 dark:border-slate-800">
                <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Smart Profile System
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-slate-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
                  {SIDEBAR_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeNav === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveNav(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-lg ${
                          isActive
                            ? 'bg-blue-600 text-white font-semibold'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
                <div className="p-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium text-red-600 rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Column */}
          <div className="flex-1 lg:pl-64 flex flex-col min-w-0 pb-16 lg:pb-0">
            {/* Top Contextual Workspace Bar */}
            <header className="no-print sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open navigation menu"
                  className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                  <span>Workspace</span>
                  <span className="mx-2">/</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {activeItemLabel}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Role Switcher for Instant Evaluation */}
                <button
                  onClick={() =>
                    currentUser.role === 'admin' ? loginAsDemoStudent() : loginAsDemoAdmin()
                  }
                  className="hidden sm:inline-flex px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
                >
                  {currentUser.role === 'admin'
                    ? 'Switch to Pooja Dasari (Student)'
                    : 'Switch to Admin View'}
                </button>

                <button
                  onClick={() => setShareModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share Profile</span>
                </button>

                <button
                  onClick={toggleDarkMode}
                  aria-label="Toggle theme"
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setActiveNav('my-profile')}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <img
                    src={activeProfile.personalInfo.profilePhoto}
                    alt={activeProfile.personalInfo.fullName}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover border border-slate-300"
                  />
                  <span className="hidden md:inline text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[120px] truncate">
                    {currentUser.fullName}
                  </span>
                </button>
              </div>
            </header>

            {/* Active Module Viewport */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8">
              {activeNav === 'dashboard' && (
                <DashboardHome onOpenShareModal={() => setShareModalOpen(true)} />
              )}
              {activeNav === 'my-profile' && <MyProfileOverview />}
              {activeNav === 'personal-info' && <PersonalInfoModule />}
              {activeNav === 'college-details' && <CollegeDetailsModule />}
              {activeNav === 'academic-performance' && <AcademicPerformanceModule />}
              {activeNav === 'attendance' && <AttendanceModule />}
              {activeNav === 'projects' && <ProjectsModule />}
              {activeNav === 'certificates' && <CertificatesModule />}
              {activeNav === 'skills' && <SkillsModule />}
              {activeNav === 'achievements' && <AchievementsModule />}
              {activeNav === 'sports' && <SportsModule />}
              {activeNav === 'extracurricular' && <ExtracurricularModule />}
              {activeNav === 'internships' && <InternshipsModule />}
              {activeNav === 'events' && <EventsWorkshopsModule />}
              {activeNav === 'documents' && <DocumentsModule />}
              {activeNav === 'resume' && <ResumeModule />}
              {activeNav === 'public-portfolio' && (
                <PublicPortfolioModule onOpenShareModal={() => setShareModalOpen(true)} />
              )}
              {activeNav === 'analytics' && <AnalyticsModule />}
              {activeNav === 'settings' && <SettingsModule />}
              {activeNav === 'admin' && <AdminPanelModule />}
            </main>
          </div>

          {/* Mobile Bottom Navigation Bar (Compact 56px height respecting 15% Sticky Cap) */}
          <nav className="no-print lg:hidden fixed bottom-0 inset-x-0 z-20 h-14 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 grid grid-cols-5 items-center px-2">
            <button
              onClick={() => setActiveNav('dashboard')}
              className={`flex flex-col items-center justify-center py-1 text-[10px] font-medium ${
                activeNav === 'dashboard' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 mb-0.5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveNav('academic-performance')}
              className={`flex flex-col items-center justify-center py-1 text-[10px] font-medium ${
                activeNav === 'academic-performance' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <GraduationCap className="w-4 h-4 mb-0.5" />
              <span>Academics</span>
            </button>
            <button
              onClick={() => setActiveNav('projects')}
              className={`flex flex-col items-center justify-center py-1 text-[10px] font-medium ${
                activeNav === 'projects' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <FolderGit2 className="w-4 h-4 mb-0.5" />
              <span>Projects</span>
            </button>
            <button
              onClick={() => setActiveNav('public-portfolio')}
              className={`flex flex-col items-center justify-center py-1 text-[10px] font-medium ${
                activeNav === 'public-portfolio' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <Globe className="w-4 h-4 mb-0.5" />
              <span>Portfolio</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex flex-col items-center justify-center py-1 text-[10px] font-medium text-slate-500"
            >
              <Menu className="w-4 h-4 mb-0.5" />
              <span>All Modules</span>
            </button>
          </nav>

          {shareModalOpen && (
            <ShareProfileModal onClose={() => setShareModalOpen(false)} />
          )}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ProfileProvider>
      <WorkspaceShell />
    </ProfileProvider>
  );
}
