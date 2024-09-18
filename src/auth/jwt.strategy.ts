import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private configService: ConfigService,  // Inject ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'), // Use ConfigService to get the secret
    });
  }

  // async validate(payload) {
  //   const { id } = payload;
  //   const user = await this.UserModel.findById(id);
  //   if (!user) {
  //     throw new UnauthorizedException('Login first to access this endpoint');
  //   }
  //   return user;
  // }

  async validate(payload) {
    console.log(payload);
    
    const user = await this.UserModel.findById(payload._id); // Make sure _id matches
    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint');
    }
    return user;
  }
  
}
