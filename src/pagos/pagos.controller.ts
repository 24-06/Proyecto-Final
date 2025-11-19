// src/pagos/pagos.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePagoDto } from 'src/dtos/create-pago.dto';
import { UpdatePagoDto } from 'src/dtos/update-pago.dto';

@ApiTags('Pagos')
@Controller('pagos')
export class PagosController {
  private pagos: (CreatePagoDto & { id: number })[] = [];

  @Get()
  @ApiOperation({ summary: 'Listar todos los pagos' })
  @ApiResponse({ status: 200, description: 'Lista de pagos devuelta correctamente.' })
  getAll() {
    return this.pagos;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pago por ID' })
  @ApiResponse({ status: 200, description: 'Pago devuelto correctamente.' })
  getOne(@Param('id') id: string) {
    const pago = this.pagos.find(p => p.id === Number(id));
    if (!pago) throw new NotFoundException('Pago no encontrado');
    return pago;
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pago' })
  @ApiResponse({ status: 201, description: 'Pago creado correctamente.' })
  create(@Body() createPagoDto: CreatePagoDto) {
    const newPago = { ...createPagoDto, id: this.pagos.length + 1 };
    this.pagos.push(newPago);
    return newPago;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un pago por ID' })
  @ApiResponse({ status: 200, description: 'Pago actualizado correctamente.' })
  update(@Param('id') id: string, @Body() updatePagoDto: UpdatePagoDto) {
    const index = this.pagos.findIndex(p => p.id === Number(id));
    if (index === -1) throw new NotFoundException('Pago no encontrado');
    this.pagos[index] = { ...this.pagos[index], ...updatePagoDto };
    return this.pagos[index];
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un pago por ID' })
  @ApiResponse({ status: 200, description: 'Pago eliminado correctamente.' })
  remove(@Param('id') id: string) {
    const index = this.pagos.findIndex(p => p.id === Number(id));
    if (index === -1) throw new NotFoundException('Pago no encontrado');
    const removed = this.pagos.splice(index, 1);
    return removed[0];
  }
}
