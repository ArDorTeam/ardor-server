import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTagDto {
    @IsNotEmpty({message: '标签id不能为空'})
    @IsString()
    readonly tagId: string;
}
