/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import {CategoriaEntity} from "./categoria.entity";


@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(CategoriaEntity)
        private readonly categoriaRepository: Repository<CategoriaEntity>
    ){}

    async findAll(): Promise<CategoriaEntity[]> {
        return await this.categoriaRepository.find({ relations: ["productos"] });
    }

    async findOne(codigo: number): Promise<CategoriaEntity> {
        const categoria: CategoriaEntity = await this.categoriaRepository.findOne({where: {codigo} , relations: ["productos"] } );
        if (!categoria)
            throw new BusinessLogicException("La categoria con este identificador no fue encontrada", BusinessError.NOT_FOUND);

        return categoria;
    }

    async create(categoria: CategoriaEntity): Promise<CategoriaEntity> {
        return await this.categoriaRepository.save(categoria);
    }

    async update(codigo: number, categoria: CategoriaEntity): Promise<CategoriaEntity> {
        const persistedCategoria: CategoriaEntity = await this.categoriaRepository.findOne({where:{codigo}});
        if (!persistedCategoria)
            throw new BusinessLogicException("La categoria con este identificador no fue encontrada", BusinessError.NOT_FOUND);

        categoria.codigo = codigo;

        return await this.categoriaRepository.save(categoria);
    }

    async delete(codigo: number) {
        const categoria: CategoriaEntity = await this.categoriaRepository.findOne({where:{codigo}});
        if (!categoria)
            throw new BusinessLogicException("La categoria con este identificador no fue encontrada", BusinessError.NOT_FOUND);

        await this.categoriaRepository.remove(categoria);
    }
}

