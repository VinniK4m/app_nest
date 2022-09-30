/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './user';
import {RoleType} from "../shared/role";

@Injectable()
export class UserService {
    private users: User[] = [
        new User(1, "ADMIN", "admin", [RoleType.ADMIN]),
        new User(2, "userget", "123456", [RoleType.USERGET]),
        new User(3, "userpost", "24680", [RoleType.USERPOST]),
        new User(4, "userdelete", "13579", [RoleType.USERDEL]),
        new User(5, "userculturasGastronomica", "lacultura", [RoleType.USERCULTURA]),

    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
