/* eslint-disable prettier/prettier */

import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {CategoriaEntity} from "../categoria/categoria.entity";
import {CulturaEntity} from "../cultura/cultura.entity";

@Entity()
export class ProductoEntity {
    @PrimaryGeneratedColumn()
    codigo: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;


    @Column()
    historia: string;


    @ManyToOne(() => CategoriaEntity, categoria => categoria.productos)
    @JoinTable()
    categoria: CategoriaEntity;


    @ManyToMany(() => CulturaEntity, cultura => cultura.productos)
    @JoinTable()
    culturas: CulturaEntity[];


}
