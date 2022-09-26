/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaEntity } from './receta.entity';
import { RecetaService } from './receta.service';
import { RecetaController } from './receta.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RecetaEntity])],
    controllers: [RecetaController],
    providers: [RecetaService],
})
export class RecetaModule {}
