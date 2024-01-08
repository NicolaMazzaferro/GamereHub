import { Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CardGames from "../components/CardGames";
import { useParams } from "react-router-dom";

export default function PlatformsGames() {

    const { platform } = useParams();
    const [platformsGames, setPlatformsGames] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      axios
        .get(
          `${import.meta.env.VITE_BASE_URL}games?key=${
            import.meta.env.VITE_API_KEY
          }&platforms=${platform}`
        )
        .then((response) => {
          setPlatformsGames(response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, [platform]);

    return (
      <>
       {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" width={345} height={365} />
          ))
        ) : (
            platformsGames.map((game) => <CardGames key={game.id} game={game} />)
        )}
      </>
    );
  }