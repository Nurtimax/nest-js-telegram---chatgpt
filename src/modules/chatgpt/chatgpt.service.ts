import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map, Observable, of } from 'rxjs';

interface GptAnswer {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    completion_tokens_details: {
      reasoning_tokens: number;
    };
  };
  choices: {
    message: {
      role: string;
      content: string;
    };
    logprobs: null | any;
    finish_reason: string;
    index: number;
  }[];
}

@Injectable()
export class ChatgptService {
  private readonly logger = new Logger(ChatgptService.name);
  private gptUrl;
  private apiKey;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.gptUrl = 'https://api.openai.com/v1/chat/completions';
    this.apiKey = configService.get('CHATGPT_API_KEY');
  }

  generateResponse(content: string): Observable<string> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    const data = {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content }],
      temperature: 0.7,
    };

    return this.httpService
      .post<GptAnswer>(this.gptUrl, data, { headers })
      .pipe(
        map(({ data }) => data.choices[0].message.content.trim()),
        catchError((err) => {
          this.logger.error(err);
          return of('🛑 Произошла ошибка');
        }),
      );
  }
}
