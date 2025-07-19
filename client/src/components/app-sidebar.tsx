import { CircleUserRound, PanelsLeftBottom, FileText, Route, CircleDollarSign } from "lucide-react"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Painel MEI",
    url: "#",
    icon: PanelsLeftBottom,
  },
  {
    title: "Documentos",
    url: "#",
    icon: FileText,
  },
  {
    title: "Jornada",
    url: "#",
    icon: Route,
  },
  {
    title: "Simulador de Regime",
    url: "#",
    icon: CircleDollarSign,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <CircleUserRound className="!size-5" />
                <span className="text-base font-semibold">Casa Norte e Sul</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}