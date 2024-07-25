import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom } from "rxjs";

@Injectable()
export class OpenAIService {
  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async callAzureOpenAI(product: string): Promise<string> {
    const headers = {
      "Content-Type": "application/json",
      "api-key": this.configService.get("AZURE_OPEN_AI_KEY"),
    };

    const params = {
      "api-version": "2024-02-15-preview",
    };

    const json_data = {
      messages: [
        {
          role: "system",
          content:
            "You are an ai wizard that helps people create product descriptions.",
        },
        {
          role: "user",
          content: product,
        },
      ],
      max_tokens: 800,
      temperature: 0.7,
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p: 0.95,
      stop: null,
    };

    const response = await lastValueFrom(
      this.httpService.post(
        "https://clever-dev-openai.openai.azure.com/openai/deployments/chat/chat/completions",
        json_data,
        { headers: headers, params: params }
      )
    );

    const { data } = response;

    // * return first choice
    return data.choices[0].message.content;
  }
}
