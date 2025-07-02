import dotenv from 'dotenv';
dotenv.config();
import { join } from 'path';

import { App } from './app';
import {
  ConsoleLogger,
  DirectoryManager,
  FileWriterService,
  LoggerService,
} from './shared/logging';
import { MazeApiService } from './core/game/infrastructure/maze-api/maze-api.service';
import { GameFlowService, GameRulesService } from './core/game/application';
import { FileLogger } from './shared/logging/implementations/file-logger/file-logger';

const playerState = {
  name: process.env.PLAYER_NAME?.trim().toLowerCase() || '',
  attemptCount: 0,
  dead: false,
  win: false,
  position: undefined,
  seenPosition: new Map<string, number>(),
  history: [],
};
const maxAttempts = 100;
const consoleLoggerService = new LoggerService(new ConsoleLogger());

new App(
  playerState,
  new MazeApiService(process.env.API_URL || ''),
  consoleLoggerService,
  new GameRulesService(maxAttempts),
  new GameFlowService(
    consoleLoggerService,
    new LoggerService(
      new FileLogger(join(__dirname, '../logs'), new DirectoryManager(), new FileWriterService()),
    ),
  ),
).run();
