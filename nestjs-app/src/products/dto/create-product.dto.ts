import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({ description: "The name of the product" })
  name: string;

  @ApiProperty({ description: "The description of the product" })
  description: string;

  @ApiProperty({ description: "The image URL of the product" })
  image: string;
}
