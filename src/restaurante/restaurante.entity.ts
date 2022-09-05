/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import {PaisEntity} from "../pais/pais.entity";


@Entity()
export class RestauranteEntity {
    @PrimaryGeneratedColumn()
    codigo: number;

    @Column()
    nombre: string;

    @Column()
    nombreCiudad: string;

    @ManyToOne(
        () => PaisEntity,
        (pais) => {
            return pais.restaurantes;
        },
    )
    pais: PaisEntity


}
