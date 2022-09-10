/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString, IsUrl} from 'class-validator';

export class PaisDto {
    readonly codigo: number;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly capital: string;

    @IsUrl()
    @IsNotEmpty()
    readonly bandera: string;


}
