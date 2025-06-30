export class FileLoggerException extends Error {
  constructor(message: string = 'Failed to log to file.') {
    super(message);
    this.name = 'FileLoggerException';
  }
}
