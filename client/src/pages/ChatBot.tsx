import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button.jsx'
import { NavBarMain } from '@/features/NavBarMain.jsx'
import { Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react'



// Schema de validação com Zod
const messageSchema = z.object({
  message: z
    .string()
    .min(1, 'A mensagem não pode estar vazia')
    .max(500, 'A mensagem deve ter no máximo 500 caracteres')
    .trim()
})

export function ChatBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Olá! Eu sou seu assistente virtual. Como posso ajudá-lo hoje?',
      timestamp: new Date().toLocaleTimeString()
    }
  ])

  // Configuração do React Hook Form com Zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: ''
    }
  })

  const onSubmit = async (data) => {
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: data.message,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, newMessage])
    reset() // Limpa o formulário

    // Simular resposta do bot após 1 segundo
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: 'Obrigado pela sua mensagem! Esta é uma interface de demonstração com validação Zod e React Hook Form.',
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const handleQuickAction = (text) => {
    const quickMessage = {
      id: messages.length + 1,
      type: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, quickMessage])

    // Resposta automática para ações rápidas
    setTimeout(() => {
      let response = ''
      switch (text) {
        case 'Como você funciona?':
          response = 'Eu sou uma interface de demonstração criada com React, Tailwind CSS, Zod para validação e React Hook Form para gerenciamento de formulários!'
          break
        case 'Preciso de ajuda':
          response = 'Claro! Esta é uma interface de chatbot moderna com validação de formulários. Você pode digitar mensagens de até 500 caracteres.'
          break
        case 'Configurações':
          response = 'As configurações incluem validação automática de mensagens, limite de caracteres e interface responsiva!'
          break
        default:
          response = 'Obrigado pela sua interação!'
      }

      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: response,
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
        <NavBarMain />
      <div className="w-full max-w-4xl h-[600px] rounded-2xl shadow-2xl border border-gray-300 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="border-b border-gray-300 p-6 flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 " />
          </div>
          <div>
            <h1 className="text-xl font-semibold ">Assistente Virtual</h1>
            <p className=" text-sm "><span className="text-green-400">Online agora </span>• Validação ativa</p>
          </div>
          <div className="ml-auto">
            <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              {message.type === 'bot' && (
                <div className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 " />
                </div>
              )}
              
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl transition-all duration-300 hover:shadow-md border-2 ${
                message.type === 'user' 
                  ? 'border-gray-400  rounded-br-sm' 
                  : 'border-gray-300  rounded-bl-sm shadow-sm'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs mt-2 ">
                  {message.timestamp}
                </p>
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-300">
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
            <div className="flex-1 relative">
              <input
                {...register('message')}
                type="text"
                placeholder="Digite sua mensagem (máx. 500 caracteres)..."
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 placeholder-muted-foreground ${
                  errors.message 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-gray-500 focus:border-gray-500'
                }`}
                disabled={isSubmitting}
              />
              {errors.message && (
                <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  {errors.message.message}
                </div>
              )}
            </div>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 border-2 border-gray-400  rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:border-gray-600"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </form>
          
          {/* Quick Actions */}
          <div className="flex gap-2 mt-6">
            <button 
              onClick={() => handleQuickAction('Como você funciona?')}
              className="px-3 py-1 text-xs border border-gray-300 hover:border-gray-400  rounded-full transition-colors duration-200 hover:scale-105 transform"
            >
              Como você funciona?
            </button>
            <button 
              onClick={() => handleQuickAction('Preciso de ajuda')}
              className="px-3 py-1 text-xs border border-gray-300 hover:border-gray-400  rounded-full transition-colors duration-200 hover:scale-105 transform"
            >
              Preciso de ajuda
            </button>
            <button 
              onClick={() => handleQuickAction('Configurações')}
              className="px-3 py-1 text-xs border border-gray-300 hover:border-gray-400  rounded-full transition-colors duration-200 hover:scale-105 transform"
            >
              Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

