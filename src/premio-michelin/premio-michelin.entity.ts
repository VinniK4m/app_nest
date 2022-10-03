import { RestauranteEntity } from '../restaurante/restaurante.entity';
import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity()
export class PremioMichelinEntity {

    @Field()
    @PrimaryGeneratedColumn()
    codigo: number;

    @Field()
    @Column()
    fechaConsecucion: Date;

    @Field()
    @ManyToOne(()=> RestauranteEntity, restaurante=> restaurante.premiosMicheline )
    restaurante: RestauranteEntity;
}
