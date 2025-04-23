/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsIn, IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(()=> Number) //enableImplicitConvertion: true
  limit?: number;
  
  @IsOptional()
  @Type(()=> Number)
  offset?: number;

  @IsOptional()
  @IsString()
  @IsIn(['men', 'women', 'kid', ''])
  gender?: string;
}
