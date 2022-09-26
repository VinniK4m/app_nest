/* eslint-disable prettier/prettier */
import {Role} from "./role";

export class User {
    id: number;
    username: string;
    password: string;
    roles: Role[];

    constructor(id: number, username: string, password: string, roles: Role[]) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.roles = roles;
    }
}
