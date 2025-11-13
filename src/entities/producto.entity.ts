import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Artesano } from './artesano.entity';
import { Categoria } from './categoria.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column()
  descripcion: string;

  @ManyToOne(() => Artesano, (artesano) => artesano.productos)
  artesano: Artesano;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  categoria: Categoria;
}

