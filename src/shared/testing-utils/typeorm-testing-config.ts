/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import {ProductoEntity} from "../../producto/producto.entity";
import {CategoriaEntity} from "../../categoria/categoria.entity";

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [ProductoEntity, CategoriaEntity],
    synchronize: true,
    keepConnectionAlive: true 
  }),
  TypeOrmModule.forFeature([ProductoEntity, CategoriaEntity]),
];
