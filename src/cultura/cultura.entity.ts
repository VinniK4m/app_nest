import { RecetaEntity } from '../receta/receta.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CulturaEntity {
    @PrimaryGeneratedColumn()
    codigo: number;
    
    @Column()
    nombre: string;
    
    @Column()
    descripcion: string;
 
    @OneToMany(() => RecetaEntity, receta => receta.cultura)
    recetas: RecetaEntity[];
}