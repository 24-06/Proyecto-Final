import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({ example: 'Collar artesanal', description: 'Nombre del producto' })
  nombre: string;

  @ApiProperty({ example: 10000, description: 'Precio del producto' })
  precio: number;

  @ApiProperty({ example: 1, description: 'ID de la categoría' })
  categoriaId: number;

  @ApiProperty({ example: 1, description: 'ID del artesano' })
  artesanoId: number;
}