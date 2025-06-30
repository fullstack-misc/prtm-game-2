import { PositionVo } from './position.vo';
import { InvalidPositionException } from '../exceptions';

describe('PositionVo', () => {
  describe('constructor', () => {
    it('should create a valid position with positive integers', () => {
      const position = new PositionVo(5, 10);

      expect(position.x).toBe(5);
      expect(position.y).toBe(10);
    });

    it('should create a valid position with zero coordinates', () => {
      const position = new PositionVo(0, 0);

      expect(position.x).toBe(0);
      expect(position.y).toBe(0);
    });

    it('should throw InvalidPositionException for negative x coordinate', () => {
      expect(() => new PositionVo(-1, 5)).toThrow(InvalidPositionException);
    });

    it('should throw InvalidPositionException for negative y coordinate', () => {
      expect(() => new PositionVo(5, -1)).toThrow(InvalidPositionException);
    });

    it('should throw InvalidPositionException for decimal x coordinate', () => {
      expect(() => new PositionVo(5.5, 10)).toThrow(InvalidPositionException);
    });

    it('should throw InvalidPositionException for decimal y coordinate', () => {
      expect(() => new PositionVo(5, 10.5)).toThrow(InvalidPositionException);
    });
  });

  describe('equals', () => {
    it('should return true for positions with same coordinates', () => {
      const position1 = new PositionVo(5, 10);
      const position2 = new PositionVo(5, 10);

      expect(position1.equals(position2)).toBe(true);
    });

    it('should return false for positions with different coordinates', () => {
      const position1 = new PositionVo(5, 10);
      const position2 = new PositionVo(5, 11);

      expect(position1.equals(position2)).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return formatted string representation', () => {
      const position = new PositionVo(5, 10);

      expect(position.toString()).toBe('(5, 10)');
    });
  });
});
