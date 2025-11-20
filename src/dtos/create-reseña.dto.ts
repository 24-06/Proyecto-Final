import { IsNotEmpty, IsInt, Min, Max, IsString, IsNumber } from 'class-validator';

export class CreateReseñaDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  productoId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  clienteId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  puntuacion: number; 

  @IsNotEmpty()
  @IsString()
  comentario: string;
}