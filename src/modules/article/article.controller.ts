import {Controller, Get} from '@nestjs/common'
import { ArticleService } from './article.service'
import { t_article } from '@prisma/client'

@Controller('/articleList')
export class ArticleController {
    constructor(private articleService:ArticleService) {}

    @Get()
    async getAll(): Promise<t_article[]> {
        return this.articleService.getArticleList()
    }
}