import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get(':query')
  getQuery(@Param('query') query: string) {
    return this.appService.getQuery(query);
  }
}
