import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/sigin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signup(@Body() SignUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(SignUpDto);
  }

  @Post('/signin')
  signin(@Body() SignInDto: SignInDto): Promise<{ token: string }> {
    return this.authService.signIn(SignInDto);
  }
}
