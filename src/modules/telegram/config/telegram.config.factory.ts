import { ConfigService } from '@nestjs/config';
import { TelegrafModuleAsyncOptions } from 'nestjs-telegraf';

const telegrafModuleOptions = (config: ConfigService) => {
  return {
    token: config.get('TELEGRAM_API_TOKEN'),
  };
};

export const telegrafModuleAsyncOptions = (): TelegrafModuleAsyncOptions => {
  return {
    inject: [ConfigService],
    useFactory: telegrafModuleOptions,
  };
};
