import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';

import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';

import { TypeOrmModule } from '@nestjs/typeorm';

// entidades
import { Usuario } from 'src/entities/usuario.entity';
import { Artesano } from 'src/entities/artesano.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Producto } from 'src/entities/producto.entity';
import { Pedido } from 'src/entities/pedido.entity';
import { Categoria } from 'src/entities/categoria.entity';
import { Pago } from 'src/entities/pago.entity';
import { Resena } from './entities/resenas.entity';

// módulos
import { UsuariosModule } from './usuarios/usuarios.module';
import { ArtesanosModule } from './artesanos/artesanos.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { PagosModule } from './pagos/pagos.module';
import { ResenasModule } from './reseñas/resenas.module';


@Module({
  imports: [
    // 📌 1. Cargar variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),

    // 📌 2. Conectar TypeORM usando las variables del .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('database.host'),
        port: config.get<number>('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.database'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    // 📌 3. Tus módulos
    UsuariosModule,
    ArtesanosModule,
    ClientesModule,
    ProductosModule,
    CategoriasModule,
    PedidosModule,
    PagosModule,
    ResenasModule,
    Usuario,
    Artesano,
    Cliente,
    Producto,
    Pedido,
    Categoria,
    Pago,
    Resena,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
