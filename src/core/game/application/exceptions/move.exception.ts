export class MoveException extends Error {
  constructor(message: string = 'An error occurred during the move.') {
    super(message);
    this.name = 'MoveException';
  }
}
