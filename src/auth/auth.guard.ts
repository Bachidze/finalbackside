import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);
    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const user = await this.jwtService.verifyAsync(token); // Use verifyAsync for async operation
      request.user = user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private getToken(req): string | null {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return null;
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
    return parts[1];
  }
}
