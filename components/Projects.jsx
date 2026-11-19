'use client';

import { useState } from 'react';

export default function Projects({ projects, researchLinks }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const projectList = projects || [];
  const mediumUrl = researchLinks?.medium || 'https://medium.com/@chinonsopeter456';
  const cyberWorldUrl = researchLinks?.cyber_world || 'https://github.com/Chinonso-Peter/Cyber_World';

  const filteredProjects = projectList.filter((proj) => {
    if (activeFilter === 'all') return true;
    const cats = (proj.category || '').split(' ');
    return cats.includes(activeFilter);
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20 border-b border-[#4A4E69]/60" id="projects">
      {/* Section Header with Category Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] sm:text-xs text-[#9A8C98] uppercase tracking-widest">// 03. SELECTED SYSTEMS</span>
          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#F2E9E4]">Featured Projects</h2>
        </div>

        {/* Filter Tabs - Smooth Scrolling on Mobile */}
        <div className="overflow-x-auto no-scrollbar max-w-full flex items-center gap-1.5 p-1 bg-[#22223B] rounded border border-[#4A4E69] self-start sm:self-auto font-mono text-xs">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'game', label: 'Game Dev' },
            { id: 'sec', label: 'Cybersecurity' },
            { id: 'soft', label: 'Software' },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap text-xs ${
                activeFilter === tab.id
                  ? 'bg-[#4A4E69] border border-[#C9ADA7]/40 text-[#F2E9E4] font-medium'
                  : 'text-[#9A8C98] hover:text-[#F2E9E4]'
              }`}
              onClick={() => setActiveFilter(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Balanced 2-Column Grid of Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="project-card bg-[#4A4E69]/20 rounded-lg p-5 sm:p-6 border border-[#4A4E69] flex flex-col justify-between gap-4 sm:gap-5 hover:border-[#C9ADA7]/40 transition-colors shadow-sm"
          >
            <div className="flex flex-col gap-4">
              {/* Header bar */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#C9ADA7]/15 text-[#C9ADA7] border border-[#C9ADA7]/30 uppercase font-semibold">
                  {proj.badge || 'Project'}
                </span>
                <span className="font-mono text-[11px] text-[#9A8C98]">{proj.id}</span>
              </div>

              {/* UI Preview 1: Scanner (Breached) */}
              {proj.hud_type === 'scanner' && (
                <div className="w-full h-32 rounded bg-[#22223B] border border-[#4A4E69] p-3 flex flex-col justify-between font-mono text-[11px]">
                  <div className="flex items-center justify-between text-[#9A8C98] border-b border-[#4A4E69]/60 pb-1.5">
                    <span>{proj.hud?.header_left || 'TARGET: BREACH_CHECK'}</span>
                    <span className="text-[#C9ADA7] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9ADA7] animate-pulse"></span>
                      {proj.hud?.header_right || 'LIVE_SERVICE'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 py-1 text-[10px]">
                    <div className="flex items-center justify-between text-[#F2E9E4]">
                      <span>{proj.hud?.line1_key || 'HASH_VERIFY: SHA-1 k-Anonymity'}</span>
                      <span className="text-[#F2E9E4] bg-[#4A4E69] px-1.5 py-0.5 rounded border border-[#C9ADA7]/50">
                        {proj.hud?.line1_badge || 'SECURE'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[#F2E9E4]">
                      <span>{proj.hud?.line2_key || 'LEAK_DATABASE: CHECK'}</span>
                      <span className="text-[#C9ADA7] bg-[#4A4E69]/70 px-1.5 py-0.5 rounded border border-[#4A4E69]">
                        {proj.hud?.line2_badge || 'VERIFIED'}
                      </span>
                    </div>
                  </div>
                  <div className="text-[#9A8C98] text-[10px] flex items-center justify-between pt-1 border-t border-[#4A4E69]/60">
                    <span>{proj.hud?.footer_left || 'ENDPOINT: /api/v1/lookup'}</span>
                    <span className="text-[#C9ADA7]">{proj.hud?.footer_right || 'STATUS: 200 OK'}</span>
                  </div>
                </div>
              )}

              {/* UI Preview 2: Scanner CWE (Web Checker) */}
              {proj.hud_type === 'scanner_cwe' && (
                <div className="w-full h-32 rounded bg-[#22223B] border border-[#4A4E69] p-3 flex flex-col justify-between font-mono text-[11px]">
                  <div className="flex items-center justify-between text-[#9A8C98] border-b border-[#4A4E69]/60 pb-1.5">
                    <span>{proj.hud?.header_left || 'TARGET: APPVULN_SCAN'}</span>
                    <span className="text-[#C9ADA7] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9ADA7]"></span>
                      {proj.hud?.header_right || 'SCAN_COMPLETE'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 py-1 text-[10px]">
                    <div className="flex items-center justify-between text-[#F2E9E4]">
                      <span>{proj.hud?.line1_key || 'CWE-89: SQL Injection Param'}</span>
                      <span className="text-[#F2E9E4] bg-[#4A4E69] px-1.5 py-0.5 rounded border border-[#C9ADA7]/50">
                        {proj.hud?.line1_badge || 'CRITICAL'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[#F2E9E4]">
                      <span>{proj.hud?.line2_key || 'CWE-639: IDOR Profile Endpoint'}</span>
                      <span className="text-[#C9ADA7] bg-[#4A4E69]/70 px-1.5 py-0.5 rounded border border-[#4A4E69]">
                        {proj.hud?.line2_badge || 'HIGH'}
                      </span>
                    </div>
                  </div>
                  <div className="text-[#9A8C98] text-[10px] flex items-center justify-between pt-1 border-t border-[#4A4E69]/60">
                    <span>{proj.hud?.footer_left || 'REPORT: PDF_COMPILED'}</span>
                    <span className="text-[#C9ADA7]">{proj.hud?.footer_right || 'PASSED: 18 CHECKS'}</span>
                  </div>
                </div>
              )}

              {/* UI Preview 3: Canvas Nodes (BoardMind) */}
              {proj.hud_type === 'canvas_nodes' && (
                <div className="w-full h-32 rounded bg-[#22223B] border border-[#4A4E69] p-3 flex flex-col justify-between font-mono text-[11px] relative overflow-hidden">
                  <div className="flex items-center justify-between text-[#9A8C98] border-b border-[#4A4E69]/60 pb-1.5">
                    <span>{proj.hud?.header_left || 'CANVAS: VOICE_MUTATION'}</span>
                    <span className="text-[#C9ADA7] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9ADA7]"></span>
                      {proj.hud?.header_right || 'SYNC_60FPS'}
                    </span>
                  </div>
                  <svg className="w-full h-14" fill="none" viewBox="0 0 260 50">
                    <line stroke="#C9ADA7" strokeWidth="1.5" x1="30" x2="130" y1="25" y2="15"></line>
                    <line stroke="#9A8C98" strokeDasharray="3 3" strokeWidth="1.5" x1="130" x2="230" y1="15" y2="35"></line>
                    <circle cx="30" cy="25" fill="#22223B" r="9" stroke="#C9ADA7" strokeWidth="1.5"></circle>
                    <text fill="#C9ADA7" fontFamily="JetBrains Mono" fontSize="7" textAnchor="middle" x="30" y="28">VOX</text>
                    <circle cx="130" cy="15" fill="#22223B" r="11" stroke="#F2E9E4" strokeWidth="1.5"></circle>
                    <text fill="#F2E9E4" fontFamily="JetBrains Mono" fontSize="7" textAnchor="middle" x="130" y="18">LLM</text>
                    <circle cx="230" cy="35" fill="#22223B" r="12" stroke="#9A8C98" strokeWidth="1.5"></circle>
                    <text fill="#C9ADA7" fontFamily="JetBrains Mono" fontSize="7" textAnchor="middle" x="230" y="38">GHOST</text>
                  </svg>
                  <div className="text-[#9A8C98] text-[10px] flex items-center justify-between pt-1 border-t border-[#4A4E69]/60">
                    <span>{proj.hud?.footer_left || 'PROMPT: "Add auth cluster"'}</span>
                    <span className="text-[#F2E9E4]">{proj.hud?.footer_right || 'PEERS: 4'}</span>
                  </div>
                </div>
              )}

              {/* UI Preview 4: Basketball Court (Flappy Ball) */}
              {proj.hud_type === 'basketball_court' && (
                <div className="w-full h-32 rounded bg-[#22223B] border border-[#4A4E69] p-3 flex flex-col justify-between font-mono text-[11px]">
                  <div className="flex items-center justify-between text-[#9A8C98] border-b border-[#4A4E69]/60 pb-1.5">
                    <span>{proj.hud?.header_left || 'ENGINE: UNITY_2D'}</span>
                    <span className="text-[#C9ADA7]">{proj.hud?.header_right || 'MODE: HARD'}</span>
                  </div>
                  <div className="flex items-center justify-around py-1">
                    <div className="text-center">
                      <span className="text-[9px] text-[#9A8C98] block">{proj.hud?.stat_left_label || 'STREAK'}</span>
                      <span className="font-headline text-base font-bold text-[#F2E9E4]">{proj.hud?.stat_left_val || '14 HOOPS'}</span>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-dashed border-[#C9ADA7] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#C9ADA7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10m0-20a15.3 15.3 0 00-4 10 15.3 15.3 0 004 10M2 12h20" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <span className="text-[9px] text-[#9A8C98] block">{proj.hud?.stat_right_label || 'COLLISION'}</span>
                      <span className="font-mono text-xs text-[#F2E9E4]">{proj.hud?.stat_right_val || '60 FPS'}</span>
                    </div>
                  </div>
                  <div className="text-[#9A8C98] text-[10px] flex items-center justify-between pt-1 border-t border-[#4A4E69]/60">
                    <span>{proj.hud?.footer_left || 'ACHIEVEMENTS: 3/3 UNLOCKED'}</span>
                    <span className="text-[#C9ADA7]">{proj.hud?.footer_right || 'WEBGL_READY'}</span>
                  </div>
                </div>
              )}

              {/* UI Preview 5: Telemetry Gamepad (Reef) */}
              {proj.hud_type === 'telemetry_gamepad' && (
                <div className="w-full h-32 rounded bg-[#22223B] border border-[#4A4E69] p-3 flex flex-col justify-between font-mono text-[11px]">
                  <div className="flex items-center justify-between text-[#9A8C98] border-b border-[#4A4E69]/60 pb-1.5">
                    <span>{proj.hud?.header_left || 'ENGINE: UNITY_3D'}</span>
                    <span className="text-[#C9ADA7]">{proj.hud?.header_right || 'GYRO_ENABLED'}</span>
                  </div>
                  <div className="flex items-center justify-around py-1">
                    <div className="text-center">
                      <span className="text-[9px] text-[#9A8C98] block">{proj.hud?.stat_left_label || 'PERFORMANCE'}</span>
                      <span className="font-headline text-base font-bold text-[#F2E9E4]">{proj.hud?.stat_left_val || '60 FPS'}</span>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-dashed border-[#C9ADA7] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#C9ADA7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 6H9a6 6 0 00-6 6v3a3 3 0 003 3h1.5a1.5 1.5 0 001.5-1.5V15h2v1.5a1.5 1.5 0 001.5 1.5H18a3 3 0 003-3v-3a6 6 0 00-6-6zM6 12h4m-2-2v4m9-1h.01m2-2h.01" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <span className="text-[9px] text-[#9A8C98] block">{proj.hud?.stat_right_label || 'TARGET'}</span>
                      <span className="font-mono text-xs text-[#F2E9E4]">{proj.hud?.stat_right_val || 'LOW-END OPT'}</span>
                    </div>
                  </div>
                  <div className="text-[#9A8C98] text-[10px] flex items-center justify-between pt-1 border-t border-[#4A4E69]/60">
                    <span>{proj.hud?.footer_left || 'SYSTEM'}</span>
                    <span className="text-[#C9ADA7]">{proj.hud?.footer_right || 'RELEASED'}</span>
                  </div>
                </div>
              )}

              {/* UI Preview 6: Isometric CAD (Dungeon-Dash) */}
              {proj.hud_type === 'isometric_cad' && (
                <div className="w-full h-32 rounded bg-[#22223B] border border-[#4A4E69] p-3 flex flex-col justify-between font-mono text-[11px] relative overflow-hidden">
                  <div className="flex items-center justify-between text-[#9A8C98] border-b border-[#4A4E69]/60 pb-1.5">
                    <span>{proj.hud?.header_left || 'QUEST: ENGINE'}</span>
                    <span className="text-[#C9ADA7]">{proj.hud?.header_right || 'ACTIVE'}</span>
                  </div>
                  <svg className="w-full h-14" fill="none" viewBox="0 0 240 50">
                    <polygon fill="none" points="40,15 80,5 120,15 80,27" stroke="#C9ADA7" strokeWidth="1.2"></polygon>
                    <polygon fill="#22223B" points="40,15 80,27 80,44 40,32" stroke="#4A4E69" strokeWidth="1"></polygon>
                    <polygon fill="none" points="80,27 120,15 120,32 80,44" stroke="#4A4E69" strokeWidth="1"></polygon>
                    <circle cx="80" cy="27" fill="#F2E9E4" r="2.5"></circle>
                    <line stroke="#9A8C98" strokeDasharray="2 2" strokeWidth="1" x1="80" x2="170" y1="27" y2="27"></line>
                    <rect fill="#22223B" height="18" stroke="#4A4E69" width="55" x="170" y="18"></rect>
                    <text fill="#C9ADA7" fontFamily="JetBrains Mono" fontSize="7" textAnchor="middle" x="197" y="30">
                      {proj.hud?.svg_label || 'KEYS: 3/3'}
                    </text>
                  </svg>
                  <div className="text-[#9A8C98] text-[10px] flex items-center justify-between pt-1 border-t border-[#4A4E69]/60">
                    <span>{proj.hud?.footer_left || 'PHYSICS'}</span>
                    <span className="text-[#C9ADA7]">{proj.hud?.footer_right || 'ACTIVE'}</span>
                  </div>
                </div>
              )}

              {/* UI Preview 7: Telemetry Bolt (Jurassic Run) */}
              {proj.hud_type === 'telemetry_bolt' && (
                <div className="w-full h-32 rounded bg-[#22223B] border border-[#4A4E69] p-3 flex flex-col justify-between font-mono text-[11px]">
                  <div className="flex items-center justify-between text-[#9A8C98] border-b border-[#4A4E69]/60 pb-1.5">
                    <span>{proj.hud?.header_left || 'ENGINE: UNITY_2D'}</span>
                    <span className="text-[#C9ADA7]">{proj.hud?.header_right || 'RUNNER'}</span>
                  </div>
                  <div className="flex items-center justify-around py-1">
                    <div className="text-center">
                      <span className="text-[9px] text-[#9A8C98] block">{proj.hud?.stat_left_label || 'COLLECTIBLES'}</span>
                      <span className="font-headline text-base font-bold text-[#F2E9E4]">{proj.hud?.stat_left_val || 'DYNAMIC'}</span>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-dashed border-[#C9ADA7] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#C9ADA7]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <span className="text-[9px] text-[#9A8C98] block">{proj.hud?.stat_right_label || 'OBSTACLES'}</span>
                      <span className="font-mono text-xs text-[#F2E9E4]">{proj.hud?.stat_right_val || 'ADAPTIVE'}</span>
                    </div>
                  </div>
                  <div className="text-[#9A8C98] text-[10px] flex items-center justify-between pt-1 border-t border-[#4A4E69]/60">
                    <span>{proj.hud?.footer_left || 'AUDIO'}</span>
                    <span className="text-[#C9ADA7]">{proj.hud?.footer_right || 'WEB'}</span>
                  </div>
                </div>
              )}

              {/* UI Preview 8: Blueprint 3D (LocalInspect AI) */}
              {proj.hud_type === 'blueprint_3d' && (
                <div className="w-full h-32 rounded bg-[#22223B] border border-[#4A4E69] p-3 flex flex-col justify-between font-mono text-[11px] relative overflow-hidden">
                  <div className="flex items-center justify-between text-[#9A8C98] border-b border-[#4A4E69]/60 pb-1.5">
                    <span>{proj.hud?.header_left || 'INFERENCE: AIR_GAPPED_LOCAL'}</span>
                    <span className="text-[#C9ADA7]">{proj.hud?.header_right || 'THREE.JS_3D'}</span>
                  </div>
                  <svg className="w-full h-14" fill="none" viewBox="0 0 240 50">
                    <polygon fill="none" points="50,15 90,5 130,15 90,27" stroke="#C9ADA7" strokeWidth="1.2"></polygon>
                    <polygon fill="#22223B" points="50,15 90,27 90,44 50,32" stroke="#4A4E69" strokeWidth="1"></polygon>
                    <polygon fill="none" points="90,27 130,15 130,32 90,44" stroke="#4A4E69" strokeWidth="1"></polygon>
                    <circle cx="90" cy="27" fill="#F2E9E4" r="2.5"></circle>
                    <line stroke="#9A8C98" strokeDasharray="2 2" strokeWidth="1" x1="90" x2="180" y1="27" y2="27"></line>
                    <rect fill="#22223B" height="18" stroke="#4A4E69" width="45" x="180" y="18"></rect>
                    <text fill="#C9ADA7" fontFamily="JetBrains Mono" fontSize="7" textAnchor="middle" x="202" y="30">
                      {proj.hud?.svg_label || 'TOL: 0.08'}
                    </text>
                  </svg>
                  <div className="text-[#9A8C98] text-[10px] flex items-center justify-between pt-1 border-t border-[#4A4E69]/60">
                    <span>{proj.hud?.footer_left || 'BLUEPRINT: STRUCTURAL_CAD'}</span>
                    <span className="text-[#C9ADA7]">{proj.hud?.footer_right || 'NO CLOUD EGRESS'}</span>
                  </div>
                </div>
              )}

              <h3 className="font-headline text-xl font-bold text-[#F2E9E4]">{proj.title}</h3>
              <p className="font-body text-sm text-[#C9ADA7] leading-relaxed">{proj.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(proj.tags || []).map((tag, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 rounded font-mono text-xs bg-[#22223B] border border-[#4A4E69] text-[#F2E9E4]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-5 pt-3 border-t border-[#4A4E69]/60 font-mono text-xs">
              {proj.live_url ? (
                <a className="text-[#F2E9E4] hover:text-[#C9ADA7] flex items-center gap-1.5 transition-colors" href={proj.live_url} rel="noopener noreferrer" target="_blank">
                  <span>{proj.live_label || 'Live Application'}</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7m0 0H7m10 0v10" />
                  </svg>
                </a>
              ) : null}
              {proj.github_url && (
                <a className="text-[#9A8C98] hover:text-[#F2E9E4] flex items-center gap-1.5 transition-colors" href={proj.github_url} rel="noopener noreferrer" target="_blank">
                  <span>{proj.github_label || 'GitHub'}</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7m0 0H7m10 0v10" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* COMPACT SUB-BLOCK: Security Labs & CTF Research */}
      <div className="mt-8 sm:mt-10 bg-[#4A4E69]/20 rounded-lg p-5 sm:p-6 border border-[#4A4E69] flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-[#C9ADA7]/40 transition-colors">
        {/* PortSwigger Labs */}
        <div className="flex flex-col gap-2.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C9ADA7]"></span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#C9ADA7] font-semibold">PortSwigger Labs &amp; Vulnerability Research</span>
          </div>
          <p className="font-body text-xs text-[#C9ADA7] leading-relaxed">
            Hands-on practitioner exploit walkthroughs and lab research covering <span className="text-[#F2E9E4]">SQL Injection</span>, <span className="text-[#F2E9E4]">Broken Access Control / IDOR</span>, <span className="text-[#F2E9E4]">Stored &amp; Reflected XSS</span>, and <span className="text-[#F2E9E4]">Authentication 2FA Bypass</span>.
          </p>
          <div>
            <a className="inline-flex items-center gap-1.5 font-mono text-xs text-[#C9ADA7] hover:text-[#F2E9E4] transition-colors" href={mediumUrl} rel="noopener noreferrer" target="_blank">
              <span>Read Write-Ups on Medium (@chinonsopeter456)</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7m0 0H7m10 0v10" />
              </svg>
            </a>
          </div>
        </div>

        <div className="hidden lg:block w-px h-16 bg-[#4A4E69]"></div>

        {/* Cyber_World Scripts */}
        <div className="flex flex-col gap-2.5 max-w-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F2E9E4]"></span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#F2E9E4] font-semibold">Cyber_World // Exploit Scripts &amp; Labs</span>
          </div>
          <p className="font-body text-xs text-[#C9ADA7] leading-relaxed">
            Personal offensive security repository containing custom Python automation, exploit tools, and CTF solvers across <span className="text-[#F2E9E4]">Web Exploitation</span>, <span className="text-[#F2E9E4]">Cryptography</span>, and <span className="text-[#F2E9E4]">Forensics</span>.
          </p>
          <div>
            <a className="inline-flex items-center gap-1.5 font-mono text-xs text-[#F2E9E4] hover:text-[#C9ADA7] transition-colors" href={cyberWorldUrl} rel="noopener noreferrer" target="_blank">
              <span>Cyber_World Scripts on GitHub</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7m0 0H7m10 0v10" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
