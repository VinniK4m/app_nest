/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';


import {Res} from "@nestjs/common";
import {PaisEntity} from "../../pais/pais.entity";
import {RestauranteEntity} from "../../restaurante/restaurante.entity";

export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [PaisEntity, RestauranteEntity],
        synchronize: true,
        keepConnectionAlive: true
    }),
    TypeOrmModule.forFeature([PaisEntity, RestauranteEntity]),
];
