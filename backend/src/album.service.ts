import { Injectable } from '@nestjs/common';
import { Database } from 'sqlite3';

export interface GetAlbumsForArtistData {
  AlbumId: number;
  Title: string;
}

@Injectable()
export class AlbumService {
  constructor(private readonly db: Database) {}

  getAlbumsForArtist(artistId: number) {
    return new Promise<GetAlbumsForArtistData[]>((resolve, reject) => {
      this.db.all(
        'SELECT * FROM Album WHERE ArtistId = ?',
        artistId,
        (error, data: GetAlbumsForArtistData[]) => {
          if (error) reject(error);
          else resolve(data);
        },
      );
    });
  }
}
