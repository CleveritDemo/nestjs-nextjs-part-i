// src/products/products.seeder.ts
import { faker } from "@faker-js/faker";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    // * only seed if the table is empty
    const count = await this.productRepository.count();
    if (count > 0) return;

    const products = Array.from({ length: 10 }).map(() => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image: faker.image.urlLoremFlickr({
        category: "products",
      }),
    }));

    await this.productRepository.save(products);
  }
}
