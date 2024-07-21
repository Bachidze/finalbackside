import { IsEmail, IsNotEmpty } from "class-validator"

export class SignUpDto {
    name:string
    lastName:string
    @IsNotEmpty()
    email:string
    @IsNotEmpty()
    password:string

}
