import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CulturaEntity {
    @PrimaryGeneratedColumn('uuid')
    codigo: string;
    
    @Column()
    nombre: string;
    
    @Column()
    descripcion: string;

    /*@OneToMany(() => ExhibitionEntity, exhibition => exhibition.museum)
    exhibitions: ExhibitionEntity[];
 
    @OneToMany(() => ArtworkEntity, artwork => artwork.museum)
    artworks: ArtworkEntity[];*/
}