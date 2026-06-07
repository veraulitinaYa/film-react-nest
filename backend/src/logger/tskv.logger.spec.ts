import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call console.log with TSKV formatted string', () => {
    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    logger.log('Test message');

    expect(consoleSpy).toHaveBeenCalled();

    const loggedValue = consoleSpy.mock.calls[0][0];

    expect(loggedValue).toContain('level=log');
    expect(loggedValue).toContain('message=Test message');
    expect(loggedValue).toContain('timestamp=');

    expect(loggedValue).toContain('\t');
  });

  it('should log error level correctly', () => {
    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    logger.error('Error message');

    const loggedValue = consoleSpy.mock.calls[0][0];

    expect(loggedValue).toContain('level=error');
    expect(loggedValue).toContain('message=Error message');
  });
});