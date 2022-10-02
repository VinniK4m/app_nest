import {Args, Query, Resolver} from '@nestjs/graphql';
import {CulturaService} from "../cultura/cultura.service";
import {CulturaEntity} from "../cultura/cultura.entity";
import {PremioMichelinEntity} from "./premio-michelin.entity";
import {PremioMichelinService} from "./premio-michelin.service";

@Resolver()
export class PremioMichelinResolver {


    constructor(private premioService: PremioMichelinService) {}

    @Query(() => [PremioMichelinEntity])
    premios(): Promise<PremioMichelinEntity[]> {
        return this.premioService.findAll();
    }

    @Query(() => PremioMichelinEntity)
    premio(@Args('codigo') codigo: number): Promise<PremioMichelinEntity> {
        return this.premioService.findOne(codigo);
    }









}
