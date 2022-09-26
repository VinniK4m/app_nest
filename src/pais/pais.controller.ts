/* eslint-disable prettier/prettier */
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors} from '@nestjs/common';
import {PaisService} from "./pais.service";
import {PaisDto} from "./pais.dto";
import {PaisEntity} from "./pais.entity";
import {plainToInstance} from "class-transformer";
import {BusinessErrorsInterceptor} from "../shared/interceptors/business-errors.interceptor";
import {Roles} from "../user/roles.decorator";
import {Role} from "../user/role";
import {RolesGuard} from "../user/roles.guard";

@Controller('paises')
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(RolesGuard)
export class PaisController {

    constructor(private readonly paisService: PaisService) {}

    @Get()
    @Roles(Role.USER)
    async findAll() {
        return await this.paisService.findAll();
    }

    @Get(':paisCodigo')
    async findOne(@Param('paisCodigo') paisCodigo: number) {
        return await this.paisService.findOne(paisCodigo);
    }

    //@UseGuards(JwtAuthGuard)
    @HttpCode(201)
    @Roles(Role.ADMIN)
    @Post()
    async create(@Body() paisDto: PaisDto) {
        const pais: PaisEntity = plainToInstance(PaisEntity, paisDto);
        return await this.paisService.create(pais);
    }

    @Put(':paisCodigo')
    async update(@Param('paisCodigo') paisCodigo: number, @Body() paisDto: PaisDto) {
        const pais: PaisEntity = plainToInstance(PaisEntity, paisDto);
        return await this.paisService.update(paisCodigo, pais);
    }

    @Delete(':paisCodigo')
    @HttpCode(204)
    async delete(@Param('paisCodigo') paisCodigo: number) {
        return await this.paisService.delete(paisCodigo);
    }
}
