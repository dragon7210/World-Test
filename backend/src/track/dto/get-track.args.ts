import { Field, Int, ArgsType, Float } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional } from 'class-validator';

@ArgsType()
export class GetTrackArgs {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  artistName?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  genreName?: string;

  @Field(() => Float, { nullable: true })
  @IsInt()
  @IsOptional()
  minPrice?: number;

  @Field(() => Float, { nullable: true })
  @IsInt()
  @IsOptional()
  maxPrice?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  page?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  pageSize?: number;
}
