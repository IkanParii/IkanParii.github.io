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
    desc: "Tool ringan berbasis JavaScript untuk menyusun Google Dork queries secara cepat, dirancang untuk workflow OSINT dan reconnaissance yang rapi dan efisien.",
    tags: ["OSINT", "Google Dork", "JavaScript", "Reconnaissance"],
    link: "https://ikanparii.github.io/Just-Dork-It/",
    cta: "Try Tool",
  },
  {
    category: "tool",
    type: "Web App",
    title: "JustPlanIt : Aplikasi Manajemen & Perencanaan",
    desc: "Aplikasi manajemen dan perencanaan berbasis Laravel dengan fitur lengkap untuk mengorganisasi tugas, proyek, dan jadwal secara terstruktur.",
    tags: ["Laravel", "PHP", "Web App", "Productivity"],
    link: "https://github.com/IkanParii/JustPlanIt",
    cta: "View Repo",
  },
  {
    category: "tool",
    type: "Web App",
    title: "WebComic-KBD-Laravel : Platform Komik Online",
    desc: "Platform web komik berbasis Laravel yang memungkinkan pengguna membaca dan mengelola koleksi komik secara online dengan antarmuka yang bersih.",
    tags: ["Laravel", "PHP", "Web Development", "CMS"],
    link: "https://github.com/IkanParii/WebComic-KBD-Laravel",
    cta: "View Repo",
  },
  {
    category: "tool",
    type: "Temporary Mail Tool",
    title: "Void Mail : Temporary Email Generator",
    desc: "VoidMail adalah aplikasi temporary mail berbasis privasi yang digunakan untuk membuat alamat email sementara tanpa registrasi.",
    tags: ["Web Development", "Privacy", "JavaScript"],
    link: "https://void-mail.ikanparii.workers.dev/",
    cta: "Try Tool",
  },
  // Writeup atau blog yang berisi dokumentasi belajar.
  {
    category: "writeup",
    type: "Personal Blog",
    title: "just-blog : Blog Pribadi & CTF Writeup Vault",
    desc: "Blog pribadi sekaligus vault writeup berisi analisis CTF, catatan forensik, dan dokumentasi pembelajaran cybersecurity.",
    tags: ["Blog", "Writeup", "CTF", "Cybersecurity"],
    link: "https://ikanparii.github.io/just-blog/",
    cta: "Visit Blog",
  },
];
