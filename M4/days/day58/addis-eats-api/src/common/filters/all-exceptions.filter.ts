import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch() // Catches EVERYTHING
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    // 1. Determine the status and message (The Translation)
    let status = 500;
    let message: any = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const body = exception.getResponse();
      message =
        typeof body === 'object' && 'message' in body
          ? (body as any).message
          : body;
    } else if (exception instanceof Error) {
      // If it's a random crash (e.g. TypeError), hide the message from the client
      this.logger.error(exception.message, exception.stack);
    }

    // 2. The Uniform Body Shape (Acceptance Criteria #2)
    res.status(status).json({
      statusCode: status,
      message: message,
      path: req.url,
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] ?? 'unknown',
    });
  }
}
