import React, { useState } from 'react';
import { Edit3, Save, RotateCcw, Plus, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { AcademicRecord, AttendanceRecord } from '../types';
import { ASSETS } from '../data/demoData';

// 1. MY PROFILE CONSOLIDATED OVERVIEW
export const MyProfileOverview: React.FC = () => {
  const { activeProfile, setActiveNav } = useProfile();
  const {
    personalInfo,
    collegeDetails,
    academicRecords,
    attendance,
    projects,
    certificates,
    skills,
    achievements,
    internships,
    sports,
    extracurricular,
  } = activeProfile;

  const latestCgpa =
    academicRecords.length > 0
      ? academicRecords[academicRecords.length - 1].cgpa.toFixed(2)
      : '0.00';

  return (
    <div className="space-y-8">
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-5">
            <img
              src={personalInfo.profilePhoto}
              alt={personalInfo.fullName}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
            />
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {personalInfo.fullName}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                {collegeDetails.degree} in {collegeDetails.department} · {collegeDetails.academicYear}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {collegeDetails.collegeName} · Roll No: {collegeDetails.collegeIdRollNo} · CGPA:{' '}
                <span className="font-mono-tabular font-semibold text-slate-900 dark:text-white">
                  {latestCgpa}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveNav('personal-info')}
              className="px-4 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Edit Personal Info
            </button>
            <button
              onClick={() => setActiveNav('public-portfolio')}
              className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Open Public Portfolio
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">About Me</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {personalInfo.aboutMe || 'No bio added yet.'}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Highlighted Projects ({projects.length})
                </h3>
                <button
                  onClick={() => setActiveNav('projects')}
                  className="text-xs text-blue-600 hover:underline cursor-pointer"
                >
                  Manage Projects →
                </button>
              </div>
              <div className="space-y-3">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800"
                  >
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {p.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {p.role} · {p.duration} · {p.status}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Internships &amp; Industry Experience ({internships.length})
                </h3>
                <button
                  onClick={() => setActiveNav('internships')}
                  className="text-xs text-blue-600 hover:underline cursor-pointer"
                >
                  Manage Internships →
                </button>
              </div>
              <div className="space-y-3">
                {internships.map((i) => (
                  <div
                    key={i.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800"
                  >
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {i.role} · {i.companyOrganization}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {i.internshipType} · {i.duration} ({i.startDate} to {i.endDate})
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                      {i.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Contact &amp; Enrollment Summary
                </h3>
                <button
                  onClick={() => setActiveNav('college-details')}
                  className="text-xs text-blue-600 hover:underline cursor-pointer"
                >
                  Edit
                </button>
              </div>
              <div className="text-xs space-y-2 text-slate-600 dark:text-slate-300">
                <div>
                  <span className="text-slate-400">Email:</span> {personalInfo.email}
                </div>
                <div>
                  <span className="text-slate-400">Phone:</span> {personalInfo.phoneNumber}
                </div>
                <div>
                  <span className="text-slate-400">Location:</span> {personalInfo.city},{' '}
                  {personalInfo.state}, {personalInfo.country}
                </div>
                <div>
                  <span className="text-slate-400">University:</span> {collegeDetails.university}
                </div>
                <div>
                  <span className="text-slate-400">Register No:</span>{' '}
                  <span className="font-mono-tabular">{collegeDetails.registerNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400">Batch:</span> {collegeDetails.batch} · Section{' '}
                  {collegeDetails.section}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Top Skills ({skills.length})
                </h3>
                <button
                  onClick={() => setActiveNav('skills')}
                  className="text-xs text-blue-600 hover:underline cursor-pointer"
                >
                  Manage →
                </button>
              </div>
              <div className="space-y-2.5">
                {skills.slice(0, 5).map((s) => (
                  <div key={s.id} className="text-xs">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {s.name}
                      </span>
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
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 space-y-1">
              <div>
                Verified Certificates: <strong className="font-mono-tabular">{certificates.length}</strong> ·
                Achievements: <strong className="font-mono-tabular">{achievements.length}</strong>
              </div>
              <div>
                Sports Records: <strong className="font-mono-tabular">{sports.length}</strong> ·
                Extracurriculars: <strong className="font-mono-tabular">{extracurricular.length}</strong> ·
                Attendance Subjects: <strong className="font-mono-tabular">{attendance.length}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. PERSONAL INFORMATION MODULE
export const PersonalInfoModule: React.FC = () => {
  const { activeProfile, updatePersonalInfo, notify } = useProfile();
  const [formData, setFormData] = useState(activeProfile.personalInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError('Profile photo size must be under 4 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormData((prev) => ({ ...prev, profilePhoto: reader.result as string }));
        setIsEditing(true);
        notify('Profile Photo Selected', 'Click Save Changes to persist your new photo.', 'info');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.fullName.trim()) {
      setError('Full Name cannot be empty.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (formData.phoneNumber && formData.phoneNumber.trim().length < 7) {
      setError('Please enter a valid phone number.');
      return;
    }
    updatePersonalInfo(formData);
    setIsEditing(false);
  };

  const handleClearOptionalFields = () => {
    const cleared = {
      ...formData,
      phoneNumber: '',
      address: '',
      linkedIn: '',
      github: '',
      portfolioWebsite: '',
      aboutMe: '',
    };
    setFormData(cleared);
    updatePersonalInfo(cleared);
    setIsEditing(false);
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Personal Information
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your personal identity, contact information, social links, and biography.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Information</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setFormData(activeProfile.personalInfo);
                setIsEditing(false);
                setError('');
              }}
              className="px-4 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 flex items-center gap-2 text-xs text-red-700 dark:text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Photo Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-4 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <img
            src={formData.profilePhoto || ASSETS.avatarPooja}
            alt={formData.fullName}
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-2xl object-cover border border-slate-300 dark:border-slate-700"
          />
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-900 dark:text-white">
              Student Profile Photograph
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="px-3.5 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg hover:border-blue-500 cursor-pointer">
                <span>Upload Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, profilePhoto: ASSETS.avatarPooja }));
                  setIsEditing(true);
                }}
                className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:underline cursor-pointer"
              >
                Reset to Default Portrait
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Date of Birth (Protected PII)
            </label>
            <input
              type="date"
              disabled={!isEditing}
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Gender
            </label>
            <select
              disabled={!isEditing}
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              disabled={!isEditing}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Phone Number (Protected PII)
            </label>
            <input
              type="tel"
              disabled={!isEditing}
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="+91 98402 71549"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              City
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              State
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Country
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Street Address (Protected PII)
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              disabled={!isEditing}
              value={formData.linkedIn}
              onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
              placeholder="https://linkedin.com/in/..."
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              GitHub Profile URL
            </label>
            <input
              type="url"
              disabled={!isEditing}
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              placeholder="https://github.com/..."
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Portfolio Website
            </label>
            <input
              type="url"
              disabled={!isEditing}
              value={formData.portfolioWebsite}
              onChange={(e) => setFormData({ ...formData, portfolioWebsite: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            About Me / Student Biography
          </label>
          <textarea
            rows={4}
            disabled={!isEditing}
            value={formData.aboutMe}
            onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
          />
        </div>

        {isEditing && (
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleClearOptionalFields}
              className="px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Optional Bio &amp; Contact Info</span>
            </button>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setFormData(activeProfile.personalInfo);
                  setIsEditing(false);
                }}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Personal Information</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

// 3. COLLEGE DETAILS MODULE
export const CollegeDetailsModule: React.FC = () => {
  const { activeProfile, updateCollegeDetails } = useProfile();
  const [formData, setFormData] = useState(activeProfile.collegeDetails);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCollegeDetails(formData);
    setIsEditing(false);
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">College Details</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Store your institution, university affiliation, register number, department, and batch.
          </p>
        </div>
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit College Details</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setFormData(activeProfile.collegeDetails);
              setIsEditing(false);
            }}
            className="px-4 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              College Name *
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.collegeName}
              onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Affiliated University *
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              College ID / Roll Number *
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.collegeIdRollNo}
              onChange={(e) => setFormData({ ...formData, collegeIdRollNo: e.target.value })}
              className="w-full px-3.5 py-2 text-sm font-mono-tabular rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              University Register Number *
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.registerNumber}
              onChange={(e) => setFormData({ ...formData, registerNumber: e.target.value })}
              className="w-full px-3.5 py-2 text-sm font-mono-tabular rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Degree Programme *
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Department / Branch *
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Current Academic Year
            </label>
            <select
              disabled={!isEditing}
              value={formData.academicYear}
              onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
            >
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Current Semester
            </label>
            <select
              disabled={!isEditing}
              value={formData.semester}
              onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={`Semester ${n}`}>
                  Semester {n}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Batch
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.batch}
              onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
              className="w-full px-3.5 py-2 text-sm font-mono-tabular rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Section
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Admission Year
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.admissionYear}
              onChange={(e) => setFormData({ ...formData, admissionYear: e.target.value })}
              className="w-full px-3.5 py-2 text-sm font-mono-tabular rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Expected Graduation Year
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.expectedGraduationYear}
              onChange={(e) => setFormData({ ...formData, expectedGraduationYear: e.target.value })}
              className="w-full px-3.5 py-2 text-sm font-mono-tabular rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:bg-slate-50 dark:disabled:bg-slate-900/60"
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                setFormData(activeProfile.collegeDetails);
                setIsEditing(false);
              }}
              className="px-4 py-2 text-xs font-medium text-slate-600 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save College Details</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

// 4. ACADEMIC PERFORMANCE MODULE (WITH CHARTS & TABLE)
export const AcademicPerformanceModule: React.FC = () => {
  const { activeProfile, saveAcademicRecord, deleteAcademicRecord } = useProfile();
  const records = activeProfile.academicRecords;

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [error, setError] = useState('');

  const [academicYear, setAcademicYear] = useState('2nd Year');
  const [semester, setSemester] = useState('Semester 4');
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [marks, setMarks] = useState(90);
  const [grade, setGrade] = useState('O');
  const [credits, setCredits] = useState(4);
  const [gpa, setGpa] = useState(9.4);
  const [cgpa, setCgpa] = useState(9.34);
  const [percentage, setPercentage] = useState(93.4);
  const [backlogs, setBacklogs] = useState(0);

  const openEdit = (rec: AcademicRecord) => {
    setEditingId(rec.id);
    setAcademicYear(rec.academicYear);
    setSemester(rec.semester);
    setSubjectName(rec.subjectName);
    setSubjectCode(rec.subjectCode);
    setMarks(rec.marks);
    setGrade(rec.grade);
    setCredits(rec.credits);
    setGpa(rec.gpa);
    setCgpa(rec.cgpa);
    setPercentage(rec.percentage);
    setBacklogs(rec.backlogs);
    setError('');
    setShowForm(true);
  };

  const openNew = () => {
    setEditingId(undefined);
    setSubjectName('');
    setSubjectCode('');
    setMarks(90);
    setGrade('O');
    setCredits(4);
    setGpa(9.4);
    setCgpa(9.35);
    setPercentage(93.5);
    setBacklogs(0);
    setError('');
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!subjectName.trim() || !subjectCode.trim()) {
      setError('Subject Name and Subject Code are required.');
      return;
    }
    if (marks < 0 || marks > 100) {
      setError('Marks must be within valid range (0 to 100).');
      return;
    }
    if (gpa < 0 || gpa > 10 || cgpa < 0 || cgpa > 10) {
      setError('GPA and CGPA must be between 0.0 and 10.0.');
      return;
    }
    saveAcademicRecord({
      id: editingId,
      academicYear,
      semester,
      subjectName: subjectName.trim(),
      subjectCode: subjectCode.trim().toUpperCase(),
      marks: Number(marks),
      grade,
      credits: Number(credits),
      gpa: Number(gpa),
      cgpa: Number(cgpa),
      percentage: Number(percentage),
      backlogs: Number(backlogs),
    });
    setShowForm(false);
  };

  // Group semester GPAs for chart
  const semesterSummary = Array.from(new Set(records.map((r) => r.semester))).map((sem) => {
    const semRecords = records.filter((r) => r.semester === sem);
    const last = semRecords[semRecords.length - 1];
    return {
      semester: sem,
      gpa: last ? last.gpa : 0,
      cgpa: last ? last.cgpa : 0,
    };
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Academic Performance &amp; Grade Ledger
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Semester-wise subjects, marks, credits, GPA/CGPA progression, and backlog tracking.
          </p>
        </div>
        <button
          onClick={openNew}
          className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subject Record</span>
        </button>
      </div>

      {/* Charts Row: Semester GPA/CGPA Progress + Subject Performance Bar Chart */}
      {records.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Semester GPA & CGPA Chart */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Semester-wise GPA &amp; CGPA Progression
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              10-point Anna University grading scale comparison across completed semesters
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-end h-44 pt-6 px-2 border-b border-slate-200 dark:border-slate-800">
              {semesterSummary.map((s) => (
                <div key={s.semester} className="flex flex-col items-center gap-2 h-full justify-end">
                  <div className="flex items-end gap-2 w-full justify-center h-32">
                    <div
                      className="w-6 bg-blue-600 rounded-t-md transition-all"
                      style={{ height: `${(s.gpa / 10) * 100}%` }}
                      title={`GPA: ${s.gpa}`}
                    />
                    <div
                      className="w-6 bg-emerald-600 rounded-t-md transition-all"
                      style={{ height: `${(s.cgpa / 10) * 100}%` }}
                      title={`CGPA: ${s.cgpa}`}
                    />
                  </div>
                  <div className="text-[11px] font-mono-tabular text-slate-600 dark:text-slate-300">
                    GPA {s.gpa.toFixed(2)}
                  </div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white pb-2">
                    {s.semester.replace('Semester ', 'Sem ')}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-blue-600 inline-block" /> Semester GPA
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600 inline-block" /> Cumulative CGPA
              </span>
            </div>
          </div>

          {/* Subject Performance Marks Chart */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Subject Marks Distribution (Out of 100)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Individual course performance across logged university subjects
            </p>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {records.map((r) => (
                <div key={r.id} className="text-xs">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-slate-800 dark:text-slate-200 truncate pr-2">
                      {r.subjectCode} · {r.subjectName}
                    </span>
                    <span className="font-mono-tabular font-semibold text-slate-900 dark:text-white shrink-0">
                      {r.marks}/100 ({r.grade})
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${r.marks}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Subject Modal Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-600 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {editingId ? 'Edit Academic Subject Record' : 'Add New Subject Record'}
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Academic Year</label>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={`Semester ${n}`}>
                    Semester {n}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Subject Code *</label>
              <input
                type="text"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                placeholder="e.g. CB3401"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Subject Name *</label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Operating Systems"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Marks (0-100) *</label>
              <input
                type="number"
                min={0}
                max={100}
                value={marks}
                onChange={(e) => setMarks(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-mono-tabular rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Grade</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value="O">O (Outstanding)</option>
                <option value="A+">A+ (Excellent)</option>
                <option value="A">A (Very Good)</option>
                <option value="B+">B+ (Good)</option>
                <option value="B">B (Average)</option>
                <option value="C">C (Satisfactory)</option>
                <option value="U">U (Reappear)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Credits</label>
              <input
                type="number"
                min={1}
                max={10}
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-mono-tabular rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Semester GPA</label>
              <input
                type="number"
                step="0.01"
                min={0}
                max={10}
                value={gpa}
                onChange={(e) => setGpa(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-mono-tabular rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Cumulative CGPA</label>
              <input
                type="number"
                step="0.01"
                min={0}
                max={10}
                value={cgpa}
                onChange={(e) => setCgpa(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-mono-tabular rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Percentage (%)</label>
              <input
                type="number"
                step="0.1"
                min={0}
                max={100}
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-mono-tabular rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Backlogs</label>
              <input
                type="number"
                min={0}
                max={20}
                value={backlogs}
                onChange={(e) => setBacklogs(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-mono-tabular rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Save Subject Record
            </button>
          </div>
        </form>
      )}

      {/* Academic Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
        {records.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              No academic records added yet. Click &apos;Add Subject Record&apos; to log your first
              semester course.
            </p>
            <button
              onClick={openNew}
              className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg cursor-pointer"
            >
              Add Subject Record
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-500 bg-[#F8FAFC] dark:bg-slate-800/50">
                  <th className="py-3 px-4">Semester</th>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Subject Name</th>
                  <th className="py-3 px-4 text-right">Credits</th>
                  <th className="py-3 px-4 text-right">Marks</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4 text-right">GPA</th>
                  <th className="py-3 px-4 text-right">CGPA</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {records.map((rec) => (
                  <tr
                    key={rec.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                      {rec.academicYear} · {rec.semester}
                    </td>
                    <td className="py-3 px-4 font-mono-tabular font-semibold text-slate-900 dark:text-white">
                      {rec.subjectCode}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                      {rec.subjectName}
                    </td>
                    <td className="py-3 px-4 text-right font-mono-tabular">{rec.credits}</td>
                    <td className="py-3 px-4 text-right font-mono-tabular font-semibold">
                      {rec.marks}
                    </td>
                    <td className="py-3 px-4 font-mono-tabular font-semibold text-emerald-600 dark:text-emerald-400">
                      {rec.grade}
                    </td>
                    <td className="py-3 px-4 text-right font-mono-tabular">
                      {rec.gpa.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono-tabular font-semibold">
                      {rec.cgpa.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => openEdit(rec)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAcademicRecord(rec.id)}
                        className="text-red-600 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// 5. ATTENDANCE MODULE (AUTOMATIC CALCULATION & VALIDATION)
export const AttendanceModule: React.FC = () => {
  const { activeProfile, saveAttendanceRecord, deleteAttendanceRecord } = useProfile();
  const records = activeProfile.attendance;

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [error, setError] = useState('');

  const [academicYear, setAcademicYear] = useState('2nd Year');
  const [semester, setSemester] = useState('Semester 4');
  const [subject, setSubject] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [totalClasses, setTotalClasses] = useState(45);
  const [classesAttended, setClassesAttended] = useState(42);

  // Automatic calculation per specification: (Classes Attended / Total Classes) * 100
  const calculatedAbsent = Math.max(0, totalClasses - classesAttended);
  const calculatedPercentage =
    totalClasses > 0 ? Number(((classesAttended / totalClasses) * 100).toFixed(2)) : 0;

  const totalAll = records.reduce((s, r) => s + r.totalClasses, 0);
  const attendedAll = records.reduce((s, r) => s + r.classesAttended, 0);
  const overallPercent = totalAll > 0 ? Number(((attendedAll / totalAll) * 100).toFixed(2)) : 0;

  const openNew = () => {
    setEditingId(undefined);
    setSubject('');
    setSubjectCode('');
    setTotalClasses(45);
    setClassesAttended(42);
    setError('');
    setShowForm(true);
  };

  const openEdit = (rec: AttendanceRecord) => {
    setEditingId(rec.id);
    setAcademicYear(rec.academicYear);
    setSemester(rec.semester);
    setSubject(rec.subject);
    setSubjectCode(rec.subjectCode);
    setTotalClasses(rec.totalClasses);
    setClassesAttended(rec.classesAttended);
    setError('');
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!subject.trim()) {
      setError('Subject Name is required.');
      return;
    }
    if (totalClasses <= 0) {
      setError('Total Classes must be greater than 0.');
      return;
    }
    if (classesAttended < 0) {
      setError('Classes Attended cannot be negative.');
      return;
    }
    if (classesAttended > totalClasses) {
      setError(
        'Invalid attendance: Classes Attended cannot exceed Total Classes (Attendance cannot exceed 100%).'
      );
      return;
    }

    saveAttendanceRecord({
      id: editingId,
      academicYear,
      semester,
      subject: subject.trim(),
      subjectCode: subjectCode.trim().toUpperCase() || 'SUBJ',
      totalClasses: Number(totalClasses),
      classesAttended: Number(classesAttended),
      classesAbsent: calculatedAbsent,
      attendancePercentage: calculatedPercentage,
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Attendance Management &amp; Eligibility Tracker
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Automatically calculates Attendance Percentage = (Classes Attended / Total Classes) ×
            100.
          </p>
        </div>
        <button
          onClick={openNew}
          className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subject Attendance</span>
        </button>
      </div>

      {/* Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500">Overall Attendance Percentage</div>
          <div className="text-3xl font-bold font-mono-tabular text-slate-900 dark:text-white mt-1">
            {overallPercent}%
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              {overallPercent >= 75
                ? 'Eligible for University End-Semester Exams (≥75%)'
                : 'Warning: Below 75% University Threshold'}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500">Total Classes Conducted</div>
          <div className="text-3xl font-bold font-mono-tabular text-slate-900 dark:text-white mt-1">
            {totalAll}
          </div>
          <div className="text-xs text-slate-500 mt-1">Across {records.length} active subjects</div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500">Classes Attended / Absent</div>
          <div className="text-3xl font-bold font-mono-tabular text-slate-900 dark:text-white mt-1">
            {attendedAll} <span className="text-base font-normal text-slate-400">/ {totalAll - attendedAll} absent</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">Verified Lecture Hours</div>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-600 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {editingId ? 'Edit Attendance Record' : 'Log Subject Attendance'}
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-xs text-slate-500 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Academic Year</label>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={`Semester ${n}`}>
                    Semester {n}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Subject Code</label>
              <input
                type="text"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                placeholder="CB3401"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1">Subject Name *</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Operating Systems & Cloud Virtualization"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Total Classes *</label>
              <input
                type="number"
                min={1}
                value={totalClasses}
                onChange={(e) => setTotalClasses(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-mono-tabular rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Classes Attended *</label>
              <input
                type="number"
                min={0}
                value={classesAttended}
                onChange={(e) => setClassesAttended(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-mono-tabular rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Classes Absent (Auto)</label>
              <input
                type="number"
                disabled
                value={calculatedAbsent}
                className="w-full px-3 py-2 text-xs font-mono-tabular rounded-lg border border-slate-200 bg-slate-100 dark:bg-slate-800/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Computed % (Auto)</label>
              <input
                type="text"
                disabled
                value={`${calculatedPercentage}%`}
                className="w-full px-3 py-2 text-xs font-mono-tabular font-semibold rounded-lg border border-slate-200 bg-slate-100 dark:bg-slate-800/50"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Save Attendance Record
            </button>
          </div>
        </form>
      )}

      {/* Visual Attendance Chart & Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Subject-wise Attendance Chart &amp; Status
        </h3>
        {records.length === 0 ? (
          <p className="text-xs text-slate-500 py-8 text-center">
            No attendance records added yet. Click &apos;Add Subject Attendance&apos; above.
          </p>
        ) : (
          <div className="space-y-4">
            {records.map((r) => {
              const isSafe = r.attendancePercentage >= 75;
              return (
                <div
                  key={r.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono-tabular font-semibold text-blue-600 dark:text-blue-400 mr-2">
                        {r.subjectCode}
                      </span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {r.subject}
                      </span>
                      <span className="text-xs text-slate-500 ml-2">
                        ({r.academicYear} · {r.semester})
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="font-mono-tabular text-slate-600 dark:text-slate-300">
                        Attended: <strong>{r.classesAttended}</strong>/{r.totalClasses} · Absent:{' '}
                        {r.classesAbsent}
                      </span>
                      <span
                        className={`font-mono-tabular font-bold ${
                          isSafe ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600'
                        }`}
                      >
                        {r.attendancePercentage.toFixed(2)}% (
                        {isSafe ? 'Nominal ≥75%' : 'Shortage <75%'})
                      </span>
                      <button
                        onClick={() => openEdit(r)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAttendanceRecord(r.id)}
                        className="text-red-600 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isSafe ? 'bg-emerald-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${Math.min(100, r.attendancePercentage)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
