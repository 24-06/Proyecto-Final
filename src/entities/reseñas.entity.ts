// src/reseñas/reseña.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Producto } from './producto.entity';

@Entity()
export class Reseña {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  puntuacion: number;

  @Column('text')
  comentario: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.reseñas)
  usuario: Usuario;

  @ManyToOne(() => Producto)
  producto: Producto;
}
