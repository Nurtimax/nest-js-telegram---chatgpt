import { ConfigService } from '@nestjs/config';
import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';
import { ChatgptService } from '../chatgpt/chatgpt.service';

type Context = Scenes.SceneContext;

@Update()
export class TelegramService extends Telegraf<Context> {
  constructor(
    private readonly configService: ConfigService,
    private readonly gptService: ChatgptService,
  ) {
    super(configService.get('TELEGRAM_API_TOKEN'));
  }
  @Start()
  onStart(@Ctx() ctx: Context) {
    ctx.reply('welcome!');
  }

  @On('text')
  onMessage(@Message('text') text: string) {
    return this.gptService.generateResponse(text);
  }
}
