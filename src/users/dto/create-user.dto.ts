import { IsEmail, IsNotEmpty } from 'class-validator';
import { ToLowerCase, Trim } from '../../decorators/transform.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @Trim()
  firstName: string;

  @IsNotEmpty()
  @Trim()
  lastName: string;

  @IsEmail()
  @Trim()
  @ToLowerCase()
  email: string;

  @IsNotEmpty()
  @Trim()
  password: string;
}
