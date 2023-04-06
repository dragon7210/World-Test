import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetTrackResponse {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  duration: number;

  @Field()
  genre: string;
}
