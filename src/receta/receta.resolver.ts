import {Args, Query, Resolver} from '@nestjs/graphql';
import {ProductoService} from "../producto/producto.service";
import {ProductoEntity} from "../producto/producto.entity";
import {RecetaService} from "./receta.service";
import {RecetaEntity} from "./receta.entity";

@Resolver()
export class RecetaResolver {


    constructor(private recetaService: RecetaService) {}

    @Query(() => [RecetaEntity])
    recetas(): Promise<RecetaEntity[]> {
        return this.recetaService.findAll();
    }

    @Query(() => RecetaEntity)
    receta(@Args('codigo') codigo: number): Promise<RecetaEntity> {
        return this.recetaService.findOne(codigo);
    }


}
