import { Controller, Get } from '@nestjs/common';

@Controller('films')
export class FilmsController {
  @Get()
  findAll() {
    return { message: 'films ok' };
  }
}
