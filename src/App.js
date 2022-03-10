import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import DisplayArticles from "./components/display-articles";
import Error from "./components/error";
import Nav from "./components/nav";
import SingleArticle from "./components/article";
import Users from "./components/users";
import { useState } from "react";
import { UserContext } from "./contexts/user-context";
import Comments from "./components/comments";
import CreateComment from "./components/post-comment";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({ username: "tickle122" });
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <div className="App">
          <Header />
          <Nav />
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<DisplayArticles />} />
            <Route path="/articles" element={<DisplayArticles />} />
            <Route path="/topics/:slug" element={<DisplayArticles />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
            <Route
              path="/articles/:article_id/comments"
              element={<CreateComment />}
            />
            <Route
              path="/articles/:article_id/comments"
              element={<Comments />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
