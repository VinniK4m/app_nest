/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString, IsUrl} from 'class-validator';
import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class PaisDto {
    readonly codigo: number;

    @IsString()
    @IsNotEmpty()
    @Field()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    @Field()
    readonly capital: string;

    @IsUrl()
    @IsNotEmpty()
    @Field()
    readonly bandera: string;


}
