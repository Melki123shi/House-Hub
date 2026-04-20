import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    // Read the user that was attached by SupabaseAuthGuard.
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
