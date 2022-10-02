/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import {RestauranteEntity} from "../restaurante/restaurante.entity";
import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity()
export class PaisEntity {

    @Field()
    @PrimaryGeneratedColumn()
    codigo: number;

    @Field()
    @Column()
    nombre: string;

    @Field()
    @Column()
    capital: string;

    @Field()
    @Column()
    bandera: string ;


    @OneToMany(() => RestauranteEntity, (restaurante) => restaurante.pais)
    restaurantes: RestauranteEntity[];
}
