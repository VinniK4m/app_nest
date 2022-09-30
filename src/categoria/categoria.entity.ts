/* eslint-disable prettier/prettier */

import {Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {ProductoEntity} from "../producto/producto.entity";


@Entity()
export class CategoriaEntity {

    @PrimaryGeneratedColumn()
    codigo: number;
 
    @Column()
    nombre: string;

    @OneToMany(() => ProductoEntity, producto => producto.categoria)
    @JoinTable()
    productos: ProductoEntity[];
}
