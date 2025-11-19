import { IsNotEmpty, IsString, IsNumber, MinLength, Min } from 'class-validator';

export class CreateProductoDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre: string;

  @IsNotEmpty({ message: 'El precio es requerido' })
  @IsNumber({}, { message: 'El precio debe ser un número válido' })
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  precio: number;

  @IsNotEmpty({ message: 'La descripción es requerida' })
  @IsString({ message: 'La descripción debe ser un texto' })
  @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres' })
  descripcion: string;

  @IsNotEmpty({ message: 'El ID del artesano es requerido' })
  @IsNumber({}, { message: 'El ID del artesano debe ser un número válido' })
  artesanoId: number;

  @IsNotEmpty({ message: 'El ID de la categoría es requerido' })
  @IsNumber({}, { message: 'El ID de la categoría debe ser un número válido' })
  categoriaId: number;
}