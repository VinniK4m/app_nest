/* eslint-disable prettier/prettier */

import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class ProductoDTO {

    @Field()
    readonly codigo: number;

    @Field()
    readonly nombre: string;

    @Field()
    readonly descripcion: string;

    @Field()
    readonly historia: string;


}
