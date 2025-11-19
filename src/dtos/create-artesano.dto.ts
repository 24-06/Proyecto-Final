import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateArtesanoDto {

  @IsNumber()
  usuarioId?: number;

  @IsString()
  @IsNotEmpty()
  nombre_taller: string;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;

  @IsString()
  @IsNotEmpty()
  especialidad?: string;

  @IsString()
  @IsNotEmpty()
  descripcion?: string;
}
