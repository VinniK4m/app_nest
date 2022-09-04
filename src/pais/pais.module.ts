/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import {PaisEntity} from "./pais.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PaisEntity])]
})
export class PaisModule {}
