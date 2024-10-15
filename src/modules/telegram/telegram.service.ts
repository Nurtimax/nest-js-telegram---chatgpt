import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';

type Context = Scenes.SceneContext;

@Update()
export class TelegramService extends Telegraf<Context> {
  @Start()
  onStart(@Ctx() ctx: Context) {
    ctx.reply('welcome!');
  }

  @On('text')
  onMessage(@Message('text') text: string, @Ctx() ctx: Context) {
    ctx.reply('ok');
    return text;
  }
}
