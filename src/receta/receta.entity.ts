import { CulturaEntity } from '../cultura/cultura.entity';
import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity()
export class RecetaEntity {

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
    urlFoto: string;

    @Field()
    @Column()
    procesoPrep: string;

    @Field()
    @Column()
    urlVideo: string;


    @ManyToOne(()=> CulturaEntity, cultura=> cultura.recetas )
    cultura: CulturaEntity;

}
