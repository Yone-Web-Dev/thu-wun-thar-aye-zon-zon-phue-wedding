import React, { useEffect, useRef } from 'react';
import { ThemeMode } from '../types/wedding';

interface FloatingPetalsProps {
  theme: ThemeMode;
  enabled?: boolean;
}

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  colorIdx: number;
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({
  theme,
  enabled = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const isDusty = theme === 'dustyBlue';

    // Romantic heart palette per theme
    const heartColors = theme === 'magic'
      ? [
          'rgba(192, 132, 252, 0.7)',
          'rgba(168, 85, 247, 0.65)',
          'rgba(233, 213, 255, 0.75)',
          'rgba(245, 158, 11, 0.55)'
        ]
      : theme === 'dustyBlue'
      ? [
          'rgba(165, 188, 209, 0.65)',
          'rgba(125, 152, 179, 0.6)',
          'rgba(195, 214, 229, 0.7)',
          'rgba(142, 168, 192, 0.55)'
        ]
      : [
          'rgba(234, 165, 153, 0.7)',
          'rgba(224, 122, 104, 0.6)',
          'rgba(247, 198, 189, 0.75)',
          'rgba(217, 107, 89, 0.55)'
        ];

    // Draw Smooth Curved Vector Heart
    const drawHeart = (c: CanvasRenderingContext2D, size: number, color: string) => {
      c.save();
      c.fillStyle = color;
      c.beginPath();
      const topCurveHeight = size * 0.35;
      c.moveTo(0, topCurveHeight);
      c.bezierCurveTo(-size * 0.5, -size * 0.45, -size, topCurveHeight * 0.4, 0, size);
      c.bezierCurveTo(size, topCurveHeight * 0.4, size * 0.5, -size * 0.45, 0, topCurveHeight);
      c.closePath();
      c.fill();
      c.restore();
    };

    // Initialize only romantic floating hearts
    const particles: HeartParticle[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 7, // 7px to 15px
      speedX: Math.random() * 0.6 - 0.3,
      speedY: Math.random() * 0.65 + 0.35,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.2,
      opacity: Math.random() * 0.4 + 0.45,
      colorIdx: Math.floor(Math.random() * heartColors.length)
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.015) * 0.5 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 25) {
          p.y = -25;
          p.x = Math.random() * width;
        }
        if (p.x > width + 25) p.x = -25;
        if (p.x < -25) p.x = width + 25;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        drawHeart(ctx, p.size, heartColors[p.colorIdx]);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-80"
      aria-hidden="true"
    />
  );
};
