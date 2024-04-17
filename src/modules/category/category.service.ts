import {Prisma, t_category} from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { PaginateDto } from 'src/common/dto';
import { SearchDto } from './dto/search-category.dto';
import { v4 } from 'uuid'

@Injectable()

export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async getCategoryList({offset, length}: PaginateDto, {searchValue, createTime, updateTime}: SearchDto) {
        // 搜索条件
        const hasCreateTime = createTime && createTime.length === 2
        const hasUpdateTime = updateTime && updateTime.length === 2
        const searchParams = {
            where: {
                title: searchValue? {
                  contains: searchValue,
                }: undefined,
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
        const allCategory = await this.prisma.t_category.findMany({
            select: {
              id: true,
              category_id: true,
              title: true,
              gmt_create: true,
              gmt_modified: true
            },
            ...searchParams
        })
        // 总数
        const total = await this.prisma.t_category.count({...searchParams});
        return {
            list: allCategory,
            total: total
        }
    }

    // 添加类别
    async addCategory(query) {
        const categoryId = v4()
        const data = {
            ...query,
            category_id: String(categoryId)
        }
        const result =  await this.prisma.t_category.create({
            data
        })
        return result
    }

    // 更新文章
    async updateCategory(query) {
        const data = {
            ...query,
            category_id: String(query.category_id)
        }
        const result =  await this.prisma.t_category.update({
            where: { category_id: data.category_id},
            data
        })
        return result
    }

    // 删除类别
    async deleteCategory(query) {
        const result =  await this.prisma.t_category.update({
            where: { category_id: query.category_id},
            data: {
                deleted: true
            }
        })
        return result
    }

     // 获取文章详情
     async getCategoryDetail(query) {
        const result =  await this.prisma.t_category.findUnique({
            where: { category_id: query.category_id},
            select: {
                id: true,
                category_id: true,
                gmt_create: true,
                gmt_modified: true
              }
        })
        return result
    }
}
