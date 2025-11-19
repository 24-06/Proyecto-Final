import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({ example: 'Carlos López', description: 'Nombre del cliente' })
  nombre: string;

  @ApiProperty({ example: 'carlos@email.com', description: 'Correo del cliente' })
  email: string;

  @ApiProperty({ example: 1, description: 'ID del usuario asociado' })
  usuarioId: number;
}