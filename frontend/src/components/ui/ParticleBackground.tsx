import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  color: string;
}

const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 1000], [0, -50]); // Very subtle parallax

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const colors = [
    "rgba(109, 40, 217, 0.4)", // Nebula Indigo
    "rgba(6, 182, 212, 0.3)",  // Cyan
    "rgba(168, 85, 247, 0.3)", // Light Purple
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 20);
      mouseY.set((clientY / innerHeight - 0.5) * 20);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Generate particles
    const newParticles: Particle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 20 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const combinedY = useTransform(
    [yOffset, mouseYSpring],
    ([latestYOffset, latestMouseYSpring]: any[]) => (latestYOffset as number) + (latestMouseYSpring as number)
  );

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-[1] select-none">
      <motion.div
        style={{
          y: combinedY,
          x: mouseXSpring,
        }}
        className="absolute inset-0"
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: 0,
            }}
            animate={{
              left: [`${p.x}%`, `${p.x + (Math.random() * 4 - 2)}%`, `${p.x}%`],
              top: [`${p.y}%`, `${p.y + (Math.random() * 4 - 2)}%`, `${p.y}%`],
              opacity: [p.opacity, p.opacity * 1.8, p.opacity],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              filter: `blur(${p.size / 2}px)`,
              boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ParticleBackground;

