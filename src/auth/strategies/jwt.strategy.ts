import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
    console.log('hello  ');
  }

  async validate(payload) {
    console.log(payload);

    const user = await this.UserModel.findById(payload.id); // Make sure _id matches
    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint');
    }
    console.log('validate func: ', user);

    return user;
  }
}
