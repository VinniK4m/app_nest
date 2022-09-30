/* eslint-disable prettier/prettier */
import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "../user/user";
import constants from "../shared/security/constants";
import {RoleType} from "../role/role";
import {IJwtPayload} from "../role/IJwtPayload";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user: User = await this.usersService.findOne(username);
        if (user && user.password === password) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(dato: any) {
        //const payload = { username: req.user.username, sub: req.user.id };
        const user: User = await this.usersService.findOne(dato.username);

        if (!user) {
            throw new NotFoundException('user does not exist');
        }
        if (!(dato.password === user.password)) {
            throw new UnauthorizedException('invalid credentials');
        }
        const payload: IJwtPayload = {
            id: user.id,
            username: user.username,
            roles: user.roles.map(r => r as RoleType)
        };
        return {
            token: this.jwtService.sign(payload, { privateKey: constants.JWT_SECRET, expiresIn:constants.JWT_EXPIRES_IN }),
        };
    }
}
