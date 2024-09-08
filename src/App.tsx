import Category from "./components/Category"
import Header from "./components/Header"
import SingleCategoryItem from "./components/SingleCategory"
import MealDetail from "./components/mealDetail"
import Home from "./pages/Home"
import RandomMeal from "./components/RandomMeal"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import SearchResult from "./components/searchResult"
import AreaResult from "./components/areaResult"

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<SingleCategoryItem />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/meal" element={<MealDetail />} />
          <Route path="/random-recips" element={<RandomMeal />} />
          <Route path="/search-result/:name/" element={<SearchResult />} />
          <Route path="/area-result/:name/" element={<AreaResult />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
