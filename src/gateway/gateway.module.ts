import { Module } from '@nestjs/common';
import { CurrenciesGateway } from './gateway';

@Module({
  imports: [CurrenciesGateway],
})
export class GatewayModule {}
