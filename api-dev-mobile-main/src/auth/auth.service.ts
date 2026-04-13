import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";
import type { UserRole } from "../models/User";
import { env } from "../config/env";

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(name: string, email: string, password: string, role: UserRole = "usuario") {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error("E-mail já cadastrado");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create(name, email, passwordHash, role);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const token = sign({ sub: user.id, email: user.email, name: user.name, role: user.role }, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    });

    return {
      token,
      tokenType: "Bearer",
      expiresIn: env.jwtExpiresIn,
    };
  }

  async me(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}
