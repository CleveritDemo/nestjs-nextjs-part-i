import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AzureOpenAIService } from "./azure-openai.service";
import { Product } from "./entities/product.entity";
import { ProductsService } from "./products.service";

describe("ProductsService", () => {
  let service: ProductsService;
  let repository: Repository<Product>;
  let azureOpenAIService: AzureOpenAIService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
        {
          provide: AzureOpenAIService,
          useValue: azureOpenAIService,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
    azureOpenAIService = module.get<AzureOpenAIService>(AzureOpenAIService);
  });

  describe("remove", () => {
    it("should remove a product", async () => {
      const product: Product = {
        id: "1",
        name: "Test",
        description: "Test",
        image: "test.jpg",
      };
      jest.spyOn(repository, "findOne").mockResolvedValue(product);
      jest
        .spyOn(repository, "delete")
        .mockResolvedValue({ affected: 1 } as any);

      await expect(service.remove("1")).resolves.toBeUndefined();
    });

    it("should throw an exception if product not found", async () => {
      jest.spyOn(repository, "findOne").mockResolvedValue(null);

      await expect(service.remove("1")).rejects.toThrow();
    });
  });
});
