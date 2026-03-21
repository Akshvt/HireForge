import Navbar from "./Navbar";
import { Toaster } from "./ui/toaster";
import { Toaster as Sonner } from "./ui/sonner";
import MeshBackground from "./ui/MeshBackground";
import ParticleBackground from "./ui/ParticleBackground";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "#030305" }}>
      {/* Deep space ambient mesh — large slow orbs */}
      <MeshBackground />

      {/* Star dust particles — high-end refined motes */}
      <ParticleBackground />

      {/* Content layer with perspective for 3D tilt */}
      <div className="relative" style={{ zIndex: 2 }}>
        <Navbar />
        <div className="perspective-container">
          {children}
        </div>
      </div>

      <Toaster />
      <Sonner />
    </div>
  );
};

export default Layout;
