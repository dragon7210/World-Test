import { Resolver, Query, Args } from '@nestjs/graphql';
import { TrackService } from './track.service';
import { Track } from './track.model';
import { GetTrackArgs } from './dto/get-track.args';
import { GetTrackResponse } from './response/get-track.response';

@Resolver(() => Track)
export class TrackResolver {
  constructor(private readonly trackService: TrackService) {}

  @Query(() => [GetTrackResponse], { name: 'getTracks' })
  getTracks(@Args() args: GetTrackArgs) {
    return this.trackService.getTracks(args);
  }
}
