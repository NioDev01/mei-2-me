import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleTemas} from './ToggleTemas';
import mei2mew from '@/assets/mei2mew.png';
import { ToggleTemas} from './ToggleTemas';

export function NavBarMain() {
    
    return (
        <nav 
            className="fixed top-0 left-0 right-0 z-50 bg-sidebar-primary border-b border-border/40 backdrop-blur-sm"
            role="navigation"
            aria-label="Navegação principal"
        >

            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link 
                            to="/" 
                            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
                            aria-label="Ir para página inicial"
                        >
                            <img 
                                className="h-8 w-auto sm:h-10" 
                                src={mei2mew} 
                                alt="Logo Mei2Mew"
                            />
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <ToggleTemas />
                        <Button 
                            variant="secondary" 
                            className="hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md" 
                            asChild
                        >
                            <Link 
                                to="/login" 
                                className="flex items-center space-x-2"
                                aria-label="Fazer login"
                            >
                                <User className="w-4 h-4" />
                                <span className="hidden sm:inline">Login</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

