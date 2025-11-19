// src/clientes/clientes.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateClienteDto } from 'src/dtos/create-cliente.dto';
import { UpdateClienteDto } from 'src/dtos/update-cliente.dto';

@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {
  private clientes: (CreateClienteDto & { id: number })[] = [];

  @Get()
  @ApiOperation({ summary: 'Listar todos los clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes devuelta correctamente.' })
  getAll() {
    return this.clientes;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente devuelto correctamente.' })
  getOne(@Param('id') id: string) {
    const cliente = this.clientes.find(c => c.id === Number(id));
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return cliente;
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente creado correctamente.' })
  create(@Body() createClienteDto: CreateClienteDto) {
    const newCliente = { ...createClienteDto, id: this.clientes.length + 1 };
    this.clientes.push(newCliente);
    return newCliente;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente actualizado correctamente.' })
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    const index = this.clientes.findIndex(c => c.id === Number(id));
    if (index === -1) throw new NotFoundException('Cliente no encontrado');
    this.clientes[index] = { ...this.clientes[index], ...updateClienteDto };
    return this.clientes[index];
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado correctamente.' })
  remove(@Param('id') id: string) {
    const index = this.clientes.findIndex(c => c.id === Number(id));
    if (index === -1) throw new NotFoundException('Cliente no encontrado');
    const removed = this.clientes.splice(index, 1);
    return removed[0];
  }
}
