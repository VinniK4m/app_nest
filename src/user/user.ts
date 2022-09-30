/* eslint-disable prettier/prettier */
import {RoleType} from "../shared/role";

export class User {
    id: number;
    username: string;
    password: string;
    roles: RoleType[];

    constructor(id: number, username: string, password: string, roles: RoleType[]) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.roles = roles;
    }
}
