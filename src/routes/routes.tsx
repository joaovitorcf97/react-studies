import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Categories } from "../pages/Categories";
import { Login } from "../pages/Login";
import { NewCategory } from "../pages/NewCategory";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/category/new/:categoryId" element={<NewCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export { RoutesApp };

