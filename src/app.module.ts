import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Artesano } from 'src/entities/artesano.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Producto } from 'src/entities/producto.entity';
import { Pedido } from 'src/entities/pedido.entity';
import { Categoria } from 'src/entities/categoria.entity';
import { Pago } from 'src/entities/pago.entity';
import { DetallePedido } from './entities/detalle_pedido.entity';
import { Reseña } from './entities/reseñas.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      //cambiar por sus entornos de base de datos
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Adriana2004',
      database: 'raices_cordoba',
      autoLoadEntities: true,
      entities: [Usuario, Artesano, Cliente, Producto, Pedido, Categoria, Pago],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Usuario,
      Artesano,
      Cliente,
      Producto,
      Pedido,
      Categoria,
      Pago,
      Pedido,
      DetallePedido,
      Reseña,
    ]),
  ],
})
export class AppModule {}
