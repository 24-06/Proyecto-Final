// src/productos/productos.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateProductoDto } from 'src/dtos/create-producto.dto';
import { UpdateProductoDto } from 'src/dtos/update-producto.dto';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  private productos: (CreateProductoDto & { id: number })[] = [];

  @Get()
  @ApiOperation({ summary: 'Listar todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos devuelta correctamente.' })
  getAll() {
    return this.productos;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto devuelto correctamente.' })
  getOne(@Param('id') id: string) {
    const producto = this.productos.find(p => p.id === Number(id));
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado correctamente.' })
  create(@Body() createProductoDto: CreateProductoDto) {
    const newProducto = { ...createProductoDto, id: this.productos.length + 1 };
    this.productos.push(newProducto);
    return newProducto;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto actualizado correctamente.' })
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    const index = this.productos.findIndex(p => p.id === Number(id));
    if (index === -1) throw new NotFoundException('Producto no encontrado');
    this.productos[index] = { ...this.productos[index], ...updateProductoDto };
    return this.productos[index];
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto eliminado correctamente.' })
  remove(@Param('id') id: string) {
    const index = this.productos.findIndex(p => p.id === Number(id));
    if (index === -1) throw new NotFoundException('Producto no encontrado');
    const removed = this.productos.splice(index, 1);
    return removed[0];
  }
}
