import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { OpenAIService } from "./openai.service";
import { Product } from "./product.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly openAIService: OpenAIService
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create({
      id: uuidv4(),
      ...createProductDto,
    });
    return this.productRepository.save(product);
  }

  async getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProductById(id: string): Promise<Product> {
    const storedProduct = await this.productRepository.findOne({
      where: { id },
    });

    if (!storedProduct) {
      throw new BadRequestException("Product not found");
    }

    // * we need to improve our product description, let's use OpenAI to generate a better one
    const description = await this.openAIService.callAzureOpenAI(
      storedProduct.name
    );

    return {
      ...storedProduct,
      description,
    };
  }

  async updateProduct(updateProductDto: UpdateProductDto): Promise<Product> {
    const { id } = updateProductDto;

    const product = await this.getProductById(id);

    if (!product) {
      throw new BadRequestException("Product not found");
    }

    Object.assign(product, updateProductDto);

    return this.productRepository.save(product);
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.getProductById(id);

    if (!product) {
      throw new BadRequestException("Product not found");
    }

    await this.productRepository.delete(id);
  }
}
