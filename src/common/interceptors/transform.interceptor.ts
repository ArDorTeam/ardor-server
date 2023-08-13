import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import {map} from 'rxjs/operators'
import { Observable } from "rxjs";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data) => {
                return {
                    code: 200,
                    data,
                    message: '操作成功！'
                }
            })
        )
    }
}