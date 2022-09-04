/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import {PaisEntity} from "../pais/pais.entity";


@Entity()
export class RestauranteEntity {
    @PrimaryGeneratedColumn('uuid')
    codigo: string;

    @Column()
    nombre: string;

    @Column()
    capital: string;

    pais: PaisEntity


}
