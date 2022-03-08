import { getArticles } from "../api"
import { useState, useEffect } from "react";

export default function DisplayArticles() {
    
  //Setting ARTICLE & ISLOADING state:
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  // useEffect to fetch component from backend
  useEffect(() => {
    setIsLoading(true)
      getArticles().then((articles) => {
        setArticles(articles);
        setIsLoading(false)
      });
    }, []);

  // conditional loading... render 
  if (isLoading) return <h2>loading articles...</h2>

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