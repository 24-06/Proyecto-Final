import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido)
  pedido: Pedido;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column()
  metodo: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;
}
