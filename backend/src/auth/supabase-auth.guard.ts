import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization as string | undefined;

    // Enforce "Authorization: Bearer <token>" format.
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing Bearer token.');
    }

    const accessToken = authHeader.slice('Bearer '.length).trim();

    if (!accessToken) {
      throw new UnauthorizedException('Access token is empty.');
    }

    // Verify token with Supabase and attach user to request for later handlers.
    request.user = await this.authService.getUserFromAccessToken(accessToken);
    return true;
  }
}
