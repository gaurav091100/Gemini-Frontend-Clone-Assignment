import { useTheme } from "@/hooks/useTheme";
import { LogOut, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
  return (
    <div className="flex items-center gap-4 fixed top-4 right-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="bg-background/80 backdrop-blur-sm border-border hover:bg-accent"
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={logout}
        className="bg-background/80 backdrop-blur-sm border-border hover:bg-accent"
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Header;
