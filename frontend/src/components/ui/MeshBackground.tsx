import { useEffect, useState } from "react";

/**
 * MeshBackground — Deep Space ambient gradient orbs
 * Giant blurred neon color nodes drifting behind all content.
 * On a void-black (#030305) background, these create the color
 * that dark-glass panels refract through.
 */
const MeshBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0, backgroundColor: "#030305" }}
      aria-hidden="true"
    >
      {/* Orb 1 — Nebula indigo, top-left */}
      <div
        className={`absolute transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
        style={{
          top: "5%",
          left: "10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 70%)",
          filter: "blur(120px)",
          animation: "mesh-drift-1 25s ease-in-out infinite",
        }}
      />

      {/* Orb 2 — Aurora emerald, bottom-right */}
      <div
        className={`absolute transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
        style={{
          bottom: "5%",
          right: "5%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)",
          filter: "blur(120px)",
          animation: "mesh-drift-2 28s ease-in-out infinite",
          animationDelay: "-7s",
        }}
      />

      {/* Orb 3 — Cyan, center drifting */}
      <div
        className={`absolute transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
        style={{
          top: "40%",
          left: "45%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.10) 0%, rgba(99, 102, 241, 0.06) 50%, transparent 70%)",
          filter: "blur(130px)",
          animation: "mesh-drift-3 30s ease-in-out infinite",
          animationDelay: "-12s",
        }}
      />

      {/* Orb 4 — Faint nova accent, top-right */}
      <div
        className={`absolute transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
        style={{
          top: "8%",
          right: "20%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244, 63, 94, 0.06) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "mesh-drift-1 32s ease-in-out infinite reverse",
          animationDelay: "-18s",
        }}
      />
    </div>
  );
};

export default MeshBackground;
