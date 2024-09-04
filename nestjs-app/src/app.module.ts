import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HeaderResolver, I18nModule } from "nestjs-i18n";
import * as path from "path";
import { ProductsModule } from "./products/products.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_DATABASE"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loaderOptions: {
        path: path.join(__dirname, "/i18n/"),
        watch: true,
      },
      resolvers: [new HeaderResolver(["x-custom-lang"])],
    }),
    ProductsModule,
  ],
})
export class AppModule {}
