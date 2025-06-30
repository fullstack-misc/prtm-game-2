import { MoveDto, MoveResponseDto } from '../../application';
import { UseCase } from '../../../interfaces/use-case.interface';
import { MazeApiService } from '../../infrastructure/maze-api/maze-api.service';

export class Move implements UseCase<MoveDto, MoveResponseDto> {
  constructor(
    private readonly playerName: string,
    private readonly mazeApiService: MazeApiService,
  ) {}

  async execute(dto: MoveDto): Promise<MoveResponseDto> {
    return await this.mazeApiService.move(this.playerName, dto);
  }
}
