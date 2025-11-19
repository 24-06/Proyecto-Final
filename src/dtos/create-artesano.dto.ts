import { IsNotEmpty, IsString, IsNumber, MinLength } from 'class-validator';

export class CreateArtesanoDto {
  @IsNotEmpty({ message: 'El nombre del taller es requerido' })
  @IsString()
  @MinLength(3, { message: 'El nombre del taller debe tener al menos 3 caracteres' })
  nombre_taller: string;

  @IsNotEmpty({ message: 'La ubicación es requerida' })
  @IsString()
  ubicacion: string;

  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  @IsNumber()
  usuarioId: number;
}