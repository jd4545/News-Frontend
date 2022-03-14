import { getArticleById, patchArticleById } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "./error";
// import Vote from "./vote";
import Comments from "./comments";
import { Link } from "react-router-dom";

export default function SingleArticle() {

    // Setting initial article, isLoading & error STATE:
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] =useState(null)
  
    // useParams to get article_id
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
        }, [article_id]);

    // conditional loading... render 
    if (isLoading) return <h2>loading article...</h2>

    if(error) return <Error status={error.status} msg={error.msg} />
        
    // Article VOTE func:
    function handleClick(article_id, vote) {
        patchArticleById(article_id, vote)
        .then(() => {
        setArticle((updatedArticle) => {
            // Add Optimistic Rendering later:
            const optiArticle = {...article};
            optiArticle.votes += vote;
            console.log("OR vote: ", optiArticle.votes)
            return optiArticle;
        // return {...article, votes: updatedArticle.votes}
        })
        })
    }   
  
    // RENDER article
    return (
        <div key={article.article_id} className="article--overall">
        <h2 className="article--title">{article.title}</h2>
        <div className="article--details">
            <h3>{article.author}</h3>    
            <dt>{article.topic}</dt>
            <dt>{article.created_at.slice(0,-8).replace("T"," ")}</dt>
        </div>
        <p className="article--body"> {article.body} </p>
        <div className="article-lowersection">
        <h4 id="article--votes__header">Votes: {article.votes}</h4>
        {/* <Vote /> */}
        <button className="article--votes__button" onClick={()=> handleClick(article.article_id, 1)}>👍</button>
        <button className="article--votes__button" onClick={()=> handleClick(article.article_id, -1)}>👎</button>
        </div>
        <div className="article-lowersection__h4">
            <h4 >Comments: {article.comment_count} </h4> 
            <Link to={`/articles/${article_id}/comments`}><button className="user--login__btn">Post Comment</button></Link>
            <Comments />
        </div>
        </div>
    )
}