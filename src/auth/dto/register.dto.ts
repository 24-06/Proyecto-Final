import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  // Rol puede ser: 'cliente', 'artesano', 'admin'
  @IsNotEmpty()
  role: string;
}
