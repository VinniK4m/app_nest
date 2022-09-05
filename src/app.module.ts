import { CulturaModule } from './cultura/cultura.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CulturaEntity } from './cultura/cultura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CulturaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'abcd1234',
      database: 'culturas',
      entities: [CulturaEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
