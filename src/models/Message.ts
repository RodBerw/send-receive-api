import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

@Table
export class Message extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  message_id: number;

  @Column(DataType.STRING)
  message: string;

  @Column(DataType.INTEGER)
  user_id_send: number;

  @Column(DataType.INTEGER)
  user_id_receive: number;

  
}
