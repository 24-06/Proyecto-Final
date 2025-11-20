import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateMetodoPagoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string; 

  @IsOptional()
  @IsString()
  descripcion?: string;
}