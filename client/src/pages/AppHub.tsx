import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ToggleTemas } from "@/features/ToggleTemas"

import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';

import { Painel } from "@/pages/modules/Painel"
import { Jornada } from "@/pages/modules/Jornada"
import { Simulador } from "@/pages/modules/Simulador"
import { Checklist } from "@/pages/modules/Checklist"

export function AppHub() {
  const [moduloAtivo, setModuloAtivo] = useState("painel");

  // Sempre que o hash mudar, atualizar o estado
  useEffect(() => {
    const updateModuloFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setModuloAtivo(hash);
      } else {
        setModuloAtivo("painel"); // fallback
      }
    };

    // Rodar na primeira carga
    updateModuloFromHash();

    // Escutar mudanças de hash
    window.addEventListener("hashchange", updateModuloFromHash);
    return () => window.removeEventListener("hashchange", updateModuloFromHash);
  }, []);

  const renderModulo = () => {
    switch (moduloAtivo) {
      case "painel": return <Painel />;
      case "jornada": return <Jornada />;
      case "simulador": return <Simulador />;
      case "checklist": return <Checklist />;
      default: return <Painel />;
    }
  };

  return (
    <SidebarProvider>
      {/* Sidebar agora usa hash */}
      <AppSidebar />
      <main className="w-full p-4">
        <div className="flex justify-between items-center mb-4">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
                <Link to="/" className="h-8 w-8 hover:scale-110 transition-transform duration-300"><img className='h-full w-full' src='mei2me.png' alt='Logo'></img></Link>
                <ToggleTemas />
            </div>
        </div>
        {renderModulo()}
      </main>
      {/* Trigger do ShadCN segue funcionando no mobile */}
    </SidebarProvider>
  )
}
