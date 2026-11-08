// Format tiap item project:
// {
//   category: "tool" | "writeup" | "offense" | "default",
//   type: "Label singkat yang tampil di card",
//   title: "Judul project",
//   desc: "Deskripsi singkat 1-2 kalimat",
//   tags: ["Tag 1", "Tag 2", "Tag 3"],
//   link: "URL tujuan",
//   cta: "Teks tombol aksi",
// }
export const projects = [
  // Project tool yang ditampilkan di section Work.
  {
    category: "tool",
    type: "OSINT Tool",
    title: "Just-Dork-It : Google Dork Generator",
    desc: "Tool ringan berbasis JavaScript untuk menyusun query pencarian Google Dork secara cepat untuk workflow OSINT dan reconnaissance.",
    tags: ["OSINT", "Google Dork", "JavaScript", "Reconnaissance"],
    link: "https://ikanparii.github.io/Just-Dork-It/",
    cta: "Try Tool",
  },
  {
    category: "tool",
    type: "Web App",
    title: "JustPlanIt : Aplikasi Manajemen & Perencanaan",
    desc: "Aplikasi manajemen dan perencanaan berbasis Laravel dengan fitur lengkap untuk mengorganisasi tugas, proyek, dan jadwal terstruktur.",
    tags: ["Laravel", "PHP", "Web App", "Productivity"],
    link: "https://github.com/IkanParii/JustPlanIt",
    cta: "View Repo",
  },
  {
    category: "tool",
    type: "Web App",
    title: "WebComic-KBD-Laravel : Platform Komik Online",
    desc: "Platform web komik berbasis Laravel yang memungkinkan pengguna membaca dan mengelola koleksi komik online dengan antarmuka bersih.",
    tags: ["Laravel", "PHP", "Web Development", "CMS"],
    link: "https://github.com/IkanParii/WebComic-KBD-Laravel",
    cta: "View Repo",
  },
  
  // Writeup atau lab documentation.
  {
    category: "writeup",
    type: "Web Security Lab",
    title: "Praktik Web Security : Lab DVWA & DVAPI",
    desc: "Dokumentasi pengujian keamanan aplikasi web di lingkungan lab DVWA/DVAPI, mencakup eksploitasi SQL Injection, Cross-Site Scripting (XSS), dan pengujian celah API.",
    tags: ["Web Security", "SQL Injection", "XSS", "API Testing"],
    link: "https://ikanparii.github.io/just-blog/",
    cta: "Read Lab Notes",
  },
  {
    category: "writeup",
    type: "Personal Blog & Vault",
    title: "just-blog : Blog Pribadi & CTF Writeup Vault",
    desc: "Blog pribadi sekaligus vault writeup berisi analisis CTF, catatan forensik digital, network analysis, dan dokumentasi cybersecurity.",
    tags: ["Blog", "Writeup", "CTF", "Forensics"],
    link: "https://ikanparii.github.io/just-blog/",
    cta: "Visit Blog",
  },
];
