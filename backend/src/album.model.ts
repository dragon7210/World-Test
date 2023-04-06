import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Album {
  @Field()
  id: number;

  @Field()
  title: string;
}
