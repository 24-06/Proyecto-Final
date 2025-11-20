import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetodoPago } from 'src/entities/metodo-pago.entity';
import { CreateMetodoPagoDto } from 'src/dtos/create-metodo-pago.dto';
import { UpdateMetodoPagoDto } from 'src/dtos/update-metodo-pago.dto';

@Injectable()
export class MetodosPagoService {
  constructor(
    @InjectRepository(MetodoPago)
    private readonly metodoPagoRepository: Repository<MetodoPago>,
  ) {}

  async create(createMetodoPagoDto: CreateMetodoPagoDto): Promise<MetodoPago> {
    const nuevoMetodo = this.metodoPagoRepository.create(createMetodoPagoDto);
    return await this.metodoPagoRepository.save(nuevoMetodo);
  }

  async findAll(): Promise<MetodoPago[]> {
    return this.metodoPagoRepository.find();
  }

  async findOne(id: number): Promise<MetodoPago> {
    const metodo = await this.metodoPagoRepository.findOneBy({ id });
    if (!metodo) {
      throw new NotFoundException(`Método de pago con ID ${id} no encontrado.`);
    }
    return metodo;
  }

  async update(id: number, updateMetodoPagoDto: UpdateMetodoPagoDto): Promise<MetodoPago> {
    const metodo = await this.metodoPagoRepository.findOneBy({ id });
    if (!metodo) {
      throw new NotFoundException(`Método de pago con ID ${id} no encontrado.`);
    }
    
    Object.assign(metodo, updateMetodoPagoDto);
    return await this.metodoPagoRepository.save(metodo);
  }

  async remove(id: number): Promise<void> {
    const result = await this.metodoPagoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Método de pago con ID ${id} no encontrado.`);
    }
  }
}