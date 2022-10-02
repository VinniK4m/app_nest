import {Args, Query, Resolver} from '@nestjs/graphql';
import {CulturaService} from "../cultura/cultura.service";
import {CulturaEntity} from "../cultura/cultura.entity";
import {CategoriaEntity} from "../categoria/categoria.entity";
import {PaisService} from "./pais.service";
import {PaisEntity} from "./pais.entity";

@Resolver()
export class PaisResolver {

    constructor(private paisService: PaisService) {}

    @Query(() => [PaisEntity])
    paises(): Promise<PaisEntity[]> {
        return this.paisService.findAll();
    }

    @Query(() => PaisEntity)
    pais(@Args('codigo') codigo: number): Promise<PaisEntity> {
        return this.paisService.findOne(codigo);
    }




}
