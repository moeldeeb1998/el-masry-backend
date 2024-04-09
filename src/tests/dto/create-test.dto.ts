import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Trim } from '../../decorators/transform.decorator';
import { Type } from 'class-transformer';

export class CreateTestDto {
  @IsOptional()
  @IsString()
  @Trim()
  title?: string;

  @IsNotEmpty()
  @Trim()
  snippet: string;
}

export class TestsDto {
  @IsArray()
  @ArrayMinSize(1) // Ensure the array has at least one item
  @ValidateNested({ each: true }) // Validate each item in the array
  @Type(() => CreateTestDto) // Specify the type of each item in the array
  data: CreateTestDto[];
}
