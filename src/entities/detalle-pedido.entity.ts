import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Producto } from './producto.entity';

@Entity('detalles_pedido')
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
  pedido ?: Pedido; 

  @ManyToOne(() => Producto)
  producto: Producto; 

  @Column('int')
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_unitario ?: number; 
}