/* eslint-disable prettier/prettier */

import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {CategoriaEntity} from "../categoria/categoria.entity";
import {CulturaEntity} from "../cultura/cultura.entity";
import {Field, ObjectType} from "@nestjs/graphql";


@ObjectType()
@Entity()
export class ProductoEntity {

    @Field()
    @PrimaryGeneratedColumn()
    codigo: number;


    @Field()
    @Column()
    nombre: string;

    @Field()
    @Column()
    descripcion: string;

    @Field()
    @Column()
    historia: string;

    @Field()
    @ManyToOne(() => CategoriaEntity, categoria => categoria.productos)
    @JoinTable()
    categoria: CategoriaEntity;


    @ManyToMany(() => CulturaEntity, cultura => cultura.productos)
    @JoinTable()
    culturas: CulturaEntity[];


}
