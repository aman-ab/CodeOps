import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AREAS, Area } from '../../restaurants/restaurant.types';

// "bole" / "BOLE" / "bOLe" -> "Bole". "bole,piassa" -> ["Bole", "Piassa"] (Day 57's list
// convention). "adama" -> 400. A pipe may TRANSFORM, not only reject.
// Shape and normalisation ONLY: no store lookups (that is the service's job).
@Injectable()
export class ParseAreaPipe
  implements PipeTransform<string | string[] | undefined, Area[] | undefined>
{
  transform(value: string | string[] | undefined, metadata: ArgumentMetadata): Area[] | undefined {
    if (value === undefined || value === '') return undefined; // absent = no filter

    const parts = (Array.isArray(value) ? value : [value])
      .flatMap((v) => v.split(','))
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    return parts.map((part) => {
      const normalised = part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      const hit = AREAS.find((a) => a === normalised);
      if (!hit) {
        throw new BadRequestException(`${metadata.data} must be one of: ${AREAS.join(', ')}`);
      }
      return hit;
    });
  }
}
