import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ItemListDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  position?: number;
}
