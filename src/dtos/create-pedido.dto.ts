import { ApiProperty } from '@nestjs/swagger';

export class CreatePedidoDto {
  @ApiProperty()
  clienteId: number;

  @ApiProperty()
  productoId: number;

  @ApiProperty()
  cantidad: number;
}
