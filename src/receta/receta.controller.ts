import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { RecetaService } from "./receta.service";
import { BusinessErrorsInterceptor } from "../shared/interceptors/business-errors.interceptor";
import { RecetaEntity } from "./receta.entity";
import { RecetaDTO } from "./receta.dto";
import { plainToInstance } from "class-transformer";


@Controller("recetas")
@UseInterceptors(BusinessErrorsInterceptor)
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {
  }

  @Get()
  async findAll() {
    return await this.recetaService.findAll();
  }

  @Get(":recetaId")
  async findOne(@Param("recetaId") recetaId: number) {
    return await this.recetaService.findOne(recetaId);
  }

  @Post()
  async create(@Body() recetaDto: RecetaDTO) {
    const receta: RecetaEntity = plainToInstance(RecetaEntity, recetaDto);
    return await this.recetaService.create(receta);
  }

  @Put(":recetaId")
  async update(@Param("recetaId") recetaId: number, @Body() recetaDto: RecetaDTO) {
    const receta: RecetaEntity = plainToInstance(RecetaEntity, recetaDto);
    return await this.recetaService.update(recetaId, receta);
  }

  @Delete(":recetaId")
  @HttpCode(204)
  async delete(@Param("recetaId") recetaId: number) {
    return await this.recetaService.delete(recetaId);
  }

}
