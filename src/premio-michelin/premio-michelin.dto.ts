import { IsNotEmpty, IsDateString } from "class-validator";
import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class PremioMichelinDTO {

  @IsNotEmpty()
  @IsDateString()
  @Field()
  readonly fechaConsecucion: Date;

}
