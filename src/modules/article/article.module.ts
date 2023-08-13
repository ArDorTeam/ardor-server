import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import {ArticleService} from './article.service'
import { ArticleController } from './article.controller';

@Module({
    imports: [PrismaModule],
    controllers: [ArticleController],
    providers: [ArticleService, PrismaService],
    exports: [ArticleService]
})

export class ArticleModule {}
