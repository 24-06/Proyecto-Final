import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallePedido } from '../entities/detalle-pedido.entity';
import { Pedido } from '../entities/pedido.entity';
import { Producto } from '../entities/producto.entity';
import { CreateDetallePedidoDto } from 'src/dtos/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from 'src/dtos/update-detalle-pedido.dto';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(DetallePedido)
    private detallePedidoRepository: Repository<DetallePedido>,
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async create(createDetallePedidoDto: CreateDetallePedidoDto) {
    // Validar que pedidoId no sea 0 o undefined
    if (!createDetallePedidoDto.pedidoId || createDetallePedidoDto.pedidoId <= 0) {
      throw new BadRequestException('El ID del pedido debe ser un número válido mayor a 0');
    }

    // Validar que productoId no sea 0 o undefined
    if (!createDetallePedidoDto.productoId || createDetallePedidoDto.productoId <= 0) {
      throw new BadRequestException('El ID del producto debe ser un número válido mayor a 0');
    }

    // Verificar que el pedido existe
    const pedido = await this.pedidoRepository.findOne({
      where: { id: createDetallePedidoDto.pedidoId }
    });

    if (!pedido) {
      throw new NotFoundException(
        `Pedido con ID ${createDetallePedidoDto.pedidoId} no encontrado`
      );
    }

    // Verificar que el producto existe
    const producto = await this.productoRepository.findOne({
      where: { id: createDetallePedidoDto.productoId }
    });

    if (!producto) {
      throw new NotFoundException(
        `Producto con ID ${createDetallePedidoDto.productoId} no encontrado`
      );
    }

    // Crear el detalle del pedido
    const detalle = this.detallePedidoRepository.create({
      cantidad: createDetallePedidoDto.cantidad,
      precio_unitario: createDetallePedidoDto.precio_unitario,
      pedido: pedido,
      producto: producto,
    });

    return await this.detallePedidoRepository.save(detalle);
  }

  // Obtener todos los detalles de pedidos
  async findAll() {
    return await this.detallePedidoRepository.find({
      relations: ['pedido', 'producto'],
    });
  }

  // Obtener un detalle de pedido por ID
  async findOne(id: number) {
    const detalle = await this.detallePedidoRepository.findOne({
      where: { id },
      relations: ['pedido', 'producto'],
    });

    if (!detalle) {
      throw new NotFoundException(`Detalle de pedido con ID ${id} no encontrado`);
    }

    return detalle;
  }

  // Obtener detalles por pedido
  async findByPedido(pedidoId: number) {
    return await this.detallePedidoRepository.find({
      where: { pedido: { id: pedidoId } },
      relations: ['producto'],
    });
  }

  // Actualizar un detalle de pedido
  async update(id: number, updateDetallePedidoDto: UpdateDetallePedidoDto) {
    const detalle = await this.findOne(id);
    
    if (updateDetallePedidoDto.cantidad) {
      detalle.cantidad = updateDetallePedidoDto.cantidad;
    }
    if (updateDetallePedidoDto.precio_unitario) {
      detalle.precio_unitario = updateDetallePedidoDto.precio_unitario;
    }
    
    // Validar y actualizar pedido si es necesario
    if (updateDetallePedidoDto.pedidoId) {
      const pedido = await this.pedidoRepository.findOne({
        where: { id: updateDetallePedidoDto.pedidoId }
      });
      
      if (!pedido) {
        throw new NotFoundException(
          `Pedido con ID ${updateDetallePedidoDto.pedidoId} no encontrado`
        );
      }
      
      detalle.pedido = pedido;
    }
    
    // Validar y actualizar producto si es necesario
    if (updateDetallePedidoDto.productoId) {
      const producto = await this.productoRepository.findOne({
        where: { id: updateDetallePedidoDto.productoId }
      });
      
      if (!producto) {
        throw new NotFoundException(
          `Producto con ID ${updateDetallePedidoDto.productoId} no encontrado`
        );
      }
      
      detalle.producto = producto;
    }
    
    return await this.detallePedidoRepository.save(detalle);
  }

  // Eliminar un detalle de pedido
  async remove(id: number) {
    const detalle = await this.findOne(id);
    await this.detallePedidoRepository.remove(detalle);
  }
}