/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturaEntity } from '../../cultura/cultura.entity';
import {PaisEntity} from "../../pais/pais.entity";
import {RestauranteEntity} from "../../restaurante/restaurante.entity";

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [CulturaEntity, PaisEntity, RestauranteEntity],
    synchronize: true,
    keepConnectionAlive: true 
  }),
  TypeOrmModule.forFeature([CulturaEntity, PaisEntity, RestauranteEntity]),
];
