import { CacheModule, Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaEntity } from './categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaController } from './categoria.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriaEntity]),
    CacheModule.register(),
  ],
  providers: [CategoriaService],
  controllers: [CategoriaController],
})
export class CategoriaModule {}
