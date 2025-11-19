import { PartialType } from '@nestjs/swagger';
import { CreateArtesanoDto } from './create-artesano.dto';

export class UpdateArtesanoDto extends PartialType(CreateArtesanoDto) {}