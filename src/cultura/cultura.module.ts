import { CulturaService } from "./cultura.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheModule, Module } from "@nestjs/common";
import { CulturaEntity } from "./cultura.entity";
import { CulturaResolver } from './cultura.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([CulturaEntity]), CacheModule.register()
  ],
  controllers: [],
  providers: [
    CulturaService,
    CulturaResolver]
})
export class CulturaModule {
}
