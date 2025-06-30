import { GameRules } from './game-rules.interface';
import { MoveMessageResponse, PlayerState } from '../../../domain';

export class GameRulesService implements GameRules {
  constructor(public readonly maxAttempts: number) {}

  hasReachedMaxAttempts(playerState: PlayerState): boolean {
    return playerState.attemptCount >= this.maxAttempts;
  }

  isMoveForbidden(message: string) {
    return message === MoveMessageResponse.FORBIDDEN || message === MoveMessageResponse.WALL;
  }

  isGameOver(playerState: PlayerState): boolean {
    return playerState.dead || playerState.win || this.hasReachedMaxAttempts(playerState);
  }

  isPlayerWin(playerState: PlayerState): boolean {
    return playerState.win;
  }

  isPlayerDead(playerState: PlayerState): boolean {
    return playerState.dead;
  }
}
