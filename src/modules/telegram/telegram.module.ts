import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { TelegrafModule } from 'nestjs-telegraf';
import { telegrafModuleAsyncOptions } from './config/telegram.config.factory';
import { ChatgptModule } from '../chatgpt/chatgpt.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync(telegrafModuleAsyncOptions()),
    ChatgptModule,
  ],
  providers: [TelegramService],
  controllers: [TelegramController],
})
export class TelegramModule {}
