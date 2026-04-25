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

  async ask(userId: number, message: string, context?: any): Promise<string> {
    try {
      const apiKey = this.configService.get<string>('GEMINI_API_KEY');

      if (!apiKey) {
        throw new InternalServerErrorException(
          'GEMINI_API_KEY não configurada',
        );
      }

      // =========================
      // 🔹 Buscar histórico
      // =========================
      const historyDb = await this.prisma.chatMessage.findMany({
        where: { user_id: userId },
        orderBy: { created_at: 'asc' },
        take: 20,
      });

      const historyText = historyDb
        .slice(-6)
        .map((msg) => {
          const role = msg.role === 'user' ? 'Usuário' : 'ContAI';
          return `${role}: ${msg.content}`;
        })
        .join('\n');

      // =========================
      // 🔹 Jornada
      // =========================
      const steps = context?.jornada?.steps || [];

      const currentStep =
        steps.find((s) => s.status === 'in_progress')?.step ||
        steps.find((s) => s.status === 'available')?.step ||
        'não definido';

      const completedSteps = steps
        .filter((s) => s.status === 'completed')
        .map((s) => s.step);

      const nextStep =
        steps.find((s) => s.status === 'available')?.step || 'não definido';

      const contextText = `
        MÓDULO: ${context?.module || 'painel'}

        JORNADA:
        - Progresso: ${context?.jornada?.progress || 0}%
        - Etapa atual: ${currentStep}
        - Próxima etapa: ${nextStep}
        - Etapas concluídas: ${completedSteps.join(', ') || 'nenhuma'}

        SIMULADOR:
        - Faturamento: ${context?.simulador?.faturamento_12m || 'não informado'}
        - Recomendação: ${context?.simulador?.recomendacao || 'não definida'}

        CHECKLIST PENDENTE:
        ${(context?.checklist || []).join(', ') || 'nenhum'}
      `;

      // =========================
      // 🔹 Instruções por módulo
      // =========================
      let moduleInstructions = '';

      switch (context?.module) {
        case 'jornada':
          moduleInstructions = `
            - Oriente o próximo passo da jornada
            - Seja direto e prático
          `;
          break;

        case 'simulador':
          moduleInstructions = `
            - Explique os resultados financeiros
            - Ajude na decisão entre regimes
          `;
          break;

        case 'checklist':
          moduleInstructions = `
            - Foque apenas no que falta
            - Não liste documentos já concluídos
            - Seja objetivo
          `;
          break;

        default:
          moduleInstructions = `
            - Ajude com dúvidas gerais
            - Dê visão geral quando necessário
          `;
      }

      // =========================
      // 🔹 Prompt
      // =========================
      const prompt = `
        Você é o ContAI, um assistente especializado na transição de MEI para ME.

        HISTÓRICO:
        ${historyText}

        CONTEXTO:
        ${contextText}

        INSTRUÇÕES:
        ${moduleInstructions}

        REGRAS:
        - Responda em português do Brasil
        - Não se apresente múltiplas vezes
        - Não exponha termos técnicos da aplicação
        - Não peça para repetir informações
        - Seja claro e simples
        - Use contexto para personalizar
        - Sugira próximos passos
        - Não invente informações
        - Evite redundância
        - Máximo 5 parágrafos curtos

        PERGUNTA:
        ${message}
      `;

      // =========================
      // 🔹 Salvar mensagem do usuário
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
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
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

      const responseText =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Não consegui gerar uma resposta.';

      // =========================
      // 🔹 Salvar resposta da IA
      // =========================
      await this.prisma.chatMessage.create({
        data: {
          user_id: userId,
          role: 'bot',
          content: responseText,
        },
      });

      return responseText;
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
    return this.prisma.chatMessage.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'asc' },
      take: 50, // limite de segurança
    });
  }
}
