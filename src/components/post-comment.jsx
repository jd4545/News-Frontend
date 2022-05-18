import { postComment } from "../api";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/user-context";
import { Link } from "react-router-dom";

export default function CreateComment() {

    // sets CONTEXT for logged in user
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    // Setting initial comment, isPosting, message, STATE:
    const [commentText, setCommentText] = useState("")
    const [isPosting, setIsPosting] = useState(false)
    const [message, setMessage] = useState('');

    // useParams to get comments for article_id
    const {article_id} = useParams();

    // function to render a message to the use
    function Message() {
        return message
      }
    
    // functions to setMessage when field is blank/comment is posted:
      function blankMsg() {
        const msgTxt = 'Comment cannot be blank'
        setMessage(msgTxt)
      }
      function postedMsg() {
        const msgTxt = `Comment Posted!`
        setMessage(msgTxt)
      }

    function handleSubmit (event) {
        event.preventDefault()
        const comment = {
            username : loggedInUser.username,
            body: commentText
        } 
        setCommentText('')
          if (commentText.length === 0) {
            blankMsg()
          } else {
            setIsPosting(true)
            postComment(article_id, comment)
            .then(()=> {
                setIsPosting(false)
                postedMsg()
            })
          }
    }

    // conditional loading... and Error render 
    function IsPosting() {
        if (isPosting) {
            return <p>posting comment...</p> 
        } else {
            return ""
        }
    }

    // RENDER page:
    return(
        <div>
            <h3 className="article--title">
                Submit a Comment
            </h3>
            <main>
                <form onSubmit={handleSubmit} className="comment--form">
                    <fieldset>
                        <legend>Input text here:</legend>
                        {/* <label htmlFor="comment">Input here: </label> <br /> */}
                        <input
                            id="input--comment"
                            type="text"
                            size="40"
                            value={commentText}
                            onChange={(e) => {
                                setMessage('')
                                setCommentText(e.target.value)
                            }}/><br /><br />
                        <button type="submit" className="user--login__btn">Submit</button>
                        <br /><br />
                        <Message />
                    </fieldset>
                </form>
            </main>
        <IsPosting /><br/>

            <Link to={`/articles/${article_id}`}><button className="user--login__btn">Return to Article</button>
                </Link>

        </div>
)

}