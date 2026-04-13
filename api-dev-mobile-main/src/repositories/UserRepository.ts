import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomUUID } from "crypto";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/UserEntity";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userOrmRepository: Repository<UserEntity>
  ) {}

  async create(name: string, email: string, passwordHash: string, role: UserEntity["role"]): Promise<UserEntity> {
    const user = this.userOrmRepository.create({
      id: randomUUID(),
      name,
      email,
      passwordHash,
      role,
    });
    return this.userOrmRepository.save(user);
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return (
      (await this.userOrmRepository
        .createQueryBuilder("user")
        .where("LOWER(user.email) = LOWER(:email)", { email })
        .getOne()) ?? undefined
    );
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    return (await this.userOrmRepository.findOne({ where: { id } })) ?? undefined;
  }
}
