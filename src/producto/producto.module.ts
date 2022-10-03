import { CacheModule, Module } from "@nestjs/common";
import {ProductoService} from "./producto.service";
import {ProductoEntity} from "./producto.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import {ProductoController} from "./producto.controller";
import { ProductoResolver } from './producto.resolver';


@Module({
    imports: [TypeOrmModule.forFeature([ProductoEntity]), CacheModule.register()],
    providers: [ProductoService, ProductoResolver],
    controllers:[ProductoController]
})
export class ProductoModule {}
