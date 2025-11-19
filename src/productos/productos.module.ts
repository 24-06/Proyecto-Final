import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { Producto } from 'src/entities/producto.entity';
import { Artesano } from 'src/entities/artesano.entity'; 
import { Categoria } from 'src/entities/categoria.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Artesano, Categoria])], 
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ProductosService],
})
export class ProductosModule {}