import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; 

import { Usuario } from 'src/entities/usuario.entity';
import { CreateUsuarioDto } from 'src/dtos/create-usuario.dto';
import { UpdateUsuarioDto } from 'src/dtos/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
   
    const existingUser = await this.usuarioRepository.findOne({ where: { email: createUsuarioDto.email } });
    if (existingUser) {
      throw new ConflictException(`El email ${createUsuarioDto.email} ya está registrado`);
    }

    
    const hashedPassword = await bcrypt.hash(createUsuarioDto.contraseña, 10);

    
    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      password: hashedPassword, 
    });
    
    return await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      select: ['id', 'nombre', 'email', 'role'], 
    });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['artesano', 'cliente'],
      select: ['id', 'nombre', 'email', 'role'],
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id); 

    
    if (updateUsuarioDto.contraseña) {
      updateUsuarioDto.contraseña = await bcrypt.hash(updateUsuarioDto.contraseña, 10);
    }

    
    Object.assign(usuario, updateUsuarioDto);

    return await this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id); 
    await this.usuarioRepository.remove(usuario);
  }
}