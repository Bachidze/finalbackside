import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  SignUp(@Body() CreateUserDto:SignUpDto){
    return this.authService.SignUp(CreateUserDto)
  }

  @Post('sign-in')
  SignIn(@Body() CreateUserDto:SignUpDto){
    return this.authService.SignIn(CreateUserDto)
  }
}
