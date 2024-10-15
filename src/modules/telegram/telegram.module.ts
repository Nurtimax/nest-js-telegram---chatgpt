import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { TelegrafModule } from 'nestjs-telegraf';
import { telegrafModuleAsyncOptions } from './config/telegram.config.factory';

@Module({
  imports: [TelegrafModule.forRootAsync(telegrafModuleAsyncOptions())],
  providers: [TelegramService],
  controllers: [TelegramController],
})
export class TelegramModule {}
