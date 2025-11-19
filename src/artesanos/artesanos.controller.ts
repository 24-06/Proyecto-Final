import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ArtesanosService } from './artesanos.service';
import { CreateArtesanoDto } from 'src/dtos/create-artesano.dto';
import { UpdateArtesanoDto } from 'src/dtos/update-artesano.dto';

@Controller('artesanos')
export class ArtesanosController {
  constructor(private readonly artesanosService: ArtesanosService) {}

  @Post()
  create(@Body() createArtesanoDto: CreateArtesanoDto) {
    return this.artesanosService.create(createArtesanoDto);
  }

  @Get()
  findAll() {
    return this.artesanosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.artesanosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArtesanoDto: UpdateArtesanoDto,
  ) {
    return this.artesanosService.update(id, updateArtesanoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.artesanosService.remove(id);
  }
}