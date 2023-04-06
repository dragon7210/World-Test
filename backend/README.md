# full-stack-interview

This repository contains the World of V interview challenge. Included in the repository is a working GraphQL server based on the [NestJS](https://docs.nestjs.com) framework. The `getAlbumsForArtist` query defined in the schema will not be used during the challenge but is included as a guide for structuring the code.

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start:dev
```

## Database description

The `chinook.sqlite` file at the root of the repository contains a copy of the [chinook database](https://github.com/lerocha/chinook-database) as data source for the queries. The `schema.png` file is a diagram of the database model included in the repo for convenience. Only a few of the tables will be used in this exercise, the rest can be safely ignored.

## Tasks

### Challenge 1

Write a new query `getTracks` for retrieving a list of tracks from the database.

**BONUS**: Sanitize the user input by using `class-validator` decorators on the input type.

#### Query parameters

| name       | description                                   |
| ---------- | --------------------------------------------- |
| artistName | **Name** of the track's artist.               |
| genreName  | **Name** of the track's genre.                |
| minPrice   | Minimum price of the track, inclusive.        |
| maxPrice   | Maximum price of the track, exclusive.        |
| page       | Index of the requested page, starting from 0. |
| pageSize   | Size of a single page.                        |

#### Response format

| name     | description                  | unit    |
| -------- | ---------------------------- | ------- |
| id       | ID of the track.             | -       |
| name     | Name of the track.           | -       |
| price    | Price of the track.          | $       |
| duration | Duration of the track.       | seconds |
| genre    | **Name** of the track genre. | -       |

### Challenge 2

See [frontend/README.md](frontend/README.md) for details.

### Challenge 3 (**OPTIONAL**)

Add the `artist` field to the previous challenge's response model using a [NestJS field resolver](https://docs.nestjs.com/graphql/resolvers).

**BONUS**: Adding the field using this method will require N+1 queries to the database, one for each artist. Install and configure [nestjs-dataloader](https://www.npmjs.com/package/nestjs-dataloader) to make sure all the artists are fetched using a single query.

#### Field format

| name | description         |
| ---- | ------------------- |
| id   | ID of the artist.   |
| name | Name of the artist. |

## Evaluation criteria

1. Correctness - The queries should return the correct data based on the supplied parameters.
2. Security - The code should not contain vulnerabilities (e.g. sql injection).
3. Efficency - All queries should make use of indexes when possible and should remain fast as the size of the dataset increases.
4. Mantainability - The code should be clear and easy to modify.

## Submitting you work

You can send the complete exercise via mail to `lorenzo@worldofv.art` as an attachment or you can send us a link to your fork on GitHub/GitLab/BitBucket.
