import { FileWriterService } from './file-system/file-writer.service';
import { Logger } from '../../interfaces';
import { DirectoryManager } from './file-system/directory-manager';
import { CreateDirectoryException, FileLoggerException } from '../../exceptions';

export class FileLogger implements Logger {
  constructor(
    private readonly filePath: string,
    private readonly directoryManager: DirectoryManager,
    private readonly fileWriterService: FileWriterService,
  ) {}

  createDirectory(): string {
    try {
      return this.directoryManager.create(this.filePath);
    } catch (error) {
      throw new CreateDirectoryException(
        `Failed to create directory: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  log(message: string): void {
    try {
      this.createDirectory();
      this.fileWriterService.appendLogFile(this.filePath, message);
    } catch (error) {
      throw new FileLoggerException(
        `Failed to write log to file: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}
