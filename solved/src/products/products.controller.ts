import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./product.entity";
import { ProductsService } from "./products.service";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Get a product by ID
  @Get(":id")
  @ApiOperation({ summary: "Get a product by ID" })
  @ApiResponse({
    status: 200,
    description: "Return a single product",
    type: Product,
  })
  @ApiResponse({ status: 404, description: "Product not found" })
  @ApiParam({
    name: "id",
    required: true,
    description: "The product ID",
    type: String,
  })
  async getProductById(@Param("id") id: string): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  // Get all products
  @Get()
  @ApiOperation({ summary: "Get all products" })
  @ApiResponse({
    status: 200,
    description: "Return all products",
    type: [Product],
  })
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  // Create a new product
  @Post()
  @ApiOperation({ summary: "Create a new product" })
  @ApiResponse({
    status: 201,
    description: "The product has been successfully created.",
    type: Product,
  })
  @ApiBody({ type: CreateProductDto, description: "Product creation data" })
  async createProduct(
    @Body() createProductDto: CreateProductDto
  ): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  // Update a product
  @Put(":id")
  @ApiOperation({ summary: "Update a product" })
  @ApiResponse({
    status: 200,
    description: "The product has been successfully updated.",
    type: Product,
  })
  @ApiResponse({ status: 404, description: "Product not found" })
  @ApiParam({
    name: "id",
    required: true,
    description: "The product ID to update",
    type: String,
  })
  @ApiBody({ type: UpdateProductDto, description: "Product update data" })
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return this.productsService.updateProduct(updateProductDto);
  }
}
