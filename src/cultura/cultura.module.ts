import { CulturaService } from "./cultura.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheModule, Module } from "@nestjs/common";
import { CulturaEntity } from "./cultura.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([CulturaEntity]), CacheModule.register()
  ],
  controllers: [],
  providers: [
    CulturaService]
})
export class CulturaModule {
}
