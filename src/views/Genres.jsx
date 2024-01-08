import { Link } from 'react-router-dom';
import { Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CardCategory from "../components/CardCategory";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}genres?key=${import.meta.env.VITE_API_KEY}`
      )
      .then((response) => {
        setGenres(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" width={345} height={365} />
        ))
      ) : (
        genres.map((genre) => (
          <Link to={`/genres/${genre.id}`} key={genre.id} style={{ textDecoration: 'none' }}>
            <CardCategory prop={genre} />
          </Link>
        ))
      )}
    </>
  );
}
