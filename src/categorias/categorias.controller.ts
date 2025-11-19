// src/categorias/categorias.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCategoriaDto } from 'src/dtos/create-categoria.dto';
import { UpdateCategoriaDto } from 'src/dtos/update-categoria.dto';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  private categorias: (CreateCategoriaDto & { id: number })[] = [];

  @Get()
  @ApiOperation({ summary: 'Listar todas las categorías' })
  @ApiResponse({ status: 200, description: 'Lista de categorías devuelta correctamente.' })
  getAll() {
    return this.categorias;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiResponse({ status: 200, description: 'Categoría devuelta correctamente.' })
  getOne(@Param('id') id: string) {
    const categoria = this.categorias.find(c => c.id === Number(id));
    if (!categoria) throw new NotFoundException('Categoría no encontrada');
    return categoria;
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiResponse({ status: 201, description: 'Categoría creada correctamente.' })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    const newCategoria = { ...createCategoriaDto, id: this.categorias.length + 1 };
    this.categorias.push(newCategoria);
    return newCategoria;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoría por ID' })
  @ApiResponse({ status: 200, description: 'Categoría actualizada correctamente.' })
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    const index = this.categorias.findIndex(c => c.id === Number(id));
    if (index === -1) throw new NotFoundException('Categoría no encontrada');
    this.categorias[index] = { ...this.categorias[index], ...updateCategoriaDto };
    return this.categorias[index];
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría por ID' })
  @ApiResponse({ status: 200, description: 'Categoría eliminada correctamente.' })
  remove(@Param('id') id: string) {
    const index = this.categorias.findIndex(c => c.id === Number(id));
    if (index === -1) throw new NotFoundException('Categoría no encontrada');
    const removed = this.categorias.splice(index, 1);
    return removed[0];
  }
}
