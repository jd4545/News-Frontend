import { getComments } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "./error";

export default function Comments() {

    // Setting initial article, isLoading & error STATE:
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] =useState(null)

    // useParams to get comments for article_id
    const {article_id} = useParams()

    // useEffect to fetch Comments from backend and set new state:
    useEffect(() => {
    setIsLoading(true)
    getComments(article_id).then((comments) => { 
        setComments(comments);
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

    // conditional loading... and Error render 
    if (isLoading) return <h2>loading comments...</h2>
    if(error) return <Error status={error.status} msg={error.msg} />

return (
    <div>
        {comments.map((comment)=> {
            return (
                <div key={comment.comment_id} className="comment--card">
                    <h5>{comment.author}</h5>
                    <dt>{comment.created_at.slice(0,-8).replace("T"," ")}</dt><br />
                    <dt>{comment.body}</dt>
                    <dt>Votes: {comment.votes}</dt>
            </div>
            )
        })}
    </div>
)
}