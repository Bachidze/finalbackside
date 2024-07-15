import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CurrentUserDTO } from 'src/users/dto/current-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userServie: UsersService,
    private jwtService: JwtService,
  ) {}
  async SignUp(createUserDto: SignUpDto) {
    const { email, password } = createUserDto;
    const exsistedUser = await this.userServie.findByEmail(email);
    if (exsistedUser) throw new BadRequestException('Email Already Registerd');
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userServie.create({ email, password: hashedPassword });
    return { message: 'User Created Successfully' };
  }

  async SignIn(SignInDto: SignUpDto) {
    const { email, password } = SignInDto;
    const exsistingUser = await this.userServie.findByEmail(email);
    if (!exsistingUser) throw new NotFoundException('Invalid Credentials');
    const isPasswordEqual = await bcrypt.compare(
      password,
      exsistingUser.password,
    );
    if (!isPasswordEqual) throw new NotFoundException('Invalid Credentials');

    const jwtPayLoad = {
        email:exsistingUser.email,
        id:exsistingUser._id
    }

    const accessToken = await this.jwtService.sign(jwtPayLoad)
    return {accessToken}
  }
  async getCurrentUser(user:CurrentUserDTO){
    return user
  }
}
