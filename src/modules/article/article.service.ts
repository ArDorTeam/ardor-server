import {Prisma, t_article} from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { promises } from 'dns'

@Injectable()

export class ArticleService {
    constructor(private prisma: PrismaService) {}
    
    async getArticleList(): Promise<t_article[] | null> {
        return this.prisma.t_article.findMany()
    }
}