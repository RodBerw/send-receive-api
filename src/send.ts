import { Injectable } from "@nestjs/common";

@Injectable()
export class Send{
    public async sendMessage(body: any) {
        const amqp = require('amqplib/callback_api');

        await amqp.connect('amqp://localhost', function(error0, connection){
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                var queue = `${body.user_id_send}${body.user_id_receive}`;
                var msg = body.message;
            
                channel.assertQueue(queue, {durable: false});
            
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
                console.log("Message", msg, "sent to:", queue);
                return {message: 'message sent with success'};
            });
            // connection.channel.close();
            // connection.close();
        });  
        return {message: 'message sent with success'};
    }
}

