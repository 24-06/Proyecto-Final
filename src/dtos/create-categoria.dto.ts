import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({ example: 'Artesanía', description: 'Nombre de la categoría' })
  nombre: string;
}