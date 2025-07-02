import { PickNextPositionInputDto, PositionResponseDto } from '../../../application';
import { UseCase } from '../../../../interfaces/use-case.interface';
import { PositionTypeResponse } from '../../enums';

export class PickNextPosition implements UseCase<PickNextPositionInputDto, PositionResponseDto> {
  execute({ playerState, positions }: PickNextPositionInputDto): PositionResponseDto {
    let nextPosition = positions[0];
    let minSeenCount = playerState.seenPosition.get(`${positions[0].x}, ${positions[0].y}`) ?? 0;

    for (const position of positions) {
      if (this.isEndPosition(position)) {
        nextPosition = position;
        break;
      }

      const seenCount = playerState.seenPosition.get(`${position.x}, ${position.y}`) ?? 0;
      if (seenCount < minSeenCount) {
        minSeenCount = seenCount;
        nextPosition = position;
      }
    }

    return nextPosition;
  }

  private isEndPosition(position: PositionResponseDto): boolean {
    return position.move && position.value === PositionTypeResponse.STOP;
  }
}
