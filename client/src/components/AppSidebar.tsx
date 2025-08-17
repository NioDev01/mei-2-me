import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { PanelsLeftBottom, Route, Calculator, ListChecks } from "lucide-react"

import { useEffect, useState } from "react"

// Módulos
const items = [
  { title: "Painel MEI", icon: PanelsLeftBottom, hash: "painel" },
  { title: "Checklist de Documentos", icon: ListChecks, hash: "checklist" },
  { title: "Jornada", icon: Route, hash: "jornada" },
  { title: "Simulador de Regime", icon: Calculator, hash: "simulador" },
]

export function AppSidebar() {
  const [activeHash, setActiveHash] = useState("painel")

  // Atualiza estado sempre que o hash mudar
  useEffect(() => {
    const updateHash = () => {
      const hash = window.location.hash.replace("#", "") || "painel"
      setActiveHash(hash)
    }

    updateHash() // executa na primeira carga
    window.addEventListener("hashchange", updateHash)
    return () => window.removeEventListener("hashchange", updateHash)
  }, [])

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 p-4">
          <Avatar>
            <AvatarImage src="mei2me.png" alt="Logo MEI2ME" />
            <AvatarFallback>M2</AvatarFallback>
          </Avatar>
          <p className="text-lg font-semibold pl-2">MEI2ME</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = activeHash === item.hash
                return (
                  <SidebarMenuItem key={item.hash}>
                    <SidebarMenuButton asChild>
                      <a
                        href={`#${item.hash}`}
                        className={`flex items-center w-full rounded-md px-2 py-1.5 transition-colors
                          ${isActive 
                            ? "bg-accent text-accent-foreground" 
                            : "hover:bg-muted"
                          }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="ml-2">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        © {new Date().getFullYear()} MEI2ME
      </SidebarFooter>
    </Sidebar>
  )
}
