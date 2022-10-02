/* eslint-disable prettier/prettier */
import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {PaisEntity} from "./pais.entity";
import { PaisService } from './pais.service';
import { PaisController } from './pais.controller';
import {UserService} from "../user/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([PaisEntity]), CacheModule.register()],
    providers: [PaisService],
    controllers: [PaisController]
})
export class PaisModule {}
