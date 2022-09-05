import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ProductoModule} from "./producto/producto.module";
import {ProductoEntity} from "./producto/producto.entity";
import {CategoriaModule} from "./categoria/categoria.module";
import {CategoriaEntity} from "./categoria/categoria.entity";

@Module({
  imports: [ProductoModule,CategoriaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'gastronomia',
      entities: [ProductoEntity, CategoriaEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



