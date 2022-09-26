/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    SetMetadata,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
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
    @SetMetadata('roles', [Role.USERGET, Role.ADMIN])
    async findAll() {
        return await this.paisService.findAll();
    }

    @Get(':paisCodigo')
    @Roles(Role.USERGET)
    async findOne(@Param('paisCodigo') paisCodigo: number) {
        return await this.paisService.findOne(paisCodigo);
    }

    //@UseGuards(JwtAuthGuard)
    @HttpCode(201)
    @Roles(Role.USERPOST)
    @Post()
    async create(@Body() paisDto: PaisDto) {
        const pais: PaisEntity = plainToInstance(PaisEntity, paisDto);
        return await this.paisService.create(pais);
    }

    @Put(':paisCodigo')
    @Roles(Role.USERPUT)
    async update(@Param('paisCodigo') paisCodigo: number, @Body() paisDto: PaisDto) {
        const pais: PaisEntity = plainToInstance(PaisEntity, paisDto);
        return await this.paisService.update(paisCodigo, pais);
    }

    @Delete(':paisCodigo')
    @HttpCode(204)
    @Roles(Role.USERDEL)
    async delete(@Param('paisCodigo') paisCodigo: number) {
        return await this.paisService.delete(paisCodigo);
    }
}
