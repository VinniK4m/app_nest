/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ProductoEntity } from './producto.entity';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(ProductoEntity)
        private readonly productoRepository: Repository<ProductoEntity>
    ){}

    async findAll(): Promise<ProductoEntity[]> {
        return await this.productoRepository.find( { relations: ["categoria","culturas"] });
    }

    async findOne(codigo: number): Promise<ProductoEntity> {
        const producto: ProductoEntity = await this.productoRepository.findOne({where: {codigo} , relations: ["categoria","culturas"] } );
        if (!producto)
            throw new BusinessLogicException("El producto con este identificador no fue encontrado", BusinessError.NOT_FOUND);

        return producto;
    }

    async create(producto: ProductoEntity): Promise<ProductoEntity> {
        return await this.productoRepository.save(producto);
    }

    async update(codigo: number, producto: ProductoEntity): Promise<ProductoEntity> {
        const persistedProducto: ProductoEntity = await this.productoRepository.findOne({where:{codigo}});
        if (!persistedProducto)
            throw new BusinessLogicException("El producto con este identificador no fue encontrado", BusinessError.NOT_FOUND);

        producto.codigo = codigo;

        return await this.productoRepository.save(producto);
    }

    async delete(codigo: number) {
        const producto: ProductoEntity = await this.productoRepository.findOne({where:{codigo}});
        if (!producto)
            throw new BusinessLogicException("El producto con este identificador no fue encontrado", BusinessError.NOT_FOUND);

        await this.productoRepository.remove(producto);
    }
}
