import { ApiProperty } from '@nestjs/swagger';

export class CreatePagoDto {
  @ApiProperty({ example: 1, description: 'ID del pedido' })
  pedidoId: number;

  @ApiProperty({ example: 50000, description: 'Valor pagado' })
  valor: number;

  @ApiProperty({ example: '2025-11-19', description: 'Fecha del pago' })
  fecha: string;
}