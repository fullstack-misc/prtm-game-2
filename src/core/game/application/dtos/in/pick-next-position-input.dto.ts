import { PositionResponseDto } from './position-response.dto';
import { PlayerState } from '../../../domain';

export type PickNextPositionInputDto = {
  playerState: PlayerState;
  positions: PositionResponseDto[];
};
