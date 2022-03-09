import { useState } from "react";
import { patchArticleById } from "../api";

export default function Vote({vote, article_id, updateVote}) {
    const [voteChange, setVoteChange] = useState(0);

    function handleClick(voteChange) {
        setVoteChange((currentVote) => currentVote + voteChange);
        updateVote(article_id, voteChange)
    }
    return (
        <section>
        <button className="article--votes__button" onClick={()=> handleClick(1)}>👍</button>
        <button className="article--votes__button" onClick={()=> handleClick(-1)}>👎</button>
        </section>
    )
    // function updateVote(article_id, voteChange) {
    //     patchArticleById(article_id, voteChange)
    //     .catch(() => {
    //     setArticle((article) => {
    //         //Optimistic Rendering:
    //         const optiArticle = {...article};
    //         optiArticle.votes += voteChange;
    //         console.log("OR vote: ", optiArticle.votes)
    //         return optiArticle;
    //     // return {...article, votes: updatedArticle.votes}
    //     })
    //     })

    // }
}