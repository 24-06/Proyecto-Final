import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreatePedidoDto {
  @IsNotEmpty({ message: 'El ID del cliente es requerido' })
  @IsNumber({}, { message: 'El ID del cliente debe ser un número válido' })
  clienteId: number;

  @IsNotEmpty({ message: 'El ID del producto es requerido' })
  @IsNumber({}, { message: 'El ID del producto debe ser un número válido' })
  productoId: number;

  @IsNotEmpty({ message: 'La cantidad es requerida' })
  @IsNumber({}, { message: 'La cantidad debe ser un número entero' })
  @Min(1, { message: 'La cantidad mínima es 1' })
  cantidad: number;
}