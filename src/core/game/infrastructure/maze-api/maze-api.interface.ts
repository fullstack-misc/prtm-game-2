import {
  DiscoverResponseDto,
  MoveDto,
  MoveResponseDto,
  StartGameDto,
  StartGameResponseDto,
} from '../../application';

export interface MazeApi {
  startGame(dto: StartGameDto): Promise<StartGameResponseDto>;
  discover(playerName: string): Promise<DiscoverResponseDto>;
  move(playerName: string, dto: MoveDto): Promise<MoveResponseDto>;
}
