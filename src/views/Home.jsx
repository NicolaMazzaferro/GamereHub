import axios from "axios";
import CardMUI from "../components/CardGames";
import { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import SearchAppBar from '../components/SearchAppBar'
import { Button, ButtonGroup, Container, Grid } from "@mui/material";
import useDebounceSearch from "../hooks/useDebounceSearch";

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState(1);
  const debouncedSearch = useDebounceSearch(search);

  const handleSearch = (event) => {
    setSearch(event.currentTarget.value);
  };

  useEffect(() => {
    setGames([]);
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&page=${pagination}&page_size=21&search=${search}`
      )
      .then((response) => {
        setGames(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, pagination]);
  
  return (
    <Grid container spacing={2}>
    <Grid item xs={12}>
      <SearchAppBar handleSearch={handleSearch} />
    </Grid>
    {loading ? (
      Array.from({ length: 6 }).map((_, index) => (
        <Grid item key={index} xs={12} md={6} lg={4}>
          <Skeleton variant="rectangular" width={345} height={365} />
        </Grid>
      ))
    ) : (
      games.map((game) => (
        <Grid item key={game.id} xs={12} md={6} lg={4}>
          <CardMUI game={game} />
        </Grid>
      ))
    )}
        <Container className="join mt-7" sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
          <ButtonGroup color="inherit" aria-label="pagination">
            <Button
              disabled={pagination === 1}
              onClick={() => setPagination((prevState) => prevState - 1)}
            >
              Previous
            </Button>
            <Button disabled>{pagination}</Button>
            <Button onClick={() => setPagination((prevState) => prevState + 1)}>Next</Button>
          </ButtonGroup>
        </Container>
  </Grid>
  );
}
