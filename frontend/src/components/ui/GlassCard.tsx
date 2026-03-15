import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Index for staggered entrance (0-based) */
  index?: number;
  /** Enable continuous levitation */
  levitate?: boolean;
  /** Enable magnetic 3D tilt on hover */
  tilt?: boolean;
  /** Enable shimmer overlay */
  shimmer?: boolean;
  /** Neon glow color on hover */
  glowColor?: "nebula" | "aurora" | "cyan" | "nova" | "none";
  style?: React.CSSProperties;
  onClick?: () => void;
}

const GLOW_COLORS = {
  nebula: "rgba(99, 102, 241, 0.35)",
  aurora: "rgba(16, 185, 129, 0.35)",
  cyan: "rgba(6, 182, 212, 0.35)",
  nova: "rgba(244, 63, 94, 0.35)",
  none: "transparent",
};

/**
 * GlassCard — Dark obsidian glass panel with:
 * - Heavy backdrop-blur on void background
 * - Specular highlight borders (glass-edge)
 * - Magnetic 3D tilt tracking cursor
 * - Neon glow bloom on hover
 * - Levitation breathing
 * - Staggered spring entrance
 */
const GlassCard = ({
  children,
  className,
  index = 0,
  levitate = true,
  tilt = true,
  shimmer = false,
  glowColor = "nebula",
  style,
  onClick,
}: GlassCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative rounded-2xl overflow-hidden cursor-default",
        "glass-panel",
        levitate && !isHovered && "animate-levitate",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        animationDelay: levitate ? `${index * 0.3}s` : undefined,
        boxShadow: isHovered
          ? `0 20px 50px -10px rgba(0,0,0,0.5), 0 0 40px ${GLOW_COLORS[glowColor]}`
          : "0 4px 20px -4px rgba(0,0,0,0.3)",
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        ...style,
      }}
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: index * 0.08,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Shimmer overlay */}
      {shimmer && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 10 }}
        >
          <div
            className="absolute inset-0 animate-shimmer-sweep"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
              animationDuration: "10s",
              animationIterationCount: "infinite",
            }}
          />
        </div>
      )}

      {/* Hover neon border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ zIndex: 5 }}
        animate={{
          boxShadow: isHovered
            ? `inset 0 0 0 1px ${GLOW_COLORS[glowColor]}`
            : "inset 0 0 0 1px transparent",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Specular top highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          zIndex: 6,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative" style={{ zIndex: 2 }}>
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
