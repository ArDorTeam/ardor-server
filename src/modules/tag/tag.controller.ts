import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto, UpdateTagDto, SearchDto, DeleteTagDto } from './dto';
import { PaginateDto } from 'src/common/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('/add')
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Post('/update')
  update(@Body() UpdateTagDto: UpdateTagDto) {
    return this.tagService.update(UpdateTagDto);
  }

  @Post('/list')
  findAll(@Body() paginate: PaginateDto, @Body() searchData: SearchDto) {
    return this.tagService.getTagList(paginate, searchData);
  }

  @Post('/delete')
  delete(@Body() DeleteTagDto:DeleteTagDto) {
    return this.tagService.deleteTag(DeleteTagDto);
  }
}
