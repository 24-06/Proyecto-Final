import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { Cliente } from 'src/entities/cliente.entity';
import { Usuario } from 'src/entities/usuario.entity'; 
@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Usuario])], 
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService],
})
export class ClientesModule {}