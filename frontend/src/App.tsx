import { useQuery } from "@apollo/client";
import { useState } from "react";
import "./App.css";
import GET_TRACKS from "./graphql/query/getTracks";

function App() {
  const [page, setPage] = useState(1);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artistName, setArtistName] = useState("");
  const [genreName, setGenreName] = useState("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [pageSize, setPageSize] = useState<number>(20);

  const { loading, error, fetchMore, refetch } = useQuery(GET_TRACKS, {
    variables: { page, pageSize, artistName, genreName, minPrice, maxPrice },
    skip: true,
  });
  console.log(tracks);
  const handleSearch = async () => {
    console.log(123);
    setPage(1);
    const result = await refetch();
    setTracks(result?.data?.getTracks);
  };

  const fetchMoreData = () => {
    const nextPage = page + 1;
    const variables = {
      page: nextPage,
      pageSize,
      artistName,
      genreName,
      minPrice,
      maxPrice,
    };
    fetchMore({
      variables,
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || fetchMoreResult.getTracks.length === 0) {
          return prev;
        }
        setTracks((prev) => [...prev, ...fetchMoreResult.getTracks]);
        if (fetchMoreResult.getTracks.length < pageSize) {
          return;
        }
        setPage(nextPage);
      },
    });
  };

  return (
    <div className="App">
      <div className="search-form">
        <label>
          Artist Name:
          <input
            type="text"
            placeholder="ex. Led Zeppelin"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </label>
        <label>
          Genre Name:
          <input
            type="text"
            placeholder="ex. Rock"
            value={genreName}
            onChange={(e) => setGenreName(e.target.value)}
          />
        </label>
        <label>
          Min Price:
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Page Size:
          <input
            type="number"
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value))}
          />
        </label>
        <button onClick={handleSearch}>Search</button>
      </div>
      {tracks?.length > 0 && (
        <div className="load-more">
          {pageSize * page >= tracks?.length ? (
            <button onClick={fetchMoreData}>Load More</button>
          ) : (
            <p>No more tracks to load.</p>
          )}
        </div>
      )}
      <div className="tracks-container">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!loading && !error && (
          <>
            {tracks?.length ? (
              <table>
                <thead>
                  <tr>
                    <th>TrackId</th>
                    <th>Name</th>
                    <th>Genre</th>
                    <th>Duration (seconds)</th>
                    <th>Price ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {tracks?.map((track, i) => (
                    <tr key={i}>
                      <td>{track.id}</td>
                      <td>{track.name}</td>
                      <td>{track.genre}</td>
                      <td>{track.duration}</td>
                      <td>{track.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              "No Data"
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
