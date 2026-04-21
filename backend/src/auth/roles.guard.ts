import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './role.decorator';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);

    // No role metadata means "authenticated user only".
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as
      | { role?: UserRole; roles?: UserRole[] }
      | undefined;

    if (!user) {
      throw new UnauthorizedException('User is not authenticated.');
    }

    const assignedRoles: UserRole[] = [
      ...(Array.isArray(user.roles) ? user.roles : []),
      ...(user.role ? [user.role] : []),
    ];

    if (!assignedRoles.some((role) => requiredRoles.includes(role))) {
      throw new ForbiddenException('You do not have permission to access this resource.');
    }

    return true;
  }
}
