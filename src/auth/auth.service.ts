import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  // ----------------------------------
  //  REGISTRAR USUARIO
  // ----------------------------------
  async register(dto: RegisterDto) {
    const existe = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existe) {
      throw new UnauthorizedException('El email ya está registrado');
    }

    // Encriptar contraseña
    const hashed = await bcrypt.hash(dto.password, 10);

    // Crear usuario
    const newUser = this.userRepository.create({
      ...dto,
      password: hashed,
    });

    // Guardar usuario
    await this.userRepository.save(newUser);

    return {
      message: 'Usuario registrado correctamente',
      usuario: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }

  // ----------------------------------
  //  LOGIN
  // ----------------------------------
  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    // Comparar contraseña
    const valid = await bcrypt.compare(dto.password, user.password);

    if (!valid) throw new UnauthorizedException('Credenciales incorrectas');

    // Payload del JWT
    const payload = {
      sub: user.id,
      role: user.role,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login exitoso',
      token,
      usuario: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  // ----------------------------------
  //  VALIDAR USUARIO DESDE JWT
  // ----------------------------------
  async validateUser(payload: any) {
    return this.userRepository.findOne({
      where: { id: payload.sub },
    });
  }
}
