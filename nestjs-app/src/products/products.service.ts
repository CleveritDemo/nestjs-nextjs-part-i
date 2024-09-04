import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nService } from "nestjs-i18n";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { AzureOpenAIService } from "./azure-openai.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly azureOpenAIService: AzureOpenAIService,
    private readonly i18n: I18nService
  ) {}

  /**
   * Retrieves all products from the database.
   * @returns A promise that resolves to an array of Product entities.
   */
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  /**
   * Retrieves a single product by its ID.
   * @param id - The ID of the product to retrieve.
   * @returns A promise that resolves to the Product entity.
   * @throws HttpException if the product is not found.
   */
  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new HttpException(
        await this.i18n.translate("errors.PRODUCT_NOT_FOUND"),
        HttpStatus.NOT_FOUND
      );
    }

    product.description =
      await this.azureOpenAIService.generateProductDescription(product.name);

    return product;
  }

  /**
   * Creates a new product in the database.
   * @param createProductDto - The data transfer object containing the product details.
   * @returns A promise that resolves to the created Product entity.
   * @throws HttpException if a product with the same name and description already exists.
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({
      where: {
        name: createProductDto.name,
        description: createProductDto.description,
      },
    });

    if (existingProduct) {
      throw new HttpException(
        await this.i18n.translate("errors.PRODUCT_ALREADY_EXISTS"),
        HttpStatus.CONFLICT
      );
    }

    const product = new Product();
    product.id = uuidv4();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.image = createProductDto.image;

    return this.productRepository.save(product);
  }

  /**
   * Updates an existing product in the database.
   * @param id - The ID of the product to update.
   * @param updateProductDto - The data transfer object containing the updated product details.
   * @returns A promise that resolves to the updated Product entity.
   * @throws HttpException if the product is not found.
   */
  async update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new HttpException(
        await this.i18n.translate("errors.PRODUCT_NOT_FOUND"),
        HttpStatus.NOT_FOUND
      );
    }

    product.name = updateProductDto.name;
    product.description = updateProductDto.description;
    product.image = updateProductDto.image;

    return this.productRepository.save(product);
  }

  /**
   * Deletes a product from the database.
   * @param id - The ID of the product to delete.
   * @returns A promise that resolves when the product is deleted.
   * @throws HttpException if the product is not found.
   */
  async remove(id: string): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new HttpException(
        await this.i18n.translate("errors.PRODUCT_NOT_FOUND"),
        HttpStatus.NOT_FOUND
      );
    }

    await this.productRepository.delete(id);
  }
}
