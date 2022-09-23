import { IsNotEmpty, IsNumber, IsDate } from "class-validator";

export class PremioMichelinDTO {
  @IsNotEmpty()
  @IsNumber()
  readonly codigo: number;

  @IsNotEmpty()
  @IsDate()
  readonly fechaConsecucion: Date;

}
