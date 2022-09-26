/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './user';
import {Role} from "./role";

@Injectable()
export class UserService {
    private users: User[] = [
        new User(1, "admin", "admin", [Role.ADMIN]),
        new User(2, "user", "admin", [Role.USERGET]),
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
