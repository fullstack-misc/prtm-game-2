import { GameFlowService, GameRulesService, MoveDto, StartGameDto } from './core/game/application';
import {
  Discover,
  Move,
  PickNextPosition,
  PlayerState,
  PositionVo,
  StartGame,
} from './core/game/domain';
import { MazeApiService } from './core/game/infrastructure/maze-api/maze-api.service';
import { LoggerService } from './shared/logging';
import { PickNextPositionInputDto } from './core/game/application/dtos/in/pick-next-position-input.dto';

export class App {
  constructor(
    private readonly playerState: PlayerState,
    private readonly mazeApiService: MazeApiService,
    private readonly consoleLoggerService: LoggerService,
    private readonly gameRulesService: GameRulesService,
    private readonly gameFlowService: GameFlowService,
  ) {}

  public async run(): Promise<void> {
    try {
      this.consoleLoggerService.log('🚀 Starting application...');
      this.gameFlowService.checkConfiguration();
      await this.startGame();

      while (!this.gameRulesService.isGameOver(this.playerState)) {
        await this.discoverAndMove();
      }

      if (this.gameRulesService.hasReachedMaxAttempts(this.playerState)) {
        this.consoleLoggerService.log(
          `⏳ Maximum attempts reached (${this.gameRulesService.maxAttempts}).`,
        );
      }

      this.gameFlowService.writeHistoryToFile(this.playerState);
    } catch (error) {
      this.consoleLoggerService.error(error instanceof Error ? error.message : String(error));
    }
  }

  private async startGame(): Promise<void> {
    const startGameDto: StartGameDto = {
      player: this.playerState.name,
    };
    const data = await new StartGame(this.mazeApiService).execute(startGameDto);
    this.playerState.dead = data.dead;
    this.playerState.win = data.win;
    this.playerState.position = new PositionVo(data.position_x, data.position_y);
    this.playerState.seenPosition.set(`${data.position_x},${data.position_y}`, 1);

    if (this.gameRulesService.isPlayerDead(this.playerState)) {
      this.gameFlowService.handleInstantDefeat(this.playerState);
      return;
    }
    if (this.gameRulesService.isPlayerWin(this.playerState)) {
      this.gameFlowService.handleInstantVictory(this.playerState);
      return;
    }

    this.consoleLoggerService.log(
      `🎮 Game started successfully for player: ${this.playerState.name}`,
    );
  }

  private async discoverAndMove(): Promise<void> {
    this.consoleLoggerService.log('\n🔍 Discovering paths...');

    const positionsData = await new Discover(this.mazeApiService).execute(this.playerState.name);
    const filteredNextPositions = this.gameFlowService.filterNextPositions(positionsData);
    if (filteredNextPositions.length === 0) {
      this.gameFlowService.handleNoPathDefeat(this.playerState);
      return;
    }

    const pickNextPositionInputDto: PickNextPositionInputDto = {
      playerState: this.playerState,
      positions: filteredNextPositions,
    };
    const pickedNextPosition = new PickNextPosition().execute(pickNextPositionInputDto);
    await this.moveToPosition(new PositionVo(pickedNextPosition.x, pickedNextPosition.y));
  }

  private async moveToPosition(position: PositionVo): Promise<void> {
    this.consoleLoggerService.log(`🚶 Moving to position (${position.x}, ${position.y})...`);

    const moveDto: MoveDto = {
      position_x: position.x,
      position_y: position.y,
    };
    const data = await new Move(this.playerState.name, this.mazeApiService).execute(moveDto);
    this.playerState.attemptCount++;

    if (this.gameRulesService.isMoveForbidden(data.message)) {
      this.consoleLoggerService.log(`🚨 Move forbidden. Retrying...`);
      return;
    }

    this.playerState.dead = data.dead;
    this.playerState.win = data.win;
    this.playerState.position = new PositionVo(data.position_x, data.position_y);
    this.playerState.history.push(`(${data.position_x}, ${data.position_y})`);
    this.consoleLoggerService.log(
      `✅ Moved to position (${data.position_x}, ${data.position_y}). Attempts: ${this.playerState.attemptCount}`,
    );

    if (this.gameRulesService.isPlayerDead(this.playerState)) {
      this.gameFlowService.handleDefeat(this.playerState);
      return;
    }
    if (this.gameRulesService.isPlayerWin(this.playerState)) {
      this.gameFlowService.handleVictory(this.playerState);
      return;
    }

    const key = `${data.position_x}, ${data.position_y}`;
    this.playerState.seenPosition.set(key, (this.playerState.seenPosition.get(key) ?? 0) + 1);
  }
}
