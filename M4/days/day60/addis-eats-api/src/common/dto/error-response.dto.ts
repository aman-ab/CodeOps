import { ApiProperty } from '@nestjs/swagger';

// Every failure in the API has this body (Day 58). Documented ONCE, pointed at by every error response.
export class ErrorResponseDto {
  @ApiProperty({ example: 404 })
  statusCode!: number;

  @ApiProperty({
    description: 'A sentence, or an array of sentences when validation fails (one per problem).',
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
    example: 'Order 99999 not found',
  })
  message!: string | string[];

  @ApiProperty({ example: '/api/v1/orders/99999' })
  path!: string;

  @ApiProperty({ example: '2026-11-21T08:30:00.000Z' })
  timestamp!: string;

  @ApiProperty({
    description: 'The x-request-id of this request. Quote it when reporting a problem.',
    nullable: true,
    example: 'e3c1-88af',
  })
  requestId!: string | null;
}
