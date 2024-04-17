import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { AuthModule } from './modules/auth/auth.module';
import { ArticleModule } from './modules/article/article.module';
import { UsersModule } from './modules/users/users.module';
import { UploadModule } from './modules/upload/upload.module';
import { CategoryModule } from './modules/category/category.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { TagModule } from './modules/tag/tag.module';
import { TencentCosModule } from './modules/tencent-cos/tencent-cos.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ArticleModule,
    AuthModule,
    UsersModule,
    UploadModule,
    TagModule,
    TencentCosModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService,
    /* 全局返回值转化拦截器 */
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AtGuard
    }
  ],
})
export class AppModule {}
