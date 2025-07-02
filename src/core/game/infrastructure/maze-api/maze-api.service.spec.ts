import { MazeApiService } from './maze-api.service';
import { DiscoverException, MoveException, StartGameException } from '../../application';
import { MoveMessageResponse } from '../../domain';

global.fetch = jest.fn();
const fetchMock = fetch as jest.MockedFunction<typeof fetch>;

describe('MazeApiService', () => {
  let mazeApiService: MazeApiService;

  beforeEach(() => {
    mazeApiService = new MazeApiService('http://test-api.com/');
    fetchMock.mockClear();
  });

  describe('startGame', () => {
    it('should make POST request and return response', async () => {
      const responseMock = {
        dead: false,
        win: false,
        position_x: 0,
        position_y: 0,
      };

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => responseMock,
      } as Response);

      const result = await mazeApiService.startGame({ player: 'testPlayer' });

      expect(fetchMock).toHaveBeenCalledWith('http://test-api.com/start-game/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'player=testPlayer',
      });
      expect(result).toEqual(responseMock);
    });

    it('should throw StartGameException on server error', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response);

      await expect(mazeApiService.startGame({ player: 'testPlayer' })).rejects.toThrow(
        StartGameException,
      );
    });

    it('should throw StartGameException on client error', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      } as Response);

      await expect(mazeApiService.startGame({ player: 'testPlayer' })).rejects.toThrow(
        StartGameException,
      );
    });
  });

  describe('discover', () => {
    it('should make GET request and return positions', async () => {
      const responseMock = [
        { x: 1, y: 0, move: true, value: MoveMessageResponse.PATH },
        { x: 0, y: 1, move: true, value: MoveMessageResponse.PATH },
      ];

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => responseMock,
      } as Response);

      const result = await mazeApiService.discover('testPlayer');

      expect(fetchMock).toHaveBeenCalledWith('http://test-api.com/testPlayer/discover/', {
        method: 'GET',
      });
      expect(result).toEqual(responseMock);
    });

    it('should throw DiscoverException on error', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      await expect(mazeApiService.discover('testPlayer')).rejects.toThrow(DiscoverException);
    });
  });

  describe('move', () => {
    it('should make POST request and return move response', async () => {
      const mockResponse = {
        dead: false,
        win: false,
        position_x: 1,
        position_y: 0,
        message: 'OK',
      };

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await mazeApiService.move('testPlayer', { position_x: 1, position_y: 0 });

      expect(fetchMock).toHaveBeenCalledWith('http://test-api.com/testPlayer/move/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'position_x=1&position_y=0',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw MoveException on error', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      } as Response);

      await expect(
        mazeApiService.move('testPlayer', { position_x: 1, position_y: 0 }),
      ).rejects.toThrow(MoveException);
    });
  });
});
