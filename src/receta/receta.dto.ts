import { IsNumber, IsString, IsUrl } from "class-validator";

export class RecetaDTO {
  @IsNumber()
  readonly codigo: number;

  @IsString()
  readonly nombre: string;

  @IsString()
  readonly descripcion: string;

  @IsUrl()
  readonly urlFoto: string;

  @IsString()
  readonly procesoPrep: string;

  @IsUrl()
  readonly urlVideo: string;

}
