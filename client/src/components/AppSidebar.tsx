import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  PanelsLeftBottom,
  Route,
  Calculator,
  ListChecks,
  BotMessageSquare,
  User,
  LogOut,
} from "lucide-react";

import { useEffect, useState, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ContAIChat } from "@/components/ContAIChat";

const items = [
  { title: "Painel MEI", icon: PanelsLeftBottom, hash: "painel" },
  { title: "Checklist de Documentos", icon: ListChecks, hash: "checklist" },
  { title: "Jornada", icon: Route, hash: "jornada" },
  { title: "Simulador de Regime", icon: Calculator, hash: "simulador" },
];

/**
 * Reseta os locks de estilo que o Radix UI aplica no document.body ao abrir
 * overlays (DropdownMenu, Sheet, Dialog). Se a rota mudar enquanto algum
 * desses componentes ainda não terminou de fechar, o cleanup do Radix não
 * é executado e o body fica com pointer-events: none / overflow: hidden
 * indefinidamente — bloqueando todos os cliques em qualquer breakpoint.
 */
function resetRadixBodyLocks() {
  document.body.style.pointerEvents = "";
  document.body.style.overflow = "";
}

function SidebarInner({
  activeHash,
  iniciais,
  userName,
  onOpenChat,
  onLogout,
  onNavigateConta,
}: {
  activeHash: string;
  iniciais: string;
  userName: string;
  onOpenChat: () => void;
  onLogout: () => void;
  onNavigateConta: () => void;
}) {
  const { setOpenMobile } = useSidebar();

  const handleOpenChat = () => {
    setOpenMobile(false);
    onOpenChat();
  };

  const handleNavClick = () => {
    setOpenMobile(false);
  };

  // Fecha o sidebar e aguarda 300ms (duração padrão de animação do Radix)
  // antes de navegar. Sem esse delay, o DropdownMenu e/ou o Sheet do Sidebar
  // não terminam o ciclo de fechamento, e o Radix deixa pointer-events: none
  // no document.body sem fazer o cleanup.
  const handleNavigateConta = () => {
    setOpenMobile(false);
    setTimeout(() => onNavigateConta(), 300);
  };

  return (
    <Sidebar variant='sidebar'>
      <SidebarHeader>
        <div className='flex items-center space-x-2 p-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className='cursor-pointer border border-gray-400/50'>
                <AvatarFallback className='text-sm'>{iniciais}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='start'>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleNavigateConta}>
                  <User />
                  Dados da Conta
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <p className='text-lg font-semibold pl-2'>{userName}</p>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = activeHash === item.hash;
                return (
                  <SidebarMenuItem key={item.hash}>
                    <SidebarMenuButton asChild>
                      <a
                        href={`#${item.hash}`}
                        onClick={handleNavClick}
                        className={`flex items-center w-full rounded-md px-2 py-1.5 transition-colors
                          ${
                            isActive
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-muted"
                          }`}
                      >
                        <item.icon className='h-5 w-5' />
                        <span className='ml-2'>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <div className='flex items-center'>
          <Button onClick={handleOpenChat}>
            <BotMessageSquare />
            ContAI
          </Button>
        </div>
        © {new Date().getFullYear()} MEI2ME
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppSidebar() {
  const [activeHash, setActiveHash] = useState("painel");
  const [openChat, setOpenChat] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const { setOpenMobile } = useSidebar();

  // Ao mudar de rota (incluindo botão voltar/avançar do browser),
  // força o fechamento do sidebar e reseta os locks do Radix no body.
  useEffect(() => {
    setOpenMobile(false);
    resetRadixBodyLocks();
  }, [location.pathname]);

  // Garante o cleanup mesmo se o componente desmontar de forma abrupta
  // (ex: logout, erro, suspense boundary).
  useEffect(() => {
    return () => {
      resetRadixBodyLocks();
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleNavigateConta = () => navigate("/conta");

  const userName = user?.nome
    ? (() => {
        const partes = user.nome.trim().split(" ");
        const primeiro = partes[0];
        const ultimo = partes[partes.length - 1];
        return `${primeiro} ${ultimo}`;
      })()
    : "MEI2ME";

  const iniciais =
    user?.nome
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("") ?? "?";

  useEffect(() => {
    const updateHash = () => {
      const hash = window.location.hash.replace("#", "") || "painel";
      setActiveHash(hash);
    };
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return (
    <Fragment>
      <SidebarInner
        activeHash={activeHash}
        iniciais={iniciais}
        userName={userName}
        onOpenChat={() => setOpenChat(true)}
        onLogout={handleLogout}
        onNavigateConta={handleNavigateConta}
      />
      {openChat && <ContAIChat onClose={() => setOpenChat(false)} />}
    </Fragment>
  );
}