import { Injectable } from '@nestjs/common';
import { CreateTagDto, SearchDto, UpdateTagDto } from './dto';
import { PrismaService } from 'src/common/prisma/prisma.service'
import { PaginateDto } from 'src/common/dto';
import { v4 } from 'uuid'
import moment from 'moment';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async create(body) {
      const tagId = v4()
      const data = {
          tag_name: body.tagName,
          status: Boolean(body.status),
          tag_id: String(tagId),
          sort_id: 0,
          seo_title: body.tagName,
          seo_keyword: body.tagName,
          seo_desc: body.tagName
      }
      const result =  await this.prisma.t_tags.create({
          data
      })
      return result
  }

  async update(body) {
    const data = {
        tag_name: body.tagName,
        status: Boolean(body.status),
        sort_id: 0,
        seo_title: body.tagName,
        seo_keyword: body.tagName,
        seo_desc: body.tagName
    }
    const result =  await this.prisma.t_tags.update({
      where: { tag_id: body.tagId},
      data
  })
    return result
}

async getTagList({offset, length}: PaginateDto, {searchValue, createTime, updateTime}: SearchDto) {
  // 搜索条件
  const hasCreateTime = createTime && createTime.length === 2
  const hasUpdateTime = updateTime && updateTime.length === 2
  const searchParams = {
      where: {
          tag_name: {
            contains: searchValue,
          },
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
  const allTag = await this.prisma.t_tags.findMany({
    select: {
        tag_name: true,
        tag_id: true,
        sort_id: true,
        status: true,
        gmt_create: true,
        gmt_modified: true
      },
      ...searchParams
  })
  // 总数
  const total = await this.prisma.t_tags.count({...searchParams});
  return {
      list: allTag,
      total: total
  }
}

// 删除标签
async deleteTag(body) {
  const result =  await this.prisma.t_tags.update({
      where: { tag_id: body.tagId},
      data: {
          deleted: true
      }
  })
  return result
}
}
