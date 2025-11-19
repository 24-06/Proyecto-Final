import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
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
    private readonly artesanoRepository: Repository<Artesano>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}


  async create(createArtesanoDto: CreateArtesanoDto): Promise<Artesano> {
    const { usuarioId } = createArtesanoDto;
    
   
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado.`);
    }

    
    const existingArtesano = await this.artesanoRepository.findOne({ where: { usuario: { id: usuarioId } } });
    if (existingArtesano) {
        throw new ConflictException(`El Usuario ID ${usuarioId} ya está asociado a un perfil de Artesano.`);
    }

    
    const artesano = this.artesanoRepository.create({
      ...createArtesanoDto,
      usuario: usuario, 
    });

    return await this.artesanoRepository.save(artesano);
  }


  async findAll(): Promise<Artesano[]> {
    return await this.artesanoRepository.find({
      relations: ['usuario', 'productos'],
    });
  }

  
  async findOne(id: number): Promise<Artesano> {
    const artesano = await this.artesanoRepository.findOne({
      where: { id },
      relations: ['usuario', 'productos'],
    });

    if (!artesano) {
      throw new NotFoundException(`Artesano con ID ${id} no encontrado.`);
    }

    return artesano;
  }


  async update(id: number, updateArtesanoDto: UpdateArtesanoDto): Promise<Artesano> {
    const artesano = await this.findOne(id); 
    
    
    Object.assign(artesano, updateArtesanoDto);
    
    return await this.artesanoRepository.save(artesano);
  }


  async remove(id: number): Promise<void> {
    const artesano = await this.findOne(id); 
    await this.artesanoRepository.remove(artesano);
  }
}