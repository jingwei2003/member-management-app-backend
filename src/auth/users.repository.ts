import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credential.sto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  //create an user account
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    //hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  //login account
  async loginAccount(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}