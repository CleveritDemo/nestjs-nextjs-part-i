# First Activity
- Node with NestJS
- React with NextJS (next laboratory)

## Objectives
- Create NestJS project using GitHub Copilot from a Scratch.
- Using GHCS to create a Postgres Container.
- Setting up the Nest Config using .env file.
- Connect to Database.
- Create Seeder file to populate the database.
- Create Update and Delete Methods.
- Create a Better description of the products using Azure Open AI.
- Add Swagger Documentation.
- Create README.md file with Developer Docs of the project.
- Export Chat to Developer Docs.
- Create Unit Testing for Services (Optional Homework 🪙)

# Backend Development

**Requirements**

- VS Code version 
- Docker for Desktop
- Node Installed (nvm optional)
- GitHub CLI + GitHub Copilot Extension Enabled 
- Insomnia or Postman or any Rest Client Installed.
- GitHub CLI 


## Step 1: Create a NestJS Project using GitHub Copilot


```
@workspace /new "create a nestjs 9 application with one entity called products, this entity has 4 attributes, id: string, name: string, description: string, image: string, using typeorm 0.3.20 for persistence and Postgres adapter"
```

- Select this folder as your workspace to create the project.
- Install the dependencies using `npm install`

**GitHub Command**

```
ghcs "how to run a postgres using docker in my local"
```

- Run the command that ghc suggest run pg locally.

- Copilot will suggest a command to run a postgres container in your local machine like this:

```bash
docker run --rm --name postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres:latest
```

## Check database connection

- Use DBeaver or Datagrip to connect to the server and create a database called `copilot`

![alt text](assets/image.png)

Go to `app.module.ts` 

```
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'copilot',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
}),
```

## Check if application run successfully

```bash
npm run start
```

## Troubleshooting

Sometimes copilot don't create the project with the correct dependencies, so you need to install them manually.

```bash
npm install @nestjs/typeorm class-validator
```


## Setting Nest Config

- Ask for good practices to the github copilot chat in order to use other approach to don't harcode the env-vars in app.module.ts

> could you suggest good practices in order to use other approach to don't harcode the env-vars in app.module.ts using @nestjs/config?

- Copilot will suggest to create a `.env` file in the root of the project.

```bash
touch .env
```

- Add the following content to the `.env` file.
- Use GH Copilot Chat selecting #file:app.module.ts to generate keys that will be used in the `.env` file.

## Step 2: Connect to Database

- Replace the keys in `.env` file with the values that we use to run the docker container.

## Step 3: Check methods and make modifications

- Check product service ask to copilot how to add support to uuid for generate the id of the product.

> could you suggest how to add support to uuid for generate the id of the product?

- Copilot will suggest installing the `uuid` package.

```bash
npm install uuid
```

- Add the following code to the `product.entity.ts` file.

```typescript
import { v4 as uuidv4 } from 'uuid';
```

- Add modifications to make it work

## Step 4: Create a Seeder file to populate the database

> Ask in copilot chat how to create a seeder file to populate the database with some products using @faker-js/faker and onModuleInit

- Copilot will suggest installing the `@faker-js/faker` package.

```bash
npm install @faker-js/faker
```

- Create a `product.seeder.service.ts` file in the `src/seeder` folder.

```typescript
import { faker } from "@faker-js/faker";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";

@Injectable()
export class ProductsSeeder implements OnModuleInit {
  constructor(private readonly productsService: ProductsService) {}

  async onModuleInit() {
    await this.seedProducts();
  }

  async seedProducts() {
    for (let i = 0; i < 10; i++) {
      const product: CreateProductDto = {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        image: faker.image.urlLoremFlickr({
          category: "products",
        }),
      };
      await this.productsService.create(product);
    }
  }
}
```

- Lets add a condition to only seed the products if the table is empty using Comment Driven Development.
- Use copilot suggestion and use `Ctrl + Enter` so see all the suggestion and apply the changes.

```typescript
    const products = await this.productsService.getProducts();

    if (products.length > 0) {
      return;
    }
```


- Add the seeder to the `products.module.ts` file.

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsSeeder],
})

```

- Run the application and check if the products are being seeded in your db client.

## Step 5: Create Update and Delete Methods

- Using comment driven development add the login for Update and Create Methods
- Using chat create a UpdateProductDto 

> create a UpdateProductDto that extends from #file:create-product.dto.ts and add id as a attribute

- Test the new methods using Insomnia or Postman

## Step 6: Create a Better description of the products using Azure Open AI

- We are going to use the translate and refactor characteristics of GitHub Copilot to translate a call made in python to NodeJS.

```python
import requests

headers = {
    'Content-Type': 'application/json',
    'api-key': 'YOUR_API_KEY',
}

params = {
    'api-version': '2024-02-15-preview',
}

json_data = {
    'messages': [
        {
            'role': 'system',
            'content': 'You are an ai wizard that helps people create product descriptions.',
        },
        {
            'role': 'user',
            'content': 'nike',
        }
    ],
    'max_tokens': 800,
    'temperature': 0.7,
    'frequency_penalty': 0,
    'presence_penalty': 0,
    'top_p': 0.95,
    'stop': None,
}

response = requests.post(
    'https://clever-dev-openai.openai.azure.com/openai/deployments/chat/chat/completions',
    params=params,
    headers=headers,
    json=json_data,
)
```

> Using copilot chat reference the openai-call.md to translate in NestJS code using axios to call the Azure Open AI API.

> translate this implementation #file:openai-call.md to node (nestjs) using @nestjs/axios

## Step 7: Add Swagger Documentation

- Ask copilot how to add swagger documentation to the project.

> could you suggest how to add swagger documentation to the project?

## Step 8: Create README.md file with Developer Docs of the project

- Ask copilot how to create a README.md file with the developer docs of the project.

> @workspace "create a README.md file with the developer docs of the project"

## Step 9: Export Chat to Developer Docs

- Press `Ctrl + Shift + P` and select `Chat: Export Chat`
- This will generate a json file with all the chat history.
- Try to export the chat in a new VS Code windows pressing `Ctrl + Shift + P` and select `Chat: Import Chat`
- This will generate a new chat with all the history, this will help other developers to understand the decisions made during the development.

## Add gitignore file

- Use `Ctrl + i` and tell to copilot to create a gitignore file to nestjs project.

```
# Dependency directories
node_modules/

# Build output
dist/

# Environment variables
.env

# IDE files
.vscode/
.idea/

# Logs
logs/

# Compiled TypeScript files
*.js

# Nest.js specific files
.nest/
```

## Step 10: Create Unit Testing for Services (Optional Homework 🪙)

- Ask copilot how to add Jest Support to the project.

> could you suggest how to add Jest Support to the project?

- Copilot will suggest installing the `@nestjs/jest` package.

```bash
npm install @nestjs/jest
```

- Follow the instructions in the documentation to add Jest support to the project.





