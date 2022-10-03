/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import constants from "../../shared/security/constants";
import {UserService} from "../../user/user.service";
import {IJwtPayload} from "../../role/IJwtPayload";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constants.JWT_SECRET,
        });
    }

    async validate(payload: IJwtPayload) {
        const { username } = payload;
        return await this.userService.findOne(username);
    }
}
