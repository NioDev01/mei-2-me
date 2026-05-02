import { useState, useEffect, useRef } from "react"
import { sendMessageToAI, getAIHistory } from "@/services/ai.service"
import { getJornadaSummary } from "@/services/jornada.service"
import { getSimulador } from "@/services/simulador.service"
import { getChecklistDocumentos } from "@/services/checklist.service"
import { getDiagnostico } from "@/services/diagnostico.service"
import { getEmpresaTransicao } from "@/services/ato-constitutivo.service"
import { useAuth } from "@/context/AuthContext"
import { useIsMobile } from "@/hooks/use-mobile"
import { createPortal } from "react-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Bot, User, Volume1, Square } from "lucide-react"

type Message = {
  role: "user" | "bot"
  content: string
  timestamp?: number
}

type Position = "bottom-right" | "bottom-left" | "top-right" | "top-left"

function getCurrentModule() {
  const hash = window.location.hash.replace("#", "")
  return hash || "painel"
}

function formatTime(ts?: number) {
  if (!ts) return ""
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

const quickSuggestions: Record<string, string[]> = {
  painel: ["O que é MEI?", "Vale a pena virar ME?"],
  jornada: ["Qual meu próximo passo?", "O que fazer agora?"],
  simulador: ["Qual regime é melhor?", "Explique o resultado"],
  checklist: ["O que falta?", "Quais documentos são obrigatórios?"],
}

export function ContAIChat({ onClose }: { onClose: () => void }) {
  const { user } = useAuth()
  const isMobile = useIsMobile()

  const [messages, setMessages] = useState<Message[]>([])
  const [position, setPosition] = useState<Position>("bottom-right")
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const positionClasses: Record<Position, string> = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  }

  const cyclePosition = () => {
    const order: Position[] = ["bottom-right", "bottom-left", "top-left", "top-right"]
    setPosition((prev) => order[(order.indexOf(prev) + 1) % order.length])
  }

  useEffect(() => {
    const el = scrollContainerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, loading])

  // Lock body scroll on mobile while chat is open
  useEffect(() => {
    if (!isMobile) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [isMobile])

  // =========================
  // HISTÓRICO
  // =========================
  useEffect(() => {
    async function loadHistory() {
      try {
        const history = await getAIHistory()
        setMessages(history.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
          timestamp: new Date(msg.created_at).getTime(),
        })))
      } catch (err) {
        console.error("Erro ao carregar histórico:", err)
      } finally {
        setInitialLoading(false)
      }
    }
    loadHistory()
  }, [])

  // =========================
  // CONTEXTO
  // =========================
  async function fetchContext() {
    try {
      const jornada = await getJornadaSummary()
      const simulador = await getSimulador()
      const checklist = await getChecklistDocumentos()

      let diagnostico = null
      if (user?.cnpj) {
        try {
          const raw = await getDiagnostico(user.cnpj)
          diagnostico = {
            status: raw?.status || null,
            resumo: raw?.analise || null,
            principaisMotivos: raw?.motivos?.slice(0, 3).map((m: any) => m.regra) || [],
          }
        } catch { diagnostico = null }
      }

      let atoConstitutivo = null
      try {
        const raw = await getEmpresaTransicao()
        if (raw) {
          const ltdaData = raw.ltdaData
          const eiData = raw.eiData
          atoConstitutivo = {
            naturezaJuridica: raw.naturezaJuridica || null,
            capitalSocial: ltdaData?.capitalSocial ?? eiData?.capitalSocial ?? null,
            titular: ltdaData?.titular || null,
            socios: ltdaData?.socios || [],
          }
        }
      } catch { atoConstitutivo = null }

      return { jornada, simulador, checklist, diagnostico, atoConstitutivo }
    } catch { return null }
  }

  function buildContext(raw: any) {
    if (!raw) return undefined
    return {
      module: getCurrentModule(),
      jornada: { steps: raw.jornada?.steps || [], progress: raw.jornada?.progress },
      simulador: raw.simulador
        ? { faturamento_12m: raw.simulador.faturamento_12m, recomendacao: raw.simulador.recomendacao }
        : undefined,
      checklist: raw.checklist
        ? Object.entries(raw.checklist).filter(([_, v]) => v === false).map(([k]) => k)
        : [],
      diagnostico: raw.diagnostico || undefined,
      atoConstitutivo: raw.atoConstitutivo || undefined,
    }
  }

  // =========================
  // VOZ
  // =========================
  function speak(text: string) {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "pt-BR"
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    speechSynthesis.speak(utterance)
  }

  // =========================
  // ENVIO
  // =========================
  const sendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || input
    if (!messageToSend.trim() || loading) return

    setMessages((prev) => [...prev, { role: "user", content: messageToSend, timestamp: Date.now() }])
    setInput("")
    setLoading(true)
    if (isMobile) inputRef.current?.blur()

    try {
      const freshContext = await fetchContext()
      const response = await sendMessageToAI(messageToSend, buildContext(freshContext))
      setMessages((prev) => [...prev, { role: "bot", content: response.text, timestamp: Date.now() }])
    } catch {
      setMessages((prev) => [...prev, { role: "bot", content: "Erro ao conectar com o ContAI.", timestamp: Date.now() }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); sendMessage() }
  }

  // =========================
  // UI
  // =========================
  const containerClass = isMobile
    ? "fixed inset-0 bg-background z-[9999] flex flex-col"
    : `fixed ${positionClasses[position]} w-[380px] h-[560px] bg-background border rounded-2xl shadow-2xl z-[9999] flex flex-col`

  const chatUI = (
    <div className={containerClass}>
      {/* HEADER */}
      <div className="flex justify-between items-center p-3 border-b bg-muted flex-shrink-0">
        <span className="font-semibold text-sm flex items-center gap-2">
          <Bot size={16} /> ContAI
        </span>
        <div className="flex gap-2 items-center">
          {!isMobile && (
            <button onClick={cyclePosition} className="text-xs px-2 py-1 rounded hover:bg-background">
              Mover
            </button>
          )}
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded hover:bg-background text-lg">
            ✕
          </button>
        </div>
      </div>

      {/* MENSAGENS */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-3 space-y-4 text-sm"
        style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
      >
        {initialLoading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : messages.length === 0 ? (
          <>
            <p className="text-muted-foreground">Comece uma conversa com o ContAI 👋</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {(quickSuggestions[getCurrentModule()] || []).map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)} className="px-3 py-1 text-xs border rounded-full hover:bg-muted active:bg-muted">
                  {s}
                </button>
              ))}
            </div>
          </>
        ) : (
          messages.map((msg, index) => {
            const isUser = msg.role === "user"
            return (
              <div key={index} className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
                {!isUser && (
                  <div className="bg-muted p-2 rounded-full flex-shrink-0"><Bot size={16} /></div>
                )}
                <div className={`max-w-[75%] px-3 py-2 rounded-2xl ${isUser ? "bg-primary text-white" : "bg-muted text-foreground"}`}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                  {!isUser && (
                    <button onClick={() => speak(msg.content)} className="text-[10px] mt-1 opacity-70 flex items-center gap-1">
                      {isSpeaking ? <Square size={14} /> : <Volume1 size={14} />}
                      {isSpeaking ? "Parar" : "Ouvir"}
                    </button>
                  )}
                  <div className="text-[10px] opacity-60 mt-1">{formatTime(msg.timestamp)}</div>
                </div>
                {isUser && (
                  <div className="bg-primary text-white p-2 rounded-full flex-shrink-0"><User size={16} /></div>
                )}
              </div>
            )
          })
        )}

        {loading && (
          <div className="flex items-center gap-2">
            <div className="bg-muted p-2 rounded-full"><Bot size={16} /></div>
            <div className="bg-muted px-3 py-2 rounded-2xl flex gap-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </div>
          </div>
        )}
      </div>

      {/* INPUT */}
      <div
        className="p-2 border-t flex gap-2 flex-shrink-0 bg-background"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <input
          ref={inputRef}
          className="flex-1 border rounded-md px-3 py-2 text-sm bg-background"
          style={{ fontSize: "16px" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pergunte ao ContAI..."
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading}
          className="bg-primary text-white px-4 rounded-md disabled:opacity-50 active:opacity-80"
        >
          Enviar
        </button>
      </div>
    </div>
  )

  return createPortal(chatUI, document.body)
}