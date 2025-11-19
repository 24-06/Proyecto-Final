import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from 'src/entities/pago.entity';
import { Pedido } from 'src/entities/pedido.entity';
 import { CreatePagoDto } from 'src/dtos/create-pago.dto';
import { UpdatePagoDto } from 'src/dtos/update-pago.dto'; 

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
    @InjectRepository(Pedido) 
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  
  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    const { pedidoId, ...restOfData } = createPagoDto;
    
    
    const pedido = await this.pedidoRepository.findOneBy({ id: pedidoId });
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${pedidoId} no encontrado.`);
    }
    
    const pago = this.pagoRepository.create({
      ...restOfData,
      pedido: pedido,
    });

    return await this.pagoRepository.save(pago);
  }

  
  async findAll(): Promise<Pago[]> {
    return await this.pagoRepository.find({
      relations: ['pedido'], 
    });
  }

  
  async findOne(id: number): Promise<Pago> {
    const pago = await this.pagoRepository.findOne({
      where: { id },
      relations: ['pedido'],
    });

    if (!pago) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado.`);
    }

    return pago;
  }

  
  async update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    const pago = await this.findOne(id);

    
    if (updatePagoDto.pedidoId) {
      const newPedido = await this.pedidoRepository.findOneBy({ id: updatePagoDto.pedidoId });
      if (!newPedido) {
        throw new NotFoundException(`Pedido con ID ${updatePagoDto.pedidoId} no encontrado.`);
      }
      pago.pedido = newPedido;
    }
    
    Object.assign(pago, updatePagoDto);
    
    return await this.pagoRepository.save(pago);
  }


  async remove(id: number): Promise<void> {
    const pago = await this.findOne(id);
    await this.pagoRepository.remove(pago);
  }
}