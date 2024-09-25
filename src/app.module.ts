import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrenciesModule } from './currencies/currencies.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [CurrenciesModule, GatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
