import { Test, TestingModule } from '@nestjs/testing';
import { TrackResolver } from './track.resolver';
import { TrackService } from './track.service';

describe('TrackResolver', () => {
  let resolver: TrackResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackResolver, TrackService],
    }).compile();

    resolver = module.get<TrackResolver>(TrackResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
