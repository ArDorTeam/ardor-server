import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UpdateTagDto {
    @IsNotEmpty({message: '标签id不能为空'})
    @IsString()
    readonly tagId: string;

    @IsNotEmpty({message: '标签名称不能为空'})
    @IsString()
    readonly tagName: string;

    @IsNotEmpty({message: '状态不能为空'})
    @IsBoolean()
    readonly status: boolean;

    // @IsString()
    // readonly sortId: string;
}
