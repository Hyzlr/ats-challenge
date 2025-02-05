import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';

// services
import { ConfigService } from '../config/config.service';

@Injectable()
export class OpenaiService {
  private client: OpenAI;

  constructor(private readonly configService: ConfigService) {
    const openAIAPIKey: string = this.configService.get('OPENAI_API_KEY');

    this.client = new OpenAI({
      apiKey: openAIAPIKey,
    });
  }
}
