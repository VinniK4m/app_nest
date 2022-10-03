import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {CategoriaService} from "./categoria.service";
import {CategoriaEntity} from "./categoria.entity";
import {plainToInstance} from "class-transformer";
import {CategoriaDTO} from "./categoria.dto";

@Resolver()
export class CategoriaResolver {

constructor(private categoriaService: CategoriaService) {}

@Query(() => [CategoriaEntity])
categorias(): Promise<CategoriaEntity[]> {
    return this.categoriaService.findAll();
}

@Query(() => CategoriaEntity)
categoria(@Args('codigo') codigo: number): Promise<CategoriaEntity> {
    return this.categoriaService.findOne(codigo);
}



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




}
