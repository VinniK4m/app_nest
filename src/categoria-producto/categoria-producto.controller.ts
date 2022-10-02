/* eslint-disable prettier/prettier */
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors} from '@nestjs/common';
import {CategoriaProductoService} from "./categoria-producto.service";
import {ProductoEntity} from "../producto/producto.entity";
import {BusinessErrorsInterceptor} from "../shared/interceptors/business-errors.interceptor";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {RolesGuard} from "../role/roles.guard";
import {Roles} from "../role/roles.decorator";
import {RoleType} from "../role/role";

@Controller('categorias')
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriaProductoController {
    constructor(private readonly categoriaProductoService: CategoriaProductoService) { }

    @Get('/:categoriaId/productos/:productoId')
    @Roles(RoleType.USERGET, RoleType.ADMIN)
    async findOne(@Param('categoriaId') categoriaId: number, @Param('productoId') productoId: number) {
        return await this.categoriaProductoService.adicionarProductoCategoria(categoriaId, productoId);
    }

    @Get('/:categoriaId/productos')
    @Roles(RoleType.USERGET, RoleType.ADMIN)
    async findAll(@Param('categoriaId') categoriaId: number) {
        return await this.categoriaProductoService.buscarProductoXCategoriaCodigo(categoriaId);
    }

    @Post('/:categoriaId/productos')
    @Roles(RoleType.USERPOST, RoleType.ADMIN)
    @HttpCode(200)
    async create(@Param('categoriaId') categoriaId: number, @Body() productoEntity: ProductoEntity[]) {
        return await this.categoriaProductoService.asociarProductosACategoria(categoriaId, productoEntity);
    }

    @Put('/:categoriaId/productos/:productoId')
    @Roles(RoleType.USERPOST, RoleType.ADMIN)
    async update(@Param('categoriaId') categoriaId: number, @Param('productoId') productoId: number) {
        return await this.categoriaProductoService.adicionarProductoCategoria(categoriaId, productoId);
    }

    @Delete('/:categoriaId/productos/:productoId')
    @Roles(RoleType.USERDEL, RoleType.ADMIN)
    @HttpCode(204)
    async delete(@Param('categoriaId') categoriaId: number, @Param('productoId') productoId: number) {
        return await this.categoriaProductoService.borrarProductoDeCategoria(categoriaId, productoId);
    }
}
