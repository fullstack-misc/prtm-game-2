import { GameRulesService } from './game-rules.service';
import { MoveMessageResponse, PlayerState } from '../../../domain';

describe('GameRulesService', () => {
  const maxAttempts = 10;
  let playerState: PlayerState;
  let gameRulesService: GameRulesService;

  beforeEach(() => {
    gameRulesService = new GameRulesService(maxAttempts);
    playerState = {
      name: 'test',
      attemptCount: 0,
      win: false,
      dead: false,
      position: undefined,
      seenPosition: new Map(),
      history: [],
    };
  });

  it('should return true if player is dead', () => {
    expect(gameRulesService.isGameOver({ ...playerState, dead: true })).toEqual(true);
  });

  it('should return true if player has won', () => {
    expect(gameRulesService.isGameOver({ ...playerState, win: true })).toEqual(true);
  });

  it('should return true if player has reached max attempts', () => {
    expect(gameRulesService.isGameOver({ ...playerState, attemptCount: maxAttempts })).toEqual(
      true,
    );
  });

  it('should return false if player is alive and has not won or reached max attempts', () => {
    expect(gameRulesService.isGameOver(playerState)).toEqual(false);
  });

  it('should return true if player has reached max attempts', () => {
    expect(gameRulesService.isGameOver({ ...playerState, attemptCount: maxAttempts + 1 })).toEqual(
      true,
    );
  });

  it('should return false if player is alive and has not won or reached max attempts', () => {
    expect(gameRulesService.isGameOver(playerState)).toEqual(false);
  });

  it('should return false if player has not reached max attempts', () => {
    expect(gameRulesService.hasReachedMaxAttempts(playerState)).toEqual(false);
  });

  it('should detect max attempts reached', () => {
    expect(
      gameRulesService.hasReachedMaxAttempts({ ...playerState, attemptCount: maxAttempts }),
    ).toEqual(true);
  });

  it('should detect max attempts reached when over max attempts ', () => {
    expect(
      gameRulesService.hasReachedMaxAttempts({ ...playerState, attemptCount: maxAttempts + 1 }),
    ).toEqual(true);
  });

  it('should detect forbidden move message', () => {
    expect(gameRulesService.isMoveForbidden(MoveMessageResponse.FORBIDDEN)).toEqual(true);
    expect(gameRulesService.isMoveForbidden(MoveMessageResponse.WALL)).toEqual(true);
  });

  it('should detect win or death', () => {
    expect(gameRulesService.isPlayerWin({ ...playerState, win: true })).toEqual(true);
    expect(gameRulesService.isPlayerDead({ ...playerState, dead: true })).toEqual(true);
  });

  describe('isPlayerWin', () => {
    it('should return true when player has won', () => {
      playerState.win = true;

      expect(gameRulesService.isPlayerWin(playerState)).toBe(true);
    });

    it('should return false when player has not won', () => {
      expect(gameRulesService.isPlayerWin(playerState)).toBe(false);
    });
  });

  describe('isPlayerDead', () => {
    it('should return true when player is dead', () => {
      playerState.dead = true;

      expect(gameRulesService.isPlayerDead(playerState)).toBe(true);
    });

    it('should return false when player is alive', () => {
      expect(gameRulesService.isPlayerDead(playerState)).toBe(false);
    });
  });
});
