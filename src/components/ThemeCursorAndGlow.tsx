import React, { useEffect, useState, useRef } from 'react';
import { ThemeMode } from '../types/wedding';

interface ThemeCursorAndGlowProps {
  theme: ThemeMode;
}

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  rotation: number;
  rotSpeed: number;
  type: 'star' | 'heart' | 'spark';
}

export const ThemeCursorAndGlow: React.FC<ThemeCursorAndGlowProps> = ({ theme }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<TrailParticle[]>([]);
  const lastPosRef = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number | null>(null);

  const isDusty = theme === 'dustyBlue';

  // Palette for cursor particles
  const particleColors = theme === 'magic'
    ? ['#F7D070', '#C084FC', '#FFFFFF', '#E9D5FF', '#F472B6']
    : isDusty
    ? ['#F7D070', '#85B6D7', '#FFFFFF', '#D1E6F3', '#EAB852']
    : ['#F7D070', '#FFAEA0', '#FFFFFF', '#FFD5CC', '#EAA54D'];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const spawnParticles = (x: number, y: number, count: number = 2) => {
      const types: ('star' | 'heart' | 'spark')[] = ['star', 'spark', 'heart'];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.4 + 0.3;
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4, // gentle upward drift
          size: type === 'heart' ? Math.random() * 5 + 4 : Math.random() * 4 + 3,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.02,
          color,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.08,
          type
        });
      }

      // Keep max particles in check for top performance
      if (particlesRef.current.length > 70) {
        particlesRef.current.splice(0, particlesRef.current.length - 70);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      setPos({ x: newX, y: newY });
      if (!isVisible) setIsVisible(true);

      const dx = newX - lastPosRef.current.x;
      const dy = newY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 6) {
        const count = dist > 35 ? 3 : 2;
        spawnParticles(newX, newY, count);
        lastPosRef.current = { x: newX, y: newY };
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Particle render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.rotSpeed;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'star') {
          // Draw 4-point golden star sparkle
          const s = p.size;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.fill();

          // Soft central glitter dot
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.28, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'heart') {
          // Draw tiny floating heart
          const hs = p.size * 0.45;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, hs * 0.3);
          ctx.bezierCurveTo(-hs * 1.2, -hs * 0.8, -hs * 1.2, hs * 0.7, 0, hs * 1.5);
          ctx.bezierCurveTo(hs * 1.2, hs * 0.7, hs * 1.2, -hs * 0.8, 0, hs * 0.3);
          ctx.fill();
        } else {
          // Soft radiant spark / orb
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          grad.addColorStop(0, '#FFFFFF');
          grad.addColorStop(0.5, p.color);
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isVisible, isDusty]);

  const dotColor = isDusty ? '#2D6A9F' : '#E26D5C';
  const ringColor = isDusty ? 'rgba(45, 106, 159, 0.5)' : 'rgba(226, 109, 92, 0.5)';
  const goldAura = 'rgba(218, 165, 32, 0.5)';

  return (
    <>
      {/* Interactive Cursor Particle Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9995] select-none"
        aria-hidden="true"
      />

      {/* Overall Webpage Light Vibrant Breathing Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
        {/* Top-Right Vibrant Ambient Breathing Glow */}
        <div
          className={`absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full blur-[140px] transition-colors duration-1000 animate-breathe ${
            isDusty ? 'bg-sky-200/65' : 'bg-rose-200/65'
          }`}
        />

        {/* Center Golden Warmth Shimmer Breathing */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[160px] bg-amber-200/55 transition-colors duration-1000 animate-gold-glow" />

        {/* Bottom-Left Radiant Ambient Breathing Glow */}
        <div
          className={`absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full blur-[140px] transition-colors duration-1000 animate-breathe-slow ${
            isDusty ? 'bg-indigo-100/75' : 'bg-orange-100/75'
          }`}
        />

        {/* Delicate Golden Radial Veil across entire canvas */}
        <div className="absolute inset-0 bg-radial from-amber-200/15 via-transparent to-transparent opacity-80 pointer-events-none" />
      </div>

      {/* Bespoke Theme-Aware Custom Mouse Pointer */}
      {isVisible && (
        <>
          {/* Central Precise Pointer Dot */}
          <div
            className="fixed pointer-events-none z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              width: isHovering ? '9px' : '6px',
              height: isHovering ? '9px' : '6px',
              backgroundColor: dotColor,
              boxShadow: `0 0 12px ${dotColor}, 0 0 4px #FFFFFF`
            }}
          />

          {/* Smooth Trailing Aura Ring with Gold Highlight */}
          <div
            className="fixed pointer-events-none z-[9998] rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              width: isHovering ? '48px' : '30px',
              height: isHovering ? '48px' : '30px',
              border: `1.5px solid ${isHovering ? goldAura : ringColor}`,
              backgroundColor: isHovering
                ? isDusty
                  ? 'rgba(45, 106, 159, 0.1)'
                  : 'rgba(226, 109, 92, 0.1)'
                : 'transparent',
              boxShadow: isHovering ? `0 0 20px ${ringColor}` : '0 0 8px rgba(212, 175, 55, 0.2)'
            }}
          />
        </>
      )}
    </>
  );
};
