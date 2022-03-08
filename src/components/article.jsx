import { getArticleById } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "./error";

export default function SingleArticle() {

    // Setting initial article, isLoading & error STATE:
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] =useState(null)
  
    // useParams to get topic.slug
    const {article_id} = useParams()

    // useEffect to fetch Article from backend and set new state:
    useEffect(() => {
        setIsLoading(true)
        getArticleById(article_id).then((article) => {
            setArticle(article);
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
        }, []);

  // conditional loading... render 
  if (isLoading) return <h2>loading article...</h2>

  if(error) return <Error status={error.status} msg={error.msg} />
        console.log(article)

    return (
        <div key={article.article_id} >
        <h2 className="article--title">{article.title}</h2>
        <div className="article--details">
            <h3>{article.author}</h3>    
            <dt>{article.topic}</dt>
            <dt>{article.created_at.slice(0,-8).replace("T"," ")}</dt>
        </div>
        <p className="article--body"> {article.body} </p>
        <div className="article-lowersection">
        <dt>Comments: {article.comment_count}</dt>
        <dt>Votes: {article.votes}</dt>
        </div>
        </div>
    )
}