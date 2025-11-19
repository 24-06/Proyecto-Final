import { IsNotEmpty, IsNumber, IsString, IsIn, Min } from 'class-validator';

export class CreatePagoDto {
  @IsNotEmpty({ message: 'El ID del pedido es requerido' })
  @IsNumber({}, { message: 'El ID del pedido debe ser un número válido' })
  pedidoId: number;

  @IsNotEmpty({ message: 'El monto es requerido' })
  @IsNumber({}, { message: 'El monto debe ser un número válido' })
  @Min(0.01, { message: 'El monto debe ser positivo' })
  monto: number;

  @IsNotEmpty({ message: 'El método de pago es requerido' })
  @IsString({ message: 'El método debe ser un texto' })
  @IsIn(['tarjeta', 'transferencia', 'efectivo'], { message: 'Método no válido. Use tarjeta, transferencia o efectivo' })
  metodo: string;
}