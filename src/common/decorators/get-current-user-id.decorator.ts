import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { JwtPayload } from "src/modules/auth/types";

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
		const request = context.switchToHttp().getRequest();
		const user = request.user as JwtPayload;
		return user.sub;
	}
)
