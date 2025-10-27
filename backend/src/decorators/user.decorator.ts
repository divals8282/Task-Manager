import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadI } from 'src/types';

export const RequestedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: JwtPayloadI }>();
    return request.user;
  },
);
