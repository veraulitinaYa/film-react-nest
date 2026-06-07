
import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call console.log with valid JSON', () => {
    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    logger.log('Test message');

    expect(consoleSpy).toHaveBeenCalled();

    const loggedValue = consoleSpy.mock.calls[0][0];

    const parsed = JSON.parse(loggedValue);

    expect(parsed.level).toBe('log');
    expect(parsed.message).toBe('Test message');
    expect(parsed).toHaveProperty('timestamp');
  });

  it('should log error level correctly', () => {
    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    logger.error('Error message');

    const loggedValue = consoleSpy.mock.calls[0][0];

    const parsed = JSON.parse(loggedValue);

    expect(parsed.level).toBe('error');
    expect(parsed.message).toBe('Error message');
  });
});