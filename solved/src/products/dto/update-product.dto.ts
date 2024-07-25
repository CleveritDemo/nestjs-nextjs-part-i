import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateProductDto } from "./create-product.dto";

export class UpdateProductDto extends CreateProductDto {
  @ApiProperty({
    example: "Product ID",
    description: "The ID of the product to update",
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
