import { UseCase } from '../../../interfaces/use-case.interface';
import { DiscoverResponseDto } from '../../application';
import { MazeApiService } from '../../infrastructure/maze-api/maze-api.service';

export class Discover implements UseCase<string, DiscoverResponseDto> {
  constructor(private readonly mazeApiService: MazeApiService) {}

  async execute(playerName: string): Promise<DiscoverResponseDto> {
    return await this.mazeApiService.discover(playerName);
  }
}
