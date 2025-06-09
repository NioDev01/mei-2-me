import { useEffect, useState } from "react";
import axios from "axios";
import { MessageForm, MessageList } from "@/features/message";
import { Toaster, toast } from "sonner";

type Message = {
  id: number;
  conteudo: string;
  criadoEm: string;
};

export function Mensagens() {
  const [mensagens, setMensagens] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const recarregarMensagens = () => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/mensagens`)
      .then((res) => {
        setMensagens(res.data);
      })
      .catch(() => {
        toast.error('Erro ao atualizar mensagens');
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    recarregarMensagens();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-10">
      <Toaster position="top-center" />
      <MessageForm aoEnviar={recarregarMensagens}/>
      <MessageList mensagens={mensagens} loading={loading}/>
    </div>
  );
}
