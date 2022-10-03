/* eslint-disable prettier/prettier */
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors} from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PaisRestauranteService } from "./pais-restaurante.service";
import {RestauranteDto} from "../restaurante/restaurante.dto";
import {RestauranteEntity} from "../restaurante/restaurante.entity";
import {plainToInstance} from "class-transformer";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {RolesGuard} from "../role/roles.guard";
import {Roles} from "../role/roles.decorator";
import {RoleType} from "../role/role";

@Controller('paises')
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaisRestauranteController {
    constructor(private readonly paisRestauranteService: PaisRestauranteService){}

    @Post(':paisCodigo/restaurantes/:restauranteCodigo')
    @Roles(RoleType.USERPOST, RoleType.ADMIN)
    async adicionarRestaurantePais(@Param('paisCodigo') paisCodigo: number, @Param('restauranteCodigo') restauranteCodigo: number){
        return await this.paisRestauranteService.adicionarRestaurantePais(paisCodigo, restauranteCodigo);
    }

    @Get(':paisCodigo/restaurantes/:restauranteCodigo')
    @Roles(RoleType.USERGET, RoleType.ADMIN)
    async buscarRestauranteXPaisCodigoRestauranteCodigo(@Param('paisCodigo') paisCodigo: number, @Param('restauranteCodigo') restauranteCodigo: number){
        return await this.paisRestauranteService.buscarRestauranteXPaisCodigoRestauranteCodigo(paisCodigo, restauranteCodigo);
    }

    @Get(':paisCodigo/restaurantes')
    @Roles(RoleType.USERGET, RoleType.ADMIN)
    async buscarRestaurantesXPaisCodigo(@Param('paisCodigo') paisCodigo: number){
        return await this.paisRestauranteService.buscarRestaurantesXPaisCodigo(paisCodigo);
    }

    @Put(':paisCodigo/restaurantes')
    @Roles(RoleType.USERPOST, RoleType.ADMIN)
    async asociarRestaurantesPais(@Body() restauranteDto: RestauranteDto[], @Param('paisCodigo') paisCodigo: number){
        const restaurantes = plainToInstance(RestauranteEntity, restauranteDto)
        return await this.paisRestauranteService.asociarRestaurantesPais(paisCodigo, restaurantes);
    }

    @Delete(':paisCodigo/restaurantes/:restauranteCodigo')
    @HttpCode(204)
    @Roles(RoleType.USERDEL,RoleType.ADMIN)
    async borrarRestaurantePais(@Param('paisCodigo') paisCodigo: number, @Param('restauranteCodigo') restauranteCodigo: number){
        return await this.paisRestauranteService.borrarRestaurantePais(paisCodigo, restauranteCodigo);
    }
}
