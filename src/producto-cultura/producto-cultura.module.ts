import {CacheModule, Module} from '@nestjs/common';
import {ProductoCulturaService} from "./producto-cultura.service";

import { TypeOrmModule } from '@nestjs/typeorm';
import {CulturaService} from "../cultura/cultura.service";
import {ProductoEntity} from "../producto/producto.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProductoEntity, CulturaService]),CacheModule.register()],
    providers: [ProductoCulturaService],


})
export class ProductoCulturaModule {}
