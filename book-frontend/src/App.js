import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddBook from "./Components/AddBook/AddBook";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import SearchBook from "./Components/SearchBook/SearchBook";
import Export from "./Components/Export/Export";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/add" element={<AddBook />}></Route>
          <Route path="/search" element={<SearchBook/>}></Route>
          <Route path="/export" element={<Export />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
