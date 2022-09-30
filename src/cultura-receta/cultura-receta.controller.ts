import { Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { CulturaRecetaService } from "./cultura-receta.service";
import { BusinessErrorsInterceptor } from "../shared/interceptors/business-errors.interceptor";

@Controller("culturasGastronomica")
@UseInterceptors(BusinessErrorsInterceptor)
export class CulturaRecetaController {
  constructor(private readonly culturaRecetaService: CulturaRecetaService) {
  }

  @Post(":culturaId/recetas/:recetaId")
  async addRecetaCultura(@Param("culturaId") culturaId: number, @Param("recetaId") recetaId: number) {
    return await this.culturaRecetaService.addRecetaCultura(culturaId, recetaId);
  }

  @Get(":culturaId/recetas")
  async findrecetasByCulturaId(@Param("culturaId") culturaId: number) {
    return await this.culturaRecetaService.findrecetasByCulturaId(culturaId);
  }
}
