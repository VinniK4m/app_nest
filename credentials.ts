import { RecetaEntity } from 'src/receta/receta.entity';
import { PremioMichelinEntity } from 'src/premio-michelin/premio-michelin.entity';

export let credentials = 
    {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'admin',
        database: 'Gastronomia2',
        entities: [RecetaEntity,PremioMichelinEntity],
        dropSchema: true,
        synchronize: true,
        keepConnectionAlive: true
    }
