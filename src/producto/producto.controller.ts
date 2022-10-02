/* eslint-disable prettier/prettier */
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors} from '@nestjs/common';


import {ProductoService} from "./producto.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {RolesGuard} from "../role/roles.guard";
import {BusinessErrorsInterceptor} from "../shared/interceptors/business-errors.interceptor";
import {Roles} from "../role/roles.decorator";
import {RoleType} from "../role/role";
import {ProductoDTO} from "./producto.dto";


@Controller('productos')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductoController {
    constructor(private readonly productoService: ProductoService) {}

    @Get()
    @Roles(RoleType.USERGET, RoleType.ADMIN)
    async findAll() {
        return await this.productoService.findAll();
    }

    @Get(':productoId')
    @Roles(RoleType.USERGET, RoleType.ADMIN)
    async findOne(@Param('productoId') productoId: number) {
        return await this.productoService.findOne(productoId);
    }


    @Post()
    @Roles(RoleType.USERPOST, RoleType.ADMIN)
    @HttpCode(200)
    async create(@Body() productoDTO: ProductoDTO) {
        return await this.productoService.create(productoDTO);
    }



    @Put(':productoId')
    @Roles(RoleType.USERPOST, RoleType.ADMIN)
    async update(@Param('productoId') productoId: number, @Body() productoDTO: ProductoDTO) {
        return await this.productoService.update(productoId, productoDTO);
    }


    @Delete(':productoId')
    @Roles(RoleType.USERDEL, RoleType.ADMIN)
    @HttpCode(204)
    async delete(@Param('productoId') productoId: number) {
        return await this.productoService.delete(productoId);
    }
}
