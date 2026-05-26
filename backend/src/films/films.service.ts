import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { FilmEntity } from './entities/film.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmRepository: Repository<FilmEntity>,
  ) {}

  async findAll() {
    return this.filmRepository.find({
      relations: ['schedule'],
    });
  }

  async findSchedule(id: string) {
    const film = await this.filmRepository.findOne({
      where: { id },

      relations: ['schedule'],
    });

    if (!film) {
      throw new NotFoundException('Film not found');
    }

    return film.schedule;
  }
}