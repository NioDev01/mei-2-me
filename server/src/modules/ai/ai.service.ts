import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async ask(
    userId: number,
    message: string,
    context?: any,
  ): Promise<{ text: string }> {
    try {
      const apiKey = this.configService.get<string>('GEMINI_API_KEY');

      if (!apiKey) {
        throw new InternalServerErrorException(
          'GEMINI_API_KEY não configurada',
        );
      }

      // =========================
      // 🔹 Plataforma
      // =========================
      const platformContext = `
        SOBRE A PLATAFORMA MEI2ME:

        O MEI2ME é uma plataforma que auxilia microempreendedores individuais (MEI) no processo de transição para microempresa (ME).

        A plataforma guia o usuário através de uma jornada estruturada, que inclui:
        - desenquadramento do MEI
        - definição da nova empresa
        - elaboração do contrato social
        - registro na junta comercial
        - obtenção de CNPJ
        - licenciamento
        - escolha do regime tributário
        - organização das obrigações fiscais

        Além disso, o sistema oferece:
        - simulador de regime tributário
        - checklist de documentos
        - acompanhamento do progresso da jornada

        Seu papel é ajudar o usuário a entender esse processo e avançar com segurança, sempre com foco no próximo passo.
      `;

      // =========================
      // 🔹 Histórico
      // =========================
      const historyDb = await this.prisma.chatMessage.findMany({
        where: { user_id: userId },
        orderBy: { created_at: 'desc' },
        take: 20,
      });

      const historyText = historyDb
        .slice(0, 6)
        .reverse()
        .map((msg) => {
          const role = msg.role === 'user' ? 'Usuário' : 'ContAI';
          return `${role}: ${msg.content}`;
        })
        .join('\n');

      // =========================
      // 🔹 Contexto
      // =========================
      const steps = context?.jornada?.steps || [];

      const currentStep =
        steps.find((s) => s.status === 'in_progress')?.step ||
        steps.find((s) => s.status === 'available')?.step ||
        'não definido';

      const nextStep =
        steps.find((s) => s.status === 'available')?.step || 'não definido';

      const contextText = `
        MÓDULO: ${context?.module || 'painel'}

        DIAGNÓSTICO:
        - Status: ${context?.diagnostico?.status || 'não informado'}
        - Resumo: ${context?.diagnostico?.resumo || 'não disponível'}
        - Principais motivos: ${
          context?.diagnostico?.principaisMotivos?.length
            ? context.diagnostico.principaisMotivos.join(', ')
            : 'nenhum'
        }

        JORNADA:
        - Progresso: ${context?.jornada?.progress ?? 0}%
        - Etapas (ordem + status):
        ${steps.map((s) => `  - ${s.step}: ${s.status}`).join('\n')}
        - Etapa atual: ${currentStep}
        - Próxima etapa: ${nextStep}

        SIMULADOR:
        - Faturamento: ${context?.simulador?.faturamento_12m ?? 'não informado'}
        - Recomendação: ${context?.simulador?.recomendacao ?? 'não definida'}

        CHECKLIST PENDENTE:
        ${context?.checklist?.length ? context.checklist.join(', ') : 'nenhum'}
      `;

      // =========================
      // 🔹 Instruções por módulo
      // =========================
      const moduleInstructions = {
        jornada: `
        - Oriente o próximo passo da jornada
        - Seja direto e prático
        `,
        simulador: `
        - Explique os resultados financeiros
        - Ajude na decisão entre regimes
        `,
        checklist: `
        - Foque apenas no que falta
        - Seja objetivo
        `,
        default: `
        - Ajude com dúvidas gerais
        `,
      }[context?.module || 'default'];

      // =========================
      // 🔹 Prompt
      // =========================
      const prompt = `
        Você é o ContAI, um assistente especializado na transição de MEI para ME.

        Seu objetivo é orientar o usuário de forma prática, clara e confiável.

        HISTÓRICO:
        ${historyText}

        CONTEXTO:
        ${contextText}

        INTERPRETAÇÃO DA JORNADA:
      - A lista de etapas está em ordem cronológica
      - Cada etapa possui um status: completed, in_progress, available ou locked
      - Sempre respeite essa ordem ao orientar o usuário
      - Nunca sugira etapas fora da sequência
      - Priorize sempre a próxima etapa disponível ou em andamento

        INSTRUÇÕES POR MÓDULO:
        ${moduleInstructions}

        ESTILO DE RESPOSTA:
        - Seja gentil, prestativo e profissional
        - Escreva como um humano explicando para outro humano (sem formalidade excessiva)
        - Seja claro e didático, mas sem alongar desnecessariamente
        - Prefira frases curtas e fáceis de entender
        - Evite jargões técnicos ou termos internos da aplicação

        COMPORTAMENTO:
        - Responda exatamente o que foi perguntado (sem fugir do tema)
        - Use o contexto para personalizar a resposta
        - Não peça informações que já estão no contexto
        - Não repita informações óbvias ou já ditas
        - Se o usuário já concluiu algo, apenas reconheça brevemente

        FOCO:
        - Priorize sempre orientar o próximo passo do usuário
        - Quando fizer sentido, sugira uma ação prática
        - Evite explicações longas se não forem necessárias

        FORMATO:
        - Use no máximo 5 parágrafos curtos
        - Pode usar listas simples quando ajudar na clareza
        - Se a pergunta for simples, responda em 1 ou 2 parágrafos.

        RESTRIÇÕES:
        - Não invente informações
        - Não exponha termos técnicos da aplicação
        - Não se apresente novamente após a primeira interação
        - Não se aprofunde em assuntos que fogem do escopo da sua especialização

        PERGUNTA:
        ${message}
      `;

      // =========================
      // 🔹 Salvar pergunta
      // =========================
      await this.prisma.chatMessage.create({
        data: {
          user_id: userId,
          role: 'user',
          content: message,
        },
      });

      // =========================
      // 🔹 Chamada Gemini
      // =========================
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent',
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': apiKey,
          },
        },
      );

      const text =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        'Não consegui gerar uma resposta.';

      // =========================
      // 🔹 Salvar resposta
      // =========================
      await this.prisma.chatMessage.create({
        data: {
          user_id: userId,
          role: 'bot',
          content: text,
        },
      });

      return { text };
    } catch (error: any) {
      console.error(
        'Erro Gemini:',
        error?.response?.data || error?.message || error,
      );

      throw new InternalServerErrorException(
        'Erro ao processar resposta da IA',
      );
    }
  }

  async getHistory(userId: number) {
    const messages = await this.prisma.chatMessage.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      take: 50,
    });

    return messages.reverse();
  }
}
