import {Args, Query, Resolver} from '@nestjs/graphql';
import {PremioMichelinService} from "../premio-michelin/premio-michelin.service";
import {PremioMichelinEntity} from "../premio-michelin/premio-michelin.entity";
import {ProductoEntity} from "./producto.entity";
import {ProductoService} from "./producto.service";

@Resolver()
export class ProductoResolver {



    constructor(private productoService: ProductoService) {}

    @Query(() => [ProductoEntity])
    productos(): Promise<ProductoEntity[]> {
        return this.productoService.findAll();
    }

    @Query(() => ProductoEntity)
    producto(@Args('codigo') codigo: number): Promise<ProductoEntity> {
        return this.productoService.findOne(codigo);
    }


}
