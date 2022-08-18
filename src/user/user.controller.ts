import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHarsh();
  }

  @Get('all')
  index(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('create')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async create(@Body() userData: CreateUserDto): Promise<any> {
    return this.userService.createUser(userData);
  }

  @Put('update/:id')
  async update(@Param('id') id: number, @Body() userData: User): Promise<any> {
    userData.id = Number(id);
    console.log('Update #' + userData.email);
    return this.userService.update(userData);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.userService.delete(id);
  }
}
