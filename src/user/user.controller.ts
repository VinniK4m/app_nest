/* eslint-disable prettier/prettier */
import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {AuthService} from "../auth/auth.service";
import {LocalAuthGuard} from "../auth/guards/local-auth.guard";

@Controller('users')
export class UserController {

    constructor(private readonly authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() dato) {
        return this.authService.login(dato);
    }
}
