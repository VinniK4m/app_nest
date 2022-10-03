import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors,
    UseGuards, } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { CulturaProductoService } from './cultura-producto.service';
import { plainToInstance } from 'class-transformer';
import { ProductoService } from 'src/producto/producto.service';
import { ProductoEntity } from 'src/producto/producto.entity';
import {Roles} from "../role/roles.decorator";
import {RoleType} from "../role/role";
import {RolesGuard} from "../role/roles.guard";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('culturasgastronomicas')
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class CulturaProductoController {
    constructor(private readonly culturaProductoService: CulturaProductoService) {}


    // Obtener todos los productos de una cultura gastronómica 
    @Get(':culturaId/productos')
    @Roles(RoleType.USERGET, RoleType.ADMIN)
    async findProductsFromCulture(@Param('culturaId') culturaId: number) {
        return await this.culturaProductoService.findProductsFromCulture(culturaId);
    }

    // Obtener un producto de cultura gastronómica
    @Get(':culturaId/productos/:productoId')
    @Roles(RoleType.USERGET, RoleType.ADMIN)
    async findProductFromCulture(@Param('productoId') productoId: number, @Param('culturaId') culturaId: number) {
        return await this.culturaProductoService.findProductFromCulture(productoId, culturaId);
    }

    /* Asociar un producto de cultura gastronómica
      @POST culturaId/productos */
    @Post(':culturaId/productos/:productoId/')
    @Roles(RoleType.USERPOST, RoleType.ADMIN)
    async addProductCulture(@Param('culturaId') culturaId: number, @Param('productoId') codigo: number) {
        return await this.culturaProductoService.addProductCulture(culturaId, codigo);
    }

    /* Crear un producto de cultura gastronómica
    @Post(':culturaId/productos')
    @Roles(RoleType.USERGET, RoleType.ADMIN)
    async addProductToCulture(@Param('culturaId') culturaId: number) {
        return await this.culturaProductoService.addProductToCulture(culturaId);
    }*/

    /*
    // Actualizar un producto de cultura gastronómica
    @Put(':culturaId/productos/:productoId/')
    @Roles(RoleType.USERGET, RoleType.ADMIN)
    async updateProductFromCulture(@Param('productoId') productoId: number, @Param('culturaId') culturaId: number){
        return await this.culturaProductoService.updateProductFromCulture(culturaId, productoId);
    }
    //Eliminar un producto de cultura gastronómica
    @Delete(':culturaId/productos/:productoId')
    @Roles(RoleType.USERGET, RoleType.ADMIN)
    @HttpCode(204)
    async deleteProductFromCulture(@Param('productoId') productoId: number, @Param('culturaId') culturaId: number) {
        return await this.culturaProductoService.deleteProductFromCulture(productoId, culturaId);
    }*/
}