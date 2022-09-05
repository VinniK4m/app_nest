/* eslint-disable prettier/prettier */

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import {CategoriaEntity} from "../categoria/categoria.entity";

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
    categoria: CategoriaEntity;



    /*



        @OneToMany(() => ArtworkEntity, artwork => artwork.artist)
        artworks: ArtworkEntity[];

        @ManyToMany(() => MovementEntity, movement => movement.artists)
        movements: MovementEntity[];
    */
}
