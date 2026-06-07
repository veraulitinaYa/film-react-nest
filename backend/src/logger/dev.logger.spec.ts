import { DevLogger } from './dev.logger';

describe('DevLogger', () => {
  it('should be defined', () => {
    const logger = new DevLogger();

    expect(logger).toBeDefined();
  });
});