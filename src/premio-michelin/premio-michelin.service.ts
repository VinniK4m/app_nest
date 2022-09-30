import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { PremioMichelinEntity } from './premio-michelin.entity';
import { Cache } from "cache-manager";

@Injectable()
export class PremioMichelinService {
    cacheKey: string = "premios";

    constructor(
        @InjectRepository(PremioMichelinEntity)
        private readonly premioMichelinRepository: Repository<PremioMichelinEntity>,
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ){}

    async findAll(): Promise<PremioMichelinEntity[]> {
        const cached: PremioMichelinEntity[] = await this.cacheManager.get<PremioMichelinEntity[]>(this.cacheKey);
        if (!cached) {
            const premios: PremioMichelinEntity[] = await this.premioMichelinRepository.find({ relations: [] });
            await this.cacheManager.set(this.cacheKey, premios);
            return premios;
        }

        return cached;
    }

    async findOne(codigo: number): Promise<PremioMichelinEntity> {
        const premioMichelin: PremioMichelinEntity = await this.premioMichelinRepository.findOne({where: {codigo}, relations: [] } );
        if (!premioMichelin)
          throw new BusinessLogicException("El premio michelin con este codigo no fue encontrado", BusinessError.NOT_FOUND);
   
        return premioMichelin;
    }

    async create(premioMichelin: PremioMichelinEntity): Promise<PremioMichelinEntity> {
        return await this.premioMichelinRepository.save(premioMichelin);
    }

    async update(codigo: number, premioMichelin: PremioMichelinEntity): Promise<PremioMichelinEntity> {
        const persistedPremio: PremioMichelinEntity = await this.premioMichelinRepository.findOne({where:{codigo}});
        if (!persistedPremio)
          throw new BusinessLogicException("El premio michelin con este codigo no fue encontrado", BusinessError.NOT_FOUND);
        
        return await this.premioMichelinRepository.save({...persistedPremio, ...premioMichelin});
    }

    async delete(codigo: number) {
        const premioMichelin: PremioMichelinEntity = await this.premioMichelinRepository.findOne({where:{codigo}});
        if (!premioMichelin)
          throw new BusinessLogicException("El premio michelin con este codigo no fue encontrado", BusinessError.NOT_FOUND);
     
        await this.premioMichelinRepository.remove(premioMichelin);
    }
}
