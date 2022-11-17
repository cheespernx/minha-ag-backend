import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/config/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const args = context.getArgs();
    const hasAuthorization = args[0].rawHeaders.some(
      (item) => item === 'Authorization' || item === 'authorization',
    );

    if (isPublic && !hasAuthorization) {
      return true;
    }

    return super.canActivate(context);
  }
}
