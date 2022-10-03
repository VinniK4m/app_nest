/* eslint-disable prettier/prettier */

import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CategoriaDTO {

  @Field()
  readonly codigo: number;

  @Field()
  readonly nombre: string;

}
