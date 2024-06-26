import { Injectable } from '@nestjs/common';
import { Message } from './models/Message';
import { InjectModel } from '@nestjs/sequelize';
import { Send } from './send';

@Injectable()
export class AppService {
  public constructor(
    @InjectModel(Message)
    private message : typeof Message,
    private readonly send: Send,
  ) {}
  
  public async createMessage(body: any) {
    try {
      const newMessage = await this.message.create(body);
      return {message: 'mesage sended with success', newMessage};
    } catch (error) {
      console.error('Error creating message:', error);
      throw new Error('Could not create message');
    }
  }
}
