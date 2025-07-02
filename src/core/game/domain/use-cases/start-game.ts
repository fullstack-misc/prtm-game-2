import { StartGameDto, StartGameResponseDto } from '../../application';
import { UseCase } from '../../../interfaces/use-case.interface';
import { MazeApiService } from '../../infrastructure/maze-api/maze-api.service';

export class StartGame implements UseCase<StartGameDto, StartGameResponseDto> {
  constructor(private readonly mazeApiService: MazeApiService) {}

  async execute(dto: StartGameDto): Promise<StartGameResponseDto> {
    return await this.mazeApiService.startGame(dto);
  }
}
