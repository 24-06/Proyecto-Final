import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pago } from './pago.entity';

@Entity('metodos_pago')
export class MetodoPago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string; 

  @Column({ nullable: true })
  descripcion: string;

  @OneToMany(() => Pago, (pago) => pago.metodo)
  pagos: Pago[]; 
}