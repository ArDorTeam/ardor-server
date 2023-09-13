import {Controller, Post, Body, Query, UsePipes } from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDto, UpdateArticleDto, SearchDto, DeleteArticleDto } from './dto'
import { PaginateDto } from 'src/common/dto';
import { ValidationPipe } from '../../common/pipes/validation/validation.pipe'


@Controller('article')
export class ArticleController {
    constructor(private articleService:ArticleService) {}

    @Post('/getArticleList')
    async getAll(@Body() paginate: PaginateDto, @Body() searchData: SearchDto) {
        return this.articleService.getArticleList(paginate, searchData)
    }
    
    @UsePipes(new ValidationPipe())
    @Post('/addArticle')
    async addArticle(@Body() articleData: CreateArticleDto ) {
        return this.articleService.addArticle(articleData)
    }

    @Post('/updateArticle')
    async updateArticle(@Body() articleData: UpdateArticleDto){
        return this.articleService.updateArticle(articleData)
    }

    @Post('/deleteArticle')
    async deleteArticle(@Body() articleData: DeleteArticleDto) {
        return this.articleService.deleteArticle(articleData)
    }
}