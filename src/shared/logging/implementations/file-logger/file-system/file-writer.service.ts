import { appendFileSync } from 'fs';
import { join } from 'path';

export class FileWriterService {
  appendLogFile(path: string, content: string): void {
    const filePath = join(path, 'history.log');

    appendFileSync(filePath, content, 'utf8');
  }
}
