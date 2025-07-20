import { Moon, Sun } from "lucide-react"; 
import { useState } from 'react';
import { Button } from "@/components/ui/button";

export function ToggleTemas () {
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark', !isDarkMode);
};
    return ( 
        <Button 
            variant={'secondary'} 
            size="icon" 
            className='hover:scale-110 transition-transform duration-300'
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