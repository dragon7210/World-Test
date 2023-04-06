import { gql } from "@apollo/client";

const GET_TRACKS = gql`
  query GET_TRACKS(
    $page: Int!
    $pageSize: Int!
    $artistName: String
    $genreName: String
    $minPrice: Float
    $maxPrice: Float
  ) {
    getTracks(
      page: $page
      pageSize: $pageSize
      artistName: $artistName
      genreName: $genreName
      minPrice: $minPrice
      maxPrice: $maxPrice
    ) {
      id
      name
      price
      duration
      genre
    }
  }
`;

export default GET_TRACKS;