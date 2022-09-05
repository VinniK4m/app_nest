import { CulturaModule } from './cultura/cultura.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ProductoModule} from "./producto/producto.module";
import {ProductoEntity} from "./producto/producto.entity";
import {CategoriaModule} from "./categoria/categoria.module";
import {CategoriaEntity} from "./categoria/categoria.entity";
import { CulturaEntity } from './cultura/cultura.entity';
import { PaisModule } from './pais/pais.module';
import { RestauranteModule } from './restaurante/restaurante.module';
import { PaisEntity } from './pais/pais.entity';
import { RestauranteEntity } from './restaurante/restaurante.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CulturaModule,ProductoModule,CategoriaModule,
    PaisModule,
    RestauranteModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'museumuser',
      password: '123456',
      database: 'museumsdb',
      entities: [ProductoEntity, CategoriaEntity, CulturaEntity, PaisEntity, RestauranteEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
