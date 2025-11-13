import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Producto } from './producto.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  cliente: Cliente;

  @ManyToOne(() => Producto)
  producto: Producto;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ default: 'pendiente' })
  estado: string;
}
