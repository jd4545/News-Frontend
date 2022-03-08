import { getArticles } from "../api"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Error from "./error";

export default function DisplayArticles() {
    
  // Setting initial ARTICLE & ISLOADING state:
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] =useState(null)

  // useParams to get topic.slug
  const {slug} = useParams()

  // useEffect to fetch Articles from backend and set new state:
  useEffect(() => {
    setIsLoading(true)
      getArticles(slug).then((articles) => {
        setArticles(articles);
        setIsLoading(false) // to skip isLoading and render page
        setError(null) // to clear error after prior catch
      })
      .catch(({
        response: {
          data: {msg},
        status        
      },
      }) => {
        setError({ msg, status});
        setIsLoading(false)
      })
    }, [slug]);

  // conditional loading... render 
  if (isLoading) return <h2>loading articles...</h2>

  if(error) return <Error status={error.status} msg={error.msg} />

  // render ARTICLES on HOME page
  return (
      <div className="articles-list-area">
      {articles.map((article) => {
        return (
          <div key={article.article_id} className="article-card">
              <h3 className="article-title">{article.title} </h3>
              <div className ="article-card-details">
            <div className="article-left">
              <dt>{article.author}</dt>
              <dt>{article.created_at.slice(0,-8).replace("T"," ")}</dt>
            </div>
          <div className="article-right">
              <dt>{article.topic}</dt>
              <dt>Votes: {article.votes}</dt>
              <dt>Comments: {article.comment_count}</dt>
              </div>
          </div>
          </div>
        );
      })}
      </div>

  )
}