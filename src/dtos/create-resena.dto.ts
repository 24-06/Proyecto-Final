import { ApiProperty } from '@nestjs/swagger';

export class CreateResenaDto {
  @ApiProperty()
  usuarioId: number;       // <- agregado

  @ApiProperty()
  productoId: number;

  @ApiProperty()
  comentario: string;

  @ApiProperty()
  calificacion: number;
}
