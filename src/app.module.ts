import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './models/Message';
import { Send } from './send';
import { Receive } from './receive';
import UserClient from './clients/UserClient';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      define: {
        timestamps: false
      },
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Curitiba12345',
      database: 'trabalho',
      models: [Message],
    }),
    SequelizeModule.forFeature([Message]),
  ],
  controllers: [AppController],
  providers: [AppService, Send, Receive, UserClient],
})
export class AppModule {}
