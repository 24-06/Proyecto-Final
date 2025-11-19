import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resena } from 'src/entities/resenas.entity';
import { CreateResenaDto } from 'src/dtos/create-resena.dto';
import { UpdateResenaDto } from 'src/dtos/update-resena.dto';
import { Usuario } from 'src/entities/usuario.entity';
import { Producto } from 'src/entities/producto.entity';

@Injectable()
export class ResenasService {
  constructor(
    @InjectRepository(Resena)
    private resenaRepo: Repository<Resena>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,

    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
  ) {}

  async create(dto: CreateResenaDto) {
    const usuario = await this.usuarioRepo.findOne({ where: { id: dto.usuarioId }});
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const producto = await this.productoRepo.findOne({ where: { id: dto.productoId }});
    if (!producto) throw new NotFoundException('Producto no encontrado');

    const resena = this.resenaRepo.create({
      comentario: dto.comentario,
      calificacion: dto.calificacion,
      usuario,
      producto,
    });

    return this.resenaRepo.save(resena);
  }

  findAll() {
    return this.resenaRepo.find({
      relations: ['usuario', 'producto'],
    });
  }

  async findOne(id: number) {
    const resena = await this.resenaRepo.findOne({
      where: { id },
      relations: ['usuario', 'producto'],
    });

    if (!resena) throw new NotFoundException('Reseña no encontrada');
    return resena;
  }

  async update(id: number, dto: UpdateResenaDto) {
    const resena = await this.findOne(id);
    this.resenaRepo.merge(resena, dto);
    return this.resenaRepo.save(resena);
  }

  async remove(id: number) {
    const resena = await this.findOne(id);
    return this.resenaRepo.remove(resena);
  }
}
