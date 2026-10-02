import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, FileText, Share2, BarChart3, Lock } from 'lucide-react';
import { ASSETS } from '../data/demoData';

interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onDemoStudentLogin: () => void;
  onDemoAdminLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuth,
  onDemoStudentLogin,
  onDemoAdminLogin,
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Bar Contract: Zone 1 (Single wordmark), Zone 2 (4 nav links), Zone 3 (2 primary actions) */}
      <header className="sticky top-0 z-30 bg-[#F8FAFC]/95 dark:bg-[#0B0F19]/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-6 lg:px-12 py-4 flex items-center justify-between">
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap"
        >
          Smart Profile Management System
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap">
            How It Works
          </a>
          <a href="#benefits" className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap">
            Benefits
          </a>
          <a href="#demo-preview" className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap">
            Student Showcase
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenAuth('login')}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => onOpenAuth('signup')}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs font-medium tracking-wide text-blue-600 dark:text-blue-400">
              Centralized Academic &amp; Professional Record Architecture · B.Tech / B.E. Edition
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              One Profile. All Your Achievements.{' '}
              <span className="font-serif-editorial italic font-normal text-blue-600 dark:text-blue-400">
                Your Complete Digital Identity.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Instead of scattering academic transcripts, semester attendance, NPTEL certificates,
              projects, internships, sports honors, and extracurricular proofs across disconnected
              folders, manage and verify your entire college journey inside one structured digital
              profile.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onDemoStudentLogin}
                className="px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-slate-400 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Explore Live Demo (Pooja Dasari)
              </button>

              <button
                onClick={() => onOpenAuth('login')}
                className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap cursor-pointer"
              >
                Existing Student Login →
              </button>
            </div>

            {/* Quantitative Rigor adjacent to Hero Claim */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-6 max-w-xl">
              <div>
                <div className="text-2xl font-bold font-mono-tabular text-slate-900 dark:text-white">
                  15+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Integrated Student Modules
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono-tabular text-slate-900 dark:text-white">
                  1-Click
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  ATS Resume &amp; QR Portfolio
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono-tabular text-slate-900 dark:text-white">
                  100%
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Granular PII Privacy Control
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Container */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900">
              <img
                src={ASSETS.heroCampusImg}
                alt="College students collaborating on digital portfolios in a modern university hub"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] sm:h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={ASSETS.avatarPooja}
                    alt="Pooja Dasari"
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-white/30"
                  />
                  <div>
                    <div className="text-base font-semibold">Pooja Dasari</div>
                    <div className="text-xs text-slate-300">
                      St. Peter&apos;s College of Engineering and Technology · 2nd Year CSBS
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-200 font-mono-tabular">
                  CGPA 9.34 · Attendance 92.4% · 4 Verified Certificates · 2 Live Projects
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-white dark:bg-[#111827] border-y border-slate-200 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">
              01. Platform Capabilities
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Everything a college student achieves, structured in one place.
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
              Designed specifically for university departments, placement cells, and students who
              want instant access to verified academic and co-curricular records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B0F19]">
              <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                01. Semester Academics &amp; Attendance Engine
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Track subject-wise marks, credits, GPA, CGPA progression, and automated attendance
                percentages with visual charts and threshold alerts.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B0F19]">
              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                02. Certificates, Projects &amp; Internships
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Organize NPTEL medals, hackathons, workshops, industry internships, and software
                projects with verification links, GitHub repositories, and outcomes.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B0F19]">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                03. Automated Resume &amp; Document Vault
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Compile a clean, print-ready academic &amp; placement resume directly from your
                stored modules and keep official PDFs organized by category.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B0F19]">
              <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                04. Shareable Digital Portfolio &amp; QR Code
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Present a public portfolio URL (`/profile/student-name`) and scannable QR code for
                faculty reviews, hackathons, and campus placement interviews.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B0F19]">
              <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                05. Strict PII Privacy Safeguards
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Phone numbers, home addresses, dates of birth, roll numbers, and private transcripts
                remain hidden from public visitors unless explicitly enabled.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B0F19]">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                06. Sports, NSS &amp; Extracurricular Ledger
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Record zonal athletics, chess tournaments, NSS community drives, and club
                leadership alongside technical skills for a holistic student identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">
            02. Workflow Architecture
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Four structured steps from student onboarding to placement-ready portfolio sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="border-t-2 border-blue-600 pt-5">
            <div className="text-xs font-mono-tabular text-blue-600 dark:text-blue-400 mb-2">
              Step 01 · Onboarding
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
              Register Your College Identity
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Sign up with your name, college, department, and academic year to initialize your
              personal workspace.
            </p>
          </div>

          <div className="border-t-2 border-slate-300 dark:border-slate-700 pt-5">
            <div className="text-xs font-mono-tabular text-slate-500 mb-2">
              Step 02 · Record Keeping
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
              Log Academics, Skills &amp; Proofs
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Add semester grades, attendance, projects, NPTEL certificates, sports, and
              internships as you progress each semester.
            </p>
          </div>

          <div className="border-t-2 border-slate-300 dark:border-slate-700 pt-5">
            <div className="text-xs font-mono-tabular text-slate-500 mb-2">
              Step 03 · Privacy Governance
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
              Configure Visibility &amp; PII Rules
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Choose which modules appear on your public profile while keeping sensitive personal
              fields strictly protected.
            </p>
          </div>

          <div className="border-t-2 border-slate-300 dark:border-slate-700 pt-5">
            <div className="text-xs font-mono-tabular text-slate-500 mb-2">
              Step 04 · Presentation
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
              Export PDF Resume &amp; Share Link
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Generate an instant formatted resume or share your portfolio link and QR code with
              recruiters and faculty.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits & Live Student Showcase Section */}
      <section
        id="benefits"
        className="py-20 bg-white dark:bg-[#111827] border-t border-slate-200 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
              03. Why Students &amp; Colleges Choose SPMS
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Built for placement readiness, accreditation audits, and lifelong record ownership.
            </h2>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900 dark:text-white">Zero Last-Minute Panic:</strong>{' '}
                  When campus placements or scholarship applications open, every certificate ID,
                  project link, and semester GPA is already verified and searchable.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900 dark:text-white">Real-Time Profile Completion Tracking:</strong>{' '}
                  Interactive checklist identifies missing portfolio sections and guides students to
                  a 100% complete profile.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900 dark:text-white">Role-Based Admin Governance:</strong>{' '}
                  Faculty administrators can verify student profiles and manage categories without
                  intruding on private student documents.
                </span>
              </li>
            </ul>
          </div>

          <div
            id="demo-preview"
            className="lg:col-span-6 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B0F19]"
          >
            <div className="text-xs font-mono-tabular text-blue-600 dark:text-blue-400 mb-2">
              Interactive Evaluation Sandbox
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Test Drive with Pre-Loaded Student or Admin Data
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Launch directly into the pre-populated profile of{' '}
              <strong className="text-slate-900 dark:text-white">Pooja Dasari</strong> (2nd Year
              Computer Science and Business Systems, St. Peter&apos;s College of Engineering and
              Technology) or test the faculty Admin Governance Panel.
            </p>

            <div className="space-y-3">
              <button
                onClick={onDemoStudentLogin}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Launch Student Workspace — Pooja Dasari</span>
                <span className="font-mono-tabular text-xs opacity-90">2nd Year CSBS →</span>
              </button>

              <button
                onClick={onDemoAdminLogin}
                className="w-full py-3 px-4 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-slate-800 dark:text-slate-200 text-sm font-semibold rounded-lg transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Launch Faculty Admin Dashboard — Dr. S. Venkatesh</span>
                <span className="font-mono-tabular text-xs text-slate-500">Admin Role →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="py-10 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>Smart Profile Management System · Student Digital Identity Platform</span>
          <div className="flex items-center gap-6">
            <button onClick={() => onOpenAuth('login')} className="hover:underline cursor-pointer">
              Student Login
            </button>
            <button onClick={() => onOpenAuth('signup')} className="hover:underline cursor-pointer">
              Create Account
            </button>
            <button onClick={onDemoStudentLogin} className="hover:underline cursor-pointer">
              Demo Profile
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
