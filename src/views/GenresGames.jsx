import { Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CardGames from "../components/CardGames";
import { useParams } from "react-router-dom";

export default function GenresGames() {

    const { genre } = useParams();
    const [genreGames, setGenreGames] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      axios
        .get(
          `${import.meta.env.VITE_BASE_URL}games?key=${
            import.meta.env.VITE_API_KEY
          }&genres=${genre}`
        )
        .then((response) => {
          setGenreGames(response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, [genre]);

    return (
      <>
       {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" width={345} height={365} />
          ))
        ) : (
            genreGames.map((game) => <CardGames key={game.id} game={game} />)
        )}
      </>
    );
  }