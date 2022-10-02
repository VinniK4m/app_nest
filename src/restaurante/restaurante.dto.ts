/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class RestauranteDto {
    readonly codigo: number;

    @IsString()
    @IsNotEmpty()
    @Field()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    @Field()
    readonly nombreCiudad: string;

}
