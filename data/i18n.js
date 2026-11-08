import { profile } from "./profile.js";
import { projects } from "./projects.js";
import { experience, organizations } from "./experience.js";

export const translations = {
  id: {
    nav_about: "Tentang",
    nav_skills: "Keahlian",
    nav_certs: "Sertifikasi",
    nav_projects: "Proyek",
    nav_exp: "Pengalaman",
    nav_blog: "Writeups",
    nav_contact: "Kontak",
    nav_connect: "Connect",

    hero_tag: "FACHRI RASYIQ PRAMANA · SOC ANALYST L1",
    hero_status_sub: "SECURITY OPERATIONS & TRIAGE",
    hero_desc: "Mahasiswa D4 Rekayasa Keamanan Siber & SOC Analyst L1, berfokus pada security monitoring, alert triage, dan web security testing.",
    hero_btn_projects: "Lihat Proyek",
    hero_btn_contact: "Hubungi Saya",
    hero_scroll: "SCROLL",

    about_tag: "DEPTH: 200m · TENTANG",
    about_title: "Sosok di balik<br />layar.",
    about_role: "Cyber Security Student / Fachri",

    skills_tag: "DEPTH: 400m · KEAHLIAN",
    skills_title: "Keahlian & Radar<br />Kompetensi.",

    certs_tag: "DEPTH: 600m · SERTIFIKASI & PRESTASI",
    certs_title: "Sertifikasi &<br />Pencapaian.",
    certs_filter_all: "Semua",
    certs_filter_cert: "Sertifikasi",
    certs_filter_ctf: "Prestasi CTF",
    certs_page_prev: "← Sebelumnya",
    certs_page_next: "Selanjutnya →",

    projects_tag: "DEPTH: 800m · PROYEK",
    projects_title: "Proyek Unggulan<br />& Analisis.",
    proj_filter_all: "Semua",
    proj_filter_tools: "Tools",
    proj_filter_webapp: "Web App",
    proj_cta_tool: "Coba Tool ->",
    proj_cta_repo: "Lihat Repo ->",
    proj_cta_blog: "Kunjungi Blog ->",

    exp_tag: "DEPTH: 1000m · PENGALAMAN",
    exp_title: "Rekam Jejak &<br />Pengalaman.",
    exp_filter_all: "Semua",
    exp_filter_pro: "Profesional",
    exp_filter_intern: "Magang",
    exp_filter_org: "Organisasi",

    blog_tag: "DEPTH: 1200m · WRITEUPS",
    blog_title: "CTF Writeups<br />& Catatan Lab.",
    blog_read_btn: "Baca Selengkapnya →",

    contact_tag: "DEPTH: 1400m · KONTAK",
    contact_title: "Mulai<br />Terhubung.",
    contact_name_label: "NAMA",
    contact_email_label: "EMAIL",
    contact_msg_label: "PESAN",
    contact_name_placeholder: "Nama Anda",
    contact_email_placeholder: "email@domain.com",
    contact_msg_placeholder: "Tuliskan pesan atau ajakan kolaborasi...",
    contact_send_btn: "Kirim Pesan",
    contact_direct_label: "JALUR TRANSMISI",
    contact_status_label: "STATUS KESIAPAN",
    contact_status_val: "Terbuka untuk Peluang Kerja & Kolaborasi",

    footer_rights: "Semua hak dilindungi.",
    footer_built: "Dibangun oleh",
  },

  en: {
    nav_about: "About",
    nav_skills: "Expertise",
    nav_certs: "Credentials",
    nav_projects: "Projects",
    nav_exp: "Experience",
    nav_blog: "Writeups",
    nav_contact: "Contact",
    nav_connect: "Connect",

    hero_tag: "FACHRI RASYIQ PRAMANA · SOC ANALYST L1",
    hero_status_sub: "SECURITY OPERATIONS & TRIAGE",
    hero_desc: "Cybersecurity Student & SOC Analyst L1 specializing in real-time security monitoring, alert triage, and web application security testing.",
    hero_btn_projects: "View Projects",
    hero_btn_contact: "Get in Touch",
    hero_scroll: "EXPLORE DEPTHS",

    about_tag: "DEPTH: 200m · ABOUT",
    about_title: "Who's behind<br />the screen.",
    about_role: "Cyber Security Student / Fachri",

    skills_tag: "DEPTH: 400m · EXPERTISE",
    skills_title: "What I bring<br />to the surface.",

    certs_tag: "DEPTH: 600m · CREDENTIALS & AWARDS",
    certs_title: "Validated<br />skills.",
    certs_filter_all: "All",
    certs_filter_cert: "Certifications",
    certs_filter_ctf: "CTF Awards",
    certs_page_prev: "← Previous",
    certs_page_next: "Next →",

    projects_tag: "DEPTH: 800m · PROJECTS",
    projects_title: "Featured Projects<br />& Analysis.",
    proj_filter_all: "All",
    proj_filter_tools: "Tools",
    proj_filter_webapp: "Web App",
    proj_cta_tool: "Try Tool ->",
    proj_cta_repo: "View Repo ->",
    proj_cta_blog: "Visit Blog ->",

    exp_tag: "DEPTH: 1000m · EXPERIENCE",
    exp_title: "Work history<br />& leadership.",
    exp_filter_all: "All",
    exp_filter_pro: "Professional",
    exp_filter_intern: "Internship",
    exp_filter_org: "Organizations",

    blog_tag: "DEPTH: 1200m · WRITEUPS",
    blog_title: "Research, CTF<br />& Field Notes.",
    blog_read_btn: "Read More →",

    contact_tag: "DEPTH: 1400m · CONTACT",
    contact_title: "Drop a line<br />into the deep.",
    contact_name_label: "NAME",
    contact_email_label: "EMAIL",
    contact_msg_label: "MESSAGE",
    contact_name_placeholder: "Your Name",
    contact_email_placeholder: "email@domain.com",
    contact_msg_placeholder: "Write your inquiry, project proposal, or transmission...",
    contact_send_btn: "Send Message",
    contact_direct_label: "TRANSMISSION CHANNELS",
    contact_status_label: "OPERATIONAL STATUS",
    contact_status_val: "Open for SOC & Cybersecurity Opportunities",

    footer_rights: "All rights reserved.",
    footer_built: "Built by",
  },
};

