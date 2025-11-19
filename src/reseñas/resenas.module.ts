import { Module } from '@nestjs/common';
import { ResenasService } from './resenas.service';
import { ResenasController } from './resenas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resena } from 'src/entities/resenas.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { Producto } from 'src/entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resena, Usuario, Producto])],
  controllers: [ResenasController],
  providers: [ResenasService],
})
export class ResenasModule {}