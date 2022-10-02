/* eslint-disable prettier/prettier */
import {CacheModule, Module} from '@nestjs/common';
import { PaisRestauranteService } from './pais-restaurante.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PaisEntity} from "../pais/pais.entity";
import {RestauranteEntity} from "../restaurante/restaurante.entity";
import { PaisRestauranteController } from './pais-restaurante.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PaisEntity, RestauranteEntity]), CacheModule.register()],
  providers: [PaisRestauranteService],
  controllers: [PaisRestauranteController]
})
export class PaisRestauranteModule {}
