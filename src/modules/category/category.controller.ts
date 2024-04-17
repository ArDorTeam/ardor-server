import {Controller, Post, Body, Query, UsePipes } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto, UpdateCategoryDto, SearchDto, DeleteCategoryDto, getCategoryDetailDto } from './dto'
import { PaginateDto } from 'src/common/dto';
import { ValidationPipe } from '../../common/pipes/validation/validation.pipe'
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';
import { ApiTags, ApiProperty, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
    constructor(private categoryService:CategoryService) {}

    @Public()
    @Post('/getCategoryList')
    async getAll(@Body() paginate: PaginateDto, @Body() searchData: SearchDto) {
        return this.categoryService.getCategoryList(paginate, searchData)
    }

    @UsePipes(new ValidationPipe())
    // @ApiBearerAuth()
    @Public()
    @Post('/addCategory')
    async addCategory(@Body() categoryData: CreateCategoryDto) {
        return this.categoryService.addCategory(categoryData)
    }

    @Post('/updateCategory')
    async updateCategory(@Body() articleData: UpdateCategoryDto){
        return this.categoryService.updateCategory(articleData)
    }

    @Post('/deleteCategory')
    async deleteCategory(@Body() articleData: DeleteCategoryDto) {
        return this.categoryService.deleteCategory(articleData)
    }

    @Public()
    @Post('/getCategoryDetail')
    async articleDetail(@Body() articleData: getCategoryDetailDto) {
        return this.categoryService.getCategoryDetail(articleData)
    }
}
