/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BusinessError, BusinessLogicException } from "../shared/errors/business-errors";
import { Repository } from "typeorm";
import { CategoriaEntity } from "./categoria.entity";
import { Cache } from "cache-manager";



@Injectable()
export class CategoriaService {
  cacheKey = "categorias";

  constructor(
    @InjectRepository(CategoriaEntity)
    private readonly categoriaRepository: Repository<CategoriaEntity>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {
  }

  async findAll(): Promise<CategoriaEntity[]> {
    const cached: CategoriaEntity[] = await this.cacheManager.get<CategoriaEntity[]>(this.cacheKey);
    if (!cached) {
      const categorias: CategoriaEntity[] = await this.categoriaRepository.find({ relations: ["productos"] });
      await this.cacheManager.set(this.cacheKey, categorias);
      return categorias;
    }

    return cached;
  }

  async findOne(codigo: number): Promise<CategoriaEntity> {
    const categoria: CategoriaEntity = await this.categoriaRepository.findOne({
      where: { codigo },
      relations: ["productos"]
    });
    if (!categoria)
      throw new BusinessLogicException("La categoria con este identificador no fue encontrada", BusinessError.NOT_FOUND);

    return categoria;
  }

    async create(categoriaEntity: CategoriaEntity): Promise<CategoriaEntity> {

        const categoria = new CategoriaEntity();
        categoria.nombre = categoriaEntity.nombre;
        return await this.categoriaRepository.save(categoria);
    }

    async update(codigo: number, categoriaEntity: CategoriaEntity): Promise<CategoriaEntity> {
        const persistedCategoria: CategoriaEntity = await this.categoriaRepository.findOne({where:{codigo}});
        if (!persistedCategoria)
            throw new BusinessLogicException("La categoria con este identificador no fue encontrada", BusinessError.NOT_FOUND);

        persistedCategoria.nombre = categoriaEntity.nombre;

    return await this.categoriaRepository.save(persistedCategoria);
  }

  async delete(codigo: number) {
    const categoria: CategoriaEntity = await this.categoriaRepository.findOne({ where: { codigo } });
    if (!categoria)
      throw new BusinessLogicException("La categoria con este identificador no fue encontrada", BusinessError.NOT_FOUND);

    await this.categoriaRepository.remove(categoria);
  }
}

