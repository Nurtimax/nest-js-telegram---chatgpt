import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatgptModule } from './modules/chatgpt/chatgpt.module';
import { TelegramModule } from './modules/telegram/telegram.module';

@Module({
  imports: [ChatgptModule, TelegramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
