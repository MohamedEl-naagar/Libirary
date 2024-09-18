import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
 
  @IsNotEmpty()
  @IsEmail({}, { message: 'is not email' })
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'password is too short' })
  readonly password: string;
}
