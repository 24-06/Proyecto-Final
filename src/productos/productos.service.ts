import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from 'src/entities/producto.entity';
import { Artesano } from 'src/entities/artesano.entity';
import { Categoria } from 'src/entities/categoria.entity';
import { CreateProductoDto } from 'src/dtos/create-producto.dto';
import { UpdateProductoDto } from 'src/dtos/update-producto.dto'; 

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Artesano)
    private readonly artesanoRepository: Repository<Artesano>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  
  private async getRelatedEntities(artesanoId: number, categoriaId: number) {
    const artesano = await this.artesanoRepository.findOneBy({ id: artesanoId });
    if (!artesano) {
      throw new NotFoundException(`Artesano con ID ${artesanoId} no encontrado.`);
    }

    const categoria = await this.categoriaRepository.findOneBy({ id: categoriaId });
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${categoriaId} no encontrada.`);
    }

    return { artesano, categoria };
  }


  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const { artesanoId, categoriaId, ...restOfData } = createProductoDto;
    
    
    const { artesano, categoria } = await this.getRelatedEntities(artesanoId, categoriaId);

    const producto = this.productoRepository.create({
      ...restOfData,
      artesano: artesano,
      categoria: categoria,
    });

    return await this.productoRepository.save(producto);
  }


  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find({
      relations: ['artesano', 'categoria'],
    });
  }

  
  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['artesano', 'categoria'],
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }

    return producto;
  }

  
  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);

    
    let artesano = producto.artesano;
    let categoria = producto.categoria;
    
    
    if (updateProductoDto.artesanoId) {
      const newArtesano = await this.artesanoRepository.findOneBy({ id: updateProductoDto.artesanoId });
      if (!newArtesano) {
        throw new NotFoundException(`Artesano con ID ${updateProductoDto.artesanoId} no encontrado.`);
      }
      
      artesano = newArtesano; 
    }
    
    if (updateProductoDto.categoriaId) {
      
      const newCategoria = await this.categoriaRepository.findOneBy({ id: updateProductoDto.categoriaId });
      
      if (!newCategoria) {
        throw new NotFoundException(`Categoría con ID ${updateProductoDto.categoriaId} no encontrada.`);
      }
      
      categoria = newCategoria; 
    }

    Object.assign(producto, updateProductoDto);

    producto.artesano = artesano;
    producto.categoria = categoria;

    return await this.productoRepository.save(producto);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.productoRepository.remove(producto);
  }
}