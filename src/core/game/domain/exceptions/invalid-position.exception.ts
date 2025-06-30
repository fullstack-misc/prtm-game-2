export class InvalidPositionException extends Error {
  constructor(message: string = 'Invalid position provided.') {
    super(message);
    this.name = 'InvalidPositionException';
  }
}
