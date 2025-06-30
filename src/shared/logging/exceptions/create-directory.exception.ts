export class CreateDirectoryException extends Error {
  constructor(message: string = 'Failed to create directory.') {
    super(message);
    this.name = 'CreateDirectoryException';
  }
}
