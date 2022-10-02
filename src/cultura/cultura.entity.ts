/* eslint-disable prettier/prettier */
import {ProductoEntity} from "../producto/producto.entity";
import { RecetaEntity } from '../receta/receta.entity';
import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Field, ObjectType} from "@nestjs/graphql";


@ObjectType()
@Entity()
export class CulturaEntity {
    @Field()
    @PrimaryGeneratedColumn()
    codigo: number;

    @Field()
    @Column()
    nombre: string;

    @Field()
    @Column()
    descripcion: string;


    @ManyToMany(() => ProductoEntity, producto => producto.culturas)
    @JoinTable()
    productos: ProductoEntity[];

    @OneToMany(() => RecetaEntity, receta => receta.cultura)
    recetas: RecetaEntity[];
}
