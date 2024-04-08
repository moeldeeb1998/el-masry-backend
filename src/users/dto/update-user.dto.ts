import { IsNotEmpty } from 'class-validator';
import { Trim } from '../../decorators/transform.decorator';
import { PartialType } from '@nestjs/mapped-types';

class UpdateUserDataDto {
  @IsNotEmpty()
  @Trim()
  firstName: string;

  @IsNotEmpty()
  @Trim()
  lastName: string;
}

export class UpdateUserDto extends PartialType(UpdateUserDataDto) {}
