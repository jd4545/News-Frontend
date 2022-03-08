import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://jdsnewsapp.herokuapp.com/api/",
});

export function getArticles(slug) {
  return ncNewsApi
    .get("/articles", { params: { topic: slug } })
    .then(({ data: { articles } }) => {
      return articles;
    });
}

export function getTopics() {
  return ncNewsApi.get("/topics").then(({ data: { topics } }) => {
    return topics;
  });
}