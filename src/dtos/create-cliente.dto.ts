import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  @IsNumber({}, { message: 'El ID del usuario debe ser un número válido' })
  readonly usuarioId: number; 
}