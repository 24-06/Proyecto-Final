// src/pedidos/pedidos.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreatePedidoDto } from 'src/dtos/create-pedido.dto';
import { UpdatePedidoDto } from 'src/dtos/update-pedido.dto';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
  private pedidos: (CreatePedidoDto & { id: number })[] = [];

  @Get()
  @ApiOperation({ summary: 'Listar todos los pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos devuelta correctamente.' })
  getAll() {
    return this.pedidos;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pedido por ID' })
  @ApiResponse({ status: 200, description: 'Pedido devuelto correctamente.' })
  getOne(@Param('id') id: string) {
    const pedido = this.pedidos.find(p => p.id === Number(id));
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    return pedido;
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido creado correctamente.' })
  create(@Body() createPedidoDto: CreatePedidoDto) {
    const newPedido = { ...createPedidoDto, id: this.pedidos.length + 1 };
    this.pedidos.push(newPedido);
    return newPedido;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un pedido por ID' })
  @ApiResponse({ status: 200, description: 'Pedido actualizado correctamente.' })
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    const index = this.pedidos.findIndex(p => p.id === Number(id));
    if (index === -1) throw new NotFoundException('Pedido no encontrado');
    this.pedidos[index] = { ...this.pedidos[index], ...updatePedidoDto };
    return this.pedidos[index];
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un pedido por ID' })
  @ApiResponse({ status: 200, description: 'Pedido eliminado correctamente.' })
  remove(@Param('id') id: string) {
    const index = this.pedidos.findIndex(p => p.id === Number(id));
    if (index === -1) throw new NotFoundException('Pedido no encontrado');
    const removed = this.pedidos.splice(index, 1);
    return removed[0];
  }
}
