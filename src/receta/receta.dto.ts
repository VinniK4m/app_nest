import { IsString, IsUrl, IsOptional } from "class-validator";

export class RecetaDTO {

  @IsString()
  readonly nombre: string;

  @IsString()
  readonly descripcion: string;

  @IsUrl()
  readonly urlFoto: string;

  @IsString()
  readonly procesoPrep: string;

  @IsUrl()
  @IsOptional()
  readonly urlVideo: string;

}
