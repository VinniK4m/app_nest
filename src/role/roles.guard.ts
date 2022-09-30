/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import {User} from "../user/user";
import {RoleType} from "./role";
import { GqlExecutionContext } from '@nestjs/graphql';
import {UserService} from "../user/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private userService: UserService) {}
    canActivate(context: ExecutionContext): boolean {

        const requireRoles = this.reflector.getAllAndOverride<RoleType[]>("roles", [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requireRoles) {
            return true;
        }
        const ctx = GqlExecutionContext.create(context);
        let user = ctx.getContext().req.user;
        //const {user}=context.switchToHttp().getRequest();
        user =  this.userService.findOne(user.username);

        const userC: User = {
                    username: "Nishant",
                    roles: [RoleType.USERGET],
                    id: 1,
                    password: "123"
                };
        console.log(user)
        return requireRoles.some((role) => user.roles.includes(role));
    }
}
