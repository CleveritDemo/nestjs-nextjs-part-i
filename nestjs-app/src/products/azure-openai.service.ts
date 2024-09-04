import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AzureOpenAIService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async generateProductDescription(
    productDescription: string
  ): Promise<string> {
    const headers = {
      "Content-Type": "application/json",
      "api-key": this.configService.get("AZURE_OPENAI_KEY"),
    };

    const params = {
      "api-version": "2024-02-15-preview",
    };

    const jsonData = {
      messages: [
        {
          role: "system",
          content:
            "You are an AI wizard that helps people create product descriptions.",
        },
        {
          role: "user",
          content: productDescription,
        },
      ],
      max_tokens: 800,
      temperature: 0.7,
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p: 0.95,
      stop: null,
    };

    const { data } = await firstValueFrom(
      this.httpService.post(
        "https://clever-dev-openai.openai.azure.com/openai/deployments/chat/chat/completions",
        jsonData,
        { headers, params }
      )
    );

    // * please return the first choice
    return data.choices[0].message.content;
  }
}
