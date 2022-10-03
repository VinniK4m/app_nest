/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import constants from '../shared/security/constants';
import { JwtStrategy } from './strategies/JwtStrategy';
import {LocalStrategy} from "./strategies/LocalStrategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: constants.JWT_SECRET,
      signOptions: { expiresIn: constants.JWT_EXPIRES_IN },
    })
  ],
  providers: [AuthService, UserService, JwtService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
