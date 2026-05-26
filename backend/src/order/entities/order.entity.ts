import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { TicketEntity } from './ticket.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToMany(
    () => TicketEntity,
    (ticket) => ticket.order,
    {
      cascade: true,
    },
  )
  tickets: TicketEntity[];
}