/* eslint-disable prettier/prettier */

import {RoleType} from "./role";

export interface IJwtPayload {
    id: number;
    username: string;
    roles: RoleType[];
    iat?: Date;
}
