import { Inject, Service } from "typedi";
import { Configuration, OpenAIApi } from "openai";
import AppConfig from "../AppConfig";
@Service()
export default class OpenaiUtils {
  openai: any;
  constructor(@Inject() private config: AppConfig) {
    const configuration = new Configuration({
      apiKey: config.openApiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }
  async createCompletion(str: string) {
    try {
      const completion = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: str }],
        temperature: 0.6,
        max_tokens: 1000,
      });
      console.log("completion", JSON.stringify(completion.data, null, 2));
      return completion.data.choices[0].message.content;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          `Error with OpenAI API request: ${
            error.message ? error.message : "error"
          }`
        );
      }
    }
  }
}
