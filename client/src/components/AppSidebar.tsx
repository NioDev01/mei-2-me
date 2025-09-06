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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  Send,
} from "lucide-react"

import { useEffect, useState } from "react"

// Módulos
const items = [
  { title: "Painel MEI", icon: PanelsLeftBottom, hash: "painel" },
  { title: "Checklist de Documentos", icon: ListChecks, hash: "checklist" },
  { title: "Jornada", icon: Route, hash: "jornada" },
  { title: "Simulador de Regime", icon: Calculator, hash: "simulador" },
]

// Tipo para mensagens do chat
interface ChatMessage {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export function AppSidebar() {
  const [activeHash, setActiveHash] = useState("painel")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Olá! Sou o ContAI, seu assistente virtual para questões sobre MEI. Como posso ajudá-lo hoje?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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

  // Função para enviar mensagem
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      isUser: true,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setNewMessage("")

    // Simular resposta do bot após um delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(newMessage),
        isUser: false,
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  // Função para gerar respostas do bot baseadas na pergunta
  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes("mei") || message.includes("microempreendedor")) {
      return "O MEI (Microempreendedor Individual) é uma categoria empresarial criada para formalizar pequenos negócios. Para se tornar MEI, você precisa ter faturamento anual de até R$ 81.000 e não pode ter participação em outras empresas."
    }
    
    if (message.includes("documento") || message.includes("documentação")) {
      return "Para se formalizar como MEI, você precisa de: CPF, RG, comprovante de residência e definir a atividade econômica. O processo é gratuito e pode ser feito pelo Portal do Empreendedor."
    }
    
    if (message.includes("imposto") || message.includes("taxa") || message.includes("pagamento")) {
      return "O MEI paga uma taxa mensal fixa através do DAS (Documento de Arrecadação do Simples Nacional). Os valores variam conforme a atividade: R$ 66,60 para comércio/indústria, R$ 70,60 para serviços, e R$ 71,60 para comércio e serviços."
    }
    
    if (message.includes("cnpj")) {
      return "Sim! Ao se formalizar como MEI, você recebe automaticamente um CNPJ, que permite emitir notas fiscais, abrir conta bancária empresarial e participar de licitações públicas."
    }
    
    if (message.includes("benefício") || message.includes("vantagem")) {
      return "Os principais benefícios do MEI incluem: CNPJ gratuito, acesso a benefícios previdenciários, possibilidade de contratar um funcionário, participação em licitações e facilidade para obter crédito."
    }
    
    return "Obrigado pela sua pergunta! Estou aqui para ajudar com questões sobre MEI. Você pode perguntar sobre formalização, documentos necessários, impostos, benefícios ou qualquer outra dúvida relacionada ao Microempreendedor Individual."
  }

  // Função para lidar com Enter no input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <BotMessageSquare className="mr-2 h-4 w-4" />
                ContAI
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <BotMessageSquare className="h-5 w-5" />
                  ContAI - Assistente Virtual
                </DialogTitle>
                <DialogDescription>
                  Tire suas dúvidas sobre MEI com nosso assistente inteligente
                </DialogDescription>
              </DialogHeader>
              
              {/* Área de mensagens */}
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 ${
                          message.isUser
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input de mensagem */}
              <div className="flex gap-2 pt-4 border-t">
                <Input
                  placeholder="Digite sua pergunta sobre MEI..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          © {new Date().getFullYear()} MEI2ME
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}

