import React, { useState, useMemo } from 'react';
import {
  Search,
  CheckCircle2,
  Circle,
  ExternalLink,
  Share2,
  FileText,
  Plus,
  UserCheck,
  ArrowUpRight,
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { NavSection } from '../types';

interface DashboardHomeProps {
  onOpenShareModal: () => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ onOpenShareModal }) => {
  const {
    activeProfile,
    setActiveNav,
    completionPercentage,
    completionSections,
  } = useProfile();

  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState<string>('All');
  const [yearFilter, setYearFilter] = useState<string>('All');

  const {
    personalInfo,
    collegeDetails,
    academicRecords,
    attendance,
    projects,
    certificates,
    skills,
    achievements,
    sports,
    extracurricular,
    internships,
  } = activeProfile;

  // Overall Attendance Calculation
  const totalClassesAll = attendance.reduce((acc, r) => acc + r.totalClasses, 0);
  const attendedClassesAll = attendance.reduce((acc, r) => acc + r.classesAttended, 0);
  const overallAttendance =
    totalClassesAll > 0 ? ((attendedClassesAll / totalClassesAll) * 100).toFixed(1) : '0.0';

  // Latest CGPA Calculation
  const latestCgpa =
    academicRecords.length > 0
      ? academicRecords[academicRecords.length - 1].cgpa.toFixed(2)
      : '0.00';

  // Global Search Index across all student modules
  const globalSearchResults = useMemo(() => {
    const items: Array<{
      id: string;
      title: string;
      subtitle: string;
      moduleType: string;
      organization: string;
      year: string;
      nav: NavSection;
    }> = [];

    certificates.forEach((c) =>
      items.push({
        id: c.id,
        title: c.name,
        subtitle: `${c.category} · ID: ${c.certificateId}`,
        moduleType: 'Certificates',
        organization: c.issuingOrganization,
        year: c.issueDate.slice(0, 4),
        nav: 'certificates',
      })
    );

    projects.forEach((p) =>
      items.push({
        id: p.id,
        title: p.title,
        subtitle: `${p.role} · ${p.technologiesUsed.join(', ')}`,
        moduleType: 'Projects',
        organization: collegeDetails.collegeName,
        year: p.year || '2026',
        nav: 'projects',
      })
    );

    skills.forEach((s) =>
      items.push({
        id: s.id,
        title: s.name,
        subtitle: `${s.category} · Proficiency ${s.proficiencyLevel}%`,
        moduleType: 'Skills',
        organization: s.yearsExperience,
        year: '2026',
        nav: 'skills',
      })
    );

    achievements.forEach((a) =>
      items.push({
        id: a.id,
        title: a.title,
        subtitle: `${a.positionAward} · ${a.eventName}`,
        moduleType: 'Achievements',
        organization: a.organization,
        year: a.date.slice(0, 4),
        nav: 'achievements',
      })
    );

    internships.forEach((i) =>
      items.push({
        id: i.id,
        title: `${i.role} — ${i.companyOrganization}`,
        subtitle: `${i.internshipType} · ${i.duration}`,
        moduleType: 'Internships',
        organization: i.companyOrganization,
        year: i.startDate.slice(0, 4),
        nav: 'internships',
      })
    );

    sports.forEach((sp) =>
      items.push({
        id: sp.id,
        title: `${sp.sportName} — ${sp.position}`,
        subtitle: `${sp.level} Level · ${sp.eventName}`,
        moduleType: 'Sports',
        organization: sp.organization,
        year: sp.date.slice(0, 4),
        nav: 'sports',
      })
    );

    extracurricular.forEach((ex) =>
      items.push({
        id: ex.id,
        title: ex.activityName,
        subtitle: `${ex.category} · ${ex.role}`,
        moduleType: 'Activities',
        organization: ex.organization,
        year: ex.date.slice(0, 4),
        nav: 'extracurricular',
      })
    );

    return items.filter((item) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q);
      const matchesModule = moduleFilter === 'All' || item.moduleType === moduleFilter;
      const matchesYear = yearFilter === 'All' || item.year === yearFilter;
      return matchesQuery && matchesModule && matchesYear;
    });
  }, [
    searchQuery,
    moduleFilter,
    yearFilter,
    certificates,
    projects,
    skills,
    achievements,
    internships,
    sports,
    extracurricular,
    collegeDetails.collegeName,
  ]);

  return (
    <div className="space-y-8">
      {/* Student Identity Hero Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <img
            src={personalInfo.profilePhoto}
            alt={personalInfo.fullName}
            referrerPolicy="no-referrer"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
          />
          <div className="space-y-1.5">
            <div className="text-xs font-mono-tabular text-blue-600 dark:text-blue-400">
              Roll No: {collegeDetails.collegeIdRollNo || 'Not Set'} · Reg:{' '}
              {collegeDetails.registerNumber || 'Not Set'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {personalInfo.fullName}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {collegeDetails.collegeName}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {collegeDetails.degree} · {collegeDetails.department} · {collegeDetails.academicYear}{' '}
              ({collegeDetails.semester})
            </p>
          </div>
        </div>

        {/* Quick Primary Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveNav('my-profile')}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>View Profile</span>
          </button>
          <button
            onClick={() => setActiveNav('personal-info')}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Edit Profile
          </button>
          <button
            onClick={() => setActiveNav('resume')}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume PDF</span>
          </button>
          <button
            onClick={() => setActiveNav('public-portfolio')}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Generate Portfolio</span>
          </button>
          <button
            onClick={onOpenShareModal}
            className="px-3.5 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Profile</span>
          </button>
        </div>
      </div>

      {/* Quick Add Action Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-2">
          Quick Record Entry:
        </span>
        <button
          onClick={() => setActiveNav('certificates')}
          className="px-3.5 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-blue-600" />
          <span>Add Certificate</span>
        </button>
        <button
          onClick={() => setActiveNav('projects')}
          className="px-3.5 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-blue-600" />
          <span>Add Project</span>
        </button>
        <button
          onClick={() => setActiveNav('achievements')}
          className="px-3.5 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-blue-600" />
          <span>Add Achievement</span>
        </button>
        <button
          onClick={() => setActiveNav('skills')}
          className="px-3.5 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-blue-600" />
          <span>Add Skill</span>
        </button>
        <button
          onClick={() => setActiveNav('academic-performance')}
          className="px-3.5 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-blue-600" />
          <span>Log Semester Marks</span>
        </button>
      </div>

      {/* Key Metrics Grid (8 Stat Cards with Tabular Numerals) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        <button
          onClick={() => setActiveNav('academic-performance')}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-left transition-colors cursor-pointer"
        >
          <div className="text-xs text-slate-500 dark:text-slate-400">Cumulative CGPA</div>
          <div className="text-2xl font-bold font-mono-tabular text-slate-900 dark:text-white mt-1">
            {latestCgpa}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
            0 Backlogs
          </div>
        </button>

        <button
          onClick={() => setActiveNav('attendance')}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-left transition-colors cursor-pointer"
        >
          <div className="text-xs text-slate-500 dark:text-slate-400">Attendance</div>
          <div className="text-2xl font-bold font-mono-tabular text-slate-900 dark:text-white mt-1">
            {overallAttendance}%
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
            {attendedClassesAll}/{totalClassesAll} Classes
          </div>
        </button>

        <button
          onClick={() => setActiveNav('certificates')}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-left transition-colors cursor-pointer"
        >
          <div className="text-xs text-slate-500 dark:text-slate-400">Certificates</div>
          <div className="text-2xl font-bold font-mono-tabular text-slate-900 dark:text-white mt-1">
            {certificates.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Verified IDs</div>
        </button>

        <button
          onClick={() => setActiveNav('projects')}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-left transition-colors cursor-pointer"
        >
          <div className="text-xs text-slate-500 dark:text-slate-400">Projects</div>
          <div className="text-2xl font-bold font-mono-tabular text-slate-900 dark:text-white mt-1">
            {projects.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Full-Stack &amp; IoT</div>
        </button>

        <button
          onClick={() => setActiveNav('skills')}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-left transition-colors cursor-pointer"
        >
          <div className="text-xs text-slate-500 dark:text-slate-400">Skills</div>
          <div className="text-2xl font-bold font-mono-tabular text-slate-900 dark:text-white mt-1">
            {skills.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Across Domains</div>
        </button>

        <button
          onClick={() => setActiveNav('achievements')}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-left transition-colors cursor-pointer"
        >
          <div className="text-xs text-slate-500 dark:text-slate-400">Achievements</div>
          <div className="text-2xl font-bold font-mono-tabular text-slate-900 dark:text-white mt-1">
            {achievements.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Honors &amp; Prizes</div>
        </button>

        <button
          onClick={() => setActiveNav('sports')}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-left transition-colors cursor-pointer"
        >
          <div className="text-xs text-slate-500 dark:text-slate-400">Sports</div>
          <div className="text-2xl font-bold font-mono-tabular text-slate-900 dark:text-white mt-1">
            {sports.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Zonal &amp; College</div>
        </button>

        <button
          onClick={() => setActiveNav('extracurricular')}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-left transition-colors cursor-pointer"
        >
          <div className="text-xs text-slate-500 dark:text-slate-400">Extracurricular</div>
          <div className="text-2xl font-bold font-mono-tabular text-slate-900 dark:text-white mt-1">
            {extracurricular.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">NSS &amp; Clubs</div>
        </button>
      </div>

      {/* Profile Completion Meter + Global Search Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Completion Card */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Your Profile is {completionPercentage}% Complete
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Complete all 10 core modules for maximum placement readiness.
              </p>
            </div>
            <span className="text-xl font-bold font-mono-tabular text-blue-600 dark:text-blue-400">
              {completionPercentage}%
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {completionSections.map((sec) => (
              <div
                key={sec.key}
                className="py-2.5 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  {sec.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                  <div>
                    <span
                      className={
                        sec.completed
                          ? 'font-medium text-slate-800 dark:text-slate-200'
                          : 'font-semibold text-slate-900 dark:text-white'
                      }
                    >
                      {sec.label}
                    </span>
                    {!sec.completed && (
                      <p className="text-[11px] text-amber-600 dark:text-amber-400">
                        Suggestion: {sec.suggestion}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setActiveNav(sec.navTarget)}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium shrink-0 cursor-pointer"
                >
                  {sec.completed ? 'Review' : 'Complete →'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Global Search & Multi-Filter Explorer */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Global Profile Search &amp; Filter
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Instantly search across your certificates, projects, skills, achievements,
              internships, sports, and activities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, skill, organization, or certificate ID..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              aria-label="Filter by module category"
              className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="All">All Modules</option>
              <option value="Certificates">Certificates</option>
              <option value="Projects">Projects</option>
              <option value="Skills">Skills</option>
              <option value="Achievements">Achievements</option>
              <option value="Internships">Internships</option>
              <option value="Sports">Sports</option>
              <option value="Activities">Activities</option>
            </select>

            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              aria-label="Filter by year"
              className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="All">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div className="flex-1 divide-y divide-slate-100 dark:divide-slate-800 max-h-[360px] overflow-y-auto pr-1">
            {globalSearchResults.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500">
                No matching records found across your profile. Try clearing your search or filters.
              </div>
            ) : (
              globalSearchResults.map((item) => (
                <div
                  key={`${item.moduleType}_${item.id}`}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 px-2 rounded-lg transition-colors"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {item.moduleType} · {item.organization} · {item.year} · {item.subtitle}
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveNav(item.nav)}
                    className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline shrink-0 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
