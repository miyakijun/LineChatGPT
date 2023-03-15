import { Request, Response } from "express";
import { Service } from "typedi";
import { Body, Get, JsonController, Post } from "routing-controllers";
import LineUtils from '../utils/LineUtils';

@JsonController()
@Service()
class LineController {
  constructor(private lineUtils:LineUtils) {}
  @Get("/")
  async getAllUsers(_req: Request, res: Response) {
    return { message: "Hello World" };
  }

  @Post("/webhook")
  async replyMessage(@Body() req: Request) {
    this.lineUtils.replyMessage(req);
    return 'ok';
  }
}
export default LineController;
