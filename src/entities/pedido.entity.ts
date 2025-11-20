import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Producto } from './producto.entity';
import { DetallePedido } from './detalle-pedido.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  cliente: Cliente;

  @ManyToOne(() => Producto)
  producto: Producto;
  
  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido)
  detalles: DetallePedido[];

  @Column('int') 
  cantidad: number; 

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ default: 'pendiente' })
  estado: string;
}