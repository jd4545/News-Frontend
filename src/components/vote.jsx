import { useState } from "react";
import { patchArticleById } from "../api";

// component currently unconnected to App

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

}