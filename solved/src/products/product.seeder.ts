import { faker } from "@faker-js/faker";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";

@Injectable()
export class ProductsSeeder implements OnModuleInit {
  constructor(private readonly productsService: ProductsService) {}

  async onModuleInit() {
    await this.seedProducts();
  }

  async seedProducts() {
    // * this run only once when the app starts and if is empty
    const products = await this.productsService.getProducts();
    if (products.length > 0) {
      return;
    }

    for (let i = 0; i < 10; i++) {
      const product: CreateProductDto = {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        image: faker.image.urlLoremFlickr({
          category: "products",
        }),
      };
      await this.productsService.createProduct(product);
    }
  }
}
