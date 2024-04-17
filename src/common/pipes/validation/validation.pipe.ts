import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, {metatype}: ArgumentMetadata) {
    console.log('metatype', metatype)
    if(!metatype || !this.toValidate(metatype)) {
      // 没有验证规则，直接返回
      return value;
    }
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    console.log('错误信息', errors)
    if(errors.length > 0) {
      const msg = Object.values(errors[0].constraints)[0]
      throw new BadRequestException(`Validation failed: ${msg}`)
    }
    return value
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
