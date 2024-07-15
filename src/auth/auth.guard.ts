import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGurad implements CanActivate{
    constructor(private jwtService:JwtService){}
   async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = getToken(request)
        if(!token) throw new UnauthorizedException()
            try {
                const user = await this.jwtService.verify(token)
                request.user = {
                    email:user.email,
                    id:user.id
                }
            } catch (error) {
                throw new UnauthorizedException()
            }
        return true
    }
}

function getToken(req){
    if(!req.headers['authorization']) return null
    const token = req.headers['authorization'].split(' ')[1]
    return token
}