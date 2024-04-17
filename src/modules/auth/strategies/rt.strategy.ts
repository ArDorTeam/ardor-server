import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload, JwtPayloadWithRt } from "../types";
import { FastifyRequest } from "fastify";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(config: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get<string>('RT_SECRET'),
			passReqToCallback: true,
		})
	}

	validate(req: FastifyRequest, payload: JwtPayload): JwtPayloadWithRt {
		const refreshToken = req?.headers?.authorization?.replace('Bearer', '').trim();

		if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

		return {
			...payload,
			refreshToken
		}
	}
}