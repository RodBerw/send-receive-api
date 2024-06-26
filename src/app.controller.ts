import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Send } from './send';
import { Receive } from './receive';
import UserClient from './clients/UserClient';

@Controller('message')
export class AppController {
  public constructor(private readonly appService: AppService, private readonly send: Send, private readonly receive: Receive, private userClient: UserClient) {
    userClient = UserClient.getInstance();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  public async sendMessageToQueue(@Body() body: any, @Headers('authorization') token: string) {
    if(await this.userClient.validateToken(token)){
      var data;
      try{
        data = this.send.sendMessage(body);
        this.userClient.writeMessageInHistory(body);
        return data;
      }catch(error){
        console.error('Error sending message:', error);
        return {message: 'Error sending message'};
      }
    }else{
      return {message: 'Token not valid'};
    }
  }

  @Post('/worker')
  @HttpCode(HttpStatus.OK)
  public async updateMessagesBasedOnQueue(@Body() body: any, @Headers('authorization') token: string) {
    if(await this.userClient.validateToken(token)){
      var data;
      try{
        data = this.receive.receiveMessage(body);
        return data;
      }catch(error){
        console.error('Error receiving message:', error);
        return {message: 'Error receiving message'};
      }
    }else{
      return {message: 'Token not valid'};
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getMessage(@Query('user_id') id: number, @Headers('authorization') token: string) {
    if(await this.userClient.validateToken(token)){
      try{
        return this.userClient.getMessageHistory(id);
      }catch(error){
        console.error('Error getting message:', error);
        return {message: 'Error getting message'};
      }
    }else{
      return {message: 'Token not valid'};
    }
  }
}
