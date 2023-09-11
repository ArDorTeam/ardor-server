import {Controller, Post, Body, Query, UsePipes } from '@nestjs/common'
import { ArticleService } from './article.service'
import { t_article } from '@prisma/client'
import { CreateArticleDto } from './dto'
import { PaginateDto } from 'src/common/dto';
import { SearchDto } from './dto/search-article.dto';
import { ValidationPipe } from '../../common/pipes/validation/validation.pipe'
import { query } from 'express';


@Controller('article')
export class ArticleController {
    constructor(private articleService:ArticleService) {}
    
    @UsePipes(new ValidationPipe())
    @Post('/addArticle')
    async addArticle(@Body() articleData: CreateArticleDto ): Promise<t_article[]> {
        return this.articleService.addArticle(articleData)
    }

    @Post('/updateArticle')
    async updateArticle(@Body() articleData): Promise<t_article[]> {
        return this.articleService.updateArticle(articleData)
    }

    @Post('/deleteArticle')
    async deleteArticle(@Body() articleData): Promise<t_article[]> {
        return this.articleService.deleteArticle(articleData)
    }

    @Post('/getArticleList')
    async getAll(@Query() paginate: PaginateDto, @Query() searchData: SearchDto) {
        return this.articleService.getArticleList(paginate, searchData)
    }
}