import { InvalidPositionException } from '../exceptions';

export class PositionVo {
  constructor(
    private readonly _x: number,
    private readonly _y: number,
  ) {
    if (this.isInvalid(_x, _y)) {
      throw new InvalidPositionException('Invalid position: x and y must be integers.');
    }
  }

  private isInvalid(x: number, y: number): boolean {
    return (
      this.hasDecimals(x) || this.hasDecimals(y) || this.isOutOfBounds(x) || this.isOutOfBounds(y)
    );
  }

  private hasDecimals(coordinate: number): boolean {
    return !Number.isInteger(coordinate);
  }

  private isOutOfBounds(coordinate: number) {
    return coordinate < 0;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  equals(other: PositionVo): boolean {
    return this._x === other._x && this._y === other._y;
  }

  toString(): string {
    return `(${this._x}, ${this._y})`;
  }
}
