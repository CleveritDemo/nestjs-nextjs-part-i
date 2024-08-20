import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
    });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.id = uuidv4(); // Generate a UUID for the product ID
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.image = createProductDto.image;

    return this.productRepository.save(product);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    product.name = updateProductDto.name;
    product.description = updateProductDto.description;
    product.image = updateProductDto.image;

    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
