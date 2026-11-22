import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '../dto/error-response.dto';

// One line per documented failure: "when does this happen?" is what a client needs
// before writing its error handler. The generator cannot know it.
export const ApiError = (status: number, description: string) =>
  applyDecorators(ApiResponse({ status, description, type: ErrorResponseDto }));

// ?area= is bound with ParseAreaPipe, not a DTO field, so Swagger cannot see it on its own.
export const ApiAreaQuery = () =>
  ApiQuery({
    name: 'area',
    required: false,
    type: String,
    description: 'Delivery area: Bole, Kazanchis, Piassa or Megenagna. Any letter case. Several allowed, comma separated.',
    example: 'Bole,Piassa',
  });
