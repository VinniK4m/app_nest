import { CulturaService } from "./cultura.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheModule, Module } from "@nestjs/common";
import { CulturaEntity } from "./cultura.entity";
import { CulturaResolver } from './cultura.resolver';
import { CulturaController } from "./cultura.controller";


@Module({
  imports: [TypeOrmModule.forFeature([CulturaEntity]), CacheModule.register()],
  controllers: [CulturaController],
  providers: [CulturaService, CulturaResolver]
})
export class CulturaModule {}