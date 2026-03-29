import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { User } from '../users/schemas/user.schema'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.userModel.findOne({ email: dto.email })

    if (existingUser) {
      throw new BadRequestException('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10)

    const user = await this.userModel.create({
      ...dto,
      password: hashedPassword,
    })

    return {
      message: 'Register success',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    }
  }

  async login(dto: LoginDto) {
    console.log('JWT_SECRET:', process.env.JWT_SECRET)
    const user = await this.userModel.findOne({ email: dto.email })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isMatch = await bcrypt.compare(dto.password, user.password)

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = {
      sub: user._id,
      email: user.email,
    }

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    }
  }
}