import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackResolver } from './track.resolver';
import { Database } from 'sqlite3';

@Module({
  providers: [
    TrackResolver,
    TrackService,
    {
      provide: Database,
      useFactory: () => new Database('chinook.sqlite'),
    },
  ],
})
export class TrackModule {}
