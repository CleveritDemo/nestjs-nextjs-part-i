import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OpenAIService } from "./openai.service";
import { Product } from "./product.entity";
import { ProductsSeeder } from "./product.seeder";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
  imports: [TypeOrmModule.forFeature([Product]), HttpModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsSeeder, OpenAIService],
})
export class ProductsModule {}
