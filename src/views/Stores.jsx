import { Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CardCategory from "../components/CardCategory";
import { Link } from "react-router-dom";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}stores?key=${import.meta.env.VITE_API_KEY}`
      )
      .then((response) => {
        setStores(response.data.results);
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
     stores.map((store) => (
        <Link to={`/stores/${store.id}`} key={store.id} style={{ textDecoration: 'none' }}>
          <CardCategory prop={store} />
        </Link>
      ))
    )}
  </>
  );
}