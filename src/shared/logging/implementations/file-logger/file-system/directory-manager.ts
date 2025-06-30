import { mkdirSync } from 'fs';

export class DirectoryManager {
  create(directory: string): string {
    mkdirSync(directory, { recursive: true });

    return directory;
  }
}
