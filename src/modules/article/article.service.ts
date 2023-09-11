import {Prisma, t_article} from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { PaginateDto } from 'src/common/dto';
import { SearchDto } from './dto/search-article.dto';

@Injectable()

export class ArticleService {
    constructor(private prisma: PrismaService) {}
    
    async getArticleList({offset, length}: PaginateDto, {searchValue, createTime, updateTime}: SearchDto) {
      
        const allArticle = await this.prisma.t_article.findMany({
            select: {
              id: true,
              article_id: true,
              article_type: true,
              title: true,
              sub_title: true,
              cover_url: true,
              content: true,
              visits: true,
              is_recommend: true,
              sort_id: true,
              status: true,
              gmt_create: true,
              gmt_modified: true
            },
            where: {
              title: {
                contains: searchValue,
              },
            },
            skip: Number(offset),
            take: Number(length)
        })
        const total = await this.prisma.t_article.count();
        return {
            list: allArticle,
            total: total
        }
    }

    async addArticle(query) {
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