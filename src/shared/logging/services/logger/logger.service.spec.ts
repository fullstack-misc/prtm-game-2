import { LoggerService } from './logger.service';
import { Logger } from '../../interfaces/logger.interface';

describe('LoggerService', () => {
  it('should log messages', () => {
    const loggerMock: Logger = { log: jest.fn() };
    const service = new LoggerService(loggerMock);

    service.log('hello');

    expect(loggerMock.log).toHaveBeenCalledWith('hello');
  });

  it('should call logger.error if available', () => {
    const loggerMock: Logger = { log: jest.fn(), error: jest.fn() };
    const service = new LoggerService(loggerMock);

    service.error('err');

    expect(loggerMock.error).toHaveBeenCalledWith('err');
  });

  it('should fallback to log when error not defined', () => {
    const loggerMock: Logger = { log: jest.fn() };
    const service = new LoggerService(loggerMock);

    service.error('err');

    expect(loggerMock.log).toHaveBeenCalled();
  });
});
