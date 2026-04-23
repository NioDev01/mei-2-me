import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async ask(message: string): Promise<string> {
    // resposta fake só pra teste
    return `Resposta mock da IA para: "${message}"`;
  }
}
