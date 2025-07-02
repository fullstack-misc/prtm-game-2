import { PositionResponseDto } from '../../dtos';
import { PlayerState } from '../../../domain';

export interface GameFlow {
  checkConfiguration(): void;
  filterNextPositions(positions: PositionResponseDto[]): PositionResponseDto[];
  handleDefeat(playerState: PlayerState): void;
  handleInstantDefeat(playerState: PlayerState): void;
  handleInstantVictory(playerState: PlayerState): void;
  handleNoPathDefeat(playerState: PlayerState): void;
  handleVictory(playerState: PlayerState): void;
  writeHistoryToFile(playerState: PlayerState): void;
}
