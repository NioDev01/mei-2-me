import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, Moon } from "lucide-react"; // Adicionei o ícone Moon
import mei2mew from '@/assets/mei2mew.png';

export function NavBarMain() {
    return (
        <div>
            <nav className="fixed z-50 top-0 left-0 flex justify-between items-center space-x-4 mb-6 bg-sidebar-primary w-full h-1/10">
                <Link to="/"><img className='mx-8 h-1/3 w-1/3' src={mei2mew} alt='Logo'></img></Link>
                <Link to="/mensagens" className="text-background hover:underline">Mensagens</Link>
                <div className="flex items-center gap-2 mx-8"> {/* Container para os dois botões */}
                    <Button variant={'secondary'} className='hover:scale-110 transition-transform duration-300' asChild>
                        <Link to="/login"><User className="text-secondary-foreground w-8 h-8"/>Login</Link>
                    </Button>
                    <Button variant={'secondary'} size="icon" className='hover:scale-110 transition-transform duration-300'>
                        <Moon className="text-secondary-foreground w-8 h-8" />
                    </Button>
                </div>
            </nav>
        </div>
    );
}