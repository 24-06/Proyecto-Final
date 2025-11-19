import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePedidoDto {
  @ApiPropertyOptional()
  clienteId?: number;

  @ApiPropertyOptional()
  productoId?: number;

  @ApiPropertyOptional()
  cantidad?: number;
}
