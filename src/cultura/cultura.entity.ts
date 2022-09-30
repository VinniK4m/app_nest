/* eslint-disable prettier/prettier */
import {ProductoEntity} from "../producto/producto.entity";
import { RecetaEntity } from '../receta/receta.entity';
import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class CulturaEntity {
    @PrimaryGeneratedColumn()
    codigo: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @ManyToMany(() => ProductoEntity, producto => producto.culturas)
    @JoinTable()
    productos: ProductoEntity[];

    @OneToMany(() => RecetaEntity, receta => receta.cultura)
    recetas: RecetaEntity[];
}
