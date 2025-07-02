import {
  DiscoverException,
  DiscoverResponseDto,
  MoveDto,
  MoveException,
  MoveResponseDto,
  StartGameDto,
  StartGameException,
  StartGameResponseDto,
} from '../../application';
import { MazeApi } from './maze-api.interface';

export class MazeApiService implements MazeApi {
  constructor(private readonly apiUrl: string = process.env.API_URL || '') {}

  async startGame(dto: StartGameDto): Promise<StartGameResponseDto> {
    const response = await fetch(`${this.apiUrl}start-game/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `player=${dto.player}`,
    });

    if (!response.ok) {
      this.throwError(response, StartGameException);
    }

    return (await response.json()) as StartGameResponseDto;
  }

  async discover(playerName: string): Promise<DiscoverResponseDto> {
    const response = await fetch(`${this.apiUrl}${playerName}/discover/`, {
      method: 'GET',
    });

    if (!response.ok) {
      this.throwError(response, DiscoverException);
    }

    return ((await response.json()) as DiscoverResponseDto) || [];
  }

  async move(playerName: string, dto: MoveDto): Promise<MoveResponseDto> {
    const response = await fetch(`${this.apiUrl}${playerName}/move/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `position_x=${dto.position_x}&position_y=${dto.position_y}`,
    });

    if (!response.ok) {
      this.throwError(response, MoveException);
    }

    return (await response.json()) as MoveResponseDto;
  }

  private throwError(response: Response, exceptionClass: new (message: string) => Error): void {
    if (response.status >= 500) {
      throw new exceptionClass(`🚨 Server error: ${response.statusText}`);
    }

    throw new exceptionClass(`🚨 Error: ${response.statusText}`);
  }
}
