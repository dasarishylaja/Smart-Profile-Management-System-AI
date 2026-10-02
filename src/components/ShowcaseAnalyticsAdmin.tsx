import React, { useState } from 'react';
import {
  Printer,
  Download,
  Edit3,
  Share2,
  Copy,
  Check,
  QrCode,
  Lock,
  Globe,
  ShieldAlert,
  Search,
  CheckCircle2,
  Trash2,
  Sun,
  Moon,
  ExternalLink,
  X,
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

// 1. RESUME MODULE (PREVIEW, EDIT OBJECTIVE, DOWNLOAD PDF / PRINT)
export const ResumeModule: React.FC = () => {
  const { activeProfile, updatePersonalInfo, notify } = useProfile();
  const {
    personalInfo,
    collegeDetails,
    academicRecords,
    projects,
    internships,
    skills,
    certificates,
    achievements,
    sports,
    extracurricular,
  } = activeProfile;

  const [isEditingResume, setIsEditingResume] = useState(false);
  const [careerObjective, setCareerObjective] = useState(
    personalInfo.careerObjective || personalInfo.aboutMe
  );
  const [includeSports, setIncludeSports] = useState(true);
  const [includeExtracurricular, setIncludeExtracurricular] = useState(true);

  const latestCgpa =
    academicRecords.length > 0
      ? academicRecords[academicRecords.length - 1].cgpa.toFixed(2)
      : '0.00';

  const handleSaveResumeText = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo({
      ...personalInfo,
      careerObjective,
    });
    setIsEditingResume(false);
    notify('Resume Objective Updated', 'Your live resume preview has been refreshed.');
  };

  const handlePrintOrDownloadPdf = () => {
    notify(
      'Preparing PDF / Print Layout',
      'Select "Save as PDF" in your browser print dialog for a crisp vector PDF.',
      'info'
    );
    setTimeout(() => {
      window.print();
    }, 250);
  };

  return (
    <div className="space-y-6">
      {/* Control Toolbar */}
      <div className="no-print p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Automated Academic &amp; Placement Resume Builder
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Automatically compiled from your live profile modules. Ready for campus placements and
            PDF export.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsEditingResume(!isEditingResume)}
            className="px-4 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg hover:bg-slate-200 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditingResume ? 'Close Editor' : 'Customize Resume'}</span>
          </button>

          <button
            onClick={handlePrintOrDownloadPdf}
            className="px-4 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg hover:bg-slate-200 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Resume</span>
          </button>

          <button
            onClick={handlePrintOrDownloadPdf}
            className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download as PDF</span>
          </button>
        </div>
      </div>

      {/* Optional Resume Customizer Drawer */}
      {isEditingResume && (
        <form
          onSubmit={handleSaveResumeText}
          className="no-print p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-600 space-y-4"
        >
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Customize Career Objective &amp; Section Visibility
          </h3>
          <div>
            <label className="block text-xs font-medium mb-1">
              Career Objective / Executive Summary
            </label>
            <textarea
              rows={3}
              value={careerObjective}
              onChange={(e) => setCareerObjective(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSports}
                onChange={(e) => setIncludeSports(e.target.checked)}
              />
              <span>Include Sports Representation</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeExtracurricular}
                onChange={(e) => setIncludeExtracurricular(e.target.checked)}
              />
              <span>Include Extracurricular &amp; Leadership</span>
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg cursor-pointer"
            >
              Update Resume Preview
            </button>
          </div>
        </form>
      )}

      {/* Printable A4-Style Resume Sheet */}
      <div
        id="printable-resume"
        className="max-w-4xl mx-auto p-8 sm:p-12 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-xs space-y-6"
      >
        {/* Resume Header */}
        <div className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {personalInfo.fullName}
            </h1>
            <p className="text-sm font-medium text-slate-700 mt-1">
              {collegeDetails.degree} — {collegeDetails.department} ({collegeDetails.academicYear})
            </p>
            <p className="text-xs text-slate-600 mt-0.5">{collegeDetails.collegeName}</p>
          </div>
          <div className="text-xs text-slate-600 sm:text-right space-y-0.5 font-mono-tabular">
            <div>{personalInfo.email}</div>
            <div>{personalInfo.phoneNumber}</div>
            <div>
              {personalInfo.city}, {personalInfo.state}
            </div>
            {personalInfo.github && <div className="truncate max-w-xs">{personalInfo.github}</div>}
          </div>
        </div>

        {/* Career Objective */}
        <div>
          <h2 className="text-xs font-bold tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Career Objective
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            {careerObjective || personalInfo.aboutMe}
          </p>
        </div>

        {/* Education & Academic Performance */}
        <div>
          <h2 className="text-xs font-bold tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Education &amp; Academic Performance
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
            <div>
              <strong className="text-slate-900">
                {collegeDetails.degree} in {collegeDetails.department}
              </strong>{' '}
              — {collegeDetails.collegeName} ({collegeDetails.university})
            </div>
            <div className="font-mono-tabular font-semibold text-slate-900">
              Batch {collegeDetails.batch} · CGPA: {latestCgpa} / 10.0
            </div>
          </div>
          <div className="text-[11px] text-slate-600 mt-1 font-mono-tabular">
            Roll No: {collegeDetails.collegeIdRollNo} · Reg No: {collegeDetails.registerNumber} ·
            Current: {collegeDetails.semester} · Backlogs: 0
          </div>
        </div>

        {/* Technical Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Technical &amp; Core Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
              {skills.map((s) => (
                <div key={s.id} className="flex items-baseline justify-between">
                  <span>
                    <strong className="text-slate-900">{s.name}</strong> ({s.category})
                  </span>
                  <span className="font-mono-tabular text-slate-600">
                    {s.proficiencyLevel}% · {s.yearsExperience}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Internships */}
        {internships.length > 0 && (
          <div>
            <h2 className="text-xs font-bold tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Internship Experience
            </h2>
            <div className="space-y-3">
              {internships.map((i) => (
                <div key={i.id} className="text-xs">
                  <div className="flex justify-between font-semibold text-slate-900">
                    <span>
                      {i.role} — {i.companyOrganization} ({i.internshipType})
                    </span>
                    <span className="font-mono-tabular">
                      {i.startDate} to {i.endDate} ({i.duration})
                    </span>
                  </div>
                  {i.projectTitle && (
                    <div className="text-slate-700 font-medium mt-0.5">
                      Project: {i.projectTitle}
                    </div>
                  )}
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{i.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Key Academic &amp; Engineering Projects
            </h2>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="text-xs">
                  <div className="flex justify-between font-semibold text-slate-900">
                    <span>
                      {p.title} ({p.role})
                    </span>
                    <span className="font-mono-tabular">{p.duration}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Technologies: {p.technologiesUsed.join(', ')}
                  </div>
                  <p className="text-slate-700 mt-0.5 leading-relaxed">{p.description}</p>
                  {p.outcome && (
                    <div className="text-slate-800 font-medium mt-0.5">Impact: {p.outcome}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.length > 0 && (
            <div>
              <h2 className="text-xs font-bold tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Certifications ({certificates.length})
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {certificates.map((c) => (
                  <li key={c.id}>
                    <strong className="text-slate-900">{c.name}</strong> — {c.issuingOrganization} (
                    <span className="font-mono-tabular">{c.issueDate}</span>)
                  </li>
                ))}
              </ul>
            </div>
          )}

          {achievements.length > 0 && (
            <div>
              <h2 className="text-xs font-bold tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Honors &amp; Awards ({achievements.length})
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {achievements.map((a) => (
                  <li key={a.id}>
                    <strong className="text-slate-900">{a.title}</strong> — {a.organization} (
                    {a.positionAward})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sports & Extracurriculars */}
        {(includeSports || includeExtracurricular) && (
          <div>
            <h2 className="text-xs font-bold tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Sports, Leadership &amp; Co-Curricular Activities
            </h2>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {includeSports &&
                sports.map((s) => (
                  <li key={s.id}>
                    <strong className="text-slate-900">
                      {s.sportName} ({s.level} Level — {s.position}):
                    </strong>{' '}
                    {s.eventName}, {s.organization}
                  </li>
                ))}
              {includeExtracurricular &&
                extracurricular.map((e) => (
                  <li key={e.id}>
                    <strong className="text-slate-900">
                      {e.activityName} ({e.role}):
                    </strong>{' '}
                    {e.achievement || e.description}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// 2. DIGITAL PROFILE / PUBLIC PORTFOLIO MODULE + PRIVACY GUARD
export const PublicPortfolioModule: React.FC<{ onOpenShareModal: () => void }> = ({
  onOpenShareModal,
}) => {
  const { activeProfile, updatePrivacy } = useProfile();
  const {
    personalInfo,
    collegeDetails,
    academicRecords,
    projects,
    internships,
    skills,
    certificates,
    achievements,
    sports,
    extracurricular,
    documents,
    privacy,
  } = activeProfile;

  const latestCgpa =
    academicRecords.length > 0
      ? academicRecords[academicRecords.length - 1].cgpa.toFixed(2)
      : '0.00';

  const publicDocs = documents.filter((d) => !d.isPrivate || privacy.showPrivateDocuments);

  return (
    <div className="space-y-8">
      {/* Top Bar showing Public URL & Privacy Shield Status */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-blue-600 dark:text-blue-400">
            <Globe className="w-3.5 h-3.5" />
            <span>Public Portfolio URL: /profile/{privacy.profileSlug}</span>
            <span>·</span>
            <span>{privacy.isPublicProfile ? 'Publicly Accessible' : 'Private Mode Only'}</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Digital Portfolio &amp; Verifiable Student Identity
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sensitive PII (Phone, Address, DOB, Roll Number, Private Docs) is automatically masked
            below unless explicitly enabled in your privacy controls.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() =>
              updatePrivacy({ ...privacy, isPublicProfile: !privacy.isPublicProfile })
            }
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              privacy.isPublicProfile
                ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
                : 'border-amber-300 bg-amber-50 text-amber-800'
            }`}
          >
            {privacy.isPublicProfile ? 'Status: Public Profile' : 'Status: Private Profile'}
          </button>

          <button
            onClick={onOpenShareModal}
            className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Link &amp; QR Code</span>
          </button>
        </div>
      </div>

      {/* Quick Interactive Sensitive PII Privacy Toggles Bar */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
          <Lock className="w-4 h-4 text-blue-600" />
          <span>Sensitive PII Public Visibility Controls:</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.showPhoneNumber}
              onChange={(e) => updatePrivacy({ ...privacy, showPhoneNumber: e.target.checked })}
            />
            <span>Phone Number</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.showAddress}
              onChange={(e) => updatePrivacy({ ...privacy, showAddress: e.target.checked })}
            />
            <span>Home Address</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.showDateOfBirth}
              onChange={(e) => updatePrivacy({ ...privacy, showDateOfBirth: e.target.checked })}
            />
            <span>Date of Birth</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.showStudentId}
              onChange={(e) => updatePrivacy({ ...privacy, showStudentId: e.target.checked })}
            />
            <span>Student ID / Roll No</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.showPrivateDocuments}
              onChange={(e) =>
                updatePrivacy({ ...privacy, showPrivateDocuments: e.target.checked })
              }
            />
            <span>Private Documents</span>
          </label>
        </div>
      </div>

      {/* Portfolio Canvas */}
      {!privacy.isPublicProfile ? (
        <div className="p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <Lock className="w-8 h-8 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            This Portfolio is Currently Set to Private
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            External visitors visiting /profile/{privacy.profileSlug} cannot view your portfolio
            until you enable Public Profile visibility above.
          </p>
        </div>
      ) : (
        <div className="p-6 sm:p-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-10">
          {/* Portfolio Identity Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <img
                src={personalInfo.profilePhoto}
                alt={personalInfo.fullName}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
              />
              <div className="space-y-1.5">
                <div className="text-xs font-mono-tabular text-blue-600 dark:text-blue-400">
                  smartprofile.edu/profile/{privacy.profileSlug}
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {personalInfo.fullName}
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {collegeDetails.degree} in {collegeDetails.department} ·{' '}
                  {collegeDetails.academicYear}
                </p>
                <p className="text-xs text-slate-500">{collegeDetails.collegeName}</p>
              </div>
            </div>

            {/* Public Contact & Conditional PII */}
            <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300 bg-[#F8FAFC] dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <div>
                <strong>Email:</strong> {personalInfo.email}
              </div>
              <div>
                <strong>Location:</strong> {personalInfo.city}, {personalInfo.state},{' '}
                {personalInfo.country}
              </div>
              {privacy.showPhoneNumber ? (
                <div>
                  <strong>Phone:</strong> {personalInfo.phoneNumber}
                </div>
              ) : (
                <div className="text-slate-400 italic">Phone Number: Hidden by Student Privacy</div>
              )}
              {privacy.showAddress && (
                <div>
                  <strong>Address:</strong> {personalInfo.address}
                </div>
              )}
              {privacy.showDateOfBirth && (
                <div>
                  <strong>DOB:</strong> {personalInfo.dateOfBirth}
                </div>
              )}
              {privacy.showStudentId ? (
                <div>
                  <strong>Roll / Reg No:</strong> {collegeDetails.collegeIdRollNo} /{' '}
                  {collegeDetails.registerNumber}
                </div>
              ) : (
                <div className="text-slate-400 italic">Student ID: Hidden by Student Privacy</div>
              )}
              <div className="pt-1 flex items-center gap-3 text-blue-600 dark:text-blue-400 font-medium">
                {personalInfo.linkedIn && (
                  <a href={personalInfo.linkedIn} target="_blank" rel="noreferrer" className="hover:underline">
                    LinkedIn ↗
                  </a>
                )}
                {personalInfo.github && (
                  <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline">
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">About</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              {personalInfo.aboutMe}
            </p>
          </div>

          {/* Education & Academic Performance */}
          {privacy.showEducation && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Education &amp; Academics
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Verified Undergraduate Degree &amp; Cumulative Performance
                </p>
              </div>
              <div className="md:col-span-2 p-5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {collegeDetails.collegeName}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  {collegeDetails.degree} · {collegeDetails.department} · Batch{' '}
                  {collegeDetails.batch}
                </div>
                {privacy.showAcademicPerformance && (
                  <div className="text-xs font-mono-tabular text-emerald-700 dark:text-emerald-400 font-semibold pt-1">
                    Cumulative CGPA: {latestCgpa} / 10.0 · {academicRecords.length} Logged University
                    Courses · 0 Backlogs
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Skills */}
          {privacy.showSkills && skills.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Technical Skills
                </h3>
                <p className="text-xs text-slate-500 mt-1">Domain proficiency &amp; experience</p>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((s) => (
                  <div key={s.id} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-900 dark:text-white">{s.name}</span>
                      <span className="font-mono-tabular text-slate-500">
                        {s.proficiencyLevel}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600"
                        style={{ width: `${s.proficiencyLevel}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {s.category} · {s.yearsExperience}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Featured Projects */}
          {privacy.showProjects && projects.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Featured Engineering Projects ({projects.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-44 object-cover"
                    />
                    <div className="p-5 space-y-2">
                      <div className="text-xs text-slate-500">
                        {p.role} · {p.duration}
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {p.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{p.description}</p>
                      <div className="text-xs text-slate-500 pt-1">
                        Stack: {p.technologiesUsed.join(' · ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Internships, Certificates, Achievements, Sports & Extracurricular Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100 dark:border-slate-800">
            {privacy.showInternships && internships.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Internships</h3>
                {internships.map((i) => (
                  <div
                    key={i.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1"
                  >
                    <div className="font-bold text-slate-900 dark:text-white">
                      {i.role} — {i.companyOrganization}
                    </div>
                    <div className="text-slate-500">
                      {i.internshipType} · {i.duration}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{i.description}</p>
                  </div>
                ))}
              </div>
            )}

            {privacy.showCertificates && certificates.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Verified Certifications
                </h3>
                {certificates.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1"
                  >
                    <div className="font-bold text-slate-900 dark:text-white">{c.name}</div>
                    <div className="text-slate-500">
                      {c.issuingOrganization} · {c.issueDate} · ID: {c.certificateId}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {privacy.showAchievements && achievements.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Achievements &amp; Awards
                </h3>
                {achievements.map((a) => (
                  <div
                    key={a.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1"
                  >
                    <div className="font-bold text-slate-900 dark:text-white">{a.title}</div>
                    <div className="text-slate-500">
                      {a.positionAward} · {a.organization} ({a.date})
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(privacy.showSports || privacy.showExtracurricular) && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Sports &amp; Co-Curricular Leadership
                </h3>
                {privacy.showSports &&
                  sports.map((s) => (
                    <div
                      key={s.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1"
                    >
                      <div className="font-bold text-slate-900 dark:text-white">
                        {s.sportName} — {s.position} ({s.level} Level)
                      </div>
                      <div className="text-slate-500">{s.eventName}</div>
                    </div>
                  ))}
                {privacy.showExtracurricular &&
                  extracurricular.map((e) => (
                    <div
                      key={e.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1"
                    >
                      <div className="font-bold text-slate-900 dark:text-white">
                        {e.activityName} ({e.role})
                      </div>
                      <div className="text-slate-500">{e.organization}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Publicly Shared Documents */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Publicly Verifiable Documents ({publicDocs.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {publicDocs.map((d) => (
                <div
                  key={d.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between gap-2"
                >
                  <div className="truncate">
                    <div className="font-semibold text-slate-900 dark:text-white truncate">
                      {d.fileName}
                    </div>
                    <div className="text-slate-500">{d.category}</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// SHARE PROFILE MODAL (LINK COPY + DYNAMIC SVG QR CODE + PRIVACY CONTROLS)
export const ShareProfileModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { activeProfile, updatePrivacy, notify } = useProfile();
  const { privacy, personalInfo } = activeProfile;
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/profile/${privacy.profileSlug}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    notify('Profile Link Copied', shareUrl);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Share Digital Portfolio
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Share {personalInfo.fullName}&apos;s verifiable student profile link or QR code.
          </p>
        </div>

        {/* Dynamic SVG QR Matrix */}
        <div className="p-6 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col items-center space-y-3">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <svg
              viewBox="0 0 120 120"
              className="w-36 h-36 text-slate-900"
              fill="currentColor"
              aria-label="Student Portfolio QR Code"
            >
              {/* Finder patterns */}
              <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" />
              <path d="M80,10 h30 v30 h-30 z M85,15 v20 h20 v-20 z M90,20 h10 v10 h-10 z" />
              <path d="M10,80 h30 v30 h-30 z M15,85 v20 h20 v-20 z M20,90 h10 v10 h-10 z" />
              {/* Data modules */}
              <rect x="45" y="10" width="5" height="5" />
              <rect x="55" y="10" width="10" height="5" />
              <rect x="45" y="20" width="10" height="5" />
              <rect x="65" y="20" width="5" height="10" />
              <rect x="45" y="35" width="15" height="5" />
              <rect x="10" y="45" width="10" height="5" />
              <rect x="30" y="45" width="15" height="5" />
              <rect x="55" y="45" width="10" height="10" />
              <rect x="75" y="45" width="15" height="5" />
              <rect x="100" y="45" width="10" height="10" />
              <rect x="15" y="60" width="15" height="5" />
              <rect x="40" y="60" width="10" height="10" />
              <rect x="65" y="60" width="10" height="5" />
              <rect x="85" y="60" width="15" height="10" />
              <rect x="45" y="80" width="10" height="10" />
              <rect x="65" y="75" width="15" height="5" />
              <rect x="90" y="80" width="10" height="15" />
              <rect x="50" y="95" width="20" height="5" />
              <rect x="80" y="100" width="15" height="10" />
              <rect x="100" y="100" width="10" height="10" />
            </svg>
          </div>
          <div className="text-xs font-mono-tabular text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <QrCode className="w-3.5 h-3.5 text-blue-600" />
            <span>Scan to open /profile/{privacy.profileSlug}</span>
          </div>
        </div>

        {/* Copy URL Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
            Direct Portfolio Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-2 text-xs font-mono-tabular rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Quick Privacy Toggle */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="font-medium text-slate-700 dark:text-slate-300">
            Allow Public Portfolio Access
          </span>
          <input
            type="checkbox"
            checked={privacy.isPublicProfile}
            onChange={(e) => updatePrivacy({ ...privacy, isPublicProfile: e.target.checked })}
            className="w-4 h-4"
          />
        </div>
      </div>
    </div>
  );
};

// 3. ANALYTICS MODULE
export const AnalyticsModule: React.FC = () => {
  const { activeProfile, completionPercentage, completionSections } = useProfile();
  const {
    academicRecords,
    attendance,
    certificates,
    projects,
    skills,
    achievements,
    internships,
    sports,
    extracurricular,
  } = activeProfile;

  const moduleCounts = [
    { label: 'Certificates', count: certificates.length },
    { label: 'Skills', count: skills.length },
    { label: 'Achievements', count: achievements.length },
    { label: 'Projects', count: projects.length },
    { label: 'Sports', count: sports.length },
    { label: 'Extracurricular', count: extracurricular.length },
    { label: 'Internships', count: internships.length },
  ];
  const maxCount = Math.max(1, ...moduleCounts.map((m) => m.count));

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Profile Analytics &amp; Performance Insights
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Quantitative breakdown of your academic trajectory, attendance consistency, and co-curricular
          footprint.
        </p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500">Completion</div>
          <div className="text-2xl font-bold font-mono-tabular text-blue-600 mt-1">
            {completionPercentage}%
          </div>
        </div>
        {moduleCounts.map((m) => (
          <div
            key={m.label}
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            <div className="text-xs text-slate-500 truncate">{m.label}</div>
            <div className="text-2xl font-bold font-mono-tabular text-slate-900 dark:text-white mt-1">
              {m.count}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Module Distribution Bar Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Portfolio Record Distribution
          </h3>
          <div className="space-y-3">
            {moduleCounts.map((m) => (
              <div key={m.label} className="text-xs">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{m.label}</span>
                  <span className="font-mono-tabular font-semibold">{m.count} Records</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(m.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance vs Threshold Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Attendance Progress by Subject
          </h3>
          <div className="space-y-3">
            {attendance.map((a) => (
              <div key={a.id} className="text-xs">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-slate-700 dark:text-slate-300 truncate pr-2">
                    {a.subjectCode} · {a.subject}
                  </span>
                  <span className="font-mono-tabular font-semibold">
                    {a.attendancePercentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      a.attendancePercentage >= 75 ? 'bg-emerald-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, a.attendancePercentage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Completion Audit Checklist */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
          Module Readiness Audit ({completionPercentage}% Complete)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {completionSections.map((s) => (
            <div
              key={s.key}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex items-center gap-2.5"
            >
              <CheckCircle2
                className={`w-4 h-4 shrink-0 ${
                  s.completed ? 'text-emerald-600' : 'text-slate-300'
                }`}
              />
              <span className="font-medium text-slate-800 dark:text-slate-200">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 4. SETTINGS MODULE
export const SettingsModule: React.FC = () => {
  const {
    activeProfile,
    updatePrivacy,
    resetPassword,
    darkMode,
    toggleDarkMode,
    resetToDemoData,
    deleteCurrentAccount,
  } = useProfile();
  const { privacy, personalInfo } = activeProfile;

  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMsg, setPassMsg] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 6 || newPass !== confirmPass) {
      setPassMsg('Passwords must match and be at least 6 characters.');
      return;
    }
    resetPassword(personalInfo.email, newPass);
    setNewPass('');
    setConfirmPass('');
    setPassMsg('Password updated successfully.');
  };

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Account, Privacy &amp; System Settings
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Manage your password, theme appearance, granular public visibility, and data lifecycle.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theme & Notification Preferences */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Appearance &amp; Notifications
          </h3>

          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">
                Interface Theme Mode
              </div>
              <div className="text-[11px] text-slate-500">
                Switch between clean daylight slate and high-contrast dark mode
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 inline-flex items-center gap-1.5 cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <span>Email Alerts for Certificate Verification</span>
              <input
                type="checkbox"
                checked={privacy.emailAlerts}
                onChange={(e) => updatePrivacy({ ...privacy, emailAlerts: e.target.checked })}
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Semester Attendance Threshold Reminders</span>
              <input
                type="checkbox"
                checked={privacy.semesterReminders}
                onChange={(e) => updatePrivacy({ ...privacy, semesterReminders: e.target.checked })}
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Public Portfolio Visitor Notifications</span>
              <input
                type="checkbox"
                checked={privacy.portfolioViewNotifications}
                onChange={(e) =>
                  updatePrivacy({ ...privacy, portfolioViewNotifications: e.target.checked })
                }
              />
            </label>
          </div>
        </div>

        {/* Change Password */}
        <form
          onSubmit={handlePasswordChange}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4"
        >
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Change Account Password
          </h3>
          {passMsg && <div className="text-xs text-blue-600">{passMsg}</div>}
          <div>
            <label className="block text-xs font-medium mb-1">Account Email</label>
            <input
              type="email"
              disabled
              value={personalInfo.email}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 dark:bg-slate-800/50"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1">New Password</label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Confirm password"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Granular Public / Private Sections & Sensitive PII Matrix */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Public Portfolio Section &amp; Sensitive PII Privacy Controls
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.isPublicProfile}
              onChange={(e) => updatePrivacy({ ...privacy, isPublicProfile: e.target.checked })}
            />
            <span className="font-semibold">Enable Public Portfolio</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.showPhoneNumber}
              onChange={(e) => updatePrivacy({ ...privacy, showPhoneNumber: e.target.checked })}
            />
            <span>Show Phone Number (PII)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.showAddress}
              onChange={(e) => updatePrivacy({ ...privacy, showAddress: e.target.checked })}
            />
            <span>Show Home Address (PII)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.showDateOfBirth}
              onChange={(e) => updatePrivacy({ ...privacy, showDateOfBirth: e.target.checked })}
            />
            <span>Show Date of Birth (PII)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.showStudentId}
              onChange={(e) => updatePrivacy({ ...privacy, showStudentId: e.target.checked })}
            />
            <span>Show Student Roll/Reg ID (PII)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.showPrivateDocuments}
              onChange={(e) =>
                updatePrivacy({ ...privacy, showPrivateDocuments: e.target.checked })
              }
            />
            <span>Show Private Documents</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.showAcademicPerformance}
              onChange={(e) =>
                updatePrivacy({ ...privacy, showAcademicPerformance: e.target.checked })
              }
            />
            <span>Show Academic CGPA</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.showProjects}
              onChange={(e) => updatePrivacy({ ...privacy, showProjects: e.target.checked })}
            />
            <span>Show Projects Section</span>
          </label>
        </div>
      </div>

      {/* Data Reset & Account Deletion */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Demo Data Reset &amp; Account Lifecycle
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Restore Pooja Dasari&apos;s sample dataset to default state or delete your custom
            student account.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={resetToDemoData}
            className="px-4 py-2 text-xs font-semibold border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            Reset Demo Data
          </button>
          <button
            onClick={deleteCurrentAccount}
            className="px-4 py-2 text-xs font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// 5. ADMIN GOVERNANCE PANEL MODULE
export const AdminPanelModule: React.FC = () => {
  const {
    allUsers,
    updateUserStatus,
    systemCategories,
    addSystemCategory,
    removeSystemCategory,
  } = useProfile();

  const [userSearch, setUserSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [newCatName, setNewCatName] = useState('');

  const filteredUsers = allUsers.filter((u) => {
    const q = userSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      u.fullName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddCat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addSystemCategory(newCatName);
    setNewCatName('');
  };

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono-tabular text-blue-600 dark:text-blue-400 mb-1">
            Role-Based Governance · Zero Private PII Intrusion Policy Enforced
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Institution Admin Dashboard
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            View registered students, manage reported profiles, moderate public content, and
            maintain certificate categories.
          </p>
        </div>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500">Registered Accounts</div>
          <div className="text-3xl font-bold font-mono-tabular text-slate-900 dark:text-white mt-1">
            {allUsers.length}
          </div>
        </div>
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500">Active Profiles</div>
          <div className="text-3xl font-bold font-mono-tabular text-emerald-600 mt-1">
            {allUsers.filter((u) => u.status === 'active').length}
          </div>
        </div>
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500">Reported Profiles</div>
          <div className="text-3xl font-bold font-mono-tabular text-amber-600 mt-1">
            {allUsers.filter((u) => u.status === 'reported').length}
          </div>
        </div>
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500">Active Categories</div>
          <div className="text-3xl font-bold font-mono-tabular text-blue-600 mt-1">
            {systemCategories.length}
          </div>
        </div>
      </div>

      {/* User Directory & Reported Profile Moderation */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Registered Users &amp; Profile Moderation
          </h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search name, email, department..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-800"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-800"
            >
              <option value="All">All Statuses</option>
              <option value="active">Active</option>
              <option value="reported">Reported</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 bg-[#F8FAFC] dark:bg-slate-800/50">
                <th className="py-3 px-4">Full Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Department &amp; Year</th>
                <th className="py-3 px-4">Private PII Access</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    {u.fullName}
                  </td>
                  <td className="py-3 px-4 font-mono-tabular text-slate-600 dark:text-slate-300">
                    {u.email}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    {u.department} · {u.academicYear}
                  </td>
                  <td className="py-3 px-4 text-slate-400 italic">
                    <span className="inline-flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Restricted (Private Vault)
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold ${
                        u.status === 'active'
                          ? 'text-emerald-600'
                          : u.status === 'reported'
                          ? 'text-amber-600'
                          : 'text-red-600'
                      }`}
                    >
                      {u.status.toUpperCase()}
                    </span>
                    {u.reportReason && (
                      <div className="text-[11px] text-amber-600 mt-0.5 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 shrink-0" />
                        <span>{u.reportReason}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                    {u.status !== 'active' && (
                      <button
                        onClick={() => updateUserStatus(u.id, 'active')}
                        className="text-emerald-600 font-medium hover:underline cursor-pointer"
                      >
                        Approve / Clear
                      </button>
                    )}
                    {u.status !== 'reported' && u.role !== 'admin' && (
                      <button
                        onClick={() =>
                          updateUserStatus(
                            u.id,
                            'reported',
                            'Flagged for public link verification.'
                          )
                        }
                        className="text-amber-600 font-medium hover:underline cursor-pointer"
                      >
                        Flag Profile
                      </button>
                    )}
                    {u.status !== 'suspended' && u.role !== 'admin' && (
                      <button
                        onClick={() => updateUserStatus(u.id, 'suspended')}
                        className="text-red-600 font-medium hover:underline cursor-pointer"
                      >
                        Suspend
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manage System Categories */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Manage Standardized Profile &amp; Certificate Categories
        </h3>
        <form onSubmit={handleAddCat} className="flex gap-2 max-w-md">
          <input
            type="text"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="New category name (e.g. Patent Filing)"
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
          />
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg cursor-pointer"
          >
            Add Category
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
          {systemCategories.map((cat) => (
            <div
              key={cat}
              className="px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between"
            >
              <span className="font-medium text-slate-800 dark:text-slate-200">{cat}</span>
              <button
                onClick={() => removeSystemCategory(cat)}
                className="text-red-500 hover:underline text-[11px] cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
