import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagosController } from './pagos.controller';
import { PagosService } from './pagos.service';
import { Pago } from 'src/entities/pago.entity';
import { Pedido } from 'src/entities/pedido.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Pago, Pedido])],
  controllers: [PagosController],
  providers: [PagosService],
  exports: [PagosService],
})
export class PagosModule {}