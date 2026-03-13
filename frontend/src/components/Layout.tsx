import Navbar from "./Navbar";
import { Toaster } from "./ui/toaster";
import { Toaster as Sonner } from "./ui/sonner";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            {children}
            <Toaster />
            <Sonner />
        </div>
    );
};

export default Layout;
