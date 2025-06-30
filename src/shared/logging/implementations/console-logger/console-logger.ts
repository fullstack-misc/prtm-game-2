import { Logger } from '../../interfaces';

export class ConsoleLogger implements Logger {
  error(message: string): void {
    console.error(message);
  }

  log(message: string): void {
    console.log(message);
  }
}
