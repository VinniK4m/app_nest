import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors,
          UseGuards} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CulturaDTO } from './cultura.dto';
import { CulturaEntity } from './cultura.entity';
import { CulturaService } from './cultura.service';
import {Roles} from "../role/roles.decorator";
import {RoleType} from "../role/role";
import {RolesGuard} from "../role/roles.guard";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('culturasgastronomicas')
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class CulturaController {
    
    constructor(private readonly culturaService: CulturaService) {}
    
    @Get()
    @Roles(RoleType.USERGET, RoleType.ADMIN)
    async findAll() {
      return await this.culturaService.findAll();
    }
  
    @Get(':culturaId')
    @Roles(RoleType.USERGET, RoleType.ADMIN)
    async findOne(@Param('culturaId') culturaId: number) {
      return await this.culturaService.findOne(culturaId);
    }
  
    @HttpCode(201)
    //@Roles(RoleType.USERPOST, RoleType.ADMIN)
    @Post()
    async create(@Body() culturaDto: CulturaDTO) {
      const cultura: CulturaEntity = plainToInstance(CulturaEntity, culturaDto);
      return await this.culturaService.create(cultura);
    }
  
    @Put(':culturaId')
    @Roles(RoleType.USERPOST, RoleType.ADMIN)
    async update(@Param('culturaId') culturaId: number, @Body() culturaDto: CulturaDTO) {
      const cultura: CulturaEntity = plainToInstance(CulturaEntity, culturaDto);
      return await this.culturaService.update(culturaId, cultura);
    }
  
    @Delete(':culturaId')
    @HttpCode(204)
    @Roles(RoleType.USERDEL,RoleType.ADMIN)
    async delete(@Param('culturaId') culturaId: number) {
      return await this.culturaService.delete(culturaId);
    }
}

