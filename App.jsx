import React from 'react';
import { useState, useRef } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const JOBS = [
  { id: 1,  title: "Frontend Developer",      company: "TechNova",      location: "Bangalore, IN",  type: "Full-time",  salary: "₹12–18 LPA",    logo: "TN", color: "#4F46E5", posted: "2 days ago",  tags: ["React","TypeScript","Tailwind"] },
  { id: 2,  title: "Data Analyst",             company: "InfoSystems",   location: "Chennai, IN",    type: "Full-time",  salary: "₹8–12 LPA",     logo: "IS", color: "#0891B2", posted: "1 day ago",   tags: ["SQL","Python","Power BI"] },
  { id: 3,  title: "UI/UX Designer",           company: "PixelCraft",    location: "Remote",         type: "Part-time",  salary: "₹6–9 LPA",      logo: "PC", color: "#DB2777", posted: "3 days ago",  tags: ["Figma","Prototyping","User Research"] },
  { id: 4,  title: "ML Engineer",              company: "DeepMind Labs", location: "Hyderabad, IN",  type: "Full-time",  salary: "₹20–30 LPA",    logo: "DM", color: "#059669", posted: "5 hours ago", tags: ["PyTorch","MLOps","Python"] },
  { id: 5,  title: "React Developer Intern",   company: "StartupHub",    location: "Mumbai, IN",     type: "Internship", salary: "₹20,000/mo",    logo: "SH", color: "#D97706", posted: "Today",       tags: ["React","JavaScript","CSS"] },
  { id: 6,  title: "DevOps Engineer",          company: "CloudBase",     location: "Pune, IN",       type: "Full-time",  salary: "₹15–22 LPA",    logo: "CB", color: "#7C3AED", posted: "1 week ago",  tags: ["Docker","Kubernetes","AWS"] },
  { id: 7,  title: "Content Writer",           company: "MediaBloom",    location: "Remote",         type: "Part-time",  salary: "₹4–6 LPA",      logo: "MB", color: "#DC2626", posted: "4 days ago",  tags: ["SEO","Copywriting","WordPress"] },
  { id: 8,  title: "Backend Developer",        company: "NodeWorks",     location: "Delhi, IN",      type: "Contract",   salary: "₹10–16 LPA",    logo: "NW", color: "#0D9488", posted: "2 days ago",  tags: ["Node.js","PostgreSQL","REST API"] },
  { id: 9,  title: "Product Manager",          company: "GrowthCo",      location: "Bangalore, IN",  type: "Full-time",  salary: "₹18–28 LPA",    logo: "GC", color: "#9333EA", posted: "6 hours ago", tags: ["Roadmapping","Analytics","Agile"] },
  { id: 10, title: "QA Tester",                company: "BugFreeLabs",   location: "Chennai, IN",    type: "Internship", salary: "₹15,000/mo",    logo: "BF", color: "#EA580C", posted: "3 days ago",  tags: ["Selenium","Manual Testing","JIRA"] },
];

const JOB_TYPES = ["All", "Full-time", "Part-time", "Internship", "Contract"];

const TYPE_BADGE = {
  "Full-time":  { bg: "#EEF2FF", text: "#4338CA" },
  "Part-time":  { bg: "#E0F2FE", text: "#0369A1" },
  "Internship": { bg: "#FEF3C7", text: "#B45309" },
  "Contract":   { bg: "#DCFCE7", text: "#15803D" },
};

const PROFILE_FIELDS = [
  { key: "photo",     label: "Photo"     },
  { key: "fullName",  label: "Full Name" },
  { key: "email",     label: "Email"     },
  { key: "phone",     label: "Phone"     },
  { key: "skills",    label: "Skills"    },
  { key: "education", label: "Education" },
  { key: "resume",    label: "Resume"    },
];

/* ─────────────────────────────────────────────
   STYLES  (injected once as a <style> tag)
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Fraunces:wght@600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'DM Sans', sans-serif;
  background: #F4F4F8;
  color: #1a1a2e;
  min-height: 100vh;
}

/* ── Layout ── */
.hp-root { min-height: 100vh; display: flex; flex-direction: column; }

.hp-nav {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 8px rgba(0,0,0,.05);
}

.hp-brand {
  font-family: 'Fraunces', serif;
  font-size: 22px;
  font-weight: 700;
  color: #4F46E5;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hp-brand-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #F59E0B;
  display: inline-block;
}

.hp-tabs { display: flex; gap: 4px; }

