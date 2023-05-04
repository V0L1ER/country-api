import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import AboutCountry from "../pages/AboutCountry";

function AppRouter(){
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/:nameCountry" element={<AboutCountry />} />
      </Routes>
    );
}

export default AppRouter