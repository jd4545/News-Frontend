import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://jdsnewsapp.herokuapp.com/api/",
});

export function getArticles(slug, sortBy, ord) {
  return ncNewsApi
    .get("/articles", {
      params: { topic: slug, sort_by: sortBy, order: ord },
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
}

export function getTopics() {
  return ncNewsApi.get("/topics").then(({ data: { topics } }) => {
    return topics;
  });
}

export function getArticleById(articleId) {
  return ncNewsApi
    .get(`/articles/${articleId}`)
    .then(({ data: { article } }) => {
      return article;
    });
}

export function getUsers() {
  return ncNewsApi.get("/users").then(({ data: { users } }) => {
    return users;
  });
}

export function patchArticleById(article_id, vote) {
  return ncNewsApi
    .patch(`/articles/${article_id}`, { inc_votes: vote })
    .then(({ data: { article } }) => {
      return article;
    });
}

export function getComments(articleId) {
  return ncNewsApi
    .get(`/articles/${articleId}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
}

export function postComment(article_id, comment) {
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, comment)
    .then(({ data: { comment } }) => {
      return comment;
    });
}

export function deleteComment(comment_id) {
  return ncNewsApi
    .delete(`/comments/${comment_id}`)
    .then(({ data: { comment } }) => {
      return comment;
    });
}
