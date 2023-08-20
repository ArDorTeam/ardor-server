import {Controller, Get, Post} from '@nestjs/common'
import { ArticleService } from './article.service'
import { t_article } from '@prisma/client'

@Controller('article')
export class ArticleController {
    constructor(private articleService:ArticleService) {}

    @Post('/addArticle')
    async addArticle(query): Promise<t_article[]> {
        return this.articleService.addArticle(query)
    }

    @Get('/getArticleList')
    async getAll(): Promise<t_article[]> {
        return this.articleService.getArticleList()
    }
}