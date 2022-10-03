import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturaEntity } from 'src/cultura/cultura.entity';
import { ProductoEntity } from 'src/producto/producto.entity';
import { CulturaProductoService } from './cultura-producto.service';
import { CulturaProductoController } from './cultura-producto.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CulturaEntity, ProductoEntity])],
    controllers: [CulturaProductoController],
    providers: [CulturaProductoService, CulturaProductoService],
})
export class CulturaProductoModule { }