import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Sparkles, LogOut } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/80 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">PromptBoards</span>
        </Link>

        <div className="flex items-center gap-6">
          <SearchBar variant="navbar" />
          <Link
            to="/"
            className="text-foreground hover:text-primary transition-colors font-medium hidden md:block"
          >
            Home
          </Link>
          <Link
            to="/boards"
            className="text-foreground hover:text-primary transition-colors font-medium hidden md:block"
          >
            Boards
          </Link>
          {user ? (
            <>
              <Link
                to="/my-boards"
                className="text-foreground hover:text-primary transition-colors font-medium hidden md:block"
              >
                My Boards
              </Link>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link to="/signin">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
