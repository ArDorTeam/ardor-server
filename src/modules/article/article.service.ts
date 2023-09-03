import {Prisma, t_article} from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()

export class ArticleService {
    constructor(private prisma: PrismaService) {}
    
    async getArticleList(): Promise<t_article[] | null> {
        return this.prisma.t_article.findMany()
    }

    async addArticle(query): Promise<t_article[] | null> {
        const result =  await this.prisma.t_article.create({
            data: query
        })
        return [result]
    }

    async updateArticle(query): Promise<t_article[] | null> {
        const result =  await this.prisma.t_article.update({
            where: { id: query.article_id},
            data: query
        })
        return [result]
    }

    async deleteArticle(query): Promise<t_article[] | null> {
        const result =  await this.prisma.t_article.delete({
            where: { id: query.article_id}
        })
        return [result]
    }
}