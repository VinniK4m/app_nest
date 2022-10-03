/* eslint-disable prettier/prettier */

import {Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {ProductoEntity} from "../producto/producto.entity";
import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity()
export class CategoriaEntity {
    @Field()
    @PrimaryGeneratedColumn()
    codigo: number;

    @Field()
    @Column()
    nombre: string;


    @OneToMany(() => ProductoEntity, producto => producto.categoria)
    @JoinTable()
    productos: ProductoEntity[];
}
