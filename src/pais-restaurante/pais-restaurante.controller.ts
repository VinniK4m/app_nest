/* eslint-disable prettier/prettier */
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors} from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PaisRestauranteService } from "./pais-restaurante.service";
import {RestauranteDto} from "../restaurante/restaurante.dto";
import {RestauranteEntity} from "../restaurante/restaurante.entity";
import {plainToInstance} from "class-transformer";

@Controller('paises')
@UseInterceptors(BusinessErrorsInterceptor)
export class PaisRestauranteController {
    constructor(private readonly paisRestauranteService: PaisRestauranteService){}

    @Post(':paisCodigo/restaurantes/:restauranteCodigo')
    async adicionarRestaurantePais(@Param('paisCodigo') paisCodigo: number, @Param('restauranteCodigo') restauranteCodigo: number){
        return await this.paisRestauranteService.adicionarRestaurantePais(paisCodigo, restauranteCodigo);
    }

    @Get(':paisCodigo/restaurantes/:restauranteCodigo')
    async buscarRestauranteXPaisCodigoRestauranteCodigo(@Param('paisCodigo') paisCodigo: number, @Param('restauranteCodigo') restauranteCodigo: number){
        return await this.paisRestauranteService.buscarRestauranteXPaisCodigoRestauranteCodigo(paisCodigo, restauranteCodigo);
    }

    @Get(':paisCodigo/restaurantes')
    async buscarRestaurantesXPaisCodigo(@Param('paisCodigo') paisCodigo: number){
        return await this.paisRestauranteService.buscarRestaurantesXPaisCodigo(paisCodigo);
    }

    @Put(':paisCodigo/restaurantes')
    async asociarRestaurantesPais(@Body() restauranteDto: RestauranteDto[], @Param('paisCodigo') paisCodigo: number){
        const restaurantes = plainToInstance(RestauranteEntity, restauranteDto)
        return await this.paisRestauranteService.asociarRestaurantesPais(paisCodigo, restaurantes);
    }

    @Delete(':paisCodigo/restaurantes/:restauranteCodigo')
    @HttpCode(204)
    async borrarRestaurantePais(@Param('paisCodigo') paisCodigo: number, @Param('restauranteCodigo') restauranteCodigo: number){
        return await this.paisRestauranteService.borrarRestaurantePais(paisCodigo, restauranteCodigo);
    }
}
