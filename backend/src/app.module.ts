import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AlbumResolver } from './album.resolver';
import { Database } from 'sqlite3';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TrackModule,
  ],
  providers: [
    AlbumService,
    AlbumResolver,
    {
      provide: Database,
      useFactory: () => new Database('chinook.sqlite'),
    },
  ],
})
export class AppModule {}
