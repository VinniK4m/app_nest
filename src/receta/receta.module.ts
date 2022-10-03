/*
https://docs.nestjs.com/modules
*/

import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaEntity } from './receta.entity';
import { RecetaService } from './receta.service';
import { RecetaController } from './receta.controller';
import { RecetaResolver } from './receta.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([RecetaEntity]), CacheModule.register()],
    controllers: [RecetaController],
    providers: [RecetaService, RecetaResolver],
})
export class RecetaModule {}
