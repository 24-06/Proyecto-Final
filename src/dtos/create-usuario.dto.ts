import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo del usuario' })
  nombre: string;

  @ApiProperty({ example: 'juan@email.com', description: 'Correo electrónico único' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Contraseña del usuario' })
  contraseña: string;

  @ApiProperty({ example: 'admin', description: 'Rol del usuario' })
  role: string;
}