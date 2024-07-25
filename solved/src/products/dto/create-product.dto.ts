import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    example: "Product name",
    description: "The name of the product",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Product description",
    description: "The description of the product",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: "Product image",
    description: "The image of the product",
  })
  @IsString()
  @IsNotEmpty()
  image: string;
}
