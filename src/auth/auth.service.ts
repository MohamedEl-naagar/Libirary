import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/sigin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(SignUpDto: SignUpDto): Promise<{ user: User; token: string }> {
    const { name, email, password } = SignUpDto;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({
      _id: user._id,
    });

    return { user, token };
  }

  async signIn(SignInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = SignInDto;

    const user = await this.userModel.findOne({
      email,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.sign({
      _id: user._id,
    });

    return { token };
  }
}
