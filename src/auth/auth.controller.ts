import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGuard } from './auth.guard';
import { CurrentUser } from 'src/users/user.decorator';
import { CurrentUserDTO } from 'src/users/dto/current-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  SignUp(@Body() createUserDto: SignUpDto) {
    return this.authService.SignUp(createUserDto);
  }

  @Post('sign-in')
  SignIn(@Body() signInDto: SignUpDto) {
    return this.authService.SignIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get("current-user")
  currentUser(@CurrentUser() user: CurrentUserDTO) {
    return this.authService.getCurrentUser(user);
  }
}
