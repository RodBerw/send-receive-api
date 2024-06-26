import { Injectable } from "@nestjs/common";
import { connect } from "amqplib";
import UserClient from "./clients/UserClient";

@Injectable()
export class Receive{
    public constructor(
        private readonly userClient: UserClient,
      ) {
        userClient = UserClient.getInstance();
      }

    public async receiveMessage(body: any) {
        const connection = await connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = `${body.user_id_send}${body.user_id_receive}`;
    
        await channel.assertQueue(queue, { durable: false })
    
        channel.consume(queue, (msg) => {
            console.log(`Message received: ${msg.content.toString()}`)

            this.userClient.writeMessageInHistory({
                user_id_send: body.user_id_send,
                user_id_receive: body.user_id_receive,
                message: msg.content.toString(),
            });
        });
    }
}