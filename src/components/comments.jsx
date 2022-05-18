import { getComments, deleteComment } from "../api";
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Error from "./error";
import { UserContext } from "../contexts/user-context";

export default function Comments() {

    // sets CONTEXT for logged in user
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    // Setting initial article, isLoading, error, isDeleting, message STATE:
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] =useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [message, setMessage] = useState("")

    // useParams to get comments for article_id
    const {article_id} = useParams()

    // function to render a message to the use
    function Message() {
        return message
        }

    function fetchComments(article_id) {
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
    }

    // handleClick function to DELETE comment
    function handleClick(comment_id) {
        setIsDeleting(true); // to show that article is deleting
        setMessage("Deleting comment...")
        deleteComment(comment_id).then((comment)=> {
            setIsDeleting(false)
            setMessage("")
            fetchComments(article_id)
        })
    }

    // useEffect to fetch Comments from backend and set new state:
    useEffect(() => {
        fetchComments(article_id)
    }, [article_id]);

    // conditional loading... and Error render 
    if (isLoading) return <h2>loading comments...</h2>
    if (error) return <Error status={error.status} msg={error.msg} />
    if (isDeleting) return (
        <div>
        <h2>Deleting comment...</h2>
        <button className="user--login__btn">
            <Link to={`/articles/${article_id}`}><h4>
                Return to Article</h4></Link>
        </button>
        </div>

    
    )

return (
    <div id="comment--section">
        {comments.map((comment)=> {
            return (
                <div key={comment.comment_id} id="comment--card">
                    <h5 className="comment--detail">{comment.author}</h5>
                    <dt className="comment--detail">{comment.created_at.slice(0,-8).replace("T"," ")}</dt><br />
                    <dt className="comment--detail">{comment.body}</dt>
                    <br/>
                    <dt className="comment--detail">{comment.votes} votes</dt>
                    {comment.author===loggedInUser.username && isDeleting===false ?
                     <button class="user--login__btn" onClick={()=>{handleClick(comment.comment_id)}} > Delete </button> :
                      <p></p> }  
                    <Message />
            </div>  
            )
        })}
    </div>
)
}