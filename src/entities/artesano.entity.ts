import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Producto } from './producto.entity';
import { Resena } from './resenas.entity';

@Entity('artesanos')
export class Artesano {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre_taller: string;

  @Column()
  ubicacion: string;

  @Column()
  especialidad: string;

  @Column()
  descripcion: string;

  @OneToOne(() => Usuario, (usuario) => usuario.artesano)
  @JoinColumn()
  usuario: Usuario;

  @OneToMany(() => Producto, (producto) => producto.artesano)
  productos: Producto[];

}
