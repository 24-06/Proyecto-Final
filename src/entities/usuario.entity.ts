import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Artesano } from './artesano.entity';
import { Cliente } from './cliente.entity';
import { Resena } from './resenas.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column({ default: 'cliente' })
  role?: string;

  @OneToMany(() => Resena, (resena) => resena.usuario)
  resenas?: Resena[];

  @OneToOne(() => Artesano, (artesano) => artesano.usuario)
  artesano?: Artesano;

  @OneToOne(() => Cliente, (cliente) => cliente.usuario)
  cliente?: Cliente;
}
