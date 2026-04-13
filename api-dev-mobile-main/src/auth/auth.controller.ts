import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { JwtPayload } from "./types/jwt-payload.type";
import type { UserRole } from "../models/User";

type RegisterBody = {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
};

type LoginBody = {
  email?: string;
  password?: string;
};

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() body: RegisterBody) {
    const { name, email, password, role } = body ?? {};

    if (!name || !email || !password) {
      throw new BadRequestException("Nome, email e/ou senha sÇœo obrigatÇürios");
    }

    if (role && role !== "administrador" && role !== "usuario") {
      throw new BadRequestException("role invalida");
    }

    try {
      console.log("Registrando usuÇ­rio:", { name, email, password });
      return await this.authService.register(name, email, password, role);
    } catch (error) {
      console.error("Erro ao registrar usuÇ­rio:", error);
      throw new BadRequestException((error as Error).message);
    }
  }

  @Post("login")
  @HttpCode(200)
  async login(@Body() body: LoginBody) {
    const { email, password } = body ?? {};

    if (!email || !password) {
      throw new BadRequestException("email e password sÇœo obrigatÇürios");
    }

    return this.authService.login(email, password);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: Request & { user?: JwtPayload }) {
    if (!req.user?.sub) {
      throw new UnauthorizedException("Token invÇ­lido");
    }

    return this.authService.me(req.user.sub);
  }
}
