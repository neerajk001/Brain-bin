import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const bentoGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.glass-card');
      for (const card of Array.from(cards)) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      }
    };

    const bentoGrid = bentoGridRef.current;
    if (bentoGrid) {
      bentoGrid.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (bentoGrid) {
        bentoGrid.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 pt-[100px] relative">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(29,185,84,0.15)_0%,transparent_40%)]"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(30,215,96,0.1)_0%,transparent_40%)]"></div>
      </div>

      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none -z-10 bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%270%200%20200%20200%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter%20id=%27noiseFilter%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.65%27%20numOctaves=%273%27%20stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect%20width=%27100%25%27%20height=%27100%25%27%20filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E')]"></div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full h-[70px] bg-black/95 backdrop-blur-xl border-b border-zinc-800 z-[1000] flex items-center justify-center">
        <div className="w-full max-w-[1200px] px-5 flex justify-between items-center">
          <Link to="/" className="font-bold text-2xl text-white flex items-center gap-2.5 no-underline">
            <i className="fa-solid fa-brain text-[#1DB954]"></i> BrainBin
          </Link>

          <ul className="flex gap-7 list-none md:hidden lg:flex">
            <li><a href="#features" className="text-gray-400 no-underline text-[0.95rem] font-medium hover:text-[#1DB954] transition-colors">Features</a></li>
            <li><a href="#pricing" className="text-gray-400 no-underline text-[0.95rem] font-medium hover:text-[#1DB954] transition-colors">Pricing</a></li>
            <li><a href="#community" className="text-gray-400 no-underline text-[0.95rem] font-medium hover:text-[#1DB954] transition-colors">Community</a></li>
          </ul>

          <Link to="/signin" className="px-5 py-2 rounded-[20px] bg-zinc-900 text-white no-underline text-[0.9rem] font-medium border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all">
            Log In
          </Link>
        </div>
      </nav>

      {/* MAIN GRID */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-rows-[repeat(3,minmax(180px,auto))] gap-5 max-w-[1200px] w-full mx-auto"
        ref={bentoGridRef}
      >
        {/* Tile 1: Hero */}
        <div className="glass-card col-span-1 sm:col-span-2 row-span-2 flex flex-col justify-between relative">
          <div>
            <h1 className="text-[2.5rem] sm:text-[3.5rem] leading-[1.1] font-bold bg-gradient-to-r from-white to-[#1DB954] bg-clip-text text-transparent mb-4 tracking-tight">
              Save.<br />Organize.<br />Rediscover.
            </h1>
            <p className="text-gray-400 text-lg max-w-[300px] leading-relaxed">
              Your second brain for social content. Store inspiring threads, videos, and articles in one glowing hub.
            </p>
          </div>
          <div className="absolute -bottom-5 -right-5 w-[200px] h-[200px] opacity-80 drop-shadow-[0_0_30px_rgba(29,185,84,0.4)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="url(#gradientbrain)" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <defs>
                <linearGradient id="gradientbrain" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1ed760" />
                  <stop offset="100%" stopColor="#1DB954" />
                </linearGradient>
              </defs>
              <path d="M9.5 2A5.5 5.5 0 0 0 4 7.5a5.5 5.5 0 0 0 5.5 5.5H11"></path>
              <path d="M14.5 2A5.5 5.5 0 0 1 20 7.5a5.5 5.5 0 0 1-5.5 5.5H13"></path>
              <path d="M11 13h3"></path>
              <path d="M9.5 22a5.5 5.5 0 0 1-5.5-5.5A5.5 5.5 0 0 1 9.5 11H11"></path>
              <path d="M14.5 22a5.5 5.5 0 0 0 5.5-5.5A5.5 5.5 0 0 0 14.5 11H13"></path>
              <path d="M9 7h6"></path>
              <path d="M9 17h6"></path>
            </svg>
          </div>
        </div>

        {/* Tile 2: Save Feature */}
        <div className="glass-card col-span-1 row-span-1 items-center justify-center text-center">
          <div className="w-[60px] h-[60px] rounded-full bg-[#1DB954]/20 flex items-center justify-center mb-4 border border-[#1DB954]/30 text-[#1DB954] text-2xl shadow-[0_0_20px_rgba(29,185,84,0.3)] mx-auto">
            <i className="fa-solid fa-bolt"></i>
          </div>
          <div className="font-semibold text-lg">Save any link instantly</div>
          <p className="text-xs text-gray-400 mt-1">One click capture</p>
        </div>

        {/* Tile 3: Categories */}
        <div className="glass-card col-span-1 row-span-1 justify-center">
          <div className="font-semibold text-lg">Smart Auto-Categories</div>
          <div className="flex flex-wrap gap-2.5 mt-4">
            <span className="px-3.5 py-1.5 rounded-[20px] text-[0.85rem] font-medium backdrop-blur-sm bg-[#1DB954]/20 text-green-200 border border-[#1DB954]/30">#Design</span>
            <span className="px-3.5 py-1.5 rounded-[20px] text-[0.85rem] font-medium backdrop-blur-sm bg-blue-500/20 text-blue-200 border border-blue-500/30">#Tech</span>
            <span className="px-3.5 py-1.5 rounded-[20px] text-[0.85rem] font-medium backdrop-blur-sm bg-[#1ed760]/20 text-green-100 border border-[#1ed760]/30">#Inspo</span>
            <span className="px-3.5 py-1.5 rounded-[20px] text-[0.85rem] font-medium backdrop-blur-sm bg-[#1DB954]/20 text-green-200 border border-[#1DB954]/30">#UI/UX</span>
            <span className="px-3.5 py-1.5 rounded-[20px] text-[0.85rem] font-medium backdrop-blur-sm bg-blue-500/20 text-blue-200 border border-blue-500/30">#AI</span>
          </div>
        </div>

        {/* Tile 4: Socials */}
        <div className="glass-card col-span-1 row-span-1 flex-col justify-center">
          <div className="font-semibold text-lg">Cross-platform Hub</div>
          <div className="flex justify-between mt-5 px-2.5">
            <i className="fa-brands fa-youtube text-[1.8rem] text-gray-400 hover:text-[#1DB954] hover:drop-shadow-[0_0_15px_rgba(29,185,84,0.5)] transition-all cursor-pointer"></i>
            <i className="fa-brands fa-twitter text-[1.8rem] text-gray-400 hover:text-[#1DB954] hover:drop-shadow-[0_0_15px_rgba(29,185,84,0.5)] transition-all cursor-pointer"></i>
            <i className="fa-brands fa-instagram text-[1.8rem] text-gray-400 hover:text-[#1DB954] hover:drop-shadow-[0_0_15px_rgba(29,185,84,0.5)] transition-all cursor-pointer"></i>
            <i className="fa-brands fa-linkedin text-[1.8rem] text-gray-400 hover:text-[#1DB954] hover:drop-shadow-[0_0_15px_rgba(29,185,84,0.5)] transition-all cursor-pointer"></i>
          </div>
        </div>

        {/* Tile 5: Showcase */}
        <div className="glass-card col-span-1 sm:col-span-2 row-span-1 relative bg-gradient-to-b from-white/[0.03] to-black/20">
          <div className="mb-4 flex justify-between items-center">
            <div className="font-semibold text-lg">Your BrainBin</div>
            <div className="w-2.5 h-2.5 bg-[#1DB954] rounded-full shadow-[0_0_10px_#1DB954]"></div>
          </div>
          <div className="w-full h-full flex gap-4 pt-2.5">
            <div className="w-1/4 h-4/5 bg-white/5 rounded-xl flex flex-col gap-2 p-2.5">
              <div className="h-1.5 rounded bg-white/10 w-full"></div>
              <div className="h-1.5 rounded bg-white/10 w-3/5"></div>
              <div className="h-1.5 rounded bg-white/10 w-3/5"></div>
            </div>
            <div className="flex-1 h-[90%] bg-[rgba(15,5,24,0.6)] rounded-t-xl border border-white/5 p-4 grid grid-cols-2 gap-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
              <div className="h-[60px] bg-white/[0.08] rounded-lg relative after:content-[''] after:absolute after:top-2 after:left-2 after:w-5 after:h-5 after:bg-[#1DB954] after:rounded after:opacity-50"></div>
              <div className="h-[60px] bg-white/[0.08] rounded-lg relative after:content-[''] after:absolute after:top-2 after:left-2 after:w-5 after:h-5 after:bg-[#1DB954] after:rounded after:opacity-50"></div>
              <div className="h-[60px] bg-white/[0.08] rounded-lg relative after:content-[''] after:absolute after:top-2 after:left-2 after:w-5 after:h-5 after:bg-[#1DB954] after:rounded after:opacity-50"></div>
              <div className="h-[60px] bg-white/[0.08] rounded-lg relative after:content-[''] after:absolute after:top-2 after:left-2 after:w-5 after:h-5 after:bg-[#1DB954] after:rounded after:opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Tile 6: CTA */}
        <div className="glass-card col-span-1 row-span-1 flex-col justify-center gap-3">
          <Link to="/signup" className="w-full py-3.5 px-4 rounded-full font-semibold text-center cursor-pointer transition-all no-underline text-[0.95rem] flex items-center justify-center gap-2 bg-[#1DB954] text-black shadow-[0_4px_15px_rgba(29,185,84,0.3)] hover:bg-[#1ed760] hover:shadow-[0_6px_25px_rgba(29,185,84,0.5)]">
            Get Started <i className="fa-solid fa-arrow-right"></i>
          </Link>
          <Link to="/signin" className="w-full py-3.5 px-4 rounded-full font-semibold text-center cursor-pointer transition-all no-underline text-[0.95rem] flex items-center justify-center gap-2 bg-transparent border border-zinc-700 text-white hover:bg-zinc-900 hover:border-zinc-600">
            Sign In
          </Link>
        </div>
      </div>

      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        
        .glass-card:hover {
          transform: translateY(-4px) scale(1.01);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          background: rgba(255, 255, 255, 0.05);
        }
        
        .glass-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(255, 255, 255, 0.06),
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
          z-index: 2;
        }
        
        .glass-card:hover::after {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Landing;