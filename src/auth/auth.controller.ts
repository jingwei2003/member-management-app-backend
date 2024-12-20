import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @Post('/')
  async signIn(
    @Body() authLoginDto: AuthLoginDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authLoginDto);
  }
}
