import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ProductoEntity} from "../producto/producto.entity";

@Entity()
export class CulturaEntity {
    @PrimaryGeneratedColumn()
    codigo: number;
    
    @Column()
    nombre: string;
    
    @Column()
    descripcion: string;

    @ManyToMany(() => ProductoEntity, producto => producto.culturas)
    productos: ProductoEntity[];
}
