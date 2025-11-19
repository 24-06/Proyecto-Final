import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from 'src/entities/pedido.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Producto } from 'src/entities/producto.entity';
import { CreatePedidoDto } from 'src/dtos/create-pedido.dto'; 
import { UpdatePedidoDto } from 'src/dtos/update-pedido.dto'; 

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  
  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const { clienteId, productoId, cantidad } = createPedidoDto;
    
    
    const cliente = await this.clienteRepository.findOneBy({ id: clienteId });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${clienteId} no encontrado.`);
    }

    
    const producto = await this.productoRepository.findOneBy({ id: productoId });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${productoId} no encontrado.`);
    }
    
    
    const totalPedido = producto.precio * cantidad;

    
    const nuevoPedido = this.pedidoRepository.create({
        cliente: cliente,
        producto: producto,
        cantidad: cantidad, 
        total: totalPedido, 
        estado: 'pendiente', 
    });

    return await this.pedidoRepository.save(nuevoPedido);
  }

  
  async findAll(): Promise<Pedido[]> {
    return await this.pedidoRepository.find({
      relations: ['cliente', 'producto'],
    });
  }

  
  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['cliente', 'producto'],
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado.`);
    }

    return pedido;
  }

  
  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);
    
    let productoActual = pedido.producto;
    let cantidadActual = pedido.cantidad;
    
    if (updatePedidoDto.clienteId) {
        const clienteTemp = await this.clienteRepository.findOneBy({ id: updatePedidoDto.clienteId });

        if (!clienteTemp) {
            throw new NotFoundException(`Cliente con ID ${updatePedidoDto.clienteId} no encontrado.`);
        }
        
        pedido.cliente = clienteTemp;
    }

    
    if (updatePedidoDto.productoId || updatePedidoDto.cantidad) {
        
      
        if (updatePedidoDto.cantidad) {
            cantidadActual = updatePedidoDto.cantidad;
            pedido.cantidad = cantidadActual;
        }

        
        if (updatePedidoDto.productoId) {
            const productoTemp = await this.productoRepository.findOneBy({ id: updatePedidoDto.productoId });
            
            if (!productoTemp) {
                throw new NotFoundException(`Producto con ID ${updatePedidoDto.productoId} no encontrado.`);
            }
            productoActual = productoTemp;
            pedido.producto = productoActual;
        }

       
        pedido.total = productoActual.precio * cantidadActual;
    }
    
    
    Object.assign(pedido, updatePedidoDto);
    
    return await this.pedidoRepository.save(pedido);
  }

  async remove(id: number): Promise<void> {
    const pedido = await this.findOne(id);
    await this.pedidoRepository.remove(pedido); 
  }
}