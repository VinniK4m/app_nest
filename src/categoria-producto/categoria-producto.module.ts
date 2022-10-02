/* eslint-disable prettier/prettier */
import {CacheModule, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoriaEntity} from "../categoria/categoria.entity";
import {ProductoEntity} from "../producto/producto.entity";
import { CategoriaProductoService } from './categoria-producto.service';
import {CategoriaProductoController} from "./categoria-producto.controller";

@Module({

    imports: [TypeOrmModule.forFeature([CategoriaEntity, ProductoEntity]),CacheModule.register()],
    providers: [CategoriaProductoService],
    controllers:[CategoriaProductoController]


})
export class CategoriaProductoModule {}
