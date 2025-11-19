import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Artesano } from './artesano.entity';
import { Categoria } from './categoria.entity';
import { Resena } from './resenas.entity';

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

  @OneToMany(() => Resena, (resena) => resena.producto)
  resenas: Resena[];

  @ManyToOne(() => Artesano, (artesano) => artesano.productos)
  artesano: Artesano;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  categoria: Categoria;
}

