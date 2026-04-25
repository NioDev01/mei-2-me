import { useState, useEffect, useRef } from "react"
import { sendMessageToAI, getAIHistory } from "@/services/ai.service"
import { getJornadaSummary } from "@/services/jornada.service"
import { getSimulador } from "@/services/simulador.service"
import { getChecklistDocumentos } from "@/services/checklist.service"
import { createPortal } from "react-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Bot, User } from "lucide-react"

type Message = {
  role: "user" | "bot" | "system"
  content: string
  timestamp?: number
}

type Position =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left"

function getCurrentModule() {
  const hash = window.location.hash.replace("#", "")
  return hash || "painel"
}

function formatTime(ts?: number) {
  if (!ts) return ""
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function ContAIChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [position, setPosition] = useState<Position>("bottom-right")
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  const bottomRef = useRef<HTMLDivElement>(null)

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  }

  const cyclePosition = () => {
    const order: Position[] = [
      "bottom-right",
      "bottom-left",
      "top-left",
      "top-right",
    ]
    const index = order.indexOf(position)
    setPosition(order[(index + 1) % order.length])
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  // =========================
  // HISTÓRICO
  // =========================

  useEffect(() => {
    async function loadHistory() {
      try {
        const history = await getAIHistory()

        const formatted = history.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
          timestamp: new Date(msg.created_at).getTime(),
        }))

        setMessages(formatted)
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

      return { jornada, simulador, checklist }
    } catch {
      return null
    }
  }

  function buildContext(raw: any) {
    if (!raw) return undefined

    return {
      module: getCurrentModule(),
      jornada: {
        steps: raw.jornada?.steps || [],
        progress: raw.jornada?.progress,
      },
      simulador: raw.simulador
        ? {
            faturamento_12m: raw.simulador.faturamento_12m,
            recomendacao: raw.simulador.recomendacao,
          }
        : undefined,
      checklist: raw.checklist
        ? Object.entries(raw.checklist)
            .filter(([_, v]) => v === false)
            .map(([k]) => k)
        : [],
    }
  }

  // =========================
  // ENVIO
  // =========================

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const now = Date.now()

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: now,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const freshContext = await fetchContext()

      const response = await sendMessageToAI(
        input,
        buildContext(freshContext)
      )

      const botMessage: Message = {
        role: "bot",
        content: response,
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Erro ao conectar com o ContAI.",
          timestamp: Date.now(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      sendMessage()
    }
  }

  // =========================
  // UI
  // =========================

  const chatUI = (
    <div
      className={`fixed ${positionClasses[position]} w-[380px] h-[560px] bg-background border rounded-2xl shadow-2xl z-[9999] flex flex-col`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center p-3 border-b bg-muted">
        <span className="font-semibold text-sm flex items-center gap-2">
          <Bot size={16} /> ContAI
        </span>

        <div className="flex gap-2">
          <button onClick={cyclePosition} className="text-xs">Mover</button>
          <button onClick={onClose}>✕</button>
        </div>
      </div>

      {/* MENSAGENS */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 text-sm">
        {initialLoading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : messages.length === 0 ? (
          <p className="text-muted-foreground">
            Comece uma conversa com o ContAI 👋
          </p>
        ) : (
          messages.map((msg, index) => {
            const isUser = msg.role === "user"

            return (
              <div
                key={index}
                className={`flex items-end gap-2 animate-in fade-in slide-in-from-bottom-2 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <div className="bg-muted p-2 rounded-full">
                    <Bot size={16} />
                  </div>
                )}

                <div
                  className={`max-w-[75%] px-3 py-2 rounded-2xl ${
                    isUser
                      ? "bg-primary text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>

                  <div className="text-[10px] opacity-60 mt-1">
                    {formatTime(msg.timestamp)}
                  </div>
                </div>

                {isUser && (
                  <div className="bg-primary text-white p-2 rounded-full">
                    <User size={16} />
                  </div>
                )}
              </div>
            )
          })
        )}

        {loading && (
          <div className="flex items-center gap-2">
            <div className="bg-muted p-2 rounded-full">
              <Bot size={16} />
            </div>
            <div className="bg-muted px-3 py-2 rounded-2xl flex gap-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="p-2 border-t flex gap-2">
        <input
          className="flex-1 border rounded-md px-3 py-2 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pergunte ao ContAI..."
        />

        <button
          onClick={sendMessage}
          className="bg-primary text-white px-4 rounded-md"
        >
          Enviar
        </button>
      </div>
    </div>
  )

  return createPortal(chatUI, document.body)
}