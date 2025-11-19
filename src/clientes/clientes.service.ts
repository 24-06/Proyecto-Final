import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from 'src/entities/cliente.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { CreateClienteDto } from 'src/dtos/create-cliente.dto';
import { UpdateClienteDto } from 'src/dtos/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Usuario) 
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const { usuarioId } = createClienteDto;
    
    
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado.`);
    }

   
    const existingCliente = await this.clienteRepository.findOne({ where: { usuario: { id: usuarioId } } });
    if (existingCliente) {
        throw new ConflictException(`El Usuario ID ${usuarioId} ya está asociado a un perfil de Cliente.`);
    }

    const cliente = this.clienteRepository.create({
      usuario: usuario, 
    });

    return await this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find({
      relations: ['usuario', 'pedidos'],
    });
  }

  
  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['usuario', 'pedidos'],
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado.`);
    }

    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id); 
    
    
    return await this.clienteRepository.save(cliente);
  }


  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id); 
    await this.clienteRepository.remove(cliente);
  }
}