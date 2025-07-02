import { PickNextPosition } from './pick-next-position';
import { PlayerState } from '../../models';
import { PositionVo } from '../../value-objects';
import { PickNextPositionInputDto } from '../../../application/dtos/in/pick-next-position-input.dto';
import { PositionTypeResponse } from '../../enums';

describe('PickNextPosition', () => {
  let pickNextPosition: PickNextPosition;
  let playerState: PlayerState;

  beforeEach(() => {
    pickNextPosition = new PickNextPosition();
    playerState = {
      name: 'testPlayer',
      attemptCount: 0,
      dead: false,
      win: false,
      position: new PositionVo(0, 0),
      seenPosition: new Map([
        ['1, 1', 2],
        ['2, 1', 1],
        ['3, 1', 0],
      ]),
      history: [],
    };
  });

  describe('write', () => {
    it('should prioritize STOP position over others', () => {
      const input: PickNextPositionInputDto = {
        playerState,
        positions: [
          { x: 1, y: 1, move: true, value: PositionTypeResponse.PATH },
          { x: 2, y: 1, move: true, value: PositionTypeResponse.STOP },
          { x: 3, y: 1, move: true, value: PositionTypeResponse.PATH },
        ],
      };

      const result = pickNextPosition.execute(input);

      expect(result.value).toBe(PositionTypeResponse.STOP);
      expect(result.x).toBe(2);
      expect(result.y).toBe(1);
    });

    it('should choose position with lowest seen count when no STOP', () => {
      const input: PickNextPositionInputDto = {
        playerState,
        positions: [
          { x: 1, y: 1, move: true, value: PositionTypeResponse.PATH },
          { x: 2, y: 1, move: true, value: PositionTypeResponse.PATH },
          { x: 3, y: 1, move: true, value: PositionTypeResponse.PATH },
        ],
      };

      const result = pickNextPosition.execute(input);

      expect(result.x).toBe(3);
      expect(result.y).toBe(1);
    });

    it('should return first position when all have same seen count', () => {
      playerState.seenPosition.clear();

      const input: PickNextPositionInputDto = {
        playerState,
        positions: [
          { x: 1, y: 1, move: true, value: PositionTypeResponse.PATH },
          { x: 2, y: 1, move: true, value: PositionTypeResponse.PATH },
          { x: 3, y: 1, move: true, value: PositionTypeResponse.PATH },
        ],
      };

      const result = pickNextPosition.execute(input);

      expect(result.x).toBe(1);
      expect(result.y).toBe(1);
    });

    it('should handle unseen positions (undefined in map)', () => {
      const input: PickNextPositionInputDto = {
        playerState,
        positions: [
          { x: 1, y: 1, move: true, value: PositionTypeResponse.PATH },
          { x: 5, y: 5, move: true, value: PositionTypeResponse.PATH },
        ],
      };

      const result = pickNextPosition.execute(input);

      expect(result.x).toBe(5);
      expect(result.y).toBe(5);
    });
  });
});
