/* eslint-disable prettier/prettier */
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors} from '@nestjs/common';

import {CategoriaService} from './categoria.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {RolesGuard} from "../role/roles.guard";
import {Roles} from "../role/roles.decorator";
import {RoleType} from "../role/role";
import {BusinessErrorsInterceptor} from "../shared/interceptors/business-errors.interceptor";
import {CategoriaDTO} from "./categoria.dto";
import {ProductoEntity} from "../producto/producto.entity";
import {plainToInstance} from "class-transformer";
import {CategoriaEntity} from "./categoria.entity";


@Controller('categorias')
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) {}

    @Get()
    @Roles(RoleType.USERGET, RoleType.ADMIN)
    async findAll() {
        return await this.categoriaService.findAll();
    }

    @Get(':categoriaId')
    @Roles(RoleType.USERGET, RoleType.ADMIN)
    async findOne(@Param('categoriaId') categoriaId: number) {
        return await this.categoriaService.findOne(categoriaId);
    }

    @Post()
    @HttpCode(200)
    @Roles(RoleType.USERPOST, RoleType.ADMIN)
    async create(@Body() categoriaDTO: CategoriaDTO) {
        const categoriaEntity: CategoriaEntity = plainToInstance(CategoriaEntity, categoriaDTO);
        return await this.categoriaService.create(categoriaEntity);
    }



    @Put(':categoriaId')
    @Roles(RoleType.USERPOST, RoleType.ADMIN)
    async update(@Param('categoriaId') categoriaId: number, @Body() categoriaDTO: CategoriaDTO) {
        const categoriaEntity: CategoriaEntity = plainToInstance(CategoriaEntity, categoriaDTO);
        return await this.categoriaService.update(categoriaId, categoriaEntity);
    }


    @Delete(':categoriaId')
    @HttpCode(204)
    @Roles(RoleType.USERDEL, RoleType.ADMIN)
    async delete(@Param('categoriaId') categoriaId: number) {
        return await this.categoriaService.delete(categoriaId);
    }


}