export const profileNarratives = {
  id: {
    summary:
      "Mahasiswa D4 Rekayasa Keamanan Siber & SOC Analyst L1, berfokus pada security monitoring, alert triage, dan web security testing.",
    about:
      'Saya <strong>Fachri Rasyiq Pramana</strong> (dikenal sebagai <strong>IkanParii</strong>), mahasiswa D4 Rekayasa Keamanan Siber di Politeknik Negeri Cilacap. Berbekal pengalaman magang sebagai <strong>SOC Analyst L1</strong> di Xcode (PT. Teknologi Server Indonesia), keahlian saya berfokus pada pemantauan security alert real-time, initial alert triage, incident escalation, dan penyusunan security reporting, serta pengujian keamanan aplikasi web.',
    aboutSecond:
      'Aktif mencetak prestasi di ranah kompetisi keamanan siber, di antaranya <strong>Juara 1 Cyscom CTF 2025</strong>, <strong>Juara 2 Cyscom CTF 2026</strong>, <strong>Juara 2 Nusantara Cyber Security 2026 (APTIKOM) Jawa Tengah</strong>, dan Juara 2 Best Availability PlayIT 2026. Di portofolio ini, saya mendokumentasikan rekam jejak profesional, sertifikasi (C3SA, Junior Ethical Hacker, Web Pentester), dan arsip CTF writeups.',
  },
  en: {
    summary:
      "Cybersecurity Student & SOC Analyst L1 specializing in real-time security monitoring, alert triage, and web application security testing.",
    about:
      'I am <strong>Fachri Rasyiq Pramana</strong> (known as <strong>IkanParii</strong>), a Cybersecurity Engineering student at Politeknik Negeri Cilacap. With hands-on internship experience as a <strong>SOC Analyst L1</strong> at Xcode (PT. Teknologi Server Indonesia), my core focus lies in real-time security alert monitoring, initial alert triage, incident escalation, and web application vulnerability assessment.',
    aboutSecond:
      'Actively competing and winning cybersecurity tournaments, including <strong>1st Place Cyscom CTF 2025</strong>, <strong>2nd Place Cyscom CTF 2026</strong>, <strong>2nd Place Nusantara Cyber Security 2026 Central Java</strong>, and 2nd Place Best Availability PlayIT 2026. This portfolio documents my professional track record, industry credentials (C3SA, Junior Ethical Hacker, Web Pentester), and CTF writeup archive.',
  },
};

