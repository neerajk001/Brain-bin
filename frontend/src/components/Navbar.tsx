import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (btnRef.current) {
        gsap.from(btnRef.current.children, {
          x: 300,
          opacity: 0,
          duration: 1,
          ease: 'power1.inOut',
          stagger: 0.3
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-[90%] justify-center items-center mx-auto">
      <div className="z-10 flex justify-between w-full bg-white/10 backdrop-blur-2xl py-3 rounded-full text-white px-6 items-center border border-white/20 h-auto">
        <div className="text-3xl font-bold text-yellow-400">Brain-bin</div>

        <div ref={btnRef} className="space-x-4 hidden md:flex">
          <button onClick={() => navigate('/signin')}
            className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-md hover:bg-white/20 hover:shadow-lg">
            Signin
          </button>
          <button onClick={() => navigate('/signup')}
            className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-md hover:bg-white/20 hover:shadow-lg">
            Signup
          </button>
          <button onClick={() => navigate('/signup')}
            className="px-4 py-2 rounded-full backdrop-blur-md text-white border border-white/20 shadow-md hover:bg-white/20 hover:shadow-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
