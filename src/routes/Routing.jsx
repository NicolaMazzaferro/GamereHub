import { createBrowserRouter } from "react-router-dom";
import LayoutApp from '../Layouts/LayoutApp';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import Home from '../views/Home';
import Genres from '../views/Genres';
import Platforms from '../views/Platforms';
import Stores from '../views/Stores';
import GenresGames from '../views/GenresGames';
import PlatformsGames from '../views/PlatformsGames';
import StoresGames from '../views/StoresGames';
import DetailGames, { getSingleGame } from '../views/DetailGames';
import Profile from '../views/Profile';
import Settings from "../views/Settings";
import ProtectedRoute from "../components/ProtectedRoute";
import CommentPage from "../views/CommentPage";


const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutApp />,
      children: [
        {
            path: "/",
            element: <Home />
        },
        {
          path: "/genres",
          element: <Genres />
        },
        {
          path: '/genres/:genre',
          element: <GenresGames />,
        },
        {
          path: "/platforms",
          element: <Platforms />
        },
        {
          path: '/platforms/:platform',
          element: <PlatformsGames />,
        },
        {
          path: "/stores",
          element: <Stores />
        },
        {
          path: "/game/:id",
          element: <DetailGames />,
          loader: getSingleGame,
        },
        {
          path: '/stores/:store',
          element: <StoresGames />,
        },
        {
            path: "/login",
            element: <SignIn />
        },
        {
            path: "/register",
            element: <SignUp />
        },
        {
          path: '/',
          element: <ProtectedRoute />,
          children: [
            {
              path: '/account',
              element: <Profile />,
            },
            {
              path: '/settings',
              element: <Settings />,
            },
            {
              path: '/game/:id/comment',
              element: <CommentPage />,
              loader: getSingleGame,
            },
          ],
        },
      ]
    },
  ]);

  export default router;