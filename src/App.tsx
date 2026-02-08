import { useState, useEffect, useRef } from 'react';
import './App.css';
import blinkies from './blinkies';
import { Github, Mail, Key, Volume2, VolumeX } from 'lucide-react';

// Starfield Component
const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random()
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        star.opacity += (Math.random() - 0.5) * 0.05;
        star.opacity = Math.max(0.2, Math.min(1, star.opacity));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: 'black' }}
    />
  );
};

// Blood Drip Component (White version)
const BloodDrips = () => {
  const [drips, setDrips] = useState<{ id: number; left: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const initialDrips = [];
    for (let i = 0; i < 30; i++) {
      initialDrips.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2
      });
    }
    setDrips(initialDrips);
  }, []);

  return (
    <div className="blood-drip-container">
      {drips.map(drip => (
        <div
          key={drip.id}
          className="blood-drip"
          style={{
            left: `${drip.left}%`,
            animationDelay: `${drip.delay}s`,
            animationDuration: `${drip.duration}s`
          }}
        />
      ))}
    </div>
  );
};

// Side Lines Component
const SideLines = () => {
  const [lines, setLines] = useState<{ id: number; top: number; width: number; delay: number }[]>([]);

  useEffect(() => {
    const initialLines = [];
    for (let i = 0; i < 20; i++) {
      initialLines.push({
        id: i,
        top: Math.random() * 100,
        width: 50 + Math.random() * 100,
        delay: Math.random() * 4
      });
    }
    setLines(initialLines);
  }, []);

  return (
    <>
      <div className="side-lines side-lines-left">
        {lines.map(line => (
          <div
            key={`left-${line.id}`}
            className="side-line"
            style={{
              top: `${line.top}%`,
              width: `${line.width}px`,
              animationDelay: `${line.delay}s`
            }}
          />
        ))}
      </div>
      <div className="side-lines side-lines-right">
        {lines.map(line => (
          <div
            key={`right-${line.id}`}
            className="side-line"
            style={{
              top: `${line.top}%`,
              width: `${line.width}px`,
              animationDelay: `${line.delay}s`
            }}
          />
        ))}
      </div>
    </>
  );
};

// Gothic Logo Component
const GothicLogo = () => {
  return (
    <div className="logo-container logo-shift flex justify-center mb-8">
      <svg
        width="200"
        height="120"
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
      >
        {/* Gothic-style W shape */}
        <path
          d="M20 20 L30 80 L50 40 L70 80 L80 20 M80 20 L90 80 L110 40 L130 80 L140 20"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Drips from logo */}
        <path
          d="M30 80 Q30 95 30 100 Q30 105 30 100"
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M70 80 Q70 90 70 95"
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M90 80 Q90 95 90 105 Q90 110 90 105"
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M130 80 Q130 90 130 98"
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        {/* Decorative elements */}
        <circle cx="50" cy="40" r="3" fill="white" opacity="0.8" />
        <circle cx="110" cy="40" r="3" fill="white" opacity="0.8" />
        <path
          d="M40 30 Q50 25 60 30 M100 30 Q110 25 120 30"
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
      </svg>
    </div>
  );
};

const DiscordIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17c2.5 1.5 7.5 1.5 10 0" />
    <path d="M5.5 7.5c2.2-1.3 10.8-1.3 13 0" />
    <path d="M6 7.5c-1 2.2-1.4 4.3-1 6.5 2.2 1.4 11.8 1.4 14 0 .4-2.2 0-4.3-1-6.5" />
    <circle cx="9.5" cy="12" r="1.2" />
    <circle cx="14.5" cy="12" r="1.2" />
  </svg>
);

const TelegramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21.5 4.5 3 12.2l6.6 2.1 2.6 6.2 3.4-4.2 4.9-11.8Z" />
    <path d="M9.6 14.2 20 6" />
  </svg>
);

const SpotifyIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M7.5 10.2c3-1 6.9-.8 9.5.6" />
    <path d="M8.4 13c2.4-.7 5.2-.5 7.3.5" />
    <path d="M9.3 15.6c1.6-.4 3.5-.3 5 .3" />
  </svg>
);

