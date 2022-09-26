/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RestauranteEntity } from "./restaurante.entity";
import { RestauranteService } from './restaurante.service';
import {RestauranteController} from "./restauranteController";

@Module({
    imports: [TypeOrmModule.forFeature([RestauranteEntity])],
    providers: [RestauranteService],
    controllers: [RestauranteController]
})
export class RestauranteModule {}
