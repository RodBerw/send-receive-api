import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export default class UserClient {
    private static instance: UserClient;
    private client: any;
  
    constructor() {
    
      this.client = axios.create({
        timeout: 5000,
      });
    }
  
    public static getInstance() {
      if (UserClient.instance === undefined) {
        UserClient.instance = new UserClient();
      }
  
      return UserClient.instance;
    }
   
    public async validateToken(token: string){
        try{
            const queryString = token ? `?token=${token}` : '';
            const response = await this.client.get(`http://localhost:3004/token${queryString}`);
            return response.data;
        }catch(error){
            console.error('Error validating token:', error);
            return false;
        }
    }

    public async writeMessageInHistory(body: any){
        try{
            return await this.client.post('http://localhost:3005/message', body);
        }catch(error){
            return {message: 'Error writing message in history'};
        }
    }

    public async getMessageHistory(id: any){
        try{
          const usersResp = await this.client.get('http://localhost:3004/user');
          const users = usersResp.data;

          const messagesPromisse = users.map(user => {
            if((id && user.user_id == id) || !id){
              return this.client.get(`http://localhost:3005/message?id=${user.user_id}`)
            }
            return null;
          }).filter(Boolean);

          const messagesResults = await Promise.all(messagesPromisse);
          console.log(messagesResults)
          console.log(messagesResults.map(response => response.data))

          const messages = (await Promise.all(messagesPromisse)).map(response => response.data);
          console.log(messages)

          return messages;
        }catch(error){
            return {message: 'Error getting message history'};
        }
    }
}