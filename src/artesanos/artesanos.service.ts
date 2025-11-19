import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artesano } from 'src/entities/artesano.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { CreateArtesanoDto } from 'src/dtos/create-artesano.dto';
import { UpdateArtesanoDto } from 'src/dtos/update-artesano.dto';

@Injectable()
export class ArtesanosService {
  constructor(
    @InjectRepository(Artesano)
    private artesanoRepo: Repository<Artesano>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async create(dto: CreateArtesanoDto) {
    const usuario = await this.usuarioRepo.findOne({
      where: { id: dto.usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException('El usuario no existe');
    }

    const artesano = this.artesanoRepo.create({
      nombre_taller: dto.nombre_taller,
      ubicacion: dto.ubicacion,
      especialidad: dto.especialidad,
      descripcion: dto.descripcion,
      usuario,
    });

    return this.artesanoRepo.save(artesano);
  }

  findAll() {
    return this.artesanoRepo.find({ relations: ['usuario', 'productos'] });
  }

  async findOne(id: number) {
    const artesano = await this.artesanoRepo.findOne({
      where: { id },
      relations: ['usuario', 'productos'],
    });

    if (!artesano) throw new NotFoundException('Artesano no encontrado');

    return artesano;
  }

  async update(id: number, dto: UpdateArtesanoDto) {
    const artesano = await this.findOne(id);

    this.artesanoRepo.merge(artesano, dto);
    return this.artesanoRepo.save(artesano);
  }

  async remove(id: number) {
    const artesano = await this.findOne(id);
    await this.artesanoRepo.remove(artesano);
    return { message: 'Artesano eliminado' };
  }
}
