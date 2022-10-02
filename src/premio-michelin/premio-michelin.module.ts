/*
https://docs.nestjs.com/modules
*/

import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PremioMichelinEntity } from './premio-michelin.entity';
import { PremioMichelinService } from './premio-michelin.service';
import { PremioMichelinController } from './premio-michelin.controller';
import { PremioMichelinResolver } from './premio-michelin.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([PremioMichelinEntity]), CacheModule.register()],
    controllers: [PremioMichelinController],
    providers: [PremioMichelinService, PremioMichelinResolver],
})
export class PremioMichelinModule {}
