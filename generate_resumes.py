import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

NAVY = colors.HexColor("#22223B")
SLATE = colors.HexColor("#4A4E69")
MAUVE = colors.HexColor("#9A8C98")
ROSE = colors.HexColor("#A8837A")
DARK = colors.HexColor("#1A1A2E")

def build_pdf(filename, cv_type="dev"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'MainTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=NAVY,
        spaceAfter=2
    )

    subtitle_style = ParagraphStyle(
        'Subtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=SLATE,
        spaceAfter=4
    )

    contact_style = ParagraphStyle(
        'Contact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=DARK
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=NAVY,
        spaceBefore=8,
        spaceAfter=3
    )

    item_title = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=NAVY
    )

    item_subtitle = ParagraphStyle(
        'ItemSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12,
        textColor=SLATE
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=DARK,
        spaceAfter=4
    )

    story = []

    # Header
    name = "EZEA CHINONSO PETER"
    if cv_type == "dev":
        role = "SOFTWARE & GAME DEVELOPER • SYSTEMS ARCHITECTURE"
        summary = (
            "Software & Unity Game Developer with a BSc. in Computer Science from the University of Nigeria, "
            "Nsukka (UNN). Co-founder at Cavern Studios with extensive experience shipping 2D/3D games in Unity (C#) "
            "and full-stack web applications with Next.js and Python. Focused on modular game systems, asset optimization, "
            "and building robust, high-performance applications."
        )
    else:
        role = "APPLICATION SECURITY (APPSEC) • PENETRATION TESTER • ETHICAL HACKER"
        summary = (
            "Cybersecurity practitioner and Software Engineer with a BSc. in Computer Science from the University of Nigeria, "
            "Nsukka (UNN). Cisco Certified Ethical Hacker with practical expertise in web application penetration testing, "
            "vulnerability research, and OWASP Top 10 auditing. Active bug hunter and author of technical exploitation write-ups "
            "with hands-on mastery of Burp Suite, Python security automation, and offensive security tooling."
        )

    contacts = (
        "<b>Email:</b> chinonsopeter456@gmail.com | <b>Location:</b> Lagos, Nigeria<br/>"
        "<b>GitHub:</b> github.com/Chinonso-Peter | <b>LinkedIn:</b> linkedin.com/in/chinonso-peter-a02212299<br/>"
        "<b>Portfolio:</b> chinonso-peter.github.io | <b>Medium:</b> medium.com/@chinonsopeter456 | <b>X:</b> @m0n4rch0_0"
    )

    story.append(Paragraph(name, title_style))
    story.append(Paragraph(role, subtitle_style))
    story.append(Paragraph(contacts, contact_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1.5, color=NAVY, spaceAfter=6, spaceBefore=2))

    # Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", section_heading))
    story.append(Paragraph(summary, body_style))

    # Education
    story.append(Paragraph("EDUCATION", section_heading))
    story.append(Paragraph("<b>Bachelor of Science (B.Sc.) in Computer Science</b>", item_title))
    story.append(Paragraph("University of Nigeria, Nsukka (UNN) | Nigeria", item_subtitle))
    story.append(Spacer(1, 4))

    # Skills Matrix
    story.append(Paragraph("TECHNICAL SKILLS", section_heading))
    if cv_type == "dev":
        skills_text = (
            "• <b>Languages:</b> C#, Python, JavaScript / TypeScript, SQL, HTML5, CSS3<br/>"
            "• <b>Game Development:</b> Unity (2D & 3D), Mobile Optimization, ScriptableObjects, Addressables, UI Systems<br/>"
            "• <b>Web & Full-Stack:</b> Next.js, React, Node.js, REST APIs, Tailwind CSS<br/>"
            "• <b>Security Fundamentals:</b> OWASP Top 10, Auth/Session Security, Secure Data Pipelines<br/>"
            "• <b>Tools & Environment:</b> Git & GitHub, VS Code, Unity Profiler, Linux / Ubuntu"
        )
    else:
        skills_text = (
            "• <b>Application Security:</b> OWASP Top 10, Web App Pentesting, VAPT, Broken Access Control (IDOR), SQLi, XSS, CSRF<br/>"
            "• <b>Security Tools:</b> Burp Suite Professional, Nmap, Wireshark, Metasploit, Gobuster, SQLmap, Linux/Kali<br/>"
            "• <b>Languages:</b> Python (Security Tooling), C#, JavaScript, SQL, Bash Scripting<br/>"
            "• <b>Web Technologies:</b> Next.js, React, REST API Security, JSON Web Tokens (JWT), Cryptography Basics<br/>"
            "• <b>Security Research:</b> PortSwigger Web Security Labs, picoCTF, TryHackMe, Bug Bounty Methodology"
        )
    story.append(Paragraph(skills_text, body_style))

    # Experience
    story.append(Paragraph("PROFESSIONAL EXPERIENCE", section_heading))
    story.append(Paragraph("<b>Co-Founder & Lead Developer</b> | Cavern Studios (formerly Vecna Games)", item_title))
    story.append(Paragraph("2024 – Present | Nigeria", item_subtitle))
    if cv_type == "dev":
        exp_desc = (
            "• Spearheaded architecture, systems design, and gameplay engineering for mobile titles in Unity (C#).<br/>"
            "• Optimized 3D/2D rendering pipelines and texture memory budgets for low-end mobile hardware to sustain steady 60 FPS.<br/>"
            "• Engineered modular game systems including player movement controllers, quest engines, and reward loop logic.<br/>"
            "• Integrated mobile monetization SDKs (rewarded ads, in-app mechanics) and deployed builds to itch.io and mobile targets."
        )
    else:
        exp_desc = (
            "• Led engineering and secure code auditing for deployed games and internal web utilities.<br/>"
            "• Implemented secure data transmission mechanisms, input validation, and tamper-resistant state storage.<br/>"
            "• Conducted periodic vulnerability assessments and network packet analyses on client-server communications."
        )
    story.append(Paragraph(exp_desc, body_style))

    # Selected Projects
    story.append(Paragraph("FEATURED PROJECTS", section_heading))
    if cv_type == "dev":
        projects = [
            ("LocalInspect AI – Offline 3D CAD Blueprint Analyzer", "Local AI, Three.js, Python", "Air-gapped desktop app analyzing structural blueprints and generating interactive 3D models with zero cloud egress (github.com/Chinonso-Peter/local-inspect-ai)."),
            ("BoardMind – Collaborative AI Architecture Canvas", "Next.js, React, AI / Voice", "Voice-first collaborative whiteboard application for diagramming system architectures and backend components in real time (github.com/Chinonso-Peter/Board-Mind)."),
            ("Reef – Mobile 3D Endless Runner", "Unity, C#, Mobile 3D", "Fast-paced tilt-controlled mobile runner with custom power-up loops and optimized 3D mobile rendering (vecna-games.itch.io/reef)."),
            ("Flappy Ball – 2D Basketball Arcade Game", "Unity, C#, 2D Physics", "Snappy arcade game featuring custom physics bounce loops, achievement streak tracking, and custom sprite artwork (github.com/Chinonso-Peter/Flappy_Ball)."),
            ("Dungeon-Dash: Key Quest", "Unity, C#, 3D Systems", "3D dungeon action RPG featuring custom quest state machines, interactive key-door puzzles, and level layout systems (peters-g.itch.io/dungeon-dashkey-quest)."),
            ("Breached – Security Credential Web App", "Next.js, React, REST APIs", "Web security app checking compromised credential databases with end-to-end client privacy protection (breached-ten.vercel.app).")
        ]
    else:
        projects = [
            ("Web Checker – Automated Vulnerability Scanner", "Python, AppSec, OWASP Top 10", "Automated web application vulnerability scanner detecting SQL Injection, XSS, and access control flaws with PDF audit compilation (github.com/Chinonso-Peter/web-checker)."),
            ("Breached – Credential Leak Security Checker", "Next.js, React, REST APIs, Cryptography", "Full-stack app auditing breached credential databases using k-Anonymity SHA-1 hash lookups with zero credential leakage (breached-ten.vercel.app)."),
            ("Cyber_World – Security Automation & Exploit Scripts", "Python, Bash, Exploit Dev", "Repository of offensive automation tools, custom vulnerability scanners, and exploit scripts for web and cryptography labs (github.com/Chinonso-Peter/Cyber_World)."),
            ("PortSwigger Web Security Research", "OWASP Top 10, Exploitation Write-ups", "Practitioner exploit walkthroughs covering SQLi, IDOR, Stored XSS, and 2FA bypass published on Medium (medium.com/@chinonsopeter456).")
        ]

    for p_name, p_tech, p_desc in projects:
        story.append(Paragraph(f"<b>{p_name}</b> | <i>{p_tech}</i>", item_title))
        story.append(Paragraph(f"• {p_desc}", body_style))

    # Certifications
    story.append(Paragraph("CERTIFICATIONS & ACCREDITATIONS", section_heading))
    certs = [
        "• <b>Ethical Hacker Course</b> – Cisco Networking Academy (2025)",
        "• <b>Introduction to Cybersecurity</b> – Cisco Networking Academy (2025)",
        "• <b>GameUp Africa: Unity Game Development</b> – Endless Games & Learning Lab / Arizona State University (2026)",
        "• <b>Fundamentals of Deep Learning</b> – NVIDIA (2026)",
        "• <b>THM Advent of Cyber</b> – TryHackMe (2025)"
    ]
    for c in certs:
        story.append(Paragraph(c, body_style))

    doc.build(story)
    print(f"Generated {filename}")

if __name__ == "__main__":
    build_pdf("assets/cv/Ezea_Chinonso_Peter_Software_Game_Dev_CV.pdf", "dev")
    build_pdf("assets/cv/Ezea_Chinonso_Peter_AppSec_Cybersecurity_CV.pdf", "sec")
    # Also sync to public/
    os.system("cp -r assets/cv/* public/assets/cv/")
    print("PDFs generated and synced to public/assets/cv/")
