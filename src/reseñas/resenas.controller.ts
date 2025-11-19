// src/reseñas/resenas.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateResenaDto } from 'src/dtos/create-resena.dto';
import { UpdateResenaDto } from 'src/dtos/update-resena.dto';

@ApiTags('Reseñas')
@Controller('resenas')
export class ResenasController {
  private resenas: (CreateResenaDto & { id: number })[] = [];

  @Get()
  @ApiOperation({ summary: 'Listar todas las reseñas' })
  @ApiResponse({ status: 200, description: 'Lista de reseñas devuelta correctamente.' })
  getAll() {
    return this.resenas;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reseña por ID' })
  @ApiResponse({ status: 200, description: 'Reseña devuelta correctamente.' })
  getOne(@Param('id') id: string) {
    const resena = this.resenas.find(r => r.id === Number(id));
    if (!resena) throw new NotFoundException('Reseña no encontrada');
    return resena;
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reseña' })
  @ApiResponse({ status: 201, description: 'Reseña creada correctamente.' })
  create(@Body() createResenaDto: CreateResenaDto) {
    const newResena = { ...createResenaDto, id: this.resenas.length + 1 };
    this.resenas.push(newResena);
    return newResena;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una reseña por ID' })
  @ApiResponse({ status: 200, description: 'Reseña actualizada correctamente.' })
  update(@Param('id') id: string, @Body() updateResenaDto: UpdateResenaDto) {
    const index = this.resenas.findIndex(r => r.id === Number(id));
    if (index === -1) throw new NotFoundException('Reseña no encontrada');
    this.resenas[index] = { ...this.resenas[index], ...updateResenaDto };
    return this.resenas[index];
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una reseña por ID' })
  @ApiResponse({ status: 200, description: 'Reseña eliminada correctamente.' })
  remove(@Param('id') id: string) {
    const index = this.resenas.findIndex(r => r.id === Number(id));
    if (index === -1) throw new NotFoundException('Reseña no encontrada');
    const removed = this.resenas.splice(index, 1);
    return removed[0];
  }
}
