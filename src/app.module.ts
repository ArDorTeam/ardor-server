import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ArticleModule } from './modules/article/article.module';
import { PrismaModule } from './common/prisma/prisma.module';

@Module({
  imports: [UserModule, ArticleModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
