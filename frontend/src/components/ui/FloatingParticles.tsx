import { useEffect, useState, useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
}

/**
 * FloatingParticles — Ambient star dust / neon motes floating across the void.
 * Pure CSS animations, no JS frame loop. Lightweight and GPU-accelerated.
 */
const FloatingParticles = ({ count = 40 }: { count?: number }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles: Particle[] = useMemo(() => {
    const colors = [
      "rgba(99, 102, 241, 0.6)",   // nebula
      "rgba(6, 182, 212, 0.5)",    // cyan
      "rgba(16, 185, 129, 0.4)",   // aurora
      "rgba(248, 250, 252, 0.3)",  // starlight
      "rgba(244, 63, 94, 0.2)",    // nova (rare)
    ];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -30,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [count]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: p.size > 2 ? `0 0 ${p.size * 3}px ${p.color}` : "none",
            animation: `particle-float-${p.id % 4} ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}

      <style>{`
        @keyframes particle-float-0 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: var(--opacity, 0.3); }
          25% { transform: translate(30px, -40px) scale(1.2); opacity: calc(var(--opacity, 0.3) * 1.5); }
          50% { transform: translate(-20px, -80px) scale(0.8); opacity: var(--opacity, 0.3); }
          75% { transform: translate(40px, -20px) scale(1.1); opacity: calc(var(--opacity, 0.3) * 0.7); }
        }
        @keyframes particle-float-1 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-50px, 30px); }
          66% { transform: translate(20px, -60px); }
        }
        @keyframes particle-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 50px) scale(1.3); }
        }
        @keyframes particle-float-3 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-30px, -50px); }
          75% { transform: translate(50px, 30px); }
        }
      `}</style>
    </div>
  );
};

export default FloatingParticles;
