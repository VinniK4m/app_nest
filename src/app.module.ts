/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaisModule } from './pais/pais.module';
import { RestauranteModule } from './restaurante/restaurante.module';
import {PaisEntity} from "./pais/pais.entity";
import {RestauranteEntity} from "./restaurante/restaurante.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [PaisModule, RestauranteModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'museumuser',
      password: '123456',
      database: 'museumsdb',
      entities: [
        PaisEntity,
        RestauranteEntity,
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
