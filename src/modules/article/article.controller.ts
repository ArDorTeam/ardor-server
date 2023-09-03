import {Controller, Get, Post, Body, Req,Param, Res,  UsePipes, UseInterceptors, UploadedFile } from '@nestjs/common'
import { ArticleService } from './article.service'
import { t_article } from '@prisma/client'
import { CreateArticleDto } from './dto'
import { ValidationPipe } from '../../common/pipes/validation/validation.pipe'


@Controller('article')
export class ArticleController {
    constructor(private articleService:ArticleService) {}
    
    @UsePipes(new ValidationPipe())
    @Post('/addArticle')
    async addArticle(@Body() articleData: CreateArticleDto): Promise<t_article[]> {
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
    
    @Get('/getArticleList')
    async getAll(): Promise<t_article[]> {
        return this.articleService.getArticleList()
    }
}