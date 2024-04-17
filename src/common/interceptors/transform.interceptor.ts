import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import {map} from 'rxjs/operators'
import { Observable } from "rxjs";
import { KEEP_KEY } from '../contants/decorator.contant';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const response = context.switchToHttp().getResponse();

        const status = response.statusCode;
        return next.handle().pipe(
            map((data) => {
                // getHandler 值将覆盖 getClass上面的值
                const keep = this.reflector.getAllAndOverride<boolean>(KEEP_KEY, [
                    context.getHandler(),
                    context.getClass(),
                ]);
                if (keep) return data;
                return {
                    code: 200,
                    data: JSON.parse(JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v)),
                    message: '操作成功！'
                }
            })
        )
    }
}2