import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    email:string
    @IsNotEmpty()
    password:string
}
