/* eslint-disable prettier/prettier */
import {Controller, Get, Param, Post, UseGuards, UseInterceptors} from "@nestjs/common";
import {CulturaRecetaService} from "./cultura-receta.service";
import {BusinessErrorsInterceptor} from "../shared/interceptors/business-errors.interceptor";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {RolesGuard} from "../role/roles.guard";
import {Roles} from "../role/roles.decorator";
import {RoleType} from "../role/role";

@Controller("culturasGastronomicas")
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(BusinessErrorsInterceptor)
export class CulturaRecetaController {
  constructor(private readonly culturaRecetaService: CulturaRecetaService) {
  }

  @Post(":culturaId/recetas/:recetaId")
  @Roles(RoleType.USERPOST, RoleType.ADMIN)
  async addRecetaCultura(@Param("culturaId") culturaId: number, @Param("recetaId") recetaId: number) {
    return await this.culturaRecetaService.addRecetaCultura(culturaId, recetaId);
  }

  @Get(":culturaId/recetas")
  @Roles(RoleType.USERGET, RoleType.ADMIN, RoleType.USERCULTURA)
  async findrecetasByCulturaId(@Param("culturaId") culturaId: number) {
    return await this.culturaRecetaService.findrecetasByCulturaId(culturaId);
  }
}
