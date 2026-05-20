import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { OrderEntity } from './order.entity';

@Entity('tickets')
export class TicketEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  film: string;

  @Column()
  session: string;

  @Column()
  row: number;

  @Column()
  seat: number;

  @Column('float')
  price: number;

  @ManyToOne(
    () => OrderEntity,
    (order) => order.tickets,
  )
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;
}