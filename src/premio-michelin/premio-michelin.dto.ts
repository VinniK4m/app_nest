import { IsNotEmpty, IsDateString } from "class-validator";

export class PremioMichelinDTO {

  @IsNotEmpty()
  @IsDateString()
  readonly fechaConsecucion: Date;

}
