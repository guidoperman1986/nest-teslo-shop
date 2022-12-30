/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(()=> Number) //enableImplicitConvertion: true
  limit?: number;
  
  @IsOptional()
  @Type(()=> Number)
  offset?: number;
}
