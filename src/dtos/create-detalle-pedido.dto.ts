import { ApiProperty } from '@nestjs/swagger';

export class CreateDetallePedidoDto {
  @ApiProperty({example: "3", description: 'ID del pedido asociado'})
  pedidoId: number;

  @ApiProperty({example: "4", description: 'ID del producto asociado'})
  productoId: number;

  @ApiProperty({example:"5", description: 'Cantidad del producto en el pedido'})
  cantidad: number;

  @ApiProperty({example:"6000", description: 'Precio unitario del producto en el pedido'})
  precio_unitario: number;
}