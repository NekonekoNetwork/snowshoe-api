import {
  Catch,
  HttpException,
  HttpServer,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

export type ErrorCodesStatusMapping = {
  [key: string]: number;
};

@Catch(
  Prisma?.PrismaClientKnownRequestError,
  Prisma?.PrismaClientUnknownRequestError,
  Prisma?.NotFoundError,
)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name);

  /**
   * Error codes definition for Prisma Client
   * @see https://github.com/notiz-dev/nestjs-prisma/blob/main/lib/prisma-client-exception.filter.ts
   * @see https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
   */
  private readonly errorCodesStatusMapping: ErrorCodesStatusMapping = {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2003: HttpStatus.BAD_REQUEST,
    P2025: HttpStatus.NOT_FOUND,
  };

  constructor(applicationRef: HttpServer) {
    super(applicationRef);
  }

  catch(exception: Error) {
    this.logger.error(exception);
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return this.catchClientKnownRequestError(exception);
    } else if (exception instanceof Prisma.NotFoundError) {
      return this.catchNotFoundError(exception);
    } else {
      return this.catchUnknownError(exception);
    }
  }

  private catchClientKnownRequestError(
    exception: Prisma.PrismaClientKnownRequestError,
  ): void | HttpException | Prisma.PrismaClientKnownRequestError {
    const statusCode = this.errorCodesStatusMapping[exception.code];
    if (statusCode === undefined) {
      return this.catchUnknownError(exception);
    }

    const message =
      `[${exception.code}]: ` + this.exceptionShortMessage(exception.message);
    if (!Object.keys(this.errorCodesStatusMapping).includes(exception.code)) {
      return exception;
    }

    return new HttpException({ statusCode, message }, statusCode);
  }

  private catchNotFoundError({ message }: Prisma.NotFoundError): HttpException {
    const statusCode = HttpStatus.NOT_FOUND;
    return new HttpException({ statusCode, message }, statusCode);
  }

  private catchUnknownError(exception: Error): void | HttpException {
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = this.exceptionShortMessage(exception.message);
    return new HttpException({ statusCode, message }, statusCode);
  }

  private exceptionShortMessage(message: string): string {
    const shortMessage = message.substring(message.indexOf('→'));
    return shortMessage
      .substring(shortMessage.indexOf('\n'))
      .replace(/\n/g, '')
      .trim();
  }
}
