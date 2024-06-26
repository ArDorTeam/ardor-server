import {Prisma, t_article} from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { PaginateDto } from 'src/common/dto';
import { SearchDto } from './dto/search-article.dto';
import { v4 } from 'uuid'

@Injectable()

export class ArticleService {
    constructor(private prisma: PrismaService) {}

    async getArticleList({offset, length}: PaginateDto, {searchValue, createTime, updateTime, categoryId}: SearchDto) {
        // 搜索条件
        const hasCreateTime = createTime && createTime.length === 2
        const hasUpdateTime = updateTime && updateTime.length === 2
        const searchParams = {
            where: {
                title: {
                    contains: searchValue,
                },
                category_id: categoryId || undefined,
                deleted: false,
                gmt_create: hasCreateTime ?  {
                  gte: new Date(createTime[0]),
                  lte: new Date(createTime[1])
                }: undefined,
                gmt_modified: hasUpdateTime ?  {
                    gte: new Date(updateTime[0]),
                    lte: new Date(updateTime[1])
                  }: undefined
              },
              skip: offset? (Number(offset) - 1 ) * Number(length): undefined,
              take: length? Number(length): undefined
        }
        const allArticle = await this.prisma.t_article.findMany({
            select: {
              id: true,
              article_id: true,
              article_type: true,
              title: true,
              sub_title: true,
              cover_url: true,
              visits: true,
                is_recommend: true,
                category_id: true,
            //   content: true,
              sort_id: true,
              status: true,
              gmt_create: true,
              gmt_modified: true
            },
            ...searchParams
        })
        // 总数
        const total = await this.prisma.t_article.count({...searchParams, skip: undefined, take: undefined});
        return {
            list: allArticle,
            total: total
        }
    }

    // 添加文章
    async addArticle(query, user_id) {
        const articleId = v4()
        const data = {
            ...query,
            article_id: String(articleId),
            seo_title: query.title,
            seo_keyword: query.title,
            seo_desc: query.sub_title,
            user_id,
            tags: undefined
        }
        const result =  await this.prisma.t_article.create({
            data
        })
        // 新增标签关联
        if (query.tags) {
            const params = query.tags.map(item => ({
                article_id: String(articleId),
                tag_id: item,
                status: true
            }))
            await this.prisma.t_article_tag.createMany({
                data: params
            })
        }
        return result
    }

    // 更新文章
    async updateArticle(query) {
        const data = {
            ...query,
            article_id: String(query.article_id),
            seo_title: query.title,
            seo_keyword: query.title,
            seo_desc: query.sub_title
        }
        const result =  await this.prisma.t_article.update({
            where: { article_id: data.article_id},
            data
        })
        return result
    }

    // 删除文章
    async deleteArticle(query) {
        const result =  await this.prisma.t_article.update({
            where: { article_id: query.article_id},
            data: {
                deleted: true
            }
        })
        return result
    }

     // 获取文章详情
     async getArticleDetail(query) {
        const result =  await this.prisma.t_article.findUnique({
            where: { article_id: query.article_id},
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
              }
        })
        return result
    }
}
