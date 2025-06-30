import { Logger } from '../../interfaces';

export class LoggerService {
  constructor(private readonly logger: Logger) {}

  log(message: string): void {
    this.logger.log(message);
  }

  error(message: string): void {
    if (this.logger.error) {
      this.logger.error(message);
    } else {
      this.logger.log(`[ERROR] ${new Date().toLocaleString()}: ${message}`);
    }
  }
}
