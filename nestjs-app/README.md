# NestJS Products API

This is a NestJS application that provides a RESTful API for managing products. The application uses TypeORM for persistence with a PostgreSQL database.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Seeding the Database](#seeding-the-database)
- [Using Azure OpenAI Service](#using-azure-openai-service)

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd nestjs-app
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your PostgreSQL and Azure OpenAI credentials:
    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=topsecret
    DB_DATABASE=copilot-training
    AZURE_OPENAI_KEY=your_azure_openai_key
    ```

## Running the Application

1. Start the application in development mode:
    ```sh
    npm run start:dev
    ```

2. The application will be available at `http://localhost:3000`.

## API Documentation

The API documentation is available at `http://localhost:3000/api` after starting the application. It is generated using Swagger.

## Project Structure

```filetree
nestjs-products-app
├── .gitignore
├── assets/
├── nestjs-app/
│   ├── .env
│   ├── nest-cli.json
│   ├── package.json
│   ├── README.md
│   ├── src/
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   ├── main.ts
│   │   ├── products/
│   │   │   ├── azure-openai.service.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-product.dto.ts
│   │   │   │   ├── update-product.dto.ts
│   │   │   ├── entities/
│   │   │   │   ├── product.entity.ts
│   │   │   ├── products.controller.ts
│   │   │   ├── products.module.ts
│   │   │   ├── products.seeder.ts
│   │   │   ├── products.service.ts
│   ├── tsconfig.build.json
│   ├── tsconfig.json
├── openai-call.md
├── README.md