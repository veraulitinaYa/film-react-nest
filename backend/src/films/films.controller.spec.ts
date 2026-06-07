import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;

  const mockFilmsService = {
    findAll: jest.fn(),
    findSchedule: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return total and items', async () => {
      const films = [{ id: '1' }, { id: '2' }];

      mockFilmsService.findAll.mockResolvedValue(films);

      const result = await controller.findAll();

      expect(result).toEqual({
        total: 2,
        items: films,
      });

      expect(mockFilmsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findSchedule', () => {
    it('should return schedule for film', async () => {
      const schedule = [{ id: 's1' }, { id: 's2' }];

      mockFilmsService.findSchedule.mockResolvedValue(schedule);

      const result = await controller.findSchedule('1');

      expect(result).toEqual({
        total: 2,
        items: schedule,
      });

      expect(mockFilmsService.findSchedule).toHaveBeenCalledWith('1');
    });
  });
});