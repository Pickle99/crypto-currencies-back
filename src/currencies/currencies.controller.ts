import { Controller, Get, Delete, UseInterceptors } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}
  // @Get('live')
  // async getLiveCurrencies() {
  //   return this.currenciesService.getLiveCurrencies();
  // }

  @Get('initial')
  async getLiveCurrenciesInitial() {
    return this.currenciesService.getLiveCurrenciesInitial();
  }

  @Delete('live')
  async deleteCachedData() {
    return this.currenciesService.deleteCachedData();
  }
}
