/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class RestauranteDto {
    readonly codigo: number;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly nombreCiudad: string;

}
