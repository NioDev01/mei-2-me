import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleTemas } from "./ToggleTemas";
import mei2me from '@/assets/mei2me.png';

export function NavBarMain() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (id: string) => {
    setMenuOpen(false);

    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
                aria-label="Ir para página inicial"
            >
                <img
                className="h-8 w-auto sm:h-10"
                src={mei2me}
                alt="Logo Mei2ME"
                />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleScroll("como-funciona")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Como Funciona
            </button>
            <button
              onClick={() => handleScroll("recursos")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Recursos
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ToggleTemas />

            <Button variant="ghost" size="sm" asChild>
              <Link to={!loading && isAuthenticated ? "/app" : "/login"}>
                <User className="w-4 h-4 mr-1" />
                {!loading && isAuthenticated ? "Minha conta" : "Entrar"}
              </Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border px-6 py-4 space-y-3">
          <button
            onClick={() => handleScroll("recursos")}
            className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2"
          >
            Recursos
          </button>

          <button
            onClick={() => handleScroll("como-funciona")}
            className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2"
          >
            Como Funciona
          </button>

          <div className="pt-2 flex flex-col gap-2">
            <Button variant="outline" asChild>
              <Link
                to={!loading && isAuthenticated ? "/app" : "/login"}
                onClick={() => setMenuOpen(false)}
              >
                {!loading && isAuthenticated ? "Minha conta" : "Entrar"}
              </Link>
            </Button>

            <Button asChild>
              <Link to="/Diagnostico" onClick={() => setMenuOpen(false)}>
                Diagnóstico Gratuito
              </Link>
            </Button>
          </div>

          <div className="pt-2">
            <ToggleTemas />
          </div>
        </div>
      )}
    </header>
  );
}