import { Controller, Get, Param, Post } from "@nestjs/common";
import { CulturaRecetaService } from "./cultura-receta.service";

@Controller("culturasGastronomica")
export class CulturaRecetaController {
  constructor(private readonly culturaRecetaService: CulturaRecetaService) {
  }

  @Post(":culturaId/culturasGastronomica/:recetaId")
  async addRecetaCultura(@Param("culturaId") culturaId: number, @Param("recetaId") recetaId: number) {
    return await this.culturaRecetaService.addRecetaCultura(culturaId, recetaId);
  }

  @Get(":culturaId/recetas")
  async findrecetasByCulturaId(@Param("culturaId") culturaId: number) {
    return await this.culturaRecetaService.findrecetasByCulturaId(culturaId);
  }
}
