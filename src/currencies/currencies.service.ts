import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { CurrenciesGateway } from '../gateway/gateway';

@Injectable()
export class CurrenciesService {
  private readonly cacheKey = 'live_currencies';
  public lastFetchedData: any;
  private fetchInterval = 60000;
  private readonly accessKey = '7a944f047bdf1b852a1e02ae2f33f37e';

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly httpService: HttpService,
    private readonly myGateway: CurrenciesGateway,
  ) {}
  private intervalId: NodeJS.Timeout | null = null;
  async fetchLiveCurrencies() {
    const url = `https://api.coinlayer.com/live?access_key=${this.accessKey}&target=EUR&expand=1`;

    try {
      const { data } = await firstValueFrom(this.httpService.get(url));
      this.lastFetchedData = data;

      await this.cacheManager.set(this.cacheKey, this.lastFetchedData, 600);

      // Emit the update to the WebSocket clients
      this.myGateway.server.emit('onMessage', this.lastFetchedData);
      console.log('Fetched and cached new data:', this.lastFetchedData);
    } catch (error) {
      console.error('Error fetching live currencies:', error);
      throw new Error('Could not fetch live currencies');
    }
  }
  private startFetchingLiveCurrencies() {
    this.intervalId = setInterval(() => {
      this.fetchLiveCurrencies();
    }, this.fetchInterval);
  }

  // async getLiveCurrencies() {
  //   const cachedItem = await this.cacheManager.get(this.cacheKey);
  //   if (cachedItem) {
  //     console.log('Returning cached data:', cachedItem);
  //     return cachedItem;
  //   }
  //
  //   await this.fetchLiveCurrencies();
  //   return this.lastFetchedData;
  // }

  async getLiveCurrenciesInitial() {
    console.log('before', this.cacheManager.get(this.cacheKey));
    const url = `https://api.coinlayer.com/live?access_key=${this.accessKey}&target=EUR&expand=1`;

    try {
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.error('Error fetching live currencies:', error);
      throw new Error('Unable to fetch live currencies');
    }
  }

  async deleteCachedData() {
    await this.cacheManager.del(this.cacheKey);
    await this.cacheManager.reset();
    return 'Cache cleared';
  }

  async onModuleInit() {
    this.startFetchingLiveCurrencies();
  }
}
