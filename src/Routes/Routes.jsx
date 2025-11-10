import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import ErrorPage from "../ErrorPage/ErrorPage";
import HomePage from "../Pages/HomePage/HomePage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ExploreArtwork from "../Components/ExploreArtwork/ExploreArtwork";
import PrivateRoutes from "./../PrivateRoutes/PrivateRoutes";
import AddArtwork from "../Components/AddArtwork/AddArtwork";
import MyGallery from "../Components/MyGallery/MyGallery";
import MyFavorites from "../Components/MyFavorites/MyFavorites";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/explore-Artworks",
        loader: () => fetch("http://localhost:3000/explore-art"),
        Component: ExploreArtwork,
      },
      {
        path: "/add-Artwork",
        element: (
          <PrivateRoutes>
            <AddArtwork />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-Gallery",
        element: (
          <PrivateRoutes>
            <MyGallery />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-Favorites",
        element: (
          <PrivateRoutes>
            <MyFavorites />
          </PrivateRoutes>
        ),
      },
      {
        path: "/register",
        Component: RegisterPage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },

      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
]);

export default router;
