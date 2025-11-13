import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Artesano } from './artesano.entity';
import { Cliente } from './cliente.entity';
import { Pedido } from './pedido.entity';
import { Reseña } from './reseñas.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contraseña: string;

  @Column({ default: 'cliente' })
  rol: string;

  @OneToOne(() => Artesano, (artesano) => artesano.usuario)
  artesano: Artesano;

  @OneToOne(() => Cliente, (cliente) => cliente.usuario)
  cliente: Cliente;

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[];

  @OneToMany(() => Reseña, (reseña) => reseña.usuario)
  reseñas: Reseña[];
}
