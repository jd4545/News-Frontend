import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://jdsnewsapp.herokuapp.com/api/",
});

export function getArticles(topic) {
  return ncNewsApi
    .get("/articles", { params: { topic } })
    .then(({ data: { articles } }) => {
      console.log(articles);
      return articles;
    });
}

export function getTopics() {
  return ncNewsApi.get("/topics").then(({ data: { topics } }) => {
    return topics;
  });
}
