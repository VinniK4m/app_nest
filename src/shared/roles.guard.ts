/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import {User} from "../user/user";
import {RoleType} from "./role";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {

        const requireRoles = this.reflector.getAllAndOverride<RoleType[]>("roles", [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requireRoles) {
            return true;
        }
        // const {user}=context.switchToHttp().getRequest();
        const user: User = {
            username: "Nishant",
            roles: [RoleType.USERDEL],
            id: 1,
            password: "123"
        };
        return requireRoles.some((role) => user.roles.includes(role));
    }
}
