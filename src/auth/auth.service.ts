import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  //sign up an account
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.usersRepository.createUser(authCredentialsDto);
  }

  //sign in account
  async signIn(authLoginDto: AuthLoginDto): Promise<{ accessToken: string }> {
    return await this.usersRepository.loginAccount(authLoginDto);
  }
}
