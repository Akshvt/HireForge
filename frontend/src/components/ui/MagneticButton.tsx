import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "gradient" | "glass" | "ghost";
  size?: "default" | "sm" | "lg";
}

/**
 * MagneticButton — Pill-shaped neon gradient button with:
 * - Magnetic pull toward cursor
 * - Nebula→Cyan gradient with shift on hover
 * - Heavy neon drop shadow bloom on hover
 * - Spring recoil on click
 */
const MagneticButton = ({
  children,
  className,
  onClick,
  disabled = false,
  type = "button",
  variant = "gradient",
  size = "default",
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const scale = useSpring(1, { stiffness: 300, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseDown = () => {
    if (disabled) return;
    scale.set(0.95);
  };

  const handleMouseUp = () => {
    scale.set(1);
  };

  const sizeClasses = {
    sm: "h-9 px-5 text-sm",
    default: "h-11 px-7 text-sm",
    lg: "h-12 px-9 text-base",
  };

  const variantClasses = {
    gradient: cn(
      "text-white font-semibold",
      "bg-gradient-to-r from-nebula to-cyan",
      isHovered
        ? "shadow-[0_8px_30px_-4px_rgba(99,102,241,0.4),0_8px_30px_-4px_rgba(6,182,212,0.3)]"
        : "shadow-[0_4px_15px_-4px_rgba(99,102,241,0.2)]"
    ),
    glass: cn(
      "glass-panel font-medium",
      "text-starlight",
      isHovered
        ? "shadow-[0_8px_30px_-4px_rgba(99,102,241,0.15)]"
        : ""
    ),
    ghost: cn(
      "bg-transparent font-medium",
      "text-dust hover:text-starlight",
      "hover:bg-white/5"
    ),
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full",
        "transition-all duration-300 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nebula focus-visible:ring-offset-2 focus-visible:ring-offset-void",
        "disabled:opacity-50 disabled:pointer-events-none",
        "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      style={{
        x: springX,
        y: springY,
        scale,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
