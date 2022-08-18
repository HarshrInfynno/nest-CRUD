import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashText } from 'src/utils/helpers';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  getHarsh(): string {
    return 'Hello Harsh Dalsaniya';
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const userData = await this.userRepository.find({
      where: {
        email: user.email,
      },
    });
    if (userData.length > 0) {
      throw new HttpException(
        'This Email is already registered',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      if (user.password) {
        user.password = await hashText(user.password);
      }
      const data = await this.userRepository.save(user);
      data.password = undefined;
      return data;
    }
  }

  async update(user: User): Promise<UpdateResult> {
    const userData = await this.userRepository.find({
      where: {
        id: user.id,
      },
    });
    if (userData.length > 0) {
      return await this.userRepository.update(user.id, user);
    } else {
      throw new HttpException('User is not found', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    const userData = await this.userRepository.find({
      where: {
        id,
      },
    });
    if (userData.length > 0) {
      return await this.userRepository.delete(id);
    } else {
      throw new HttpException('User is not found', HttpStatus.BAD_REQUEST);
    }
  }
}