export const projectsEn = [
  {
    category: "tool",
    type: "OSINT Tool",
    title: "Just-Dork-It : Google Dork Generator",
    desc: "Lightweight JavaScript-based utility for rapidly assembling targeted Google Dork queries for OSINT and reconnaissance workflows.",
    tags: ["OSINT", "Google Dork", "JavaScript", "Reconnaissance"],
    link: "https://ikanparii.github.io/Just-Dork-It/",
    cta: "Try Tool ->",
  },
  {
    category: "tool",
    type: "Security Lab Tool",
    title: "Web Security Practice : DVWA & DVAPI Lab",
    desc: "Hands-on web application security testing documentation in DVWA and DVAPI lab environments, covering SQL Injection, XSS exploitation, and API vulnerabilities.",
    tags: ["Web Security", "SQL Injection", "XSS", "API Testing"],
    link: "https://ikanparii.github.io/just-blog/",
    cta: "Read Lab Notes ->",
  },
  {
    category: "webapp",
    type: "Web App",
    title: "JustPlanIt : Planning & Task Manager",
    desc: "Full-featured Laravel-powered task and project planning web application designed for structured task scheduling and team productivity.",
    tags: ["Laravel", "PHP", "Web App", "Productivity"],
    link: "https://github.com/IkanParii/JustPlanIt",
    cta: "View Repo ->",
  },
  {
    category: "webapp",
    type: "Web App",
    title: "WebComic-KBD-Laravel : Online Comic Platform",
    desc: "Laravel-based web comic platform enabling seamless digital comic catalog management and reader experience with a modern interface.",
    tags: ["Laravel", "PHP", "Web Development", "CMS"],
    link: "https://github.com/IkanParii/WebComic-KBD-Laravel",
    cta: "View Repo ->",
  },
  {
    category: "webapp",
    type: "Personal Blog & Vault",
    title: "just-blog : Personal Blog & CTF Writeup Vault",
    desc: "Personal cybersecurity blog and writeup vault archiving digital forensics investigations, network packet analyses, and CTF challenges.",
    tags: ["Blog", "Writeup", "CTF", "Web App"],
    link: "https://ikanparii.github.io/just-blog/",
    cta: "Visit Blog ->",
  },
];

export const experienceEn = [
  {
    category: "profesional",
    categories: ["profesional", "internship"],
    typeLabel: "Internship",
    role: "Security Operations Center (SOC) Analyst L1 Intern",
    company: "Xcode (PT. Teknologi Server Indonesia)",
    period: "Sep 2025 - Dec 2025",
    bullets: [
      "Monitored real-time security events and alerts to identify threat indicators and support detection workflows.",
      "Conducted initial alert triage based on threat severity and urgency, escalating findings according to standard operating procedures.",
      "Compiled comprehensive daily security monitoring reports and threat triage logs.",
    ],
    tags: ["SIEM", "Alert Triage", "Incident Escalation", "Security Reporting"],
  },
  {
    category: "internship",
    categories: ["internship"],
    typeLabel: "Internship",
    role: "Graphic Design Intern",
    company: "PT. Satu Visi Indocreative / B.One Corp",
    period: "Jul 2023 - Sep 2023",
    bullets: [
      "Designed creative digital branding assets and social media campaign visuals to enhance brand engagement.",
    ],
    tags: ["Adobe Creative Suite", "Social Media", "Graphic Design"],
  },
];

export const organizationsEn = [
  {
    category: "organisasi",
    typeLabel: "Organization",
    role: "Head of Data Division",
    org: "PROTIC (Programming Technology Informatics Club)",
    period: "Jul 2025 - Present",
    bullets: [
      "Promoted to lead the data division after 9 months of active contribution as a core member.",
      "Curated routine data training sessions, mentored members, and supervised division project pipelines.",
    ],
    tags: ["Leadership", "Data Division", "Mentoring"],
  },
  {
    category: "organisasi",
    typeLabel: "Organization",
    role: "Head of Media & Communications",
    org: "Cyber Security Community",
    period: "Feb 2025 - Present",
    bullets: [
      "Managed official community media channels, designed publication materials, and documented technical events.",
    ],
    tags: ["Media", "Community", "Publication"],
  },
];
