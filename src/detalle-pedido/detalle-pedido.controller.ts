import { Controller, Get, Post, Body, Patch,Param,Delete, ParseIntPipe,} from '@nestjs/common';
import { ApiOperation, ApiResponse,ApiTags } from '@nestjs/swagger';
import { DetallePedidoService } from './detalle-pedido.service';
import { CreateDetallePedidoDto } from 'src/dtos/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from 'src/dtos/update-detalle-pedido.dto';

@ApiTags('detalle-pedido')
@Controller('detalle-pedido')
export class DetallePedidoController {
  constructor(private readonly detallePedidoService: DetallePedidoService) {}

  // POST /detalle-pedido - Crear nuevo detalle
  @Post()
  @ApiOperation({summary:'crear nuevo detalle pedido'})
  @ApiResponse({status:201, description: 'detalle pedido creado correctamente'})
  create(@Body() createDetallePedidoDto: CreateDetallePedidoDto) {
    return this.detallePedidoService.create(createDetallePedidoDto);
  }

  // GET /detalle-pedido - Obtener todos los detalles
  @Get()
  @ApiOperation({summary:'obtener todos los detalles'})
  @ApiResponse({status:200, description: 'detalles obtenidos correctamente'})
  findAll() {
    return this.detallePedidoService.findAll();
  }

  // GET /detalle-pedido/:id - Obtener un detalle por ID
  @Get(':id')
  @ApiOperation({summary:'obtener todos los detalles por ID'})
  @ApiResponse({status:200, description: 'detalles obtenidos correctamente'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.detallePedidoService.findOne(id);
  }

  // GET /detalle-pedido/pedido/:pedidoId - Obtener detalles por pedido
  @Get('pedido/:pedidoId')
  @ApiOperation({summary:'obtener detalles por pedido'})
  @ApiResponse({status:200, description: 'detalles obtenidos correctamente'})
  findByPedido(@Param('pedidoId', ParseIntPipe) pedidoId: number) {
    return this.detallePedidoService.findByPedido(pedidoId);
  }

  // PATCH /detalle-pedido/:id - Actualizar un detalle
  @Patch(':id')
  @ApiOperation({summary:'actualizar detalle pedido'})
  @ApiResponse({status:200, description: 'detalle pedido actualizado correctamente'})
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetallePedidoDto: UpdateDetallePedidoDto,
  ) {
    return this.detallePedidoService.update(id, updateDetallePedidoDto);
  }

  // DELETE /detalle-pedido/:id - Eliminar un detalle
  @Delete(':id')
  @ApiOperation({summary:'eliminar detalle pedido'})
  @ApiResponse({status:200, description: 'detalle pedido eliminado correctamente'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.detallePedidoService.remove(id);
  }
}


