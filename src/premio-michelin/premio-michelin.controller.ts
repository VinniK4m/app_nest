import { Body, Controller, Delete, Get, HttpCode, Injectable, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { PremioMichelinService } from "./premio-michelin.service";
import { BusinessErrorsInterceptor } from "../shared/interceptors/business-errors.interceptor";
import { PremioMichelinDTO } from "./premio-michelin.dto";
import { plainToInstance } from "class-transformer";
import { PremioMichelinEntity } from "./premio-michelin.entity";

@Controller("premiosMichelin")
@UseInterceptors(BusinessErrorsInterceptor)
export class PremioMichelinController {
  constructor(private readonly premiosMichelinService: PremioMichelinService) {
  }

  @Get()
  async findAll() {
    return await this.premiosMichelinService.findAll();
  }

  @Get(":premioId")
  async findOne(@Param("premioId") premioId: number) {
    return await this.premiosMichelinService.findOne(premioId);
  }

  @Post()
  async create(@Body() premioDto: PremioMichelinDTO) {
    const receta: PremioMichelinEntity = plainToInstance(PremioMichelinEntity, premioDto);
    return await this.premiosMichelinService.create(receta);
  }

  @Put(":premioId")
  async update(@Param("premioId") premioId: number, @Body() premioDto: PremioMichelinDTO) {
    const receta: PremioMichelinEntity = plainToInstance(PremioMichelinEntity, premioDto);
    return await this.premiosMichelinService.update(premioId, receta);
  }

  @Delete(":premioId")
  @HttpCode(204)
  async delete(@Param("premioId") premioId: number) {
    return await this.premiosMichelinService.delete(premioId);
  }
}
