/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { PremioMichelinEntity } from '../../premio-michelin/premio-michelin.entity';
import { RecetaEntity } from '../../receta/receta.entity';



export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [RecetaEntity, PremioMichelinEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([RecetaEntity, PremioMichelinEntity]),
];