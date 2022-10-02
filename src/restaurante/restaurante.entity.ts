/* eslint-disable prettier/prettier */
import { PremioMichelinEntity } from '../premio-michelin/premio-michelin.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import {PaisEntity} from "../pais/pais.entity";
import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity()
export class RestauranteEntity {

    @Field()
    @PrimaryGeneratedColumn()
    codigo: number;

    @Field()
    @Column()
    nombre: string;

    @Field()
    @Column()
    nombreCiudad: string;

    @Field()
    @ManyToOne(
        () => PaisEntity,
        (pais) => {
            return pais.restaurantes;
        },
    )
    pais: PaisEntity


    @OneToMany(() => PremioMichelinEntity, premio => premio.restaurante)
    premiosMicheline: PremioMichelinEntity[];


}
