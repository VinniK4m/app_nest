import { RecetaModule } from './receta/receta.module';
import { PremioMichelinModule } from './premio-michelin/premio-michelin.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaEntity } from './receta/receta.entity';
import { PremioMichelinEntity } from './premio-michelin/premio-michelin.entity';

@Module({
  imports: [
    RecetaModule,
    PremioMichelinModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'culturaGastronomica',
      entities: [RecetaEntity,PremioMichelinEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
