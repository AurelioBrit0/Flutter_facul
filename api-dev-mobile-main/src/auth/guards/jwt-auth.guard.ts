import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { env } from "../../config/env";
import { JwtPayload } from "../types/jwt-payload.type";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ headers: { authorization?: string }; user?: JwtPayload }>();
    const header = request.headers.authorization;

    if (!header) {
      throw new UnauthorizedException("Token não informado");
    }

    const [type, token] = header.split(" ");
    if (type !== "Bearer" || !token) {
      throw new UnauthorizedException("Token inválido");
    }

    try {
      const payload = verify(token, env.jwtSecret) as JwtPayload;
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Token inválido");
    }
  }
}
