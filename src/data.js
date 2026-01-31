// --- 1. IMPORT HERO IMAGE ---
import HeroImage from "/assets/hero-img.webp";

// --- 2. IMPORT TOOLS ASSETS ---
import Tools1 from "/assets/tools/vscode.png";
import Tools2 from "/assets/tools/reactjs.png";
import Tools3 from "/assets/tools/nextjs.png";
import Tools4 from "/assets/tools/tailwind.png";
import Tools5 from "/assets/tools/bootstrap.png";
import Tools6 from "/assets/tools/js.png";
import Tools7 from "/assets/tools/nodejs.png";
import Tools8 from "/assets/tools/github.png";
import Tools9 from "/assets/tools/canva.png";
import Tools10 from "/assets/tools/figma.png";
import Tools11 from "/assets/tools/firebase.png";
import Tools12 from "/assets/tools/html.png";
import Tools13 from "/assets/tools/css.png";
import Tools14 from "/assets/tools/ts.png";
import Tools15 from "/assets/tools/php.png";
import Tools16 from "/assets/tools/vite.png";
import Tools17 from "/assets/tools/mysql.png";

// --- 3. IMPORT PROYEK ASSETS (Hanya 4 Proyek Utama) ---
import Proyek1 from "/assets/proyek/Proyek1.png";
import Proyek2 from "/assets/proyek/Proyek2.png";
import Proyek3 from "/assets/proyek/Proyek3.png";
import Proyek4 from "/assets/proyek/Proyek4.png";

export const Images = {
  HeroImage,
};

export const listTools = [
  { id: 1, gambar: Tools1, nama: "VS Code", ket: "Code Editor", dad: "100" },
  { id: 2, gambar: Tools2, nama: "React JS", ket: "Frontend Library", dad: "200" },
  { id: 3, gambar: Tools3, nama: "Next JS", ket: "React Framework", dad: "300" },
  { id: 4, gambar: Tools4, nama: "Tailwind CSS", ket: "CSS Framework", dad: "400" },
  { id: 5, gambar: Tools5, nama: "Bootstrap", ket: "CSS Framework", dad: "500" },
  { id: 6, gambar: Tools6, nama: "Javascript", ket: "Language", dad: "600" },
  { id: 7, gambar: Tools7, nama: "Node JS", ket: "Runtime", dad: "700" },
  { id: 8, gambar: Tools8, nama: "Github", ket: "Version Control", dad: "800" },
  { id: 9, gambar: Tools9, nama: "Canva", ket: "Design App", dad: "900" },
  { id: 10, gambar: Tools10, nama: "Figma", ket: "UI/UX Design", dad: "1000" },
  { id: 11, gambar: Tools11, nama: "Firebase", ket: "Backend Service", dad: "1100" },
  { id: 12, gambar: Tools12, nama: "HTML", ket: "Language", dad: "1200" },
  { id: 13, gambar: Tools13, nama: "CSS", ket: "Language", dad: "1300" },
  { id: 14, gambar: Tools14, nama: "TypeScript", ket: "Language", dad: "1400" },
  { id: 15, gambar: Tools15, nama: "PHP", ket: "Language", dad: "1500" },
  { id: 16, gambar: Tools16, nama: "Vite", ket: "Build Tool", dad: "1600" },
  { id: 17, gambar: Tools17, nama: "MySql", ket: "Database", dad: "1700" },
];

export const listProyek = [
  {
    id: 1,
    image: Proyek1,
    title: "Penanggungan Summit Explore",
    subtitle: "Website edukasi dan panduan interaktif pendakian Gunung Penanggungan...",
    fullDescription: "Sebuah platform web komprehensif yang dirancang untuk membantu pendaki pemula mengeksplorasi Gunung Penanggungan. Website ini menyediakan informasi jalur pendakian, estimasi waktu, serta edukasi persiapan fisik dan perlengkapan. Dilengkapi dengan fitur interaktif untuk memastikan pengalaman mendaki yang lebih aman dan terencana.",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/llathif/penanggugan-summit-explore-1",
    dad: "100",
  },
  {
    id: 2,
    image: Proyek2,
    title: "Customer Service Chatbot AI",
    subtitle: "Sistem layanan cerdas berbasis AI untuk efisiensi komunikasi...",
    fullDescription: "Pengembangan sistem layanan pelanggan cerdas yang mengintegrasikan Artificial Intelligence untuk merespons pertanyaan pengguna secara otomatis dan akurat. Menggunakan pemrosesan bahasa alami (NLP) untuk memahami kebutuhan pengguna, sehingga meningkatkan efisiensi operasional dan kualitas layanan bantuan secara real-time.",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/llathif/sistem-layanan-cerdas",
    dad: "200",
  },
  {
    id: 3,
    image: Proyek3,
    title: "SIM Sertif Karya Kreasi",
    subtitle: "Sistem Informasi Manajemen Sertifikasi untuk mitra LSP EI...",
    fullDescription: "Sistem web manajemen sertifikasi yang dikembangkan untuk mendukung operasional LSP EI. Proyek ini mencakup pengelolaan data peserta, proses administrasi sertifikasi, hingga penerbitan sertifikat digital secara sistematis. Dibangun untuk memberikan solusi manajemen data yang aman, terintegrasi, dan profesional bagi industri.",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://be-simsertif.karyakreasi.id/",
    dad: "300",
  },
  {
    id: 4,
    image: Proyek4,
    title: "BookSales System",
    subtitle: "Aplikasi penjualan buku modern dengan React JS dan Laravel...",
    fullDescription: "Platform e-commerce buku yang memadukan kecepatan React JS di sisi frontend dengan keandalan Laravel di sisi backend. Sistem ini mencakup fitur manajemen inventaris, kategori buku, hingga proses transaksi. Fokus utama proyek ini adalah menciptakan UI yang bersih, navigasi yang intuitif, dan manajemen basis data yang skalabel.",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/llathif/booksales-ui",
    dad: "400",
  },
];

export default { Images, listTools, listProyek };