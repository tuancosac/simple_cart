import { IsInt, Min } from 'class-validator';

export class UpdateCartDto {
  @IsInt()
  @Min(1, { message: 'Số lượng phải lớn hơn hoặc bằng 1' })
  quantity!: number;
}