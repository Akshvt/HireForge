import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, User, LogOut, LayoutDashboard, Code2, Info, HelpCircle, Zap, BookOpen } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container max-w-5xl mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Briefcase className="h-6 w-6 text-primary" />
          <span>HireForge</span>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5" /> How It Works
          </Link>
          <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5" /> About
          </Link>
          <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
            <HelpCircle className="h-3.5 w-3.5" /> FAQ
          </Link>
          <a href="https://codesage.dev" target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:text-accent/80 transition-colors flex items-center gap-1.5 font-medium">
            <Code2 className="h-3.5 w-3.5" /> CodeSage ↗
          </a>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium hover:text-primary hidden sm:inline-block">
                Dashboard
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/about")}>
                    <Info className="mr-2 h-4 w-4" />
                    <span>About HireForge</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/how-it-works")}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>How It Works</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Get Started Free</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
