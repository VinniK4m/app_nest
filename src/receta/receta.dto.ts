import { IsString, IsUrl, IsOptional } from "class-validator";
import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class RecetaDTO {

  @IsString()
  @Field()
  readonly nombre: string;

  @IsString()
  @Field()
  readonly descripcion: string;

  @IsUrl()
  @Field()
  readonly urlFoto: string;

  @IsString()
  @Field()
  readonly procesoPrep: string;

  @IsUrl()
  @IsOptional()
  @Field()
  readonly urlVideo: string;

}
