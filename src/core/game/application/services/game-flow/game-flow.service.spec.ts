import { LoggerService } from '../../../../../shared/logging';
import { GameFlowService } from './game-flow.service';
import { PositionTypeResponse } from '../../../domain';
import { DiscoverResponseDto } from '../../dtos';

describe('GameFlowService', () => {
  let gameFlowService: GameFlowService;
  let consoleLoggerMock: jest.Mocked<LoggerService>;
  let fileLoggerMock: jest.Mocked<LoggerService>;

  beforeEach(() => {
    consoleLoggerMock = new LoggerService({} as any) as jest.Mocked<LoggerService>;
    fileLoggerMock = new LoggerService({} as any) as jest.Mocked<LoggerService>;
    gameFlowService = new GameFlowService(consoleLoggerMock, fileLoggerMock);

    consoleLoggerMock.log = jest.fn();
    consoleLoggerMock.error = jest.fn();
    fileLoggerMock.log = jest.fn();
    fileLoggerMock.error = jest.fn();

    gameFlowService = new GameFlowService(consoleLoggerMock, fileLoggerMock);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('checkConfiguration', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...originalEnv };
    });

    afterAll(() => {
      process.env = originalEnv;
    });

    it('should not throw if config is valid', () => {
      process.env.API_URL = 'http://example.com/';
      process.env.PLAYER_NAME = 'Alice';

      expect(() => gameFlowService.checkConfiguration()).not.toThrow();
    });

    it('should throw if API_URL or PLAYER_NAME is missing', () => {
      delete process.env.API_URL;
      process.env.PLAYER_NAME = 'Bob';

      expect(() => gameFlowService.checkConfiguration()).toThrow();
    });
  });

  describe('filterNextPositions', () => {
    it('should filter only valid next positions', () => {
      const positions: DiscoverResponseDto = [
        { x: 0, y: 0, move: false, value: PositionTypeResponse.WALL },
        { x: 1, y: 0, move: true, value: PositionTypeResponse.PATH },
        { x: 1, y: 1, move: true, value: PositionTypeResponse.STOP },
        { x: 1, y: 2, move: true, value: PositionTypeResponse.TRAP },
      ];

      const result = gameFlowService.filterNextPositions(positions);

      expect(result).toEqual([positions[1], positions[2]]);
    });

    it('should return empty array when no valid positions', () => {
      const positions: DiscoverResponseDto = [
        { x: 1, y: 1, move: false, value: PositionTypeResponse.WALL },
        { x: 2, y: 1, move: false, value: PositionTypeResponse.WALL },
        { x: 3, y: 1, move: false, value: PositionTypeResponse.WALL },
        { x: 4, y: 1, move: false, value: PositionTypeResponse.TRAP },
      ];

      const result = gameFlowService.filterNextPositions(positions);

      expect(result).toHaveLength(0);
    });
  });
});
