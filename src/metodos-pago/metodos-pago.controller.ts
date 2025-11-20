import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MetodosPagoService } from './metodos-pago.service';
import { CreateMetodoPagoDto } from 'src/dtos/create-metodo-pago.dto';
import { UpdateMetodoPagoDto } from 'src/dtos/update-metodo-pago.dto';

@Controller('metodos-pago')
export class MetodosPagoController {
  constructor(private readonly metodosPagoService: MetodosPagoService) {}

  @Post()
  create(@Body() createMetodoPagoDto: CreateMetodoPagoDto) {
    return this.metodosPagoService.create(createMetodoPagoDto);
  }

  @Get()
  findAll() {
    return this.metodosPagoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.metodosPagoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMetodoPagoDto: UpdateMetodoPagoDto) {
    return this.metodosPagoService.update(id, updateMetodoPagoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.metodosPagoService.remove(id);
  }
}