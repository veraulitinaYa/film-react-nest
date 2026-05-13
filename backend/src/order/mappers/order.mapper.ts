import { OrderResponseDto } from '../dto/orderresponse.dto';
import { TicketResponseDto } from '../dto/ticketresponse.dto';

export function toTicketResponse(ticket: any): TicketResponseDto {
  return {
    film: ticket.film,
    session: ticket.session,
    row: ticket.row,
    seat: ticket.seat,
    price: ticket.price,
  };
}

export function toOrderResponse(order: any): OrderResponseDto {
  return {
    id: order._id.toString(),
    email: order.email,
    phone: order.phone,
    tickets: (order.tickets ?? []).map(toTicketResponse),
  };
}