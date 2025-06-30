export interface Logger {
  log(message: string, filePath?: string): void;
  error?(message: string): void;
}
