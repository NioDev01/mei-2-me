import {zodResolver} from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
// import { useState } from 'react';
import axios from 'axios';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
    mensagem: z.string().min(2, {
        message: 'Sua mensagem deve ter pelo menos 2 caracteres.',
    })
})

type Props = {
    aoEnviar: () => void;
};

export function MessageForm({ aoEnviar}: Props) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            mensagem: '',
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        await axios.post(`${import.meta.env.VITE_API_URL}/mensagens`, {
            conteudo: data.mensagem,
        })
        .then((response) => {
            toast.success(`Mensagem salva: ${response.data.conteudo}`);
            form.reset();
            aoEnviar();
        })
        .catch((error) => {
            console.error(error);
            toast.error('Erro ao enviar mensagem.');
        });

        // toast("Você enviou a seguinte mensagem:", {
        //     description: (
        //         <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        // })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name='mensagem'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mensagem</FormLabel>
                            <FormControl>
                                <Input type='text' placeholder='Digite sua mensagem' {...field} />
                            </FormControl>
                            <FormDescription>
                                Esta mensagem será enviada para o servidor.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Enviar</Button>
            </form>
        </Form>
    );

}

// CONTEÚDO QUE ESTAVA ANTES NA FUNCTION MessageForm, SEM USAR O SHADCN UI, ZOD E REACT-HOOK-FORM
//   const [conteudo, setConteudo] = useState('');
//   const [resposta, setResposta] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/mensagens`,
//         { conteudo }
//       );
//       setResposta(`Mensagem salva: ${response.data.conteudo}`);
//       setConteudo('');
//     } catch (err) {
//       console.error(err);
//       setResposta('Erro ao enviar mensagem.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
//       <input
//         type="text"
//         value={conteudo}
//         onChange={(e) => setConteudo(e.target.value)}
//         placeholder="Digite sua mensagem"
//         className="w-full p-2 border rounded"
//         required
//       />
//       <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
//         Enviar
//       </button>

//       {resposta && <p className="text-center mt-4">{resposta}</p>}
//     </form>
//   );