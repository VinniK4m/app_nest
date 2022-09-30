import { CacheModule, Module } from "@nestjs/common";
import {ProductoService} from "./producto.service";
import {ProductoEntity} from "./producto.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([ProductoEntity]), CacheModule.register()],
    providers: [ProductoService],
})
export class ProductoModule {}
