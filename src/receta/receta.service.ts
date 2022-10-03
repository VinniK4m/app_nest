import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { InjectRepository } from "@nestjs/typeorm";
import { BusinessError, BusinessLogicException } from "../shared/errors/business-errors";
import { Repository } from "typeorm";
import { RecetaEntity } from "./receta.entity";

@Injectable()
export class RecetaService {
  cacheKey = "recetas";

  constructor(
    @InjectRepository(RecetaEntity)
    private readonly recetaRepository: Repository<RecetaEntity>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {
  }

  async findAll(): Promise<RecetaEntity[]> {
    const cached: RecetaEntity[] = await this.cacheManager.get<RecetaEntity[]>(this.cacheKey);
    if (!cached) {
      const recetas: RecetaEntity[] = await this.recetaRepository.find({ relations: [] });
      await this.cacheManager.set(this.cacheKey, recetas);
      return recetas;
    }

    return cached;
  }

  async findOne(codigo: number): Promise<RecetaEntity> {
    const receta: RecetaEntity = await this.recetaRepository.findOne({ where: { codigo }, relations: [] });
    if (!receta)
      throw new BusinessLogicException("La receta con este codigo no fue encontrado", BusinessError.NOT_FOUND);

    return receta;
  }

  async create(receta: RecetaEntity): Promise<RecetaEntity> {
    return await this.recetaRepository.save(receta);
  }

  async update(codigo: number, receta: RecetaEntity): Promise<RecetaEntity> {
    const persistedReceta: RecetaEntity = await this.recetaRepository.findOne({ where: { codigo } });
    if (!persistedReceta)
      throw new BusinessLogicException("La receta con este codigo no fue encontrado", BusinessError.NOT_FOUND);

    return await this.recetaRepository.save({ ...persistedReceta, ...receta });
  }

  async delete(codigo: number) {
    const receta: RecetaEntity = await this.recetaRepository.findOne({ where: { codigo } });
    if (!receta)
      throw new BusinessLogicException("La receta con este codigo no fue encontrado", BusinessError.NOT_FOUND);

    await this.recetaRepository.remove(receta);
  }
}
