import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto } from './create-pedido.dto';
import { IsOptional, IsString, IsIn } from 'class-validator';


export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {
    @IsOptional()
    @IsString({ message: 'El estado debe ser un texto' })
    @IsIn(['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'], { message: 'Estado no válido' })
    estado?: string;

    
}