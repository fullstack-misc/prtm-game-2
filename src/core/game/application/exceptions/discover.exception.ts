export class DiscoverException extends Error {
  constructor(message: string = 'An error occurred during the discovery.') {
    super(message);
    this.name = 'DiscoverException';
  }
}
