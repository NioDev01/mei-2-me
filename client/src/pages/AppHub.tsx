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
      case "painel": return [<Painel />, "Painel MEI"];
      case "jornada": return [<Jornada />, "Jornada"];
      case "simulador": return [<Simulador />, "Simulador de Regime"];
      case "checklist": return [<Checklist />, "Checklist de Documentos"];
      default: return [<Painel />, "Painel MEI"];
    }
  };

  const moduloInfos = renderModulo();

  return (
    <SidebarProvider>
      {/* Sidebar agora usa hash */}
      <AppSidebar />
      <main className="w-full p-4">
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
                <p className="select-none">|</p>
              <h1 className="text-1xl font-bold pl-2">{moduloInfos[1]}</h1>
            </div>
            <div className="flex items-center gap-4">
                <Link to="/" className="h-8 w-8 hover:scale-110 transition-transform duration-300"><img className='h-full w-full' src='/public/mei2me.svg' alt='Logo'></img></Link>
                <ToggleTemas />
            </div>
        </div>
        {moduloInfos[0]}
      </main>
      {/* Trigger do ShadCN segue funcionando no mobile */}
    </SidebarProvider>
  )
}