// Link Button Component
const LinkButton = ({ icon: Icon, href, label }: { icon: React.ElementType; href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="link-btn w-12 h-12 flex items-center justify-center rounded"
    aria-label={label}
  >
    <Icon size={20} />
  </a>
);

// Project Card Component
const ProjectCard = ({ title, description, image, href }: { title: string; description: string; image?: string; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="project-card block rounded overflow-hidden bg-black/50"
  >
    <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative overflow-hidden">
      {image ? (
        <img src={image} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div className="text-center p-4">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        </div>
      )}
    </div>
    <div className="p-3 border-t border-white/20">
      <p className="text-xs text-gray-300">{description}</p>
    </div>
  </a>
);

// Blinkies Section
const BlinkiesSection = () => {
  const [showBlinkies, setShowBlinkies] = useState(false);
  const [sortedBlinkies, setSortedBlinkies] = useState<string[]>([]);

  useEffect(() => {
    let canceled = false;

    const loadSizes = async () => {
      const sized = await Promise.all(
        blinkies.map(
          (src) =>
            new Promise<{ src: string; area: number }>((resolve) => {
              const img = new Image();
              img.onload = () => resolve({ src, area: img.naturalWidth * img.naturalHeight });
              img.onerror = () => resolve({ src, area: 0 });
              img.src = src;
            })
        )
      );

      if (canceled) return;
      sized.sort((a, b) => b.area - a.area);
      setSortedBlinkies(sized.map((item) => item.src));
    };

    loadSizes();
    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div className="mt-8 text-center">
      <button
        onClick={() => setShowBlinkies(!showBlinkies)}
        className="toggle-btn text-sm"
      >
        [ {showBlinkies ? 'hide' : 'show'} blinkies ]
      </button>

      {showBlinkies && (
        <div className="mt-6 fade-in">
          <div className="blinkies-grid">
            {(sortedBlinkies.length ? sortedBlinkies : blinkies).map((src) => (
              <div key={src} className="blinkie-item">
                <img src={src} alt="" loading="lazy" className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
          <p className="text-xs text-white/50 mt-4">{blinkies.length} blinkies loaded</p>
        </div>
      )}
    </div>
  );
};

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [showEnter, setShowEnter] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const timer = setTimeout(() => setShowEnter(true), 700);
    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;
    audio.loop = true;
    audio.volume = 0.5;
  }, []);

  const handleEnter = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = isMuted;
      audio.play().catch(() => {
        // Autoplay is blocked without user interaction.
      });
    }
    setHasEntered(true);
  };

  const projects = [
    {
      title: 'csint.tools',
      description: 'csint.tools - collection of high-tier tools for cyber security, OSINT, privacy and general chaos',
      href: 'https://csint.tools',
      image: '/assets/csint.jpg'
    },
    {
      title: 'osintcat.net',
      description: 'osintcat.net - free collection of medium-tier OSINT tools and resources',
      href: 'https://osintcat.net',
      image: '/assets/osintcat.png'
    },
    {
      title: 'chudvision.net',
      description: 'chudvision.net - cheating software for multiple games started as "sexrust"',
      href: 'https://chudvision.net/',
      image: '/assets/chud.png'
    },
    {
      title: 'antagonist',
      description: 'antagonist - paid roblox external discontinued in 2025 developed by me and nick',
      href: '#',
      image: '/assets/atg.png'
    },
    {
      title: 'celex',
      description: 'celex - paid roblox external discontinued in 2025 developed by me and nick',
      href: '#',
      image: '/assets/celex.png'
    },
    {
      title: 'celestial',
      description: 'celestial - free roblox external discontinued in 2024 developed by me and nick, later open-sourced',
      href: '#',
      image: '/assets/celestial.png'
    },
    {
      title: 'slippy',
      description: 'slippy - chatting & marketplace network for SEing* accessable via telegram or tor',
      href: '#',
      image: '/assets/slippy.jpg'
    },
    {
      title: 'simland',
      description: 'simland - chatting & marketplace network for SEing* accessable via telegram since 2021',
      href: '#',
      image: '/assets/simland.jpg'
    }
  ];

  const ethicalProjects = [
    {
      title: 'aieseu.ro',
      description: 'aieseu.ro - romanian student friedly AI platform',
      href: 'https://aieseu.ro',
      image: '/assets/aieseu.png'
    },
    {
      title: 'vocalagent.eu',
      description: 'vocalagent.eu - AI netherlands start-up focused on automating voice-based tasks',
      href: 'https://vocalagent.eu',
      image: '/assets/vocalagent.png'
    },
    {
      title: 'hound.ac',
      description: 'hound.ac - unique clothing brand',
      href: 'https://houndarchives.com/',
      image: '/assets/hound.jpg'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <audio ref={audioRef} src="/assets/audio.mp3" />

      <button
        type="button"
        className="audio-toggle"
        onClick={() => {
          const nextMuted = !isMuted;
          setIsMuted(nextMuted);
          if (audioRef.current) {
            audioRef.current.muted = nextMuted;
          }
        }}
        aria-label={isMuted ? 'Unmute background audio' : 'Mute background audio'}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      <div
        className={`site-loader ${isLoading || !hasEntered ? '' : 'is-hidden'}`}
        role="dialog"
        aria-live="polite"
        aria-hidden={!(isLoading || !hasEntered)}
      >
        {isLoading && (
          <>
            <div className="loader-core" />
            <div className="loader-text">loading...</div>
          </>
        )}

        {!isLoading && !showEnter && <div className="loader-exit" />}

        {!isLoading && showEnter && (
          <button type="button" className="enter-button" onClick={handleEnter}>
            [enter]
          </button>
        )}
      </div>

      <Starfield />
      <BloodDrips />
      <SideLines />

      <div className={`app-shell relative z-20 max-w-4xl mx-auto px-4 py-12 ${isLoading || !hasEntered ? 'is-loading' : 'is-ready'}`}>
        {/* Logo Section */}
        <GothicLogo />

        {/* Links Section */}
        <div className="text-center mb-8">
          <p className="text-sm text-white/70 mb-3">links</p>
          <div className="flex justify-center gap-3">
            <LinkButton icon={DiscordIcon} href="https://discordapp.com/users/962246843272671262" label="Discord" />
            <LinkButton icon={TelegramIcon} href="https://t.me/dead" label="Telegram" />
            <LinkButton icon={Github} href="https://github.com/94q" label="GitHub" />
            <LinkButton icon={SpotifyIcon} href="https://open.spotify.com/user/1o3ne504z4zmsryntcsj2rgjp?si=8afff2bd4502450e" label="Spotify" />
          </div>
        </div>

        {/* About Section */}
        <div className="text-center mb-8">
          <p className="text-sm text-white/70 mb-1">about</p>
          <p className="text-sm text-white/90">i do everything</p>
          <p className="text-xs text-white/60 mt-2">
            collaboration & business:{' '}
            <a
              href="mailto:moum@terrorist.services"
              className="text-white/90 hover:text-white underline underline-offset-4"
            >
              moum@terrorist.services
            </a>
          </p>
          <div className="flex justify-center items-center gap-4 mt-2 text-xs">
            <span className="flex items-center gap-1 text-white/70">
              <Mail size={12} /> encrypted email:{' '}
              <a
                href="mailto:moum@terrorist.lol"
                className="text-white/90 hover:text-white underline underline-offset-4"
              >
                moum@terrorist.lol
              </a>
            </span>
            <span className="flex items-center gap-1 text-white/70">
              <Key size={12} /> PGP public key:{' '}
              <a
                href="/public_key.txt"
                className="text-white/90 hover:text-white underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                public_key.txt
              </a>
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-1">
            {Array(20).fill(null).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-white/60"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  animation: `pulse 2s infinite ${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-white">unethical projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                image={project.image}
                href={project.href}
              />
            ))}
          </div>
        </div>

        {/* Ethical Projects Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-6 text-white">ethical projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ethicalProjects.map((project, index) => (
              <ProjectCard
                key={`ethical-${index}`}
                title={project.title}
                description={project.description}
                image={project.image}
                href={project.href}
              />
            ))}
          </div>
        </div>

        {/* Blinkies Section */}
        <BlinkiesSection />

        {/* Footer */}
        <div className="mt-16 text-center text-xs text-white/40">
          <p>made with love & chaos</p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;
