import type { UserRole } from "../../models/User";

export type JwtPayload = {
  sub: string;
  email: string;
  name: string;
  role: UserRole;
};
