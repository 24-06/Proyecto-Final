import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Producto } from './producto.entity';

@Entity('resenas')
export class Resena {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comentario: string;

  @Column({ type: 'int' })
  calificacion: number;

  // Reseña pertenece a un usuario
  @ManyToOne(() => Usuario, (usuario) => usuario.resenas, { eager: true })
  usuario: Usuario;

  // Reseña pertenece a un producto
  @ManyToOne(() => Producto, (producto) => producto.resenas, { eager: true })
  producto: Producto;
}
