/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import {RestauranteEntity} from "../restaurante/restaurante.entity";


@Entity()
export class PaisEntity {
    @PrimaryGeneratedColumn('uuid')
    codigo: string;

    @Column()
    nombre: string;

    @Column()
    capital: string;

    @Column()
    bandera: Date;

    @OneToMany(() => RestauranteEntity, (restaurante) => restaurante.pais)
    restaurantes: RestauranteEntity[];
}
