export class CustomError extends Error {
  statusCode: number;
  success: boolean;
  constructor(message: string, statusCode: number, success: boolean = false) {
    super(message);
    this.statusCode = statusCode;
    this.success = success;
  }
}

export const throwError = (message: string, statusCode: number) => {
  throw new CustomError(message, statusCode);
};
