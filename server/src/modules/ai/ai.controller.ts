import {
  UseGuards,
  Req,
  Get,
  Post,
  Body,
  Controller,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AiService } from './ai.service';

@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Req() req, @Body() body: { message: string; context?: any }) {
    const { message, context } = body;

    if (!message?.trim()) {
      throw new BadRequestException('Mensagem inválida');
    }

    const userId = req.user.id_user;

    const response = await this.aiService.ask(userId, message, context);

    return {
      text: response.text,
    };
  }

  @Get('history')
  async getHistory(@Req() req) {
    const userId = req.user.id_user;

    return this.aiService.getHistory(userId);
  }
}
