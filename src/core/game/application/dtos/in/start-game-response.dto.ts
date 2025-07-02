export interface StartGameResponseDto {
  player: string;
  message: string;
  position_x: number;
  position_y: number;
  dead: boolean;
  win: boolean;
  url_move: string;
  url_discover: string;
}
