import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Film, FilmDocument } from './schemas/film.schema';

@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Film.name)
    private filmModel: Model<FilmDocument>,
  ) {}

  async findAll() {
    return this.filmModel.find();
  }

  async findSchedule(id: string) {
    const film = await this.filmModel.findOne({ id });

    return film?.schedule ?? [];
  }
}