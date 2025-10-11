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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { 
  PanelsLeftBottom, 
  Route, 
  Calculator, 
  ListChecks, 
  BotMessageSquare,
  User,
  Settings,
  LogOut,
} from "lucide-react"

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
    <Sidebar variant="sidebar">
      <SidebarHeader>
        <div className="flex items-center space-x-2 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="mei2me.png" alt="Logo MEI2ME" />
                <AvatarFallback>M2</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem><User/>Dados da Conta</DropdownMenuItem>
                <DropdownMenuItem><Settings/>Configurações</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem><LogOut/>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="text-lg font-semibold pl-2">MEI2ME</p>
        </div>
      </SidebarHeader>
      <Separator />
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
      <Separator />
      <SidebarFooter>
        <div className="flex items-center">
          <Button><BotMessageSquare/>ContAI</Button>
        </div>
        © {new Date().getFullYear()} MEI2ME
      </SidebarFooter>
    </Sidebar>
  )
}
