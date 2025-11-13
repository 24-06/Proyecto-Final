import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Artesano } from './artesano.entity';
import { Cliente } from './cliente.entity';

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
}
