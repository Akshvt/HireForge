import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { Briefcase, User, LogOut, LayoutDashboard, Info, BookOpen, Code2, HelpCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sticky top-0 z-50 flex justify-center px-4 pt-6 pb-2">
      <motion.nav
        className="glass-panel rounded-2xl max-w-4xl w-full border-white/5 shadow-2xl shadow-nebula/5"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
      >
        <div className="flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-nebula to-cyan group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300">
              <Briefcase className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="font-jakarta font-bold text-starlight text-lg tracking-tight">HireForge</span>
          </Link>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-1.5 p-1 bg-white/[0.03] rounded-xl border border-white/5">
            {[
              { to: "/how-it-works", label: "How It Works", Icon: Zap },
              { to: "/about", label: "About", Icon: Info },
              { to: "/faq", label: "FAQ", Icon: HelpCircle },
            ].map(({ to, label, Icon }) => {
              const active = isActive(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={`relative text-sm px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 group ${active ? "text-white" : "text-dust hover:text-starlight"
                    }`}
                >
                  {active && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-gradient-to-r from-nebula/80 to-cyan/80 rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={`h-4 w-4 transition-colors ${active ? "text-white" : "text-dust group-hover:text-cyan"}`} />
                  <span className="font-medium">{label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <a
              href="https://codesage.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-cyan hover:text-cyan/80 transition-colors py-1.5"
            >
              <Code2 className="h-3.5 w-3.5" /> CodeSage
            </a>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/5 p-0 ring-1 ring-white/10 transition-all">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-br from-nebula to-cyan text-white text-xs font-bold">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-panel-strong rounded-2xl mt-4 border-white/10 shadow-3xl" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal p-4">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold text-starlight leading-none">{user?.name}</p>
                      <p className="text-xs text-dust leading-none">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5 mx-2" />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")} className="mx-2 my-1 rounded-lg focus:bg-white/10 text-dust focus:text-white transition-colors cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="mx-2 my-1 rounded-lg focus:bg-white/10 text-dust focus:text-white transition-colors cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5 mx-2" />
                  <DropdownMenuItem onClick={handleLogout} className="mx-2 my-1 rounded-lg focus:bg-nova/20 text-nova focus:text-nova transition-colors cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild className="rounded-full text-sm font-medium text-dust hover:text-white hover:bg-white/5 px-5">
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="rounded-full bg-gradient-to-r from-nebula to-cyan text-white font-bold hover:shadow-[0_8px_20px_rgba(99,102,241,0.4)] transition-all duration-300 border-0 px-6"
                >
                  <Link to="/register">Join Free</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
