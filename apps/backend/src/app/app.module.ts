import * as Entity from '@music/backend/entity';

import { CacheModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';

const configure = {
  entities: Entity,
  migrations: ['apps/backend/src/db/migration/**/*.ts'],
};

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      ...environment.database,
      ...configure,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
