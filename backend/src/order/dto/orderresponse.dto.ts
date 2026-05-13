import { TicketResponseDto } from "./ticketresponse.dto";

export class OrderResponseDto {
  id: string;
  email: string;
  phone: string;
  tickets: TicketResponseDto[];
}