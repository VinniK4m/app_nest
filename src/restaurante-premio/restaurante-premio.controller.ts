import { Controller, Get, Param, Post } from "@nestjs/common";
import { RestaurantePremioService } from "./restaurante-premio.service";

@Controller("restaurantes")
export class RestaurantePremioController {
  constructor(private readonly restaurantePremioService: RestaurantePremioService) {
  }

  @Post(":restauranteId/premiosMichelin/:premioId")
  async addPremioRestaurante(@Param("restauranteId") restauranteId: number, @Param("premioId") premioId: number) {
    return await this.restaurantePremioService.addPremioRestaurante(restauranteId, premioId);
  }

  @Get(":restauranteId/premiosMichelin")
  async findPremiosByRestauranteId(@Param("restauranteId") restauranteId: number) {
    return await this.restaurantePremioService.findPremiosByRestauranteId(restauranteId);
  }
}
