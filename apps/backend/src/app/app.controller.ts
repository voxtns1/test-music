import { CacheInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  getData() {
    return this.appService.getData();
  }

  @Get(':query')
  @UseInterceptors(CacheInterceptor)
  getQuery(@Param('query') query: string) {
    return this.appService.getQuery(query);
  }
}
