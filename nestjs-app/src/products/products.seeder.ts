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
    // * only create producst if there are none
    const productsCount = await this.productRepository.count();

    if (productsCount > 0) return;

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
