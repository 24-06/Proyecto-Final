import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artesano } from 'src/entities/artesano.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { ArtesanosService } from './artesanos.service';
import { ArtesanosController } from './artesanos.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artesano, Usuario]) // ← IMPORTANTE
  ],
  controllers: [ArtesanosController],
  providers: [ArtesanosService],
  exports: [ArtesanosService],
})
export class ArtesanosModule {}
