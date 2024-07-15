import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGurad } from './auth.guard';
import { CurrentUser } from 'src/users/user.decorator';
import { CurrentUserDTO } from 'src/users/dto/current-user.dto';

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
  @UseGuards(AuthGurad)
  @Get("current-user")
  currentUser(@CurrentUser() user:CurrentUserDTO){
    return this.authService.getCurrentUser(user)
  }
}
