import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fstat } from 'fs';
import { AppService } from './app.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }

  @Post('upload2')
  async uploadFile2(@Body() message: any) {
    console.log(message);
    try {
      fs.writeFileSync(process.env.UPLOAD + '/' + message.name, message.data);
    } catch (e) {
      console.error(e);
    }
  }

  private regex = /^data:.+\/(.+);base64,(.*)$/;
  @Post('upload3')
  async uploadFile3(@Body() message: any) {
    console.log(message);
    try {
      const matches = message.data.match(this.regex);
      const ext = matches[1];
      const data = matches[2];
      const buffer = Buffer.from(data, 'base64');
      fs.writeFileSync('data.' + ext, buffer);
      fs.writeFileSync(process.env.UPLOAD + '/' + message.name, buffer);
    } catch (e) {
      console.error(e);
    }
  }
}
