import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/auth.decorator';
import RoleNames from '../models/enums/RoleNames';
import { validateUUID } from '../utils/validator';
import { TestsDto } from './dto/create-test.dto';

@Controller('api/tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Roles(RoleNames.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get()
  async findAll(@Query('active') isActive: boolean) {
    const tests = await this.testsService.findAll({ where: { isActive } });
    return tests;
  }

  @Roles(RoleNames.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const uuidValidation = validateUUID(id);
    if (!uuidValidation.status)
      throw new BadRequestException(uuidValidation.message);

    const test = await this.testsService.findOneBy({ id });

    if (!test) throw new NotFoundException(`Test not found`);

    return test;
  }

  @Roles(RoleNames.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  async createBulk(@Body() tests: TestsDto) {
    const result = await this.testsService.createBulk(tests.data);
    return result.raw;
  }

  @Roles(RoleNames.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('deactivate/:id')
  async deactivate(@Param('id') id: string) {
    const uuidValidation = validateUUID(id);
    if (!uuidValidation.status)
      throw new BadRequestException(uuidValidation.message);

    await this.testsService.deactivate(id);
    return;
  }
}
