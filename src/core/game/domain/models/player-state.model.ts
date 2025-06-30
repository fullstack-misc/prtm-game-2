import { PositionVo } from '../value-objects';

export interface PlayerState {
  readonly name: string;
  attemptCount: number;
  dead: boolean;
  win: boolean;
  position?: PositionVo;
  readonly seenPosition: Map<string, number>;
  readonly history: string[];
}
