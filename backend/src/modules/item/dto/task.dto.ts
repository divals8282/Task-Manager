import { IsOptional, IsString } from 'class-validator';

export class ItemDTO {
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
