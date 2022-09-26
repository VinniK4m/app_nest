/* eslint-disable prettier/prettier */
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors} from '@nestjs/common';
import {plainToInstance} from "class-transformer";
import {BusinessErrorsInterceptor} from "../shared/interceptors/business-errors.interceptor";
import {RestauranteService} from "./restaurante.service";
import {RestauranteDto} from "./restaurante.dto";
import {RestauranteEntity} from "./restaurante.entity";

@Controller('restaurantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class RestauranteController {

    constructor(private readonly restauranteService: RestauranteService) {}

    @Get()
    async findAll() {
        return await this.restauranteService.findAll();
    }

    @Get(':restauranteCodigo')
    async findOne(@Param('restauranteCodigo') restauranteCodigo: number) {
        return await this.restauranteService.findOne(restauranteCodigo);
    }

    @Post()
    async create(@Body() restauranteDto: RestauranteDto) {
        const museum: RestauranteEntity = plainToInstance(RestauranteEntity, restauranteDto);
        return await this.restauranteService.create(museum);
    }

    @Put(':restauranteCodigo')
    async update(@Param('restauranteCodigo') restauranteCodigo: number, @Body() restauranteDto: RestauranteDto) {
        const museum: RestauranteEntity = plainToInstance(RestauranteEntity, restauranteDto);
        return await this.restauranteService.update(restauranteCodigo, museum);
    }

    @Delete(':restauranteCodigo')
    @HttpCode(204)
    async delete(@Param('restauranteCodigo') restauranteCodigo: number) {
        return await this.restauranteService.delete(restauranteCodigo);
    }
}
