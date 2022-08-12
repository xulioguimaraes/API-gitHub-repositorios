import { BrowserRouter, Route, Routes as RoutesDom } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { Favorites } from "../pages/Favorites";
import Home from "../pages/Home";

export const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />

        <RoutesDom>
          <Route path="/" element={<Home />}/>
          <Route path="/favoritos" element={<Favorites />} />
        </RoutesDom>
      </BrowserRouter>
    </>
  );
};
