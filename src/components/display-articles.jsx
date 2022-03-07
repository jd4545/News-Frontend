import { getArticles } from "../api"
import { useState, useEffect } from "react";

export default function DisplayArticles() {
    
    //Setting ARTICLE state:
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getArticles().then((articles) => {
          setArticles(articles);
        });
      }, []);

    // ARTICLES on HOME page
    return (
        <div className="articles-list-area">
        {articles.map((article) => {
          return (
            <div key={article.article_id} className="article-card">
                <h3 className="article-title">{article.title} </h3>
                <div className ="article-card-details">
              <div className="article-left">
                <p>Author: {article.author}</p>
                <p>Posted: {article.created_at.slice(0,-8).replace("T"," ")}</p>
              </div>
            <div className="article-right">
                <p>Topic: {article.topic}</p>
                <p>Votes: {article.votes}</p>
                <p>Comments: {article.comment_count}</p>
                </div>
            </div>
            </div>
          );
        })}
        </div>

    )
}