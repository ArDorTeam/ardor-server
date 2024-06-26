import {Controller, Post, Body, Query, UsePipes } from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDto, UpdateArticleDto, SearchDto, DeleteArticleDto, getArticleDetailDto } from './dto'
import { PaginateDto } from 'src/common/dto';
import { ValidationPipe } from '../../common/pipes/validation/validation.pipe'
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';
import { ApiTags, ApiProperty, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('article')
@Controller('article')
export class ArticleController {
    constructor(private articleService:ArticleService) {}

    @Public()
    @Post('/getArticleList')
    async getAll(@Body() paginate: PaginateDto, @Body() searchData: SearchDto) {
        return this.articleService.getArticleList(paginate, searchData)
    }

    @UsePipes(new ValidationPipe())
    // @ApiBearerAuth()
    @Post('/addArticle')
    async addArticle(@Body() articleData: CreateArticleDto, @GetCurrentUserId() user_id: string) {
        return this.articleService.addArticle(articleData, user_id)
    }

    @Post('/updateArticle')
    async updateArticle(@Body() articleData: UpdateArticleDto){
        return this.articleService.updateArticle(articleData)
    }

    @Post('/deleteArticle')
    async deleteArticle(@Body() articleData: DeleteArticleDto) {
        return this.articleService.deleteArticle(articleData)
    }

    @Public()
    @Post('/getArticleDetail')
    async articleDetail(@Body() articleData: getArticleDetailDto) {
        return this.articleService.getArticleDetail(articleData)
    }
}
