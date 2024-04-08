import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ToLowerCase, Trim } from '../../decorators/transform.decorator';

export class LoginDto {
  @IsEmail()
  @Trim()
  @ToLowerCase()
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 charaters long' })
  @Trim()
  password: string;
}
