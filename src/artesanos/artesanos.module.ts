import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtesanosController } from './artesanos.controller';
import { ArtesanosService } from './artesanos.service';
import { Artesano } from 'src/entities/artesano.entity';
import { Usuario } from 'src/entities/usuario.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Artesano, Usuario])], 
  controllers: [ArtesanosController],
  providers: [ArtesanosService],
  exports: [ArtesanosService],
})
export class ArtesanosModule {}