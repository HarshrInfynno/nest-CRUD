import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: authDto): Promise<any> {
    return this.authService.login(data);
  }
}
