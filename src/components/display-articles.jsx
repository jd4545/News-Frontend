import { getArticles } from "../api"
import { useParams, Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Error from "./error";

export default function DisplayArticles() {
  
  // Setting searchParams and sort_by array
  const [searchParams, setSearchParams] = useSearchParams({});
  const sort_by = ["created_at", "title", "votes", "author"];

  // Setting initial articles, isLoading & error STATE:
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] =useState(null)
  const [ord, setOrd] = useState("DESC")

  // useParams to get topic.slug & set other parameters:
  const {slug} = useParams();
  let sort = searchParams.get("sort_by")

  // Toggle order function 
  function toggle() {
    if (ord === "ASC") {
     setOrd("DESC")
    } else if (ord === "DESC") {
      setOrd("ASC")}
  }

  // useEffect to fetch Articles from backend and set new state:
  useEffect(() => {
    setIsLoading(true)
      getArticles(slug, sort, ord).then((articles) => {
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
    }, [slug, sort, ord]);

  // conditional loading... render 
  if (isLoading) return <h2>loading articles...</h2>

  if(error) return <Error status={error.status} msg={error.msg} />

  // render ARTICLES on HOME page
  return (
    <div className="articles--overall">
          <div className="articles--sort"><h4>Sort by: </h4>
          {sort_by.map((sort)=> {
           return (<ul>
              <li className="articles--sort__click" 
              onClick={()=>{ setSearchParams({sort_by: sort})}}>
                {sort}
              </li>
            </ul>
            )
          })}
          </div>
          <button className="user--login__btn" onClick={()=> {toggle()}}>Order: {ord}</button>
      <div className="articles-list-area">
      {articles.map((article) => {
        return (
          <div key={article.article_id} className="article-card">
              <Link to={`/articles/${article.article_id}`}>
                <h3 className="article-title">{article.title} </h3>
              </Link>
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
      </div>
  )
}