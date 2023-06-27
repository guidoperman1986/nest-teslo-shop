import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { initialData } from './seed-data';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    private productsService: ProductsService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    const user = await this.insertUsers();
    await this.insertNewProducts(user);
    return 'SeedExecuted';
  }

  private async deleteTables() {
    await this.productsService.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder(); //para borrar la tabla de usuarios
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.user;
    const users: User[] = [];

    seedUsers.forEach((user) => {
      const encryptedPass = bcrypt.hashSync(user.password, 10);
      user.password = encryptedPass;
      users.push(this.userRepository.create(user));
    });

    const dbUsers = await this.userRepository.insert(seedUsers);
    return dbUsers.raw[0];
  }

  private async insertNewProducts(user: User) {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    products.forEach((product) => {
      insertPromises.push(this.productsService.create(product, user));
    });

    await Promise.all(insertPromises);
  }
}
