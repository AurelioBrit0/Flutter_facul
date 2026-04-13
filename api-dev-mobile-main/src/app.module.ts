import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { env } from "./config/env";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: env.dbHost,
      port: env.dbPort,
      username: env.dbUser,
      password: env.dbPassword,
      database: env.dbName,
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
  ],
})
export class AppModule {}
