import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisOptions } from 'src/configs/app-options.constants';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { HttpModule } from '@nestjs/axios';
import { CurrenciesGateway } from '../gateway/gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync(RedisOptions),
    HttpModule,
  ],
  controllers: [CurrenciesController],
  providers: [CurrenciesService, CurrenciesGateway],
})
export class CurrenciesModule {}
