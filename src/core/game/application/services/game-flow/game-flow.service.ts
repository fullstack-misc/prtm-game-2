import { GameFlow } from './game-flow.interface';
import { DiscoverResponseDto, PositionResponseDto } from '../../dtos';
import { LoggerService } from '../../../../../shared/logging';
import { PlayerState, PositionTypeResponse } from '../../../domain';

export class GameFlowService implements GameFlow {
  constructor(
    private readonly consoleLoggerService: LoggerService,
    private readonly fileLoggerService: LoggerService,
  ) {}

  checkConfiguration(): void {
    if (this.isConfigurationInvalid()) {
      throw new Error('🚨 API_URL and PLAYER_NAME must be set in the environment variables.');
    }
  }

  private isConfigurationInvalid(): boolean {
    return !process.env.API_URL || !process.env.PLAYER_NAME?.trim();
  }

  filterNextPositions(positions: DiscoverResponseDto) {
    return positions.filter(this.canBeNextPosition());
  }

  private canBeNextPosition(): (position: PositionResponseDto) => boolean {
    return (position: PositionResponseDto) => {
      return (
        (position.move && position.value === PositionTypeResponse.PATH) ||
        (position.move && position.value === PositionTypeResponse.STOP) ||
        (position.move && position.value === PositionTypeResponse.HOME)
      );
    };
  }

  handleDefeat(playerState: PlayerState): void {
    playerState.dead = true;
    this.consoleLoggerService.log(
      `\n💀 You died! Final position: (${playerState.position?.x}, ${playerState.position?.y})\n💔 Total attempts: ${playerState.attemptCount}`,
    );
  }

  handleInstantDefeat(playerState: PlayerState): void {
    playerState.dead = true;
    this.consoleLoggerService.log(`💀 You died immediately!`);
  }

  handleInstantVictory(playerState: PlayerState): void {
    playerState.win = true;
    this.consoleLoggerService.log(`🎉 You won immediately!`);
  }

  handleNoPathDefeat(playerState: PlayerState): void {
    playerState.dead = true;
    this.consoleLoggerService.log(
      `\n🚨 No available true paths found. Stopping discovery.\n💔 Total attempts: ${playerState.attemptCount}`,
    );
  }

  handleVictory(playerState: PlayerState): void {
    playerState.win = true;
    this.consoleLoggerService.log(
      `\n🎉 You won! Final position: (${playerState.position?.x}, ${playerState.position?.y})\n🏆 Total attempts: ${playerState.attemptCount}\n🗺️ Path taken: ${playerState.history.join(' > ')}`,
    );
  }

  writeHistoryToFile(playerState: PlayerState): void {
    this.fileLoggerService.log(
      `[LOG] ${new Date().toLocaleString()}:\nPlayer: ${playerState.name}\nWon: ${playerState.win ? '✅ Yes' : '❌ No'}\nAlive: ${playerState.dead ? '💀 No' : '🙂 Yes'}\nAttempts: ${playerState.attemptCount}.\nHistory (x, y): ${playerState.history.join(' > ')}\n\n`,
    );
    this.consoleLoggerService.log(`📝 History written to file.`);
  }
}
