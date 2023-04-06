import { Injectable } from '@nestjs/common';
import { Database } from 'sqlite3';
import { GetTrackArgs } from './dto/get-track.args';
import { GetTrackResponse } from './response/get-track.response';

@Injectable()
export class TrackService {
  constructor(private readonly db: Database) {}

  async getTracks(args: GetTrackArgs): Promise<GetTrackResponse[]> {
    const pageSize = args.pageSize ?? 20;
    const offset = (args.page ?? 1) * pageSize - pageSize;

    const query = `
    SELECT Track.TrackId AS id,
       Track.Name AS name,
       ROUND(Track.UnitPrice) AS price,
       Track.Milliseconds AS duration,
       Genre.Name AS genre
    FROM Track
    JOIN Genre ON Genre.GenreId = Track.GenreId
    JOIN Album ON Album.AlbumId = Track.AlbumId
    JOIN Artist ON Artist.ArtistId = Album.ArtistId
    WHERE (? IS '' OR Artist.Name = ?)
    AND (? IS '' OR Genre.Name = ?)
    AND (? IS NULL OR UnitPrice >= ?)
    AND (? IS NULL OR UnitPrice <= ?)
    ORDER BY Track.TrackId
    LIMIT ? OFFSET ?
    `;

    const params = [
      args.artistName ?? '',
      args.artistName ?? '',
      args.genreName ?? '',
      args.genreName ?? '',
      args.minPrice ?? null,
      args.minPrice ?? null,
      args.maxPrice ?? null,
      args.maxPrice ?? null,
      pageSize,
      offset,
    ];

    return new Promise<GetTrackResponse[]>((resolve, reject) => {
      this.db.all(query, params, (err, rows: GetTrackResponse[]) => {
        if (err) {
          reject(err);
        } else {
          const tracks = rows.map((row) => ({
            id: row.id,
            name: row.name,
            price: row.price,
            duration: row.duration / 1000,
            genre: row.genre,
          }));
          resolve(tracks);
        }
      });
    });
  }
}
