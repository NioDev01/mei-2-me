import { Moon, Sun } from "lucide-react"; 
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

export function ToggleTemas () {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Checa se existe preferência salva no localStorage
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = storedTheme === "dark";

    setIsDarkMode(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;

    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    
    // Salva a preferência
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  return ( 
    <Button 
      variant="secondary" 
      size="icon" 
      className="hover:scale-110 transition-transform duration-300"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? (
        <Sun className="text-secondary-foreground w-8 h-8" />
      ) : (
        <Moon className="text-secondary-foreground w-8 h-8" />
      )}
    </Button>
  );
}
