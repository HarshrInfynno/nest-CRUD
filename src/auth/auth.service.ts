import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { compareTexts } from 'src/utils/helpers';
import { Repository } from 'typeorm';
import { authDto, AuthResponseType } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(data: authDto): Promise<AuthResponseType | any> {
    const user = await this.userRepository.find({
      where: {
        email: data.email,
      },
    });
    if (user.length > 0) {
      const doesPasswordMatch = await compareTexts(
        data.password,
        user[0].password,
      );
      if (!doesPasswordMatch) {
        throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
      } else {
        const payload = { email: user[0].email, sub: user[0].id };
        const { password, ...rest } = user[0];

        return {
          ...rest,
          token: this.jwtService.sign(payload),
        };
      }
    } else {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
