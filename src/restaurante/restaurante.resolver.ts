import {Args, Query, Resolver} from '@nestjs/graphql';
import {RecetaService} from "../receta/receta.service";
import {RecetaEntity} from "../receta/receta.entity";
import {RestauranteService} from "./restaurante.service";
import {RestauranteEntity} from "./restaurante.entity";

@Resolver()
export class RestauranteResolver {


    constructor(private restauranteService: RestauranteService) {}

    @Query(() => [RestauranteEntity])
    restaurantes(): Promise<RestauranteEntity[]> {
        return this.restauranteService.findAll();
    }

    @Query(() => RestauranteEntity)
    restaurante(@Args('codigo') codigo: number): Promise<RestauranteEntity> {
        return this.restauranteService.findOne(codigo);
    }

}
