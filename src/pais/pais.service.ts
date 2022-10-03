/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaisEntity } from "./pais.entity";
import { Repository } from "typeorm";
import { BusinessError, BusinessLogicException } from "../shared/errors/BusinessError";
import { Cache } from "cache-manager";

@Injectable()
export class PaisService {
  cacheKey = "paises";

  constructor(
    @InjectRepository(PaisEntity)
    private readonly paisRepository: Repository<PaisEntity>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {
  }

  async findAll(): Promise<PaisEntity[]> {
    const cached: PaisEntity[] = await this.cacheManager.get<PaisEntity[]>(this.cacheKey);
    if (!cached) {
      const paises: PaisEntity[] = await this.paisRepository.find({ relations: [] });
      await this.cacheManager.set(this.cacheKey, paises);
      return paises;
    }

    return cached;
  }

  async findOne(codigo: number): Promise<PaisEntity> {
    const pais: PaisEntity = await this.paisRepository.findOne({ where: { codigo }, relations: ["restaurantes"] });
    if (!pais)
      throw new BusinessLogicException(
        "El país que consulta no existe",
        BusinessError.NOT_FOUND
      );

    return pais;
  }

  async create(pais: PaisEntity): Promise<PaisEntity> {
    return await this.paisRepository.save(pais);
  }

  async update(codigo: number, pais: PaisEntity): Promise<PaisEntity> {
    const persistedPais: PaisEntity = await this.paisRepository.findOne({
      where: { codigo }
    });
    if (!persistedPais)
      throw new BusinessLogicException(
        "El país que actualiza no existe",
        BusinessError.NOT_FOUND
      );

    pais.codigo = codigo;

    return await this.paisRepository.save(pais);
  }

  async delete(codigo: number) {
    const pais: PaisEntity = await this.paisRepository.findOne({
      where: { codigo }
    });
    if (!pais)
      throw new BusinessLogicException(
        "El país que borra no existe",
        BusinessError.NOT_FOUND
      );

    await this.paisRepository.remove(pais);
  }
}
