import {CacheModule, Module} from '@nestjs/common';
import { RestaurantePremioService } from './restaurante-premio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { PremioMichelinEntity } from '../premio-michelin/premio-michelin.entity';
import { RestaurantePremioController } from './restaurante-premio.controller';

@Module({
  providers: [RestaurantePremioService],
  imports: [TypeOrmModule.forFeature([RestauranteEntity, PremioMichelinEntity]), CacheModule.register()],
  controllers: [RestaurantePremioController],
})
export class RestaurantePremioModule {}
