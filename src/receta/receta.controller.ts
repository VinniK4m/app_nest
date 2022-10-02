/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { RecetaService } from "./receta.service";
import { BusinessErrorsInterceptor } from "../shared/interceptors/business-errors.interceptor";
import { RecetaEntity } from "./receta.entity";
import { RecetaDTO } from "./receta.dto";
import { plainToInstance } from "class-transformer";
import {Roles} from "../role/roles.decorator";
import {RoleType} from "../role/role";


@Controller("recetas")
@UseInterceptors(BusinessErrorsInterceptor)
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {
  }

  @Get()
  @Roles(RoleType.USERGET, RoleType.ADMIN)
  async findAll() {
    return await this.recetaService.findAll();
  }

  @Get(":recetaId")
  @Roles(RoleType.USERGET, RoleType.ADMIN)
  async findOne(@Param("recetaId") recetaId: number) {
    return await this.recetaService.findOne(recetaId);
  }

  @Post()
  @Roles(RoleType.USERPOST, RoleType.ADMIN)
  async create(@Body() recetaDto: RecetaDTO) {
    const receta: RecetaEntity = plainToInstance(RecetaEntity, recetaDto);
    return await this.recetaService.create(receta);
  }

  @Put(":recetaId")
  @Roles(RoleType.USERPOST, RoleType.ADMIN)
  async update(@Param("recetaId") recetaId: number, @Body() recetaDto: RecetaDTO) {
    const receta: RecetaEntity = plainToInstance(RecetaEntity, recetaDto);
    return await this.recetaService.update(recetaId, receta);
  }

  @Delete(":recetaId")
  @Roles(RoleType.USERDEL, RoleType.ADMIN)
  @HttpCode(204)
  async delete(@Param("recetaId") recetaId: number) {
    return await this.recetaService.delete(recetaId);
  }

}