.hp-tab {
  padding: 7px 18px;
  border-radius: 999px;
  border: 1.5px solid transparent;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 13.5px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all .18s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.hp-tab:hover { background: #f3f4f6; color: #374151; }

.hp-tab.active {
  background: #4F46E5;
  border-color: #4F46E5;
  color: #fff;
}

.hp-content { flex: 1; max-width: 900px; width: 100%; margin: 0 auto; padding: 32px 20px 60px; }

/* ── Job Board ── */
.jb-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 12px; }

.jb-title { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 700; color: #111827; margin-bottom: 4px; letter-spacing: -0.03em; }

.jb-subtitle { font-size: 14px; color: #6b7280; }

.jb-applied-pill {
  padding: 6px 18px;
  border-radius: 999px;
  background: #eef2ff;
  color: #4F46E5;
  font-size: 13px;
  font-weight: 600;
  border: 1.5px solid #c7d2fe;
}

.jb-controls { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }

.jb-search-wrap { position: relative; }

.jb-search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 16px; pointer-events: none; }

.jb-search {
  width: 100%;
  padding: 12px 40px 12px 44px;
  border: 1.5px solid #e5e7eb;
  border-radius: 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #111827;
  background: #fff;
  outline: none;
  transition: border-color .15s, box-shadow .15s;
}
.jb-search:focus { border-color: #4F46E5; box-shadow: 0 0 0 3px rgba(79,70,229,.1); }

.jb-search-clear {
  position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
  background: none; border: none; color: #9ca3af; font-size: 13px; cursor: pointer; padding: 4px;
}

.jb-filter-row { display: flex; gap: 8px; flex-wrap: wrap; }

.jb-filter-btn {
  padding: 7px 16px;
  border-radius: 999px;
  border: 1.5px solid #e5e7eb;
  background: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all .15s;
}
.jb-filter-btn:hover { border-color: #a5b4fc; color: #4F46E5; background: #eef2ff; }
.jb-filter-btn.active { background: #4F46E5; border-color: #4F46E5; color: #fff; }

/* ── Job Card ── */
.jb-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 16px; }

.job-card {
  background: #fff;
  border: 1.5px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  cursor: default;
  transition: border-color .2s, box-shadow .2s, transform .18s;
}
.job-card:hover { border-color: #c7d2fe; box-shadow: 0 6px 24px rgba(79,70,229,.1); transform: translateY(-3px); }

.jc-header { display: flex; align-items: flex-start; gap: 12px; }

.jc-logo {
  width: 48px; height: 48px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 13px;
  flex-shrink: 0; letter-spacing: .02em;
}

.jc-title { font-size: 15px; font-weight: 600; color: #111827; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.jc-company { font-size: 13px; color: #6b7280; }

.jc-badge {
  font-size: 11px; padding: 3px 10px; border-radius: 999px;
  font-weight: 600; white-space: nowrap; letter-spacing: .02em; flex-shrink: 0;
}

.jc-meta { display: flex; flex-wrap: wrap; gap: 10px; }
.jc-meta-item { font-size: 12px; color: #6b7280; display: flex; align-items: center; gap: 4px; }

.jc-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.jc-tag {
  font-size: 11px; padding: 3px 9px; border-radius: 6px;
  background: #f9fafb; color: #374151; border: 1px solid #e5e7eb; font-weight: 500;
}

.jc-apply {
  margin-top: 2px; padding: 10px 0;
  border-radius: 10px; border: 1.5px solid transparent;
  color: #fff; font-family: 'DM Sans', sans-serif;
  font-weight: 600; font-size: 13px;
  cursor: pointer; transition: all .2s; letter-spacing: .01em;
}
.jc-apply:hover { opacity: .85; transform: translateY(-1px); }
.jc-apply.applied { background: transparent !important; font-weight: 600; }

/* ── Empty State ── */
.jb-empty { text-align: center; padding: 5rem 0; }
.jb-empty-icon { font-size: 48px; margin-bottom: 12px; }
.jb-empty-title { font-size: 16px; font-weight: 600; color: #374151; margin-bottom: 6px; }
.jb-empty-sub { font-size: 14px; color: #9ca3af; margin-bottom: 20px; }
.jb-empty-reset {
  padding: 9px 22px; border-radius: 10px; border: 1.5px solid #4F46E5;
  background: transparent; color: #4F46E5; font-family: 'DM Sans', sans-serif;
  font-size: 14px; font-weight: 500; cursor: pointer; transition: all .15s;
}
.jb-empty-reset:hover { background: #4F46E5; color: #fff; }

/* ── Profile ── */
.pf-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
.pf-title { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 700; color: #111827; margin-bottom: 4px; letter-spacing: -0.03em; }
.pf-subtitle { font-size: 14px; color: #6b7280; }

/* Progress card */
.pf-progress-card {
  background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px;
  padding: 20px 24px; margin-bottom: 20px;
}
.pf-progress-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.pf-progress-label { font-size: 13px; font-weight: 500; color: #6b7280; }
.pf-progress-pct { font-size: 26px; font-weight: 700; letter-spacing: -0.02em; }
.pf-track { height: 8px; border-radius: 999px; background: #f3f4f6; overflow: hidden; margin-bottom: 14px; }
.pf-bar { height: 100%; border-radius: 999px; transition: width .5s cubic-bezier(.4,0,.2,1); }
.pf-chips { display: flex; flex-wrap: wrap; gap: 7px; }
.pf-chip {
  font-size: 11.5px; padding: 4px 11px; border-radius: 999px;
  background: #f9fafb; color: #9ca3af; border: 1px solid #e5e7eb; font-weight: 500;
  transition: all .2s;
}
.pf-chip.done { background: #ECFDF5; color: #059669; border-color: #A7F3D0; }

/* Form card */
.pf-form-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 28px; }

.pf-photo-row { display: flex; align-items: center; gap: 20px; margin-bottom: 24px; }
.pf-photo-circle {
  width: 80px; height: 80px; border-radius: 50%;
  background: #f3f4f6; border: 2px dashed #d1d5db;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; overflow: hidden; flex-shrink: 0;
  position: relative; transition: border-color .2s;
}
.pf-photo-circle:hover { border-color: #4F46E5; }
.pf-photo-circle:hover .pf-photo-overlay { opacity: 1; }
.pf-photo-img { width: 100%; height: 100%; object-fit: cover; }
.pf-photo-placeholder { font-size: 32px; }
.pf-photo-overlay {
  position: absolute; inset: 0; background: rgba(79,70,229,.6);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; opacity: 0; transition: opacity .2s;
}
.pf-photo-name { font-size: 17px; font-weight: 600; color: #111827; margin-bottom: 2px; }
.pf-photo-hint { font-size: 12px; color: #9ca3af; }

.pf-divider { border: none; border-top: 1px solid #f3f4f6; margin-bottom: 24px; }

.pf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.pf-full { grid-column: 1 / -1; }

.pf-field { display: flex; flex-direction: column; }
.pf-label { font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px; }
.pf-required { color: #EF4444; margin-left: 2px; }
.pf-optional { color: #9ca3af; font-weight: 400; margin-left: 4px; }

.pf-input {
  padding: 11px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #111827;
  background: #fff;
  outline: none;
  transition: border-color .15s, box-shadow .15s;
  width: 100%;
}
.pf-input:focus { border-color: #4F46E5; box-shadow: 0 0 0 3px rgba(79,70,229,.09); }
.pf-input.success { border-color: #10B981; }
.pf-input.error { border-color: #EF4444; background: #FFF8F8; }
.pf-textarea { resize: vertical; min-height: 80px; }

.pf-err { font-size: 12px; color: #EF4444; margin-top: 5px; }

.pf-skill-pills { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px; }
.pf-skill-pill {
  font-size: 12px; padding: 3px 10px; border-radius: 6px;
  background: #EEF2FF; color: #4338CA; border: 1px solid #C7D2FE; font-weight: 500;
}

/* Resume zone */
.pf-resume-zone {
  border: 2px dashed #d1d5db; border-radius: 12px;
  padding: 20px; text-align: center; cursor: pointer;
  transition: border-color .2s, background .2s;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
}
.pf-resume-zone:hover { border-color: #4F46E5; background: #f5f4ff; }
.pf-resume-zone.uploaded { border-color: #10B981; background: #f0fdf4; border-style: solid; }
.pf-resume-icon { font-size: 28px; }
.pf-resume-prompt { font-size: 14px; font-weight: 500; color: #374151; }
.pf-resume-types { font-size: 12px; color: #9ca3af; }
.pf-resume-name { font-size: 14px; font-weight: 600; color: #059669; }
.pf-resume-size { font-size: 12px; color: #6b7280; }

/* Footer */
.pf-footer { margin-top: 28px; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; }
.pf-saved-banner {
  width: 100%; padding: 12px 16px; border-radius: 10px;
  background: #ECFDF5; border: 1px solid #A7F3D0;
  color: #065F46; font-size: 14px; font-weight: 500; text-align: center;
}
.pf-submit-btn {
  padding: 12px 36px;
  background: #4F46E5; border: none; border-radius: 10px;
  color: #fff; font-family: 'DM Sans', sans-serif;
  font-size: 15px; font-weight: 600; cursor: pointer;
  transition: all .2s; letter-spacing: .01em;
  box-shadow: 0 4px 14px rgba(79,70,229,.25);
}
.pf-submit-btn:hover { background: #4338CA; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(79,70,229,.3); }
.pf-submit-btn:active { transform: translateY(0); }

/* ── Responsive ── */
@media (max-width: 600px) {
  .hp-nav { padding: 0 14px; }
  .hp-tab span.tab-label { display: none; }
  .hp-content { padding: 20px 12px 60px; }
  .jb-title, .pf-title { font-size: 22px; }
  .jb-grid { grid-template-columns: 1fr; }
  .pf-grid { grid-template-columns: 1fr; }
  .pf-full { grid-column: 1; }
  .pf-form-card { padding: 18px; }
}
`;

/* ─────────────────────────────────────────────
   SMALL COMPONENTS
───────────────────────────────────────────── */
const Badge = ({ type }) => {
  const c = TYPE_BADGE[type] || { bg: "#F3F4F6", text: "#6B7280" };
  return (
    <span className="jc-badge" style={{ background: c.bg, color: c.text }}>
      {type}
    </span>
  );
};

/* ─────────────────────────────────────────────
   JOB CARD
───────────────────────────────────────────── */
const JobCard = ({ job, applied, onApply }) => (
  <div className="job-card">
    <div className="jc-header">
      <div className="jc-logo" style={{ background: job.color + "18", color: job.color }}>
        {job.logo}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="jc-title">{job.title}</div>
        <div className="jc-company">{job.company}</div>
      </div>
      <Badge type={job.type} />
    </div>

    <div className="jc-meta">
      <span className="jc-meta-item">📍 {job.location}</span>
      <span className="jc-meta-item">💰 {job.salary}</span>
      <span className="jc-meta-item">🕒 {job.posted}</span>
    </div>

    <div className="jc-tags">
      {job.tags.map((t) => <span key={t} className="jc-tag">{t}</span>)}
    </div>

    <button
      className={`jc-apply${applied ? " applied" : ""}`}
      style={
        applied
          ? { color: job.color, borderColor: job.color + "66" }
          : { background: job.color, borderColor: job.color }
      }
      onClick={() => onApply(job.id)}
    >
      {applied ? "✓ Applied" : "Apply Now"}
    </button>
  </div>
);

/* ─────────────────────────────────────────────
   JOB BOARD SCREEN
───────────────────────────────────────────── */
const JobBoard = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [applied, setApplied] = useState(new Set());

  const filtered = JOBS.filter((job) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q) ||
      job.tags.some((t) => t.toLowerCase().includes(q));
    return matchSearch && (filter === "All" || job.type === filter);
  });

  const toggleApply = (id) =>
    setApplied((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div>
      <div className="jb-header">
        <div>
          <h1 className="jb-title">Find Your Next Role</h1>
          <p className="jb-subtitle">
            {filtered.length} of {JOBS.length} open positions
          </p>
        </div>
        {applied.size > 0 && (
          <div className="jb-applied-pill">{applied.size} Applied ✓</div>
        )}
      </div>

      <div className="jb-controls">
        <div className="jb-search-wrap">
          <span className="jb-search-icon">🔍</span>
          <input
            className="jb-search"
            type="text"
            placeholder="Search jobs, companies, skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="jb-search-clear" onClick={() => setSearch("")}>
              ✕
            </button>
          )}
        </div>

        <div className="jb-filter-row">
          {JOB_TYPES.map((t) => (
            <button
              key={t}
              className={`jb-filter-btn${filter === t ? " active" : ""}`}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="jb-empty">
          <div className="jb-empty-icon">🔎</div>
          <p className="jb-empty-title">No jobs found</p>
          <p className="jb-empty-sub">Try different keywords or clear your filters</p>
          <button
            className="jb-empty-reset"
            onClick={() => { setSearch(""); setFilter("All"); }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="jb-grid">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} applied={applied.has(job.id)} onApply={toggleApply} />
          ))}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   VALIDATION
───────────────────────────────────────────── */
const validateForm = (form) => {
  const errors = {};
  if (!form.fullName.trim())
    errors.fullName = "Full name is required";
  else if (form.fullName.trim().length < 2)
    errors.fullName = "Name must be at least 2 characters";

  if (!form.email.trim())
    errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address";

  if (!form.phone.trim())
    errors.phone = "Phone number is required";
  else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, "")))
    errors.phone = "Enter a valid 10-digit phone number";

  if (!form.skills.trim())
    errors.skills = "Add at least one skill";

  if (!form.education.trim())
    errors.education = "Education details are required";

  return errors;
};

/* ─────────────────────────────────────────────
   PROFILE COMPLETION SCREEN
───────────────────────────────────────────── */
const ProfileCompletion = () => {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", skills: "", education: "", bio: "",
  });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [photo, setPhoto]     = useState(null);
  const [resume, setResume]   = useState(null);
  const [saved, setSaved]     = useState(false);

  const photoRef  = useRef();
  const resumeRef = useRef();

  /* live completion flags */
  const filled = {
    photo:     !!photo,
    fullName:  form.fullName.trim().length >= 2,
    email:     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    phone:     /^\d{10}$/.test(form.phone.replace(/\D/g, "")),
    skills:    form.skills.trim().length > 0,
    education: form.education.trim().length > 0,
    resume:    !!resume,
  };
  const pct          = Math.round((Object.values(filled).filter(Boolean).length / PROFILE_FIELDS.length) * 100);
  const progressColor = pct < 40 ? "#EF4444" : pct < 70 ? "#F59E0B" : "#10B981";

  /* helpers */
  const setField = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    if (touched[key]) {
      const errs = validateForm({ ...form, [key]: val });
      setErrors((p) => ({ ...p, [key]: errs[key] }));
    }
  };

  const handleBlur = (key) => {
    setTouched((p) => ({ ...p, [key]: true }));
    const errs = validateForm(form);
    setErrors((p) => ({ ...p, [key]: errs[key] }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const allTouched = Object.fromEntries(
      ["fullName", "email", "phone", "skills", "education"].map((k) => [k, true])
    );
    setTouched(allTouched);
    const errs = validateForm(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass = (key) =>
    `pf-input${errors[key] ? " error" : filled[key] ? " success" : ""}`;

  return (
    <div>
      <div className="pf-header">
        <div>
          <h1 className="pf-title">Complete Your Profile</h1>
          <p className="pf-subtitle">A complete profile gets 3× more recruiter views</p>
        </div>
      </div>

      {/* ── Progress ── */}
      <div className="pf-progress-card">
        <div className="pf-progress-top">
          <span className="pf-progress-label">Profile Strength</span>
          <span className="pf-progress-pct" style={{ color: progressColor }}>{pct}%</span>
        </div>
        <div className="pf-track">
          <div className="pf-bar" style={{ width: `${pct}%`, background: progressColor }} />
        </div>
        <div className="pf-chips">
          {PROFILE_FIELDS.map((f) => (
            <span key={f.key} className={`pf-chip${filled[f.key] ? " done" : ""}`}>
              {filled[f.key] ? "✓ " : ""}{f.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Form ── */}
      <div className="pf-form-card">

        {/* Photo row */}
        <div className="pf-photo-row">
          <div
            className="pf-photo-circle"
            onClick={() => photoRef.current.click()}
            role="button" tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && photoRef.current.click()}
          >
            {photo
              ? <img src={photo} alt="Profile" className="pf-photo-img" />
              : <span className="pf-photo-placeholder">👤</span>
            }
            <div className="pf-photo-overlay">📷</div>
          </div>
          <input type="file" accept="image/*" ref={photoRef} style={{ display: "none" }} onChange={handlePhoto} />
          <div>
            <p className="pf-photo-name">{form.fullName || "Your Name"}</p>
            <p className="pf-photo-hint">Click photo to upload · JPG, PNG</p>
          </div>
        </div>

        <hr className="pf-divider" />

        {/* Grid fields */}
        <div className="pf-grid">

          {/* Full Name */}
          <div className="pf-field">
            <label className="pf-label" htmlFor="fullName">
              Full Name <span className="pf-required">*</span>
            </label>
            <input
              id="fullName" className={inputClass("fullName")} type="text"
              placeholder="e.g. Lalith Kumar"
              value={form.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName")}
            />
            {errors.fullName && <p className="pf-err">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className="pf-field">
            <label className="pf-label" htmlFor="email">
              Email Address <span className="pf-required">*</span>
            </label>
            <input
              id="email" className={inputClass("email")} type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              onBlur={() => handleBlur("email")}
            />
            {errors.email && <p className="pf-err">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="pf-field">
            <label className="pf-label" htmlFor="phone">
              Phone Number <span className="pf-required">*</span>
            </label>
            <input
              id="phone" className={inputClass("phone")} type="tel"
              placeholder="10-digit number"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
            />
            {errors.phone && <p className="pf-err">{errors.phone}</p>}
          </div>

          {/* Skills */}
          <div className="pf-field">
            <label className="pf-label" htmlFor="skills">
              Skills <span className="pf-required">*</span>
            </label>
            <input
              id="skills" className={inputClass("skills")} type="text"
              placeholder="React, Python, SQL (comma-separated)"
              value={form.skills}
              onChange={(e) => setField("skills", e.target.value)}
              onBlur={() => handleBlur("skills")}
            />
            {errors.skills && <p className="pf-err">{errors.skills}</p>}
            {form.skills && (
              <div className="pf-skill-pills">
                {form.skills.split(",").filter((s) => s.trim()).map((s, i) => (
                  <span key={i} className="pf-skill-pill">{s.trim()}</span>
                ))}
              </div>
            )}
          </div>

          {/* Education */}
          <div className="pf-field pf-full">
            <label className="pf-label" htmlFor="education">
              Education Details <span className="pf-required">*</span>
            </label>
            <textarea
              id="education"
              className={`${inputClass("education")} pf-textarea`}
              placeholder="B.Tech in CSE, Anna University, 2022–2026"
              value={form.education}
              onChange={(e) => setField("education", e.target.value)}
              onBlur={() => handleBlur("education")}
              rows={3}
            />
            {errors.education && <p className="pf-err">{errors.education}</p>}
          </div>

          {/* Bio */}
          <div className="pf-field pf-full">
            <label className="pf-label" htmlFor="bio">
              Short Bio <span className="pf-optional">(optional)</span>
            </label>
            <textarea
              id="bio" className="pf-input pf-textarea"
              placeholder="A brief professional summary about you..."
              value={form.bio}
              onChange={(e) => setField("bio", e.target.value)}
              rows={2}
            />
          </div>

          {/* Resume */}
          <div className="pf-field pf-full">
            <label className="pf-label">
              Resume
            </label>
            <div
              className={`pf-resume-zone${resume ? " uploaded" : ""}`}
              onClick={() => resumeRef.current.click()}
              role="button" tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && resumeRef.current.click()}
            >
              <span className="pf-resume-icon">{resume ? "📄" : "⬆️"}</span>
              {resume ? (
                <>
                  <p className="pf-resume-name">{resume.name}</p>
                  <p className="pf-resume-size">
                    {(resume.size / 1024).toFixed(1)} KB · Click to replace
                  </p>
                </>
              ) : (
                <>
                  <p className="pf-resume-prompt">Click to upload your resume</p>
                  <p className="pf-resume-types">PDF, DOC, DOCX — max 5 MB</p>
                </>
              )}
            </div>
            <input
              type="file" accept=".pdf,.doc,.docx" ref={resumeRef}
              style={{ display: "none" }}
              onChange={(e) => e.target.files[0] && setResume(e.target.files[0])}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pf-footer">
          {saved && (
            <div className="pf-saved-banner">✓ Profile saved successfully!</div>
          )}
          <button className="pf-submit-btn" onClick={handleSubmit}>
            {saved ? "✓ Saved!" : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
const App = () => {
  const [tab, setTab] = useState("jobs");

  return (
    <>
      <style>{CSS}</style>
      <div className="hp-root">
        <nav className="hp-nav">
          <div className="hp-brand">
            HirePortal<span className="hp-brand-dot" />
          </div>
          <div className="hp-tabs">
            <button
              className={`hp-tab${tab === "jobs" ? " active" : ""}`}
              onClick={() => setTab("jobs")}
            >
              💼 <span className="tab-label">Job Board</span>
            </button>
            <button
              className={`hp-tab${tab === "profile" ? " active" : ""}`}
              onClick={() => setTab("profile")}
            >
              👤 <span className="tab-label">My Profile</span>
            </button>
          </div>
        </nav>

        <main className="hp-content">
          {tab === "jobs" ? <JobBoard /> : <ProfileCompletion />}
        </main>
      </div>
    </>
  );
};

export default App;
