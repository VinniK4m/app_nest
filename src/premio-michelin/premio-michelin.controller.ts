/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { PremioMichelinService } from "./premio-michelin.service";
import { BusinessErrorsInterceptor } from "../shared/interceptors/business-errors.interceptor";
import { PremioMichelinDTO } from "./premio-michelin.dto";
import { plainToInstance } from "class-transformer";
import { PremioMichelinEntity } from "./premio-michelin.entity";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {RolesGuard} from "../role/roles.guard";
import {Roles} from "../role/roles.decorator";
import {RoleType} from "../role/role";

@Controller("premiosMichelin")
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(BusinessErrorsInterceptor)
export class PremioMichelinController {
  constructor(private readonly premiosMichelinService: PremioMichelinService) {
  }

  @Get()
  @Roles(RoleType.USERGET, RoleType.ADMIN)
  async findAll() {
    return await this.premiosMichelinService.findAll();
  }

  @Get(":premioId")
  @Roles(RoleType.USERGET, RoleType.ADMIN)
  async findOne(@Param("premioId") premioId: number) {
    return await this.premiosMichelinService.findOne(premioId);
  }

  @Post()
  @Roles(RoleType.USERPOST, RoleType.ADMIN)
  async create(@Body() premioDto: PremioMichelinDTO) {
    const receta: PremioMichelinEntity = plainToInstance(PremioMichelinEntity, premioDto);
    return await this.premiosMichelinService.create(receta);
  }

  @Put(":premioId")
  @Roles(RoleType.USERPOST, RoleType.ADMIN)
  async update(@Param("premioId") premioId: number, @Body() premioDto: PremioMichelinDTO) {
    const receta: PremioMichelinEntity = plainToInstance(PremioMichelinEntity, premioDto);
    return await this.premiosMichelinService.update(premioId, receta);
  }

  @Delete(":premioId")
  @Roles(RoleType.USERDEL, RoleType.ADMIN)
  @HttpCode(204)
  async delete(@Param("premioId") premioId: number) {
    return await this.premiosMichelinService.delete(premioId);
  }
}
