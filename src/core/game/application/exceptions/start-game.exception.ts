export class StartGameException extends Error {
  constructor(message: string = 'An error occurred while starting the game.') {
    super(message);
    this.name = 'StartGameException';
  }
}
