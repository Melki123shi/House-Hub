import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor() {
    super('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

export class RequestTimeoutException extends HttpException {
  constructor() {
    super('Request Timeout', HttpStatus.REQUEST_TIMEOUT);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super('Not Found', HttpStatus.NOT_FOUND, {
      cause: message,
      description: message,
    });
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super('Bad Request', HttpStatus.BAD_REQUEST, {
      cause: message,
      description: message,
    });
  }
}

export class BadGatewayException extends HttpException {
  constructor() {
    super('Bad Gateway', HttpStatus.BAD_GATEWAY);
  }
}
