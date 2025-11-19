// src/artesanos/artesanos.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateArtesanoDto } from 'src/dtos/create-artesano.dto';
import { UpdateArtesanoDto } from 'src/dtos/update-artesano.dto';

@ApiTags('Artesanos')
@Controller('artesanos')
export class ArtesanosController {
  private artesanos: (CreateArtesanoDto & { id: number })[] = [];

  @Get()
  @ApiOperation({ summary: 'Listar todos los artesanos' })
  @ApiResponse({ status: 200, description: 'Lista de artesanos devuelta correctamente.' })
  getAll() {
    return this.artesanos;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un artesano por ID' })
  @ApiResponse({ status: 200, description: 'Artesano devuelto correctamente.' })
  getOne(@Param('id') id: string) {
    const artesano = this.artesanos.find(a => a.id === Number(id));
    if (!artesano) throw new NotFoundException('Artesano no encontrado');
    return artesano;
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo artesano' })
  @ApiResponse({ status: 201, description: 'Artesano creado correctamente.' })
  create(@Body() createArtesanoDto: CreateArtesanoDto) {
    const newArtesano = { ...createArtesanoDto, id: this.artesanos.length + 1 };
    this.artesanos.push(newArtesano);
    return newArtesano;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un artesano por ID' })
  @ApiResponse({ status: 200, description: 'Artesano actualizado correctamente.' })
  update(@Param('id') id: string, @Body() updateArtesanoDto: UpdateArtesanoDto) {
    const index = this.artesanos.findIndex(a => a.id === Number(id));
    if (index === -1) throw new NotFoundException('Artesano no encontrado');
    this.artesanos[index] = { ...this.artesanos[index], ...updateArtesanoDto };
    return this.artesanos[index];
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un artesano por ID' })
  @ApiResponse({ status: 200, description: 'Artesano eliminado correctamente.' })
  remove(@Param('id') id: string) {
    const index = this.artesanos.findIndex(a => a.id === Number(id));
    if (index === -1) throw new NotFoundException('Artesano no encontrado');
    const removed = this.artesanos.splice(index, 1);
    return removed[0];
  }
}
