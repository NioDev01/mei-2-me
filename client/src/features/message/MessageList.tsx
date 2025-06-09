// import { useEffect, useState } from 'react';
// import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type Message = {
  id: number;
  conteudo: string;
  criadoEm: string;
};

type Props = {
  mensagens: Message[];
  loading: boolean;
};

export function MessageList({ mensagens, loading }: Props) {
    if (loading) {
      return (
        <div className='space-y-4'>
            <Skeleton className='h-12 w-full'/>
            <Skeleton className='h-12 w-full'/>
        </div>
      )
    }

    if (mensagens.length === 0) {
      return <p className='text-sm text-muted-foreground'>Nenhuma mensagem encontrada.</p>;
    }

    return (
        <div className='space-y-4'>
            {mensagens.map((msg) => (
                <Card key={msg.id} className='p-4 shadow-sm'>
                  <p className='text-sm'>{msg.conteudo}</p>
                  <p className='text-xs text-muted-foreground mt-1'>{new Date(msg.criadoEm).toLocaleString()}</p>
                </Card>
            ))}
        </div>
    );
}




