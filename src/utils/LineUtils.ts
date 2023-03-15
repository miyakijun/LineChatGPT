import { Inject ,Service} from "typedi";
import https from "https";
import AppConfig from "../AppConfig";
import OpenaiUtils from "./OpenaiUtils";
@Service()
export default class LineUtils {
  constructor(
    @Inject() private config: AppConfig,
    @Inject() private openaiUtils: OpenaiUtils
  ) {}
  async replyMessage(req: any) {
    if (req.events[0].type === "message") {
      let ai = await this.openaiUtils.createCompletion(
        req.events[0].message.text
      );

      const dataString = JSON.stringify({
        replyToken: req.events[0].replyToken,
        messages: [
          {
            type: "text",
            text: ai,
          },
        ],
      });

      // Request header
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.config.lineAccessToken,
      };

      // Options to pass into the request
      const webhookOptions = {
        hostname: "api.line.me",
        path: "/v2/bot/message/reply",
        method: "POST",
        headers: headers,
        body: dataString,
      };

      // Define request
      const request = https.request(webhookOptions, (res) => {
        res.on("data", (d) => {
          process.stdout.write(d);
        });
      });

      // Handle error
      request.on("error", (err) => {
        console.error(err);
      });

      // Send data
      request.write(dataString);
      request.end();
    }
  }
}
