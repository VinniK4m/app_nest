import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {CategoriaService} from "../categoria/categoria.service";
import {CategoriaEntity} from "../categoria/categoria.entity";
import {CategoriaDTO} from "../categoria/categoria.dto";
import {plainToInstance} from "class-transformer";
import {CulturaService} from "./cultura.service";
import {CulturaEntity} from "./cultura.entity";

@Resolver()
export class CulturaResolver {

    constructor(private culturaService: CulturaService) {}

    @Query(() => [CulturaEntity])
    culturas(): Promise<CulturaEntity[]> {
        return this.culturaService.findAll();
    }

    @Query(() => CulturaEntity)
    cultura(@Args('codigo') codigo: number): Promise<CulturaEntity> {
        return this.culturaService.findOne(codigo);
    }


/*
    @Mutation(() => CategoriaEntity)
    createCategoria(@Args('categoria') categoriaDto: CategoriaDTO): Promise<CategoriaDTO> {
        const categoria = plainToInstance(CategoriaEntity, categoriaDto);
        return this.categoriaService.create(categoria);
    }

    @Mutation(() => CategoriaEntity)
    updateCategoria(@Args('codigo') codigo: number, @Args('categoria') categoriaDto: CategoriaDTO): Promise<CategoriaDTO> {
        const categoria = plainToInstance(CategoriaEntity, categoriaDto);
        return this.categoriaService.update(codigo, categoriaDto);
    }

    @Mutation(() => String)
    deleteCategoria(@Args('codigo') codigo: number) {
        this.categoriaService.delete(codigo);
        return codigo;
    }



*/



}
