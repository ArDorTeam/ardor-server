import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller';

@Module({
    imports: [PrismaModule],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService]
})

export class CategoryModule {}
