import { FileLogger } from './file-logger';
import { DirectoryManager } from './file-system/directory-manager';
import { FileWriterService } from './file-system/file-writer.service';

describe('FileLogger', () => {
  const directoryManagerMock: DirectoryManager = { create: jest.fn().mockReturnValue('/logs') };
  const fileWriterService: FileWriterService = { appendLogFile: jest.fn() };
  const logger = new FileLogger('/logs', directoryManagerMock, fileWriterService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should write log to file', () => {
    logger.log('hello');

    expect(directoryManagerMock.create).toHaveBeenCalled();
    expect(fileWriterService.appendLogFile).toHaveBeenCalledWith('/logs', 'hello');
  });

  it('should throw CreateDirectoryException on dir failure', () => {
    (directoryManagerMock.create as jest.Mock).mockImplementationOnce(() => {
      throw new Error('mkdir error');
    });

    expect(() => logger.log('test')).toThrow('Failed to create directory');
  });

  it('should throw FileLoggerException on file write failure', () => {
    (fileWriterService.appendLogFile as jest.Mock).mockImplementationOnce(() => {
      throw new Error('write error');
    });

    expect(() => logger.log('test')).toThrow('Failed to write log to file');
  });
});
