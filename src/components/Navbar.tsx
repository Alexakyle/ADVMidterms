import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronRight, User, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getInitials = (name?: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getProfileLink = () => {
    if (!user) return "/login";
    
    switch(user.role.toLowerCase()) {
      case 'seller':
        return "/seller/profile";
      case 'client':
        return "/client/profile";
      case 'admin':
        return "/admin/profile";
      default:
        return "/dashboard";
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-transparent backdrop-blur-md shadow-sm py-3' 
        : 'bg-white py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-serif text-2xl font-bold tracking-tight">
          Art<span className="text-[#AA8F66]">Auction</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'text-[#AA8F66]' : 'text-gray-700'}`}
          >
            Home
          </Link>
          <Link 
            to="/auctions" 
            className={`nav-link ${location.pathname === '/auctions' ? 'text-[#AA8F66]' : 'text-gray-700'}`}
          >
            Auctions
          </Link>
          <Link 
            to="/artists" 
            className={`nav-link ${location.pathname.startsWith('/artists') ? 'text-[#AA8F66]' : 'text-gray-700'}`}
          >
            Artists
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'text-[#AA8F66]' : 'text-gray-700'}`}
          >
            About
          </Link>
        </nav>
        
        {/* User Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-0 h-10 w-10 hover:bg-[#AA8F66]/10 transition-all duration-200">
                  <Avatar className="border border-[#AA8F66]/30 hover:border-[#AA8F66]/50 transition-all duration-200">
                    <AvatarFallback className="bg-[#AA8F66]/10 text-[#AA8F66] font-medium hover:bg-[#AA8F66]/20 transition-all duration-200">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-64 p-0 border border-[#AA8F66]/30 rounded-lg shadow-lg overflow-hidden bg-white/95 backdrop-blur-sm relative"
              >
                {/* Cute small arrow */}
                <div className="absolute -top-[6px] right-3 w-3 h-3 rotate-45 bg-[#AA8F66] border-t border-l border-[#AA8F66]/50 rounded-tl-sm"></div>

                {/* User Header */}
                <div className="bg-[#AA8F66] px-4 py-3 border-b border-[#AA8F66]/40">
                  <p className="font-bold text-white truncate">{user.name}</p>
                  <p className="text-xs text-white/90 capitalize">{user.role.toLowerCase()}</p>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <DropdownMenuItem asChild className="px-3 py-3 rounded-md hover:bg-[#AA8F66]/10 focus:bg-[#AA8F66]/10 mb-1">
                    <Link to={getProfileLink()} className="w-full flex items-center gap-3">
                      <div className="bg-[#AA8F66]/10 p-2 rounded-lg">
                        <User className="h-5 w-5 text-[#AA8F66]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Profile</p>
                        <p className="text-xs text-gray-500">View your account</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>

                  {user.role.toLowerCase() === 'seller' && (
                    <DropdownMenuItem asChild className="px-3 py-3 rounded-md hover:bg-[#AA8F66]/10 focus:bg-[#AA8F66]/10 mb-1">
                      <Link to="/seller/dashboard" className="w-full flex items-center gap-3">
                        <div className="bg-[#AA8F66]/10 p-2 rounded-lg">
                          <Package className="h-5 w-5 text-[#AA8F66]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Seller Dashboard</p>
                          <p className="text-xs text-gray-500">Manage your listings</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  )}

                  {user.role.toLowerCase() === 'admin' && (
                    <DropdownMenuItem asChild className="px-3 py-3 rounded-md hover:bg-[#AA8F66]/10 focus:bg-[#AA8F66]/10 mb-1">
                      <Link to="/admin/dashboard" className="w-full flex items-center gap-3">
                        <div className="bg-[#AA8F66]/10 p-2 rounded-lg">
                          <Package className="h-5 w-5 text-[#AA8F66]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Admin Dashboard</p>
                          <p className="text-xs text-gray-500">Manage platform</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  )}
                </div>

                {/* Footer with Logout */}
                <div className="border-t border-[#AA8F66]/10 p-2 bg-white">
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="px-3 py-3 rounded-md text-red-600 hover:bg-red-50/80 focus:bg-red-50/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-red-50 p-2 rounded-lg">
                        <X className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Logout</p>
                        <p className="text-xs text-red-500">Sign out of account</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button className="bg-[#AA8F66] hover:bg-[#AA8F66]/90" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed inset-0 z-40 bg-white transition-transform duration-300 ease-in-out transform ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="container mx-auto px-4 py-20">
          <nav className="flex flex-col space-y-6">
            <Link 
              to="/" 
              className="flex justify-between items-center text-xl font-medium py-2 border-b border-gray-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home <ChevronRight size={18} />
            </Link>
            <Link 
              to="/auctions" 
              className="flex justify-between items-center text-xl font-medium py-2 border-b border-gray-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Auctions <ChevronRight size={18} />
            </Link>
            <Link 
              to="/artists" 
              className="flex justify-between items-center text-xl font-medium py-2 border-b border-gray-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Artists <ChevronRight size={18} />
            </Link>
            <Link 
              to="/about" 
              className="flex justify-between items-center text-xl font-medium py-2 border-b border-gray-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About <ChevronRight size={18} />
            </Link>
            {user ? (
              <>
                <Link 
                  to={getProfileLink()} 
                  className="flex justify-between items-center text-xl font-medium py-2 border-b border-gray-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile <ChevronRight size={18} />
                </Link>
                {user.role.toLowerCase() === 'seller' && (
                  <Link 
                    to="/seller/dashboard" 
                    className="flex justify-between items-center text-xl font-medium py-2 border-b border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Seller Dashboard <ChevronRight size={18} />
                  </Link>
                )}
                {user.role.toLowerCase() === 'admin' && (
                  <Link 
                    to="/admin/dashboard" 
                    className="flex justify-between items-center text-xl font-medium py-2 border-b border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin Dashboard <ChevronRight size={18} />
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="flex justify-between items-center text-xl font-medium py-2 border-b border-gray-200 text-left w-full"
                >
                  Logout <ChevronRight size={18} />
                </button>
              </>
            ) : (
              <div className="flex gap-4 pt-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Log in
                  </Link>
                </Button>
                <Button className="w-full bg-[#AA8F66] hover:bg-[#AA8F66]/90" asChild>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign up
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;