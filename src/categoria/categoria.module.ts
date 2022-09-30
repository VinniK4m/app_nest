import { CacheModule, Module } from "@nestjs/common";
import { CategoriaService } from "./categoria.service";
import { CategoriaEntity } from "./categoria.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaEntity]), CacheModule.register()],
  providers: [CategoriaService]
})
export class CategoriaModule {
}
