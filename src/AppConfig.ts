import { Service } from "typedi";
@Service()
export default class AppConfig {
  public openApiKey: string = process.env.OPENAI_API_KEY ?? "";
  public lineAccessToken: string = process.env.LINE_ACCESS_TOKEN ?? "";

}
