import { ConsoleLogger } from './console-logger';

describe('ConsoleLogger', () => {
  let consoleLogger: ConsoleLogger;
  let consoleLoggerSpy: {
    log: jest.SpyInstance;
    error: jest.SpyInstance;
  };

  beforeEach(() => {
    consoleLogger = new ConsoleLogger();
    consoleLoggerSpy = {
      log: jest.spyOn(console, 'log').mockImplementation(),
      error: jest.spyOn(console, 'error').mockImplementation(),
    };
  });

  afterEach(() => {
    consoleLoggerSpy.log.mockRestore();
    consoleLoggerSpy.error.mockRestore();
  });

  describe('log', () => {
    it('should call console.log with message', () => {
      const message = 'Test log message';

      consoleLogger.log(message);

      expect(consoleLoggerSpy.log).toHaveBeenCalledWith(message);
    });
  });

  describe('error', () => {
    it('should call console.error with message', () => {
      const message = 'Test error message';

      consoleLogger.error(message);

      expect(consoleLoggerSpy.error).toHaveBeenCalledWith(message);
    });
  });
});
