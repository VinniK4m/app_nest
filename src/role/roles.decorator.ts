/* eslint-disable prettier/prettier */
import { SetMetadata } from "@nestjs/common";
import {RoleType} from "./role";


export const Roles = (...roles: RoleType[]) => SetMetadata("roles", roles);
