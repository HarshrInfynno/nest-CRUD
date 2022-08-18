import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  isActive: boolean;
}
