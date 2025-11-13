// src/pedidos/detalle-pedido.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Producto } from './producto.entity'; // ✅ ESTA ES LA CORRECTA

@Entity()
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
  pedido: Pedido;

  @ManyToOne(() => Producto)
  producto: Producto;

  @Column()
  cantidad: number;

  @Column('decimal')
  subtotal: number;
}
