import { PlayerState } from '../../../domain/models/player-state.model';

export interface GameRules {
  hasReachedMaxAttempts(playerState: PlayerState): boolean;
  isMoveForbidden(message: string): boolean;
  isGameOver(playerState: PlayerState): boolean;
  isPlayerWin(playerState: PlayerState): boolean;
  isPlayerDead(playerState: PlayerState): boolean;
}
