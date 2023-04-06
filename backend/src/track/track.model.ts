import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Track {
  @Field(() => Int)
  TrackId: number;

  @Field()
  Name: string;

  @Field(() => Int)
  AlbumId: number;

  @Field(() => Int)
  MediaTypedId: number;

  @Field(() => Int)
  GenreId: number;

  @Field()
  Composer: string;

  @Field(() => Int)
  Milliseconds: number;

  @Field(() => Int)
  Bytes: number;

  @Field(() => Float)
  UnitPrice: number;
}
