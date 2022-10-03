/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BusinessError, BusinessLogicException } from "../shared/errors/business-errors";
import { Repository } from "typeorm";
import { ProductoEntity } from "./producto.entity";
import { Cache } from "cache-manager";
import {ProductoDTO} from "./producto.dto";

@Injectable()
export class ProductoService {
  cacheKey = "productos";

  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRepository: Repository<ProductoEntity>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {
  }

  async findAll(): Promise<ProductoEntity[]> {
    const cached: ProductoEntity[] = await this.cacheManager.get<ProductoEntity[]>(this.cacheKey);
    if (!cached) {
      const productos: ProductoEntity[] = await this.productoRepository.find({ relations: ["categoria", "culturas"] });
      await this.cacheManager.set(this.cacheKey, productos);
      return productos;
    }

    return cached;
  }

  async findOne(codigo: number): Promise<ProductoEntity> {
    const producto: ProductoEntity = await this.productoRepository.findOne({
      where: { codigo },
      relations: ["categoria", "culturas"]
    });
    if (!producto)
      throw new BusinessLogicException("El producto con este identificador no fue encontrado", BusinessError.NOT_FOUND);

    return producto;
  }

    async create(productoEntity: ProductoEntity): Promise<ProductoEntity> {
        const producto = new ProductoEntity();
        producto.nombre = productoEntity.nombre;
        producto.historia = productoEntity.historia;
        producto.descripcion = productoEntity.descripcion;
        return await this.productoRepository.save(producto);

    }

    async update(codigo: number, productoEntity: ProductoEntity): Promise<ProductoEntity> {
        const persistedProducto: ProductoEntity = await this.productoRepository.findOne({where:{codigo}});
        if (!persistedProducto)
            throw new BusinessLogicException("El producto con este identificador no fue encontrado", BusinessError.NOT_FOUND);

        persistedProducto.nombre = productoEntity.nombre;
        persistedProducto.historia = productoEntity.historia;
        persistedProducto.descripcion = productoEntity.descripcion;
        return await this.productoRepository.save(persistedProducto);
    }

  async delete(codigo: number) {
    const producto: ProductoEntity = await this.productoRepository.findOne({ where: { codigo } });
    if (!producto)
      throw new BusinessLogicException("El producto con este identificador no fue encontrado", BusinessError.NOT_FOUND);

    await this.productoRepository.remove(producto);
  }
}
