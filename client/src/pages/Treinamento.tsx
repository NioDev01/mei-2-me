import axios from "axios";
import { toast, Toaster } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const EmailFormSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
});

export function Treinamento() {
    const form = useForm<z.infer<typeof EmailFormSchema>>({
      resolver: zodResolver(EmailFormSchema),
      defaultValues: {
        email: '',
      },
    });

    async function onSubmit(data: z.infer<typeof EmailFormSchema>) {
      await axios.post(`${import.meta.env.VITE_API_URL}/email`, {
        conteudo: data.email,
      })
      .then((response) => {
        toast.success(`Email enviado: ${response.data.conteudo}`);
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        toast.error('Erro ao enviar deu email.');
      });
    }

    return (
    <div className="max-w-xl mx-auto mt-10 space-y-10">
        <Toaster position="top-center" />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='email' placeholder='Digite seu email' {...field} />
                            </FormControl>
                            <FormDescription>
                                Este email será enviado para o servidor.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' variant={"outline"}>Enviar</Button>
            </form>
        </Form>
    </div>
  )
}