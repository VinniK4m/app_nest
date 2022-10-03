/* eslint-disable prettier/prettier */
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors} from '@nestjs/common';
import {plainToInstance} from "class-transformer";
import {BusinessErrorsInterceptor} from "../shared/interceptors/business-errors.interceptor";
import {RestauranteService} from "./restaurante.service";
import {RestauranteDto} from "./restaurante.dto";
import {RestauranteEntity} from "./restaurante.entity";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {RolesGuard} from "../role/roles.guard";
import {Roles} from "../role/roles.decorator";
import {RoleType} from "../role/role";

@Controller('restaurantes')
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class RestauranteController {

    constructor(private readonly restauranteService: RestauranteService) {}

    @Get()
    @Roles(RoleType.USERGET, RoleType.ADMIN)
    async findAll() {
        return await this.restauranteService.findAll();
    }

    @Get(':restauranteCodigo')
    @Roles(RoleType.USERGET, RoleType.ADMIN)
    async findOne(@Param('restauranteCodigo') restauranteCodigo: number) {
        return await this.restauranteService.findOne(restauranteCodigo);
    }

    @Post()
    @Roles(RoleType.USERPOST, RoleType.ADMIN)
    async create(@Body() restauranteDto: RestauranteDto) {
        const museum: RestauranteEntity = plainToInstance(RestauranteEntity, restauranteDto);
        return await this.restauranteService.create(museum);
    }

    @Put(':restauranteCodigo')
    @Roles(RoleType.USERPOST, RoleType.ADMIN)
    async update(@Param('restauranteCodigo') restauranteCodigo: number, @Body() restauranteDto: RestauranteDto) {
        const museum: RestauranteEntity = plainToInstance(RestauranteEntity, restauranteDto);
        return await this.restauranteService.update(restauranteCodigo, museum);
    }

    @Delete(':restauranteCodigo')
    @HttpCode(204)
    @Roles(RoleType.USERDEL,RoleType.ADMIN)
    async delete(@Param('restauranteCodigo') restauranteCodigo: number) {
        return await this.restauranteService.delete(restauranteCodigo);
    }
}
