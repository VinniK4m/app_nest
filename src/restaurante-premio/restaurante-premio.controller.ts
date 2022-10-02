/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { RestaurantePremioService } from "./restaurante-premio.service";
import { BusinessErrorsInterceptor } from "../shared/interceptors/business-errors.interceptor";
import {Roles} from "../role/roles.decorator";
import {RoleType} from "../role/role";

@Controller("restaurantes")
@UseInterceptors(BusinessErrorsInterceptor)
export class RestaurantePremioController {
  constructor(private readonly restaurantePremioService: RestaurantePremioService) {
  }

  @Post(":restauranteId/premiosMichelin/:premioId")
  @Roles(RoleType.USERPOST, RoleType.ADMIN)
  async addPremioRestaurante(@Param("restauranteId") restauranteId: number, @Param("premioId") premioId: number) {
    return await this.restaurantePremioService.addPremioRestaurante(restauranteId, premioId);
  }

  @Get(":restauranteId/premiosMichelin")
  @Roles(RoleType.USERGET, RoleType.ADMIN)
  async findPremiosByRestauranteId(@Param("restauranteId") restauranteId: number) {
    return await this.restaurantePremioService.findPremiosByRestauranteId(restauranteId);
  }
}
