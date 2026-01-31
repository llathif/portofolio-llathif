import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import ScrambledText from "./components/ScrambledText/ScrambledText";
import SplitText from "./components/SplitText/SplitText";
import Lanyard from "./components/Lanyard/Lanyard";
import GlassIcons from "./components/GlassIcons/GlassIcons";
import { listTools, listProyek } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal"; // <-- IMPORT MODAL
import Aurora from "./components/Aurora/Aurora";
import AOS from 'aos';
import ChatRoom from "./components/ChatRoom";
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

function App() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null); // null = modal tertutup

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };
  // -------------------------

  useEffect(() => {
    const isReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (isReload) {
      // Ambil path tanpa hash
      const baseUrl = window.location.origin + "/portofolio/";
      window.location.replace(baseUrl);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full -z-10 ">
        <Aurora
          colorStops={["#577870", "#1F97A6", "#127B99"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="hero grid md:grid-cols-2 items-center pt-10 xl:gap-0 gap-6 grid-cols-1">
          <div className="animate__animated animate__fadeInUp animate__delay-3s">
            <div className="flex items-center gap-3 mb-6 bg-zinc-900/50 backdrop-blur-md border border-zinc-800/50 w-fit p-4 rounded-2xl shadow-lg">
              <img src="./assets/lathif.png" className="w-10 rounded-md" />
              <q>Commit to excel, or don't start at all.</q>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              <ShinyText text="Hi I'm Abdul Rohman Lathif" disabled={false} speed={3} className='custom-class' />
            </h1>
            <BlurText
              text="A web developer who is passionate about exploring the boundaries of technology, always eager to transform complex challenges into elegant and impactful digital solutions."
              delay={150}
              animateBy="words"
              direction="top"
              className=" mb-6"
            />
            <div className="flex items-center sm:gap-4 gap-2">
              <a 
                href="./assets/CV.pdf" 
                download="Abdul_Rohman_Lathif_CV.pdf" 
                className="font-semibold bg-zinc-900/80 p-4 px-6 rounded-full border border-zinc-700 hover:border-violet-500/50 hover:bg-zinc-800 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300"
              >
                <ShinyText text="Download CV" disabled={false} speed={3} className="custom-class" />
              </a>

              <a href="#project" className="font-semibold bg-zinc-900/80 p-4 px-6 rounded-full border border-zinc-700 hover:border-violet-500/50 hover:bg-zinc-800 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300">
                <ShinyText text="Explore My Projects" disabled={false} speed={3} className="custom-class" />
              </a>
            </div>

          </div>
          <div className="md:ml-auto animate__animated animate__fadeInUp animate__delay-4s">
            <ProfileCard
              name="A. Rohman Lathif"
              title="Web Developer"
              handle="llathif_"
              status="Online"
              contactText="Contact Me"
              avatarUrl="./assets/lathif.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log('Contact clicked')}
            />
          </div>
        </div>
        {/* tentang */}
        <div className="mt-32 mx-auto w-full max-w-[1600px] rounded-3xl border border-violet-500/20 shadow-2xl shadow-violet-500/5 bg-zinc-900/60 backdrop-blur-xl p-8 md:p-12 relative overflow-hidden" id="about">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-0 px-8" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            <div className="basis-full md:basis-7/12 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-zinc-800/50">
              {/* Kolom kiri */}
              <div className="flex-1 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                  About Me
                </h2>

                <BlurText
                  text="I am Abdul Rohman Lathif, a web developer who is driven by the spirit of innovation and technical creativity in building a modern digital ecosystem. I really enjoy the process of transforming complex ideas into web-based solutions that are efficient, responsive, and easy to use by anyone. Through the many web projects I have completed, I am committed to always providing the best quality standards and high performance in every line of code I write. I am ready to bring my positive energy and technical expertise to help organizations grow faster through future web technologies."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-base md:text-lg leading-relaxed mb-10 text-gray-300"
                />

                <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-y-8 sm:gap-y-0 mb-4 w-full">
                  <div>
                    <h1 className="text-3xl md:text-4xl mb-1">
                      5<span className="text-violet-500">+</span>
                    </h1>
                    <p>Project Completed</p>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl mb-1">
                      2<span className="text-violet-500">+</span>
                    </h1>
                    <p>Years Learning Path</p>
                  </div>
                  <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" data-aos-once="true">
                    <h1 className="text-3xl md:text-4xl mb-1">
                      3.67<span className="text-violet-500">/4.00</span>
                    </h1>
                    <p>GPA</p>
                  </div>
                </div>


                <ShinyText
                  text="Working with heart, creating with mind."
                  disabled={false}
                  speed={3}
                  className="text-sm md:text-base text-violet-400"
                />
              </div>
            </div>

            {/* Kolom kanan */}
            <div className="basis-full md:basis-5/12 pl-0 md:pl-8 overflow-hidden max-w-full flex justify-center ">
              <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
            </div>
          </div>

        </div>
        <div className="tools mt-32">
          <h1 className="text-4xl/snug font-bold mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" >Tools & Technologies</h1>
          <p className="w-2/5 text-base/loose opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">My Profesional Skills</p>
          <div className="tools-box mt-14 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">

            {listTools.map((tool) => (
              <div
                key={tool.id} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={tool.dad} data-aos-once="true"
                className="flex items-center gap-4 p-4 border border-zinc-700 rounded-xl bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-800/80 transition-all duration-300 group shadow-lg"
              >
                <img
                  src={tool.gambar}
                  alt="Tools Image"
                  className="w-16 h-16 object-contain bg-zinc-800 p-2 rounded-lg group-hover:bg-zinc-900 transition-all duration-300"
                />
                <div className="flex flex-col overflow-hidden">
                  <div className="truncate">
                    <ShinyText
                      text={tool.nama}
                      disabled={false}
                      speed={3}
                      className="text-lg font-semibold block"
                    />
                  </div>
                  <p className="text-sm text-zinc-400 truncate">{tool.ket}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* tentang */}

        {/* Proyek */}
        <div className="proyek mt-32 py-10" id="project" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true"></div>
        <h1 className="text-center text-4xl font-bold mb-2" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">Project</h1>
        <p className="text-base/loose text-center opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">Showcasing a selection of projects that reflect my skills, creativity, and passion for building meaningful digital experiences.</p>
        <div className="proyek-box mt-14" >

          <div style={{ height: 'auto', position: 'relative' }} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true" >
            <ChromaGrid
              items={listProyek}
              onItemClick={handleProjectClick} // Kirim fungsi untuk handle klik
              radius={500}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div>
        {/* Proyek */}


        {/* Kontak */}
        <div className="kontak mt-32 sm:p-10 p-4 relative" id="contact">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-violet-500/10 blur-[120px] -z-10 rounded-full pointer-events-none"></div>

          <h1
            className="text-4xl mb-2 font-bold text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            Contact & Chat
          </h1>
          <p
            className="text-base/loose text-center mb-14 opacity-50"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
            data-aos-once="true"
          >
            Get in touch with me or chat in real-time
          </p>

          {/* Container dua kolom */}
          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            {/* Chat Room di kiri */}
            <div 
              className="flex-1 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 p-6 rounded-2xl shadow-xl hover:border-violet-500/30 transition-colors duration-300 flex flex-col" 
              data-aos="fade-right" 
              data-aos-duration="1000" 
              data-aos-delay="400" 
              data-aos-once="true"
            >
              <h3 className="text-2xl font-bold mb-4 text-violet-400 ml-2">Live Chat</h3>
              <div className="flex-1 bg-zinc-950/50 rounded-xl overflow-hidden border border-zinc-800/50 min-h-[400px]">
                <ChatRoom />
              </div>
            </div>

            {/* Contact Form di kanan */}
            <div 
              className="flex-1"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="500"
              data-aos-once="true"
            >
              <form
                action="https://formsubmit.co/rissoppa21@gmail.com"
                method="POST"
                className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 p-8 sm:p-10 w-full rounded-2xl shadow-xl hover:border-violet-500/30 transition-colors duration-300 h-full flex flex-col justify-center"
                autoComplete="off"
              >
                <h3 className="text-xl font-semibold mb-6 text-violet-400">Send a Message</h3>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-400 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="Name"
                      placeholder="Ex: John Doe"
                      className="bg-zinc-950/50 border border-zinc-700/50 p-3 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-zinc-600"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-400 ml-1">Email</label>
                    <input
                      type="email"
                      name="Email"
                      placeholder="Ex: john@example.com"
                      className="bg-zinc-950/50 border border-zinc-700/50 p-3 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-zinc-600"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-zinc-400 ml-1">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      cols="45"
                      rows="5"
                      placeholder="Write your message here..."
                      className="bg-zinc-950/50 border border-zinc-700/50 p-3 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-zinc-600 resize-none"
                      required
                    ></textarea>
                  </div>
                  <div className="mt-2">
                    <button
                      type="submit"
                      className="w-full font-semibold bg-violet-600/20 hover:bg-violet-600/40 text-violet-300 border border-violet-500/50 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <ShinyText text="Send Message" disabled={false} speed={3} className="custom-class" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Kontak */}
      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  )
}

export default App