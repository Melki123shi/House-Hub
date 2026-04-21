import { HttpException, HttpStatus } from '@nestjs/common';

export interface AppExceptionPayload {
  message: string;
  errorCode: string;
  details?: unknown;
}

export class AppException extends HttpException {
  constructor(
    message: string,
    errorCode: string,
    statusCode: HttpStatus,
    details?: unknown,
  ) {
    const payload: AppExceptionPayload = {
      message,
      errorCode,
      details,
    };

    super(payload, statusCode);
  }
}
