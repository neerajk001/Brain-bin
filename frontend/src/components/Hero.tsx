import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import img from '../images/brain.png';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(Draggable);

function Hero() {
  const navigate = useNavigate();

  // Add appropriate HTML element types
  const imgRef = useRef<HTMLImageElement | null>(null);
  const floatTween = useRef<gsap.core.Tween | null>(null);
  const dragInstance = useRef<Draggable | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);

  // Animate text headings
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headRef.current) {
        gsap.from(headRef.current.children, {
          x: -300,
          opacity: 0,
          duration: 1,
          ease: 'power1.inOut',
          stagger: 0.4,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Animate image on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.from(imgRef.current, {
          delay: 1.5,
          scale: 0,
          opacity: 0,
          ease: 'power1.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Start floating animation
  const startFloating = () => {
    if (imgRef.current) {
      floatTween.current = gsap.to(imgRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }
  };

  // Run floating on mount
  useEffect(() => {
    startFloating();
  }, []);

  // Make image draggable on double-click
  const handleDoubleClick = () => {
    if (dragInstance.current || !imgRef.current) return;

    floatTween.current?.kill();

    dragInstance.current = Draggable.create(imgRef.current, {
      type: 'x,y',
      inertia: true,
      onRelease: function () {
        gsap.to(this.target, {
          x: 0,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          onComplete: () => {
            dragInstance.current = null;
            startFloating();
          },
        });
      },
    })[0];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[90%] mx-auto mt-10 px-4 items-center overflow-hidden ">
      <div ref={headRef} className="flex flex-col justify-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Welcome to BrainBin
        </h1>
        <h1 className="text-3xl font-bold mb-4 text-white mt-8">
          your second brain for social content
        </h1>
        <p className="text-lg text-white mb-6 mt-1">
          Never lose track of inspiring content again. brain-bin helps you save,
          organize, and rediscover links from all your favorite social platforms in
          one intelligent hub.
        </p>
        <div className="space-x-4 mt-6 flex items-center justify-center">
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-2 rounded-full bg-black backdrop-blur-md text-white border border-white/20 shadow-md hover:bg-white/20 hover:shadow-lg transition-all duration-300"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate('/signin')}
            className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-md hover:bg-white/20 hover:shadow-lg transition-all duration-300"
          >
            Signin
          </button>
        </div>
      </div>

      <div className="justify-center items-center mt-4 z-10 grid grid-cols-1">
        <img
          ref={imgRef}
          onDoubleClick={handleDoubleClick}
          src={img}
          alt="brain floating"
          className="w-full max-w-md cursor-pointer select-none"
        />
      </div>
    </div>
  );
}

export default Hero;
