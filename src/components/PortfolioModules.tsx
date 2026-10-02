import React, { useState } from 'react';
import {
  Plus,
  Search,
  ExternalLink,
  X,
  FileText,
  Download,
  Lock,
  Globe,
  AlertCircle,
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import {
  ProjectItem,
  CertificateItem,
  CertificateCategory,
  SkillItem,
  SkillCategory,
  AchievementItem,
  SportItem,
  SportLevel,
  ExtracurricularItem,
  InternshipItem,
  EventWorkshopItem,
  DocumentCategory,
} from '../types';
import { ASSETS } from '../data/demoData';

// 1. PROJECTS MODULE
export const ProjectsModule: React.FC = () => {
  const { activeProfile, saveProject, deleteProject } = useProfile();
  const projects = activeProfile.projects;

  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [objective, setObjective] = useState('');
  const [technologiesUsed, setTechnologiesUsed] = useState('');
  const [role, setRole] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState<'Completed' | 'In Progress' | 'Prototype'>('Completed');
  const [githubLink, setGithubLink] = useState('');
  const [liveDemoLink, setLiveDemoLink] = useState('');
  const [image, setImage] = useState(ASSETS.projectFintechImg);
  const [outcome, setOutcome] = useState('');
  const [year, setYear] = useState('2026');

  const openNew = () => {
    setEditingId(undefined);
    setTitle('');
    setDescription('');
    setProblemStatement('');
    setObjective('');
    setTechnologiesUsed('');
    setRole('Full-Stack Developer');
    setTeamMembers('Pooja Dasari');
    setDuration('3 Months');
    setStatus('Completed');
    setGithubLink('');
    setLiveDemoLink('');
    setImage(ASSETS.projectFintechImg);
    setOutcome('');
    setYear('2026');
    setShowForm(true);
  };

  const openEdit = (p: ProjectItem) => {
    setEditingId(p.id);
    setTitle(p.title);
    setDescription(p.description);
    setProblemStatement(p.problemStatement);
    setObjective(p.objective);
    setTechnologiesUsed(p.technologiesUsed.join(', '));
    setRole(p.role);
    setTeamMembers(p.teamMembers);
    setDuration(p.duration);
    setStatus(p.status);
    setGithubLink(p.githubLink);
    setLiveDemoLink(p.liveDemoLink);
    setImage(p.image);
    setOutcome(p.outcome);
    setYear(p.year || '2026');
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    saveProject({
      id: editingId,
      title: title.trim(),
      description: description.trim(),
      problemStatement: problemStatement.trim(),
      objective: objective.trim(),
      technologiesUsed: technologiesUsed
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      role: role.trim(),
      teamMembers: teamMembers.trim(),
      duration: duration.trim(),
      status,
      githubLink: githubLink.trim(),
      liveDemoLink: liveDemoLink.trim(),
      image,
      outcome: outcome.trim(),
      year,
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Projects &amp; Engineering Case Studies
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Document your problem statements, technical architectures, team roles, and measurable
            project outcomes.
          </p>
        </div>
        <button
          onClick={openNew}
          className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-600 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {editingId ? 'Edit Project' : 'Create Project Entry'}
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-xs text-slate-500 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1">Project Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. FinPulse — SME Cash-Flow Forecasting Engine"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectItem['status'])}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Prototype">Prototype</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Your Role *</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Lead Full-Stack Developer"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Team Members</label>
              <input
                type="text"
                value={teamMembers}
                onChange={(e) => setTeamMembers(e.target.value)}
                placeholder="Pooja Dasari, Karthik R."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Project Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="4 Months (Jan 2026 – Apr 2026)"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1">
                Technologies Used (Comma separated) *
              </label>
              <input
                type="text"
                value={technologiesUsed}
                onChange={(e) => setTechnologiesUsed(e.target.value)}
                placeholder="React, TypeScript, Node.js, PostgreSQL, Python"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Project Cover Artwork</label>
              <select
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value={ASSETS.projectFintechImg}>Analytics &amp; FinTech Showcase</option>
                <option value={ASSETS.projectIotImg}>IoT Hardware &amp; Telemetry Showcase</option>
                <option value={ASSETS.heroCampusImg}>University Innovation Hub</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">GitHub Repository URL</label>
              <input
                type="url"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Live Demo URL</label>
              <input
                type="url"
                value={liveDemoLink}
                onChange={(e) => setLiveDemoLink(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Project Description *</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Problem Statement</label>
              <textarea
                rows={2}
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Objective</label>
              <textarea
                rows={2}
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Project Outcome &amp; Impact</label>
              <textarea
                rows={2}
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
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
              Save Project
            </button>
          </div>
        </form>
      )}

      {projects.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            No projects added yet. Click &apos;Add Project&apos; to create your first project entry.
          </p>
          <button
            onClick={openNew}
            className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg cursor-pointer"
          >
            Add Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
            >
              <img
                src={p.image || ASSETS.projectFintechImg}
                alt={p.title}
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover border-b border-slate-200 dark:border-slate-800"
              />
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Unboxed clean metadata line per Zero-Pill Discipline */}
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <span>{p.status}</span>
                    <span className="mx-1.5">·</span>
                    <span>{p.role}</span>
                    <span className="mx-1.5">·</span>
                    <span>{p.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{p.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {p.description}
                  </p>
                  {p.outcome && (
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium pt-1">
                      Outcome: {p.outcome}
                    </p>
                  )}
                  <div className="text-xs text-slate-500 pt-1">
                    <strong className="text-slate-700 dark:text-slate-300">Stack:</strong>{' '}
                    {p.technologiesUsed.join(' · ')}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedProject(p)}
                      className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      View Full Case Study
                    </button>
                    {p.githubLink && (
                      <a
                        href={p.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-600 dark:text-slate-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {p.liveDemoLink && (
                      <a
                        href={p.liveDemoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-600 dark:text-slate-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openEdit(p)}
                      className="text-slate-600 hover:text-blue-600 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProject(p.id)}
                      className="text-red-600 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 relative my-8">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-xs text-blue-600 font-medium">
              {selectedProject.status} · {selectedProject.duration} · Team:{' '}
              {selectedProject.teamMembers}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {selectedProject.title}
            </h3>
            <img
              src={selectedProject.image || ASSETS.projectFintechImg}
              alt={selectedProject.title}
              referrerPolicy="no-referrer"
              className="w-full h-56 object-cover rounded-xl border border-slate-200 dark:border-slate-800"
            />
            <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">
                  Overview &amp; Role ({selectedProject.role}):
                </strong>
                {selectedProject.description}
              </div>
              {selectedProject.problemStatement && (
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-0.5">
                    Problem Statement:
                  </strong>
                  {selectedProject.problemStatement}
                </div>
              )}
              {selectedProject.objective && (
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-0.5">
                    Engineering Objective:
                  </strong>
                  {selectedProject.objective}
                </div>
              )}
              {selectedProject.outcome && (
                <div>
                  <strong className="text-emerald-700 dark:text-emerald-400 block mb-0.5">
                    Measured Outcome:
                  </strong>
                  {selectedProject.outcome}
                </div>
              )}
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">
                  Technologies Used:
                </strong>
                {selectedProject.technologiesUsed.join(' · ')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 2. CERTIFICATES MODULE
const CERT_CATEGORIES: CertificateCategory[] = [
  'Internship',
  'Workshop',
  'Course',
  'NPTEL',
  'Hackathon',
  'Symposium',
  'Paper Presentation',
  'Technical Event',
  'Online Certification',
  'Other',
];

export const CertificatesModule: React.FC = () => {
  const { activeProfile, saveCertificate, deleteCertificate } = useProfile();
  const certificates = activeProfile.certificates;

  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'category'>('date');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<CertificateCategory>('NPTEL');
  const [issuingOrganization, setIssuingOrganization] = useState('');
  const [issueDate, setIssueDate] = useState('2026-01-15');
  const [certificateId, setCertificateId] = useState('');
  const [skillsTopics, setSkillsTopics] = useState('');
  const [verificationLink, setVerificationLink] = useState('');
  const [description, setDescription] = useState('');

  const openNew = () => {
    setEditingId(undefined);
    setName('');
    setCategory('NPTEL');
    setIssuingOrganization('');
    setIssueDate('2026-02-10');
    setCertificateId('');
    setSkillsTopics('');
    setVerificationLink('');
    setDescription('');
    setShowForm(true);
  };

  const openEdit = (c: CertificateItem) => {
    setEditingId(c.id);
    setName(c.name);
    setCategory(c.category);
    setIssuingOrganization(c.issuingOrganization);
    setIssueDate(c.issueDate);
    setCertificateId(c.certificateId);
    setSkillsTopics(c.skillsTopics.join(', '));
    setVerificationLink(c.verificationLink);
    setDescription(c.description);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !issuingOrganization.trim()) return;
    saveCertificate({
      id: editingId,
      name: name.trim(),
      category,
      issuingOrganization: issuingOrganization.trim(),
      issueDate,
      certificateId: certificateId.trim() || `CERT-${Date.now().toString().slice(-5)}`,
      skillsTopics: skillsTopics
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      fileImage: ASSETS.projectFintechImg,
      verificationLink: verificationLink.trim(),
      description: description.trim(),
    });
    setShowForm(false);
  };

  const filteredCerts = certificates
    .filter((c) => {
      const matchesCat = catFilter === 'All' || c.category === catFilter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.issuingOrganization.toLowerCase().includes(q) ||
        c.certificateId.toLowerCase().includes(q) ||
        c.skillsTopics.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return b.issueDate.localeCompare(a.issueDate);
      return a.category.localeCompare(b.category);
    });

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Certificates &amp; Credentials Vault
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Store NPTEL medals, hackathons, workshops, online courses, and verification URLs.
          </p>
        </div>
        <button
          onClick={openNew}
          className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certificate</span>
        </button>
      </div>

      {/* Search, Category Filter & Sort Controls */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search certificates by title, organization, topic, or ID..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
          />
        </div>
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
        >
          <option value="All">All Categories</option>
          {CERT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'category')}
          className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
        >
          <option value="date">Sort by Issue Date (Newest)</option>
          <option value="category">Sort by Category</option>
        </select>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-600 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {editingId ? 'Edit Certificate' : 'Add New Certificate'}
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-xs text-slate-500 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1">Certificate Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Data Base Management System (Elite + Silver)"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CertificateCategory)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                {CERT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Issuing Organization *</label>
              <input
                type="text"
                value={issuingOrganization}
                onChange={(e) => setIssuingOrganization(e.target.value)}
                placeholder="IIT Kharagpur — NPTEL"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Issue Date *</label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Certificate Credential ID</label>
              <input
                type="text"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="NPTEL25CS84S4492018"
                className="w-full px-3 py-2 text-xs font-mono-tabular rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1">
                Skills / Topics Covered (Comma separated)
              </label>
              <input
                type="text"
                value={skillsTopics}
                onChange={(e) => setSkillsTopics(e.target.value)}
                placeholder="SQL, Indexing, Transaction Concurrency"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Verification Link URL</label>
              <input
                type="url"
                value={verificationLink}
                onChange={(e) => setVerificationLink(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Description / Score Details</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
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
              Save Certificate
            </button>
          </div>
        </form>
      )}

      {filteredCerts.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            No certificates added yet. Click &apos;Add Certificate&apos; to create your first
            certificate.
          </p>
          <button
            onClick={openNew}
            className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg cursor-pointer"
          >
            Add Certificate
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCerts.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                {/* Clean unboxed metadata per Zero-Pill Discipline */}
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  <span>{c.category}</span>
                  <span className="mx-1.5">·</span>
                  <span className="font-mono-tabular">{c.issueDate}</span>
                  <span className="mx-1.5">·</span>
                  <span className="font-mono-tabular text-slate-500">ID: {c.certificateId}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{c.name}</h3>
                <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Issued by {c.issuingOrganization}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {c.description}
                </p>
                {c.skillsTopics.length > 0 && (
                  <div className="text-xs text-slate-500 pt-1">
                    Topics: {c.skillsTopics.join(' · ')}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                {c.verificationLink ? (
                  <a
                    href={c.verificationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-slate-400">Internal Record</span>
                )}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openEdit(c)}
                    className="text-slate-600 hover:text-blue-600 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCertificate(c.id)}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 3. SKILLS MODULE
const SKILL_CATEGORIES: SkillCategory[] = [
  'Programming',
  'Web Development',
  'Database',
  'AI/ML',
  'Data Science',
  'Cloud',
  'Tools',
  'Soft Skills',
  'Communication',
  'Other',
];

export const SkillsModule: React.FC = () => {
  const { activeProfile, saveSkill, deleteSkill } = useProfile();
  const skills = activeProfile.skills;

  const [catFilter, setCatFilter] = useState<string>('All');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<SkillCategory>('Programming');
  const [proficiencyLevel, setProficiencyLevel] = useState(85);
  const [yearsExperience, setYearsExperience] = useState('2 Years');
  const [description, setDescription] = useState('');

  const openNew = () => {
    setEditingId(undefined);
    setName('');
    setCategory('Programming');
    setProficiencyLevel(85);
    setYearsExperience('1.5 Years');
    setDescription('');
    setShowForm(true);
  };

  const openEdit = (s: SkillItem) => {
    setEditingId(s.id);
    setName(s.name);
    setCategory(s.category);
    setProficiencyLevel(s.proficiencyLevel);
    setYearsExperience(s.yearsExperience);
    setDescription(s.description);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    saveSkill({
      id: editingId,
      name: name.trim(),
      category,
      proficiencyLevel: Math.min(100, Math.max(1, Number(proficiencyLevel))),
      yearsExperience: yearsExperience.trim(),
      description: description.trim(),
    });
    setShowForm(false);
  };

  const filtered = skills.filter((s) => catFilter === 'All' || s.category === catFilter);

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Technical &amp; Professional Skills Matrix
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Track programming languages, web frameworks, data science tools, and communication
            competencies.
          </p>
        </div>
        <button
          onClick={openNew}
          className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Interactive Category Filter Buttons */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
        <button
          onClick={() => setCatFilter('All')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            catFilter === 'All'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          All ({skills.length})
        </button>
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCatFilter(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              catFilter === cat
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-600 space-y-4"
        >
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {editingId ? 'Edit Skill' : 'Add Skill'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Skill Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="React.js & TypeScript"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SkillCategory)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                {SKILL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">
                Proficiency Level ({proficiencyLevel}%)
              </label>
              <input
                type="range"
                min={10}
                max={100}
                value={proficiencyLevel}
                onChange={(e) => setProficiencyLevel(Number(e.target.value))}
                className="w-full mt-2"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Years / Experience</label>
              <input
                type="text"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                placeholder="2 Years"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Description / Practical Usage</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Applied in FinPulse and coursework labs..."
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
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
              className="px-5 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg cursor-pointer"
            >
              Save Skill
            </button>
          </div>
        </form>
      )}

      {filtered.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            No skills found in this category. Click &apos;Add Skill&apos; to add one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs text-slate-500">
                    {s.category} · {s.yearsExperience}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {s.name}
                  </h3>
                </div>
                <span className="text-sm font-bold font-mono-tabular text-blue-600 dark:text-blue-400">
                  {s.proficiencyLevel}%
                </span>
              </div>

              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${s.proficiencyLevel}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-slate-600 dark:text-slate-400 truncate pr-3">
                  {s.description}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => openEdit(s)}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSkill(s.id)}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 4. ACHIEVEMENTS MODULE
export const AchievementsModule: React.FC = () => {
  const { activeProfile, saveAchievement, deleteAchievement } = useProfile();
  const list = activeProfile.achievements;

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Hackathon Achievement');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('2026-03-05');
  const [organization, setOrganization] = useState('');
  const [eventName, setEventName] = useState('');
  const [positionAward, setPositionAward] = useState('');
  const [prize, setPrize] = useState('');
  const [verificationLink, setVerificationLink] = useState('');

  const openNew = () => {
    setEditingId(undefined);
    setTitle('');
    setCategory('Competition Winner');
    setDescription('');
    setDate('2026-03-01');
    setOrganization('');
    setEventName('');
    setPositionAward('1st Place');
    setPrize('');
    setVerificationLink('');
    setShowForm(true);
  };

  const openEdit = (a: AchievementItem) => {
    setEditingId(a.id);
    setTitle(a.title);
    setCategory(a.category);
    setDescription(a.description);
    setDate(a.date);
    setOrganization(a.organization);
    setEventName(a.eventName);
    setPositionAward(a.positionAward);
    setPrize(a.prize);
    setVerificationLink(a.verificationLink);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !organization.trim()) return;
    saveAchievement({
      id: editingId,
      title: title.trim(),
      category,
      description: description.trim(),
      date,
      organization: organization.trim(),
      eventName: eventName.trim(),
      positionAward: positionAward.trim(),
      prize: prize.trim(),
      proofFile: ASSETS.projectFintechImg,
      verificationLink: verificationLink.trim(),
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Honors, Awards &amp; Achievements
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Record competition wins, hackathon prizes, academic ranks, and paper awards.
          </p>
        </div>
        <button
          onClick={openNew}
          className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-600 space-y-4"
        >
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {editingId ? 'Edit Achievement' : 'Add Achievement'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1">Achievement Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value="Competition Winner">Competition Winner</option>
                <option value="Runner-up">Runner-up</option>
                <option value="Hackathon Achievement">Hackathon Achievement</option>
                <option value="Academic Achievement">Academic Achievement</option>
                <option value="Paper Presentation">Paper Presentation</option>
                <option value="Technical Quiz">Technical Quiz</option>
                <option value="Leadership Award">Leadership Award</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Organization *</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Event Name</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Position / Award</label>
              <input
                type="text"
                value={positionAward}
                onChange={(e) => setPositionAward(e.target.value)}
                placeholder="1st Place / Gold Medal"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Prize / Scholarship</label>
              <input
                type="text"
                value={prize}
                onChange={(e) => setPrize(e.target.value)}
                placeholder="₹25,000 Cash Prize"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Verification Link</label>
              <input
                type="url"
                value={verificationLink}
                onChange={(e) => setVerificationLink(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
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
              className="px-5 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg cursor-pointer"
            >
              Save Achievement
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {list.length === 0 ? (
          <div className="p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
            No achievements added yet. Click &apos;Add Achievement&apos; above.
          </div>
        ) : (
          list.map((a) => (
            <div
              key={a.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  {a.category} · {a.positionAward} · <span className="font-mono-tabular">{a.date}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{a.title}</h3>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  {a.organization} — {a.eventName} {a.prize ? `· Prize: ${a.prize}` : ''}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{a.description}</p>
              </div>
              <div className="flex items-center gap-3 text-xs shrink-0">
                {a.verificationLink && (
                  <a
                    href={a.verificationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  onClick={() => openEdit(a)}
                  className="text-slate-600 hover:text-blue-600 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteAchievement(a.id)}
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 5. SPORTS MODULE
const SPORT_LEVELS: SportLevel[] = [
  'College',
  'University',
  'District',
  'State',
  'National',
  'International',
];

export const SportsModule: React.FC = () => {
  const { activeProfile, saveSport, deleteSport } = useProfile();
  const sports = activeProfile.sports;

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [sportName, setSportName] = useState('');
  const [eventName, setEventName] = useState('');
  const [level, setLevel] = useState<SportLevel>('University');
  const [position, setPosition] = useState('');
  const [achievement, setAchievement] = useState('');
  const [organization, setOrganization] = useState('');
  const [date, setDate] = useState('2026-01-30');
  const [certificate, setCertificate] = useState('');
  const [description, setDescription] = useState('');

  const openNew = () => {
    setEditingId(undefined);
    setSportName('');
    setEventName('');
    setLevel('University');
    setPosition('Winner');
    setAchievement('');
    setOrganization('');
    setDate('2026-01-30');
    setCertificate('');
    setDescription('');
    setShowForm(true);
  };

  const openEdit = (s: SportItem) => {
    setEditingId(s.id);
    setSportName(s.sportName);
    setEventName(s.eventName);
    setLevel(s.level);
    setPosition(s.position);
    setAchievement(s.achievement);
    setOrganization(s.organization);
    setDate(s.date);
    setCertificate(s.certificate);
    setDescription(s.description);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sportName.trim() || !eventName.trim()) return;
    saveSport({
      id: editingId,
      sportName: sportName.trim(),
      eventName: eventName.trim(),
      level,
      position: position.trim(),
      achievement: achievement.trim(),
      organization: organization.trim(),
      date,
      certificate: certificate.trim(),
      description: description.trim(),
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Sports &amp; Athletic Representation
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Track College, University, District, State, National, and International sports honors.
          </p>
        </div>
        <button
          onClick={openNew}
          className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Sports Record</span>
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-600 space-y-4"
        >
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {editingId ? 'Edit Sports Record' : 'Add Sports Record'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Sport Name *</label>
              <input
                type="text"
                value={sportName}
                onChange={(e) => setSportName(e.target.value)}
                placeholder="Badminton / Chess / Athletics"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Tournament / Event Name *</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Competition Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as SportLevel)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                {SPORT_LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Position / Medal</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Runner-Up (Silver Medal)"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Organizing Body</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Certificate / Ref No</label>
              <input
                type="text"
                value={certificate}
                onChange={(e) => setCertificate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1">Achievement Summary</label>
              <input
                type="text"
                value={achievement}
                onChange={(e) => setAchievement(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
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
              className="px-5 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg cursor-pointer"
            >
              Save Sports Entry
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sports.map((s) => (
          <div
            key={s.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5"
          >
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              {s.level} Level · {s.position} · <span className="font-mono-tabular">{s.date}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {s.sportName} — {s.eventName}
            </h3>
            <div className="text-xs text-slate-600 dark:text-slate-300">{s.organization}</div>
            <p className="text-xs text-slate-500">{s.achievement}</p>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono-tabular text-slate-400">Cert: {s.certificate}</span>
              <div className="space-x-3">
                <button
                  onClick={() => openEdit(s)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSport(s.id)}
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 6. EXTRACURRICULAR ACTIVITIES MODULE
export const ExtracurricularModule: React.FC = () => {
  const { activeProfile, saveExtracurricular, deleteExtracurricular } = useProfile();
  const list = activeProfile.extracurricular;

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [activityName, setActivityName] = useState('');
  const [category, setCategory] = useState('Leadership Activities');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [date, setDate] = useState('2025-11-15');
  const [description, setDescription] = useState('');
  const [achievement, setAchievement] = useState('');
  const [certificateProof, setCertificateProof] = useState('');

  const openNew = () => {
    setEditingId(undefined);
    setActivityName('');
    setCategory('Clubs');
    setOrganization('');
    setRole('Student Coordinator');
    setDate('2026-01-10');
    setDescription('');
    setAchievement('');
    setCertificateProof('');
    setShowForm(true);
  };

  const openEdit = (item: ExtracurricularItem) => {
    setEditingId(item.id);
    setActivityName(item.activityName);
    setCategory(item.category);
    setOrganization(item.organization);
    setRole(item.role);
    setDate(item.date);
    setDescription(item.description);
    setAchievement(item.achievement);
    setCertificateProof(item.certificateProof);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityName.trim()) return;
    saveExtracurricular({
      id: editingId,
      activityName: activityName.trim(),
      category,
      organization: organization.trim(),
      role: role.trim(),
      date,
      description: description.trim(),
      achievement: achievement.trim(),
      certificateProof: certificateProof.trim(),
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Extracurricular Activities, NSS, NCC &amp; Clubs
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Document cultural events, NSS volunteering, NCC, student chapters, and leadership roles.
          </p>
        </div>
        <button
          onClick={openNew}
          className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Activity</span>
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-600 space-y-4"
        >
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {editingId ? 'Edit Extracurricular Activity' : 'Add Extracurricular Activity'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Activity Name *</label>
              <input
                type="text"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value="Cultural Activities">Cultural Activities</option>
                <option value="NSS">NSS</option>
                <option value="NCC">NCC</option>
                <option value="Clubs">Clubs</option>
                <option value="Volunteering">Volunteering</option>
                <option value="Social Service">Social Service</option>
                <option value="Public Speaking">Public Speaking</option>
                <option value="Leadership Activities">Leadership Activities</option>
                <option value="Student Coordinator">Student Coordinator</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Organization / Unit</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Your Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Certificate / Proof ID</label>
              <input
                type="text"
                value={certificateProof}
                onChange={(e) => setCertificateProof(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Impact / Achievement</label>
            <input
              type="text"
              value={achievement}
              onChange={(e) => setAchievement(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
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
              className="px-5 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg cursor-pointer"
            >
              Save Activity
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((e) => (
          <div
            key={e.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5"
          >
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              {e.category} · {e.role} · <span className="font-mono-tabular">{e.date}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{e.activityName}</h3>
            <div className="text-xs text-slate-600 dark:text-slate-300">{e.organization}</div>
            <p className="text-xs text-slate-500 leading-relaxed">{e.description}</p>
            {e.achievement && (
              <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                Highlight: {e.achievement}
              </div>
            )}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono-tabular text-slate-400">Proof: {e.certificateProof}</span>
              <div className="space-x-3">
                <button
                  onClick={() => openEdit(e)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteExtracurricular(e.id)}
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 7. INTERNSHIPS MODULE
export const InternshipsModule: React.FC = () => {
  const { activeProfile, saveInternship, deleteInternship } = useProfile();
  const list = activeProfile.internships;

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [companyOrganization, setCompanyOrganization] = useState('');
  const [role, setRole] = useState('');
  const [internshipType, setInternshipType] = useState<'On-site' | 'Remote' | 'Hybrid'>('Hybrid');
  const [startDate, setStartDate] = useState('2025-12-01');
  const [endDate, setEndDate] = useState('2026-01-15');
  const [duration, setDuration] = useState('6 Weeks');
  const [technologiesSkills, setTechnologiesSkills] = useState('');
  const [description, setDescription] = useState('');
  const [certificate, setCertificate] = useState('');
  const [offerLetter, setOfferLetter] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [verificationLink, setVerificationLink] = useState('');

  const openNew = () => {
    setEditingId(undefined);
    setCompanyOrganization('');
    setRole('');
    setInternshipType('Hybrid');
    setStartDate('2026-05-01');
    setEndDate('2026-06-30');
    setDuration('8 Weeks');
    setTechnologiesSkills('');
    setDescription('');
    setCertificate('');
    setOfferLetter('');
    setProjectTitle('');
    setVerificationLink('');
    setShowForm(true);
  };

  const openEdit = (i: InternshipItem) => {
    setEditingId(i.id);
    setCompanyOrganization(i.companyOrganization);
    setRole(i.role);
    setInternshipType(i.internshipType);
    setStartDate(i.startDate);
    setEndDate(i.endDate);
    setDuration(i.duration);
    setTechnologiesSkills(i.technologiesSkills.join(', '));
    setDescription(i.description);
    setCertificate(i.certificate);
    setOfferLetter(i.offerLetter);
    setProjectTitle(i.projectTitle);
    setVerificationLink(i.verificationLink);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyOrganization.trim() || !role.trim()) return;
    saveInternship({
      id: editingId,
      companyOrganization: companyOrganization.trim(),
      role: role.trim(),
      internshipType,
      startDate,
      endDate,
      duration: duration.trim(),
      technologiesSkills: technologiesSkills
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      description: description.trim(),
      certificate: certificate.trim(),
      offerLetter: offerLetter.trim(),
      projectTitle: projectTitle.trim(),
      verificationLink: verificationLink.trim(),
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Industry Internships &amp; Externships
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Store company details, roles, offer letters, completion certificates, and internship
            projects.
          </p>
        </div>
        <button
          onClick={openNew}
          className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Internship</span>
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-600 space-y-4"
        >
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {editingId ? 'Edit Internship' : 'Add Internship'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Company / Organization *</label>
              <input
                type="text"
                value={companyOrganization}
                onChange={(e) => setCompanyOrganization(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Role / Designation *</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Internship Type</label>
              <select
                value={internshipType}
                onChange={(e) => setInternshipType(e.target.value as InternshipItem['internshipType'])}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Internship Project Title</label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Technologies / Skills</label>
              <input
                type="text"
                value={technologiesSkills}
                onChange={(e) => setTechnologiesSkills(e.target.value)}
                placeholder="React, REST APIs, SQL"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Certificate / Offer Ref</label>
              <input
                type="text"
                value={certificate}
                onChange={(e) => setCertificate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Responsibilities &amp; Deliverables</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
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
              className="px-5 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg cursor-pointer"
            >
              Save Internship
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {list.map((i) => (
          <div
            key={i.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  {i.internshipType} · {i.duration} ({i.startDate} to {i.endDate})
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  {i.role} — {i.companyOrganization}
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <button
                  onClick={() => openEdit(i)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteInternship(i.id)}
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
            {i.projectTitle && (
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Project: {i.projectTitle}
              </div>
            )}
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {i.description}
            </p>
            <div className="text-xs text-slate-500">
              Technologies: {i.technologiesSkills.join(' · ')} · Cert ID: {i.certificate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 8. WORKSHOPS & EVENTS MODULE
export const EventsWorkshopsModule: React.FC = () => {
  const { activeProfile, saveEvent, deleteEvent } = useProfile();
  const list = activeProfile.events;

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState<EventWorkshopItem['eventType']>('Workshop');
  const [organization, setOrganization] = useState('');
  const [date, setDate] = useState('2026-02-20');
  const [location, setLocation] = useState('');
  const [roleParticipation, setRoleParticipation] = useState('Participant');
  const [description, setDescription] = useState('');
  const [certificate, setCertificate] = useState('');

  const openNew = () => {
    setEditingId(undefined);
    setEventName('');
    setEventType('Workshop');
    setOrganization('');
    setDate('2026-02-20');
    setLocation('');
    setRoleParticipation('Participant');
    setDescription('');
    setCertificate('');
    setShowForm(true);
  };

  const openEdit = (ev: EventWorkshopItem) => {
    setEditingId(ev.id);
    setEventName(ev.eventName);
    setEventType(ev.eventType);
    setOrganization(ev.organization);
    setDate(ev.date);
    setLocation(ev.location);
    setRoleParticipation(ev.roleParticipation);
    setDescription(ev.description);
    setCertificate(ev.certificate);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName.trim()) return;
    saveEvent({
      id: editingId,
      eventName: eventName.trim(),
      eventType,
      organization: organization.trim(),
      date,
      location: location.trim(),
      roleParticipation: roleParticipation.trim(),
      description: description.trim(),
      certificate: certificate.trim(),
      proof: 'Verified',
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Workshops, Seminars &amp; Technical Events
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Log conferences, bootcamps, symposiums, and hands-on workshops attended.
          </p>
        </div>
        <button
          onClick={openNew}
          className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event / Workshop</span>
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-600 space-y-4"
        >
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {editingId ? 'Edit Event' : 'Add Workshop / Event'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Event Name *</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Event Type</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value as EventWorkshopItem['eventType'])}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value="Workshop">Workshop</option>
                <option value="Symposium">Symposium</option>
                <option value="Seminar">Seminar</option>
                <option value="Conference">Conference</option>
                <option value="Bootcamp">Bootcamp</option>
                <option value="Hackathon">Hackathon</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Organization</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Location / Venue</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Role / Participation</label>
              <input
                type="text"
                value={roleParticipation}
                onChange={(e) => setRoleParticipation(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
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
              className="px-5 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg cursor-pointer"
            >
              Save Event
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((ev) => (
          <div
            key={ev.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
          >
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              {ev.eventType} · {ev.roleParticipation} ·{' '}
              <span className="font-mono-tabular">{ev.date}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{ev.eventName}</h3>
            <div className="text-xs text-slate-600 dark:text-slate-300">
              {ev.organization} · {ev.location}
            </div>
            <p className="text-xs text-slate-500">{ev.description}</p>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono-tabular text-slate-400">Cert: {ev.certificate}</span>
              <div className="space-x-3">
                <button
                  onClick={() => openEdit(ev)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEvent(ev.id)}
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 9. DOCUMENT STORAGE MODULE
const DOC_CATEGORIES: DocumentCategory[] = [
  'Certificates',
  'Resume',
  'Internship documents',
  'Project documents',
  'Achievement proofs',
  'Other academic documents',
];

export const DocumentsModule: React.FC = () => {
  const { activeProfile, saveDocument, deleteDocument, notify } = useProfile();
  const docs = activeProfile.documents;

  const [catFilter, setCatFilter] = useState<string>('All');
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>('Certificates');
  const [isPrivate, setIsPrivate] = useState(false);
  const [notes, setNotes] = useState('');
  const [previewDoc, setPreviewDoc] = useState<(typeof docs)[0] | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Allowed formats: PDF, JPG, PNG, WebP, DOC/DOCX.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5 MB limit.');
      return;
    }
    const sizeKb = `${Math.max(1, Math.round(file.size / 1024))} KB`;
    saveDocument({
      fileName: file.name,
      fileType: file.type,
      fileSize: sizeKb,
      uploadDate: new Date().toISOString().slice(0, 10),
      category: selectedCategory,
      isPrivate,
      fileUrl: URL.createObjectURL(file),
      notes: notes.trim() || `Uploaded ${selectedCategory.toLowerCase()} record.`,
    });
    setNotes('');
    e.target.value = '';
  };

  const filteredDocs = docs.filter((d) => catFilter === 'All' || d.category === catFilter);

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Document Storage &amp; Academic Vault
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Upload and organize official PDFs, transcripts, internship letters, and project reports
            with privacy controls.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Upload Bar */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-xs font-medium mb-1">Document Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as DocumentCategory)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            >
              {DOC_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Document Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Semester 4 Grade Sheet"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer py-2">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="rounded border-slate-300"
              />
              <span>Mark as Private Document (Hidden from public)</span>
            </label>
          </div>
          <div>
            <label className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg inline-flex items-center justify-center gap-1.5 cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>Select &amp; Upload File (≤5MB)</span>
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setCatFilter('All')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer ${
            catFilter === 'All'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600'
          }`}
        >
          All Documents ({docs.length})
        </button>
        {DOC_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCatFilter(c)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer ${
              catFilter === c
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Documents List */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
        {filteredDocs.map((d) => (
          <div
            key={d.id}
            className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <FileText className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  {d.fileName}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-2">
                  <span>{d.category}</span>
                  <span>·</span>
                  <span className="font-mono-tabular">{d.fileSize}</span>
                  <span>·</span>
                  <span className="font-mono-tabular">Uploaded {d.uploadDate}</span>
                  <span>·</span>
                  {d.isPrivate ? (
                    <span className="inline-flex items-center gap-1 text-amber-600 font-medium">
                      <Lock className="w-3 h-3" /> Private Document
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                      <Globe className="w-3 h-3" /> Public Portfolio Allowed
                    </span>
                  )}
                </div>
                {d.notes && <p className="text-xs text-slate-500 mt-1">{d.notes}</p>}
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs shrink-0">
              <button
                onClick={() => setPreviewDoc(d)}
                className="px-3 py-1.5 font-medium bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 cursor-pointer"
              >
                Preview
              </button>
              <button
                onClick={() =>
                  notify('Download Started', `Saving ${d.fileName} (${d.fileSize}) to your device.`)
                }
                className="px-3 py-1.5 font-medium text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
              <button
                onClick={() => deleteDocument(d.id)}
                className="text-red-600 hover:underline cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white truncate pr-4">
                {previewDoc.fileName}
              </h3>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <div>
                <strong>Category:</strong> {previewDoc.category}
              </div>
              <div>
                <strong>File Type &amp; Size:</strong> {previewDoc.fileType} ({previewDoc.fileSize})
              </div>
              <div>
                <strong>Uploaded On:</strong> {previewDoc.uploadDate}
              </div>
              <div>
                <strong>Privacy Level:</strong>{' '}
                {previewDoc.isPrivate ? 'Private (Owner Only)' : 'Publicly Verifiable'}
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <strong>Document Summary:</strong> {previewDoc.notes}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
