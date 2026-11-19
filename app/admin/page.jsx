'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

  // Auth form state
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [authError, setAuthError] = useState('');

  // Portfolio data state
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  // Check auth session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch('/api/auth/session');
      const json = await res.json();
      if (json.authenticated) {
        setIsAuthenticated(true);
        loadPortfolio();
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Session check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadPortfolio = async () => {
    try {
      const res = await fetch('/api/portfolio');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Failed to load portfolio:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUser, password: loginPass }),
      });
      const json = await res.json();
      if (res.ok) {
        setIsAuthenticated(true);
        loadPortfolio();
      } else {
        setAuthError(json.error || 'Authentication rejected');
      }
    } catch (err) {
      setAuthError('Connection error during authentication');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setData(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage({ text: 'Saving changes...', type: 'info' });
    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setStatusMessage({ text: 'Changes saved & deployed to live site!', type: 'success' });
        setTimeout(() => setStatusMessage({ text: '', type: '' }), 4000);
      } else {
        setStatusMessage({ text: json.error || 'Save failed', type: 'error' });
      }
    } catch (err) {
      setStatusMessage({ text: 'Network error saving changes', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  // Helper mutators
  const updateProfile = (field, value) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }));
  };

  const updateSocial = (field, value) => {
    setData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        social: { ...(prev.profile?.social || {}), [field]: value },
      },
    }));
  };

  // Skills helpers
  const [newSkillText, setNewSkillText] = useState({ cyber: '', soft: '', game: '' });

  const addSkill = (category, value) => {
    if (!value.trim()) return;
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...(prev.skills[category] || []), value.trim()],
      },
    }));
  };

  const removeSkill = (category, index) => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index),
      },
    }));
  };

  // Projects helpers
  const updateProject = (index, field, value) => {
    setData((prev) => {
      const updated = [...prev.projects];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  const addProject = () => {
    const nextId = `PROJ_0${(data?.projects?.length || 0) + 1}`;
    const newProj = {
      id: nextId,
      title: 'New Project',
      category: 'soft',
      badge: 'Software & Web',
      description: 'Project description goes here.',
      tags: ['Next.js', 'React'],
      live_url: '',
      github_url: '',
      hud_type: 'scanner',
      hud: {
        header_left: `TARGET: ${nextId}`,
        header_right: 'LIVE_READY',
        line1_key: 'STATUS: ACTIVE',
        line1_badge: 'DEV',
        line2_key: 'CHECKS: PASS',
        line2_badge: 'OK',
        footer_left: 'ENV: PROD',
        footer_right: '200 OK',
      },
    };
    setData((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const removeProject = (index) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#22223B] flex items-center justify-center font-mono text-sm text-[#C9ADA7]">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C9ADA7] animate-ping"></span>
          <span>CHECKING SECURE OPERATOR SESSION...</span>
        </div>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#22223B] text-[#F2E9E4] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#2A2A44] border border-[#4A4E69] rounded-lg p-8 shadow-2xl relative">
          <div className="flex items-center justify-between pb-4 border-b border-[#4A4E69] mb-6 font-mono text-xs text-[#9A8C98]">
            <span className="flex items-center gap-1.5 text-[#F2E9E4] font-semibold">
              <span className="text-[#C9ADA7]">//</span> ADMIN ACCESS
            </span>
            <span className="px-2 py-0.5 rounded bg-[#4A4E69]/50 text-[10px]">SEC_PORTAL</span>
          </div>

          <h2 className="font-headline text-2xl font-bold mb-2">Operator Terminal</h2>
          <p className="font-body text-xs text-[#C9ADA7] mb-6">
            Log in to edit your portfolio details, update projects, and manage skills.
          </p>

          {authError && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded font-mono text-xs text-red-300">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4 font-mono text-xs">
            <div>
              <label className="block text-[#9A8C98] mb-1">USERNAME</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4] focus:outline-none focus:border-[#C9ADA7]"
                placeholder="admin"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-[#9A8C98] mb-1">PASSWORD</label>
              <input
                type="password"
                className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4] focus:outline-none focus:border-[#C9ADA7]"
                placeholder="••••••••••••"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full py-2.5 bg-[#F2E9E4] text-[#22223B] font-semibold rounded hover:bg-[#C9ADA7] transition-colors uppercase tracking-wider text-xs"
            >
              Authorize Terminal
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#4A4E69]/60 flex items-center justify-between font-mono text-[11px] text-[#9A8C98]">
            <Link href="/" className="hover:text-[#F2E9E4] transition-colors flex items-center gap-1">
              <span>← Back to Public Portfolio</span>
            </Link>
            <span>SYS_KEY: ACTIVE</span>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#22223B] text-[#F2E9E4]">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-50 bg-[#22223B]/95 backdrop-blur-md border-b border-[#4A4E69] px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#C9ADA7]/20 text-[#C9ADA7] border border-[#C9ADA7]/40 font-semibold">
              ADMIN CONTROL ROOM
            </span>
            <span className="font-mono text-xs text-[#9A8C98] hidden sm:inline">// DEV.SEC</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded bg-[#4A4E69]/40 border border-[#4A4E69] hover:border-[#C9ADA7] text-xs font-mono text-[#F2E9E4] transition-colors flex items-center gap-1"
            >
              <span>View Live Site</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7m0 0H7m10 0v10" />
              </svg>
            </Link>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-1.5 rounded bg-[#F2E9E4] text-[#22223B] hover:bg-[#C9ADA7] font-mono text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save All Changes'}
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded bg-[#4A4E69]/30 border border-[#4A4E69] hover:bg-red-900/40 hover:border-red-500/50 text-xs font-mono text-[#C9ADA7] hover:text-red-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Floating Status Notification Toast */}
      {statusMessage.text && (
        <div className="fixed bottom-6 right-6 z-50 font-mono text-xs px-4 py-2.5 rounded shadow-2xl border backdrop-blur-md transition-all bg-[#2A2A44] border-[#C9ADA7] text-[#F2E9E4]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C9ADA7] animate-ping"></span>
            <span>{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main CMS Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs border-b border-[#4A4E69] pb-3">
          {[
            { id: 'profile', label: '1. Profile & Bio' },
            { id: 'skills', label: '2. Skills Matrix' },
            { id: 'projects', label: '3. Projects & HUD' },
            { id: 'certificates', label: '4. Certificates' },
            { id: 'experience', label: '5. Experience' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#4A4E69] text-[#F2E9E4] border border-[#C9ADA7]/40'
                  : 'text-[#9A8C98] hover:text-[#F2E9E4]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: PROFILE & BIO */}
        {activeTab === 'profile' && data?.profile && (
          <div className="bg-[#2A2A44]/60 border border-[#4A4E69] rounded-lg p-6 flex flex-col gap-6">
            <h3 className="font-headline text-lg font-bold border-b border-[#4A4E69] pb-3 text-[#F2E9E4]">
              Profile &amp; Header Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <label className="block text-[#9A8C98] mb-1">BRAND LOGO NAME</label>
                <input
                  type="text"
                  value={data.profile.brand_name || ''}
                  onChange={(e) => updateProfile('brand_name', e.target.value)}
                  className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                />
              </div>
              <div>
                <label className="block text-[#9A8C98] mb-1">BRAND SUBTITLE</label>
                <input
                  type="text"
                  value={data.profile.brand_sub || ''}
                  onChange={(e) => updateProfile('brand_sub', e.target.value)}
                  className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                />
              </div>
              <div>
                <label className="block text-[#9A8C98] mb-1">FULL NAME</label>
                <input
                  type="text"
                  value={data.profile.name || ''}
                  onChange={(e) => updateProfile('name', e.target.value)}
                  className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                />
              </div>
              <div>
                <label className="block text-[#9A8C98] mb-1">STATUS BADGE</label>
                <input
                  type="text"
                  value={data.profile.status || ''}
                  onChange={(e) => updateProfile('status', e.target.value)}
                  className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                />
              </div>
            </div>

            <div className="font-mono text-xs">
              <label className="block text-[#9A8C98] mb-1">HERO MAIN HEADLINE</label>
              <textarea
                rows={2}
                value={data.profile.headline || ''}
                onChange={(e) => updateProfile('headline', e.target.value)}
                className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
              />
            </div>

            <div className="font-mono text-xs">
              <label className="block text-[#9A8C98] mb-1">ABOUT ME / BIO COPY</label>
              <textarea
                rows={4}
                value={data.profile.bio || ''}
                onChange={(e) => updateProfile('bio', e.target.value)}
                className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs pt-4 border-t border-[#4A4E69]/60">
              <div>
                <label className="block text-[#9A8C98] mb-1">RESEARCH: MEDIUM LABS URL</label>
                <input
                  type="text"
                  value={data.research_links?.medium || ''}
                  onChange={(e) => setData({ ...data, research_links: { ...(data.research_links || {}), medium: e.target.value } })}
                  className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                />
              </div>
              <div>
                <label className="block text-[#9A8C98] mb-1">RESEARCH: CYBER_WORLD SCRIPTS URL</label>
                <input
                  type="text"
                  value={data.research_links?.cyber_world || ''}
                  onChange={(e) => setData({ ...data, research_links: { ...(data.research_links || {}), cyber_world: e.target.value } })}
                  className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                />
              </div>
              <div>
                <label className="block text-[#9A8C98] mb-1">CONTACT EMAIL</label>
                <input
                  type="email"
                  value={data.profile.email || ''}
                  onChange={(e) => updateProfile('email', e.target.value)}
                  className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                />
              </div>
              <div>
                <label className="block text-[#9A8C98] mb-1">PORTRAIT IMAGE PATH</label>
                <input
                  type="text"
                  value={data.profile.portrait || ''}
                  onChange={(e) => updateProfile('portrait', e.target.value)}
                  className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                />
                {data.profile.portrait && (
                  <div className="mt-2 flex items-center gap-2.5">
                    <img
                      src={data.profile.portrait.startsWith('/') ? data.profile.portrait : `/${data.profile.portrait}`}
                      alt="Preview"
                      className="w-10 h-12 object-cover rounded border border-[#4A4E69]"
                    />
                    <span className="text-[10px] text-[#9A8C98]">Current Portrait Preview</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[#9A8C98] mb-1">GITHUB URL</label>
                <input
                  type="text"
                  value={data.profile.social?.github || ''}
                  onChange={(e) => updateSocial('github', e.target.value)}
                  className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                />
              </div>
              <div>
                <label className="block text-[#9A8C98] mb-1">LINKEDIN URL</label>
                <input
                  type="text"
                  value={data.profile.social?.linkedin || ''}
                  onChange={(e) => updateSocial('linkedin', e.target.value)}
                  className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                />
              </div>
              <div>
                <label className="block text-[#9A8C98] mb-1">MEDIUM PROFILE URL</label>
                <input
                  type="text"
                  value={data.profile.social?.medium || ''}
                  onChange={(e) => updateSocial('medium', e.target.value)}
                  className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                />
              </div>
              <div>
                <label className="block text-[#9A8C98] mb-1">X (TWITTER) URL</label>
                <input
                  type="text"
                  value={data.profile.social?.x || ''}
                  onChange={(e) => updateSocial('x', e.target.value)}
                  className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                />
              </div>
              <div>
                <label className="block text-[#9A8C98] mb-1">ITCH.IO (STUDIO)</label>
                <input
                  type="text"
                  value={data.profile.social?.itch_vecna || ''}
                  onChange={(e) => updateSocial('itch_vecna', e.target.value)}
                  className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                />
              </div>
              <div>
                <label className="block text-[#9A8C98] mb-1">ITCH.IO (PERSONAL)</label>
                <input
                  type="text"
                  value={data.profile.social?.itch_personal || ''}
                  onChange={(e) => updateSocial('itch_personal', e.target.value)}
                  className="w-full px-3 py-2 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SKILLS MATRIX */}
        {activeTab === 'skills' && data?.skills && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Cybersecurity */}
            <div className="bg-[#2A2A44]/60 border border-[#4A4E69] rounded-lg p-5 flex flex-col justify-between">
              <div>
                <h4 className="font-headline font-bold text-sm text-[#C9ADA7] mb-3 pb-2 border-b border-[#4A4E69]">
                  Cybersecurity &amp; Pentesting
                </h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(data.skills.cybersecurity || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-xs bg-[#22223B] border border-[#4A4E69] text-[#F2E9E4]"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill('cybersecurity', idx)}
                        className="text-[#9A8C98] hover:text-red-400 font-bold ml-1"
                        title="Remove"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-[#4A4E69]/60 flex gap-2">
                <input
                  type="text"
                  placeholder="Add skill..."
                  value={newSkillText.cyber}
                  onChange={(e) => setNewSkillText({ ...newSkillText, cyber: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addSkill('cybersecurity', newSkillText.cyber);
                      setNewSkillText({ ...newSkillText, cyber: '' });
                    }
                  }}
                  className="w-full px-2 py-1 bg-[#22223B] border border-[#4A4E69] rounded font-mono text-xs text-[#F2E9E4]"
                />
                <button
                  onClick={() => {
                    addSkill('cybersecurity', newSkillText.cyber);
                    setNewSkillText({ ...newSkillText, cyber: '' });
                  }}
                  className="px-3 py-1 bg-[#4A4E69] text-[#F2E9E4] rounded font-mono text-xs hover:bg-[#C9ADA7] hover:text-[#22223B]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Column 2: Software */}
            <div className="bg-[#2A2A44]/60 border border-[#4A4E69] rounded-lg p-5 flex flex-col justify-between">
              <div>
                <h4 className="font-headline font-bold text-sm text-[#F2E9E4] mb-3 pb-2 border-b border-[#4A4E69]">
                  Software &amp; Web Development
                </h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(data.skills.software || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-xs bg-[#22223B] border border-[#4A4E69] text-[#F2E9E4]"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill('software', idx)}
                        className="text-[#9A8C98] hover:text-red-400 font-bold ml-1"
                        title="Remove"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-[#4A4E69]/60 flex gap-2">
                <input
                  type="text"
                  placeholder="Add skill..."
                  value={newSkillText.soft}
                  onChange={(e) => setNewSkillText({ ...newSkillText, soft: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addSkill('software', newSkillText.soft);
                      setNewSkillText({ ...newSkillText, soft: '' });
                    }
                  }}
                  className="w-full px-2 py-1 bg-[#22223B] border border-[#4A4E69] rounded font-mono text-xs text-[#F2E9E4]"
                />
                <button
                  onClick={() => {
                    addSkill('software', newSkillText.soft);
                    setNewSkillText({ ...newSkillText, soft: '' });
                  }}
                  className="px-3 py-1 bg-[#4A4E69] text-[#F2E9E4] rounded font-mono text-xs hover:bg-[#C9ADA7] hover:text-[#22223B]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Column 3: Game Dev */}
            <div className="bg-[#2A2A44]/60 border border-[#4A4E69] rounded-lg p-5 flex flex-col justify-between">
              <div>
                <h4 className="font-headline font-bold text-sm text-[#C9ADA7] mb-3 pb-2 border-b border-[#4A4E69]">
                  Game Dev &amp; Tools
                </h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(data.skills.game_dev || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-xs bg-[#22223B] border border-[#4A4E69] text-[#F2E9E4]"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill('game_dev', idx)}
                        className="text-[#9A8C98] hover:text-red-400 font-bold ml-1"
                        title="Remove"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-[#4A4E69]/60 flex gap-2">
                <input
                  type="text"
                  placeholder="Add skill..."
                  value={newSkillText.game}
                  onChange={(e) => setNewSkillText({ ...newSkillText, game: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addSkill('game_dev', newSkillText.game);
                      setNewSkillText({ ...newSkillText, game: '' });
                    }
                  }}
                  className="w-full px-2 py-1 bg-[#22223B] border border-[#4A4E69] rounded font-mono text-xs text-[#F2E9E4]"
                />
                <button
                  onClick={() => {
                    addSkill('game_dev', newSkillText.game);
                    setNewSkillText({ ...newSkillText, game: '' });
                  }}
                  className="px-3 py-1 bg-[#4A4E69] text-[#F2E9E4] rounded font-mono text-xs hover:bg-[#C9ADA7] hover:text-[#22223B]"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROJECTS */}
        {activeTab === 'projects' && data?.projects && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-lg font-bold text-[#F2E9E4]">
                Projects Management ({data.projects.length})
              </h3>
              <button
                onClick={addProject}
                className="px-3.5 py-1.5 bg-[#C9ADA7] text-[#22223B] font-mono text-xs font-semibold rounded hover:bg-[#F2E9E4] transition-colors"
              >
                + Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((proj, idx) => (
                <div
                  key={proj.id || idx}
                  className="bg-[#2A2A44]/60 border border-[#4A4E69] rounded-lg p-5 flex flex-col gap-4 font-mono text-xs"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#4A4E69]">
                    <span className="font-bold text-[#C9ADA7]">{proj.id}</span>
                    <button
                      onClick={() => removeProject(idx)}
                      className="text-red-400 hover:text-red-300 font-mono text-xs"
                    >
                      Delete Project
                    </button>
                  </div>

                  <div>
                    <label className="block text-[#9A8C98] mb-1">PROJECT TITLE</label>
                    <input
                      type="text"
                      value={proj.title || ''}
                      onChange={(e) => updateProject(idx, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#9A8C98] mb-1">BADGE LABEL</label>
                      <input
                        type="text"
                        value={proj.badge || ''}
                        onChange={(e) => updateProject(idx, 'badge', e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9A8C98] mb-1">FILTER CATEGORY (game / sec / soft)</label>
                      <input
                        type="text"
                        value={proj.category || ''}
                        onChange={(e) => updateProject(idx, 'category', e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#9A8C98] mb-1">DESCRIPTION</label>
                    <textarea
                      rows={3}
                      value={proj.description || ''}
                      onChange={(e) => updateProject(idx, 'description', e.target.value)}
                      className="w-full px-3 py-1.5 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#9A8C98] mb-1">LIVE DEMO URL</label>
                      <input
                        type="text"
                        value={proj.live_url || ''}
                        onChange={(e) => updateProject(idx, 'live_url', e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9A8C98] mb-1">GITHUB / SOURCE URL</label>
                      <input
                        type="text"
                        value={proj.github_url || ''}
                        onChange={(e) => updateProject(idx, 'github_url', e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline text-lg font-bold text-[#F2E9E4]">
                  Certifications &amp; Accreditations ({data.certificates?.length || 0})
                </h3>
                <p className="font-body text-xs text-[#C9ADA7]">
                  You can list your certifications here and optionally link to documents or dropped files in <code className="bg-[#22223B] px-1 py-0.5 rounded text-[#F2E9E4]">assets/certificates/</code>.
                </p>
              </div>
              <button
                onClick={() => {
                  const newCert = {
                    name: 'New Certification',
                    issuer: 'Issuing Organization',
                    date: '2026',
                    credential_id: '',
                    file_url: '',
                  };
                  setData({ ...data, certificates: [...(data.certificates || []), newCert] });
                }}
                className="px-3.5 py-1.5 bg-[#C9ADA7] text-[#22223B] font-mono text-xs font-semibold rounded hover:bg-[#F2E9E4] transition-colors"
              >
                + Add Certificate
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data.certificates || []).map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-[#2A2A44]/60 border border-[#4A4E69] rounded-lg p-5 flex flex-col gap-4 font-mono text-xs"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#4A4E69]">
                    <span className="font-bold text-[#C9ADA7]">CERTIFICATE #{idx + 1}</span>
                    <button
                      onClick={() => {
                        const updated = data.certificates.filter((_, i) => i !== idx);
                        setData({ ...data, certificates: updated });
                      }}
                      className="text-red-400 hover:text-red-300 font-mono text-xs"
                    >
                      Delete Certificate
                    </button>
                  </div>

                  <div>
                    <label className="block text-[#9A8C98] mb-1">CERTIFICATE NAME / DEGREE</label>
                    <input
                      type="text"
                      value={cert.name || ''}
                      onChange={(e) => {
                        const updated = [...data.certificates];
                        updated[idx].name = e.target.value;
                        setData({ ...data, certificates: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#9A8C98] mb-1">ISSUING AUTHORITY</label>
                      <input
                        type="text"
                        value={cert.issuer || ''}
                        onChange={(e) => {
                          const updated = [...data.certificates];
                          updated[idx].issuer = e.target.value;
                          setData({ ...data, certificates: updated });
                        }}
                        className="w-full px-3 py-1.5 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9A8C98] mb-1">DATE / STATUS</label>
                      <input
                        type="text"
                        value={cert.date || ''}
                        onChange={(e) => {
                          const updated = [...data.certificates];
                          updated[idx].date = e.target.value;
                          setData({ ...data, certificates: updated });
                        }}
                        className="w-full px-3 py-1.5 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#9A8C98] mb-1">CREDENTIAL ID (OPTIONAL)</label>
                      <input
                        type="text"
                        value={cert.credential_id || ''}
                        onChange={(e) => {
                          const updated = [...data.certificates];
                          updated[idx].credential_id = e.target.value;
                          setData({ ...data, certificates: updated });
                        }}
                        className="w-full px-3 py-1.5 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9A8C98] mb-1">DOCUMENT / LINK (OPTIONAL)</label>
                      <input
                        type="text"
                        placeholder="assets/certificates/cert.pdf or URL"
                        value={cert.file_url || ''}
                        onChange={(e) => {
                          const updated = [...data.certificates];
                          updated[idx].file_url = e.target.value;
                          setData({ ...data, certificates: updated });
                        }}
                        className="w-full px-3 py-1.5 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: EXPERIENCE */}
        {activeTab === 'experience' && data?.experience && (
          <div className="flex flex-col gap-6">
            <h3 className="font-headline text-lg font-bold text-[#F2E9E4]">
              Experience &amp; Background Entries
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="bg-[#2A2A44]/60 border border-[#4A4E69] rounded-lg p-5 flex flex-col gap-4 font-mono text-xs"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#9A8C98] mb-1">ROLE / TITLE</label>
                      <input
                        type="text"
                        value={exp.role || ''}
                        onChange={(e) => {
                          const updated = [...data.experience];
                          updated[idx].role = e.target.value;
                          setData({ ...data, experience: updated });
                        }}
                        className="w-full px-3 py-1.5 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9A8C98] mb-1">COMPANY / ORG</label>
                      <input
                        type="text"
                        value={exp.company || ''}
                        onChange={(e) => {
                          const updated = [...data.experience];
                          updated[idx].company = e.target.value;
                          setData({ ...data, experience: updated });
                        }}
                        className="w-full px-3 py-1.5 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#9A8C98] mb-1">HEADLINE TITLE</label>
                    <input
                      type="text"
                      value={exp.title || ''}
                      onChange={(e) => {
                        const updated = [...data.experience];
                        updated[idx].title = e.target.value;
                        setData({ ...data, experience: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#9A8C98] mb-1">DESCRIPTION</label>
                    <textarea
                      rows={3}
                      value={exp.description || ''}
                      onChange={(e) => {
                        const updated = [...data.experience];
                        updated[idx].description = e.target.value;
                        setData({ ...data, experience: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-[#22223B] border border-[#4A4E69] rounded text-[#F2E9E4]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
