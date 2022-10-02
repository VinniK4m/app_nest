/* eslint-disable prettier/prettier */
import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RestauranteEntity } from "./restaurante.entity";
import { RestauranteService } from './restaurante.service';
import {RestauranteController} from "./restauranteController";
import { RestauranteResolver } from './restaurante.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([RestauranteEntity]), CacheModule.register()],
    providers: [RestauranteService, RestauranteResolver],
    controllers: [RestauranteController]
})
export class RestauranteModule {}
