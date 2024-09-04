import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AzureOpenAIService } from "./azure-openai.service";
import { Product } from "./entities/product.entity";
import { ProductsController } from "./products.controller";
import { ProductsSeeder } from "./products.seeder";
import { ProductsService } from "./products.service";

@Module({
  imports: [TypeOrmModule.forFeature([Product]), HttpModule, ConfigModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsSeeder, AzureOpenAIService],
})
export class ProductsModule {}
