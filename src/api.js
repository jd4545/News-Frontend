import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://jdsnewsapp.herokuapp.com/api/",
});

export function getArticles() {
  return ncNewsApi.get("/articles").then(({ data: { articles } }) => {
    // console.log(articles);
    return articles;
  });
}
