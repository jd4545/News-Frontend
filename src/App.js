import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import DisplayArticles from "./components/display-articles";
import Error from "./components/error";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<DisplayArticles />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
