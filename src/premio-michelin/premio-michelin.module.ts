/*
https://docs.nestjs.com/modules
*/

import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PremioMichelinEntity } from './premio-michelin.entity';
import { PremioMichelinService } from './premio-michelin.service';
import { PremioMichelinController } from './premio-michelin.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PremioMichelinEntity]), CacheModule.register()],
    controllers: [PremioMichelinController],
    providers: [PremioMichelinService],
})
export class PremioMichelinModule {}
