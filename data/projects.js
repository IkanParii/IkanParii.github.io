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
    title: "Just Dork It - Google Dork Generator",
    desc: "Tool ringan untuk menyusun Google Dork queries secara cepat, dirancang untuk workflow OSINT dan reconnaissance yang rapi dan efisien.",
    tags: ["OSINT", "Google Dork", "Web Tool", "Reconnaissance"],
    link: "https://ikanparii.github.io/Just-Dork-It/",
    cta: "Try Tool",
  },
  {
    category: "tool",
    type: "Temporary Mail Tool",
    title: "Void Mail - Temporary Email Generator",
    desc: "VoidMail adalah aplikasi temporary mail berbasis privasi yang digunakan untuk membuat alamat email sementara tanpa registrasi",
    tags: ["Web Development", "Privacy"],
    link: "https://void-mail.ikanparii.workers.dev/",
    cta: "Try Tool",
  },
  // Writeup atau blog yang berisi dokumentasi belajar.
  {
    category: "writeup",
    type: "CTF Writeups",
    title: "Just-Blog - CTF Writeup Vault",
    desc: "Vault writeup utama berisi analisis CTF, catatan forensik, dan dokumentasi pembelajaran cybersecurity yang dikurasi dengan gaya editorial.",
    tags: ["Blog", "Writeup", "CTF", "Blue Team"],
    link: "https://ikanparii.github.io/just-blog/",
    cta: "Visit Blog",
  },
];
