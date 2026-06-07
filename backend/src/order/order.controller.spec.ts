import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;

  const mockOrderService = {
    create: jest.fn(),
    getAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call service with dto and return result', async () => {
      const dto: CreateOrderDto = {
        email: 'test@mail.com',
        phone: '+123',
        tickets: [],
      };

      const resultMock = { total: 0, items: [] };

      mockOrderService.create.mockResolvedValue(resultMock);

      const result = await controller.create(dto);

      expect(result).toEqual(resultMock);
      expect(mockOrderService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('getAll', () => {
    it('should return all orders', async () => {
      const resultMock = {
        total: 1,
        items: [],
      };

      mockOrderService.getAll.mockResolvedValue(resultMock);

      const result = await controller.getAll();

      expect(result).toEqual(resultMock);
      expect(mockOrderService.getAll).toHaveBeenCalled();
    });
  });
});