// src/app.module.ts (CORREGIDO Y COMPLETO)

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// --- 1. Importaciones de Entidades (solo para TypeOrmModule.forRoot) ---
import { Usuario } from 'src/entities/usuario.entity';
import { Artesano } from 'src/entities/artesano.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Producto } from 'src/entities/producto.entity';
import { Pedido } from 'src/entities/pedido.entity';
import { Categoria } from 'src/entities/categoria.entity';
import { Pago } from 'src/entities/pago.entity';
import { UsuariosModule } from './usuarios/usuarios.module'; 
import { ArtesanosModule } from './artesanos/artesanos.module'; 
import { ClientesModule } from './clientes/clientes.module'; 
import { ProductosModule } from './productos/productos.module'; 
import { CategoriasModule } from './categorias/categorias.module'; 
import { PedidosModule } from './pedidos/pedidos.module'; 
import { PagosModule } from './pagos/pagos.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      // cambiar por sus entornos de base de datos
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'raicesdb',
      autoLoadEntities: true,
      entities: [Usuario, Artesano, Cliente, Producto, Pedido, Categoria, Pago],
      synchronize: true,
    }),
    
    
    UsuariosModule,
    ArtesanosModule,
    ClientesModule,
    ProductosModule,
    CategoriasModule,
    PedidosModule,
    PagosModule,

  ],
})
export class AppModule {}