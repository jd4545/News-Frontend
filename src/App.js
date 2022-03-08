import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import DisplayArticles from "./components/display-articles";
import Error from "./components/error";
import Nav from "./components/nav";
import SingleArticle from "./components/article";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<DisplayArticles />} />
          <Route path="/topics/:slug" element={<DisplayArticles />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
