import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entity/user.entity';

export class authDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class AuthResponseType {
  token: string;
  user: authDto;
  User: User[];
}
