import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getTopics } from "../api";

export default function Nav({setSearchParams}) {
    //Setting TOPICS state:
    const [topics, setTopics] = useState([]);


    // useEffect to fetch topics from backend
    useEffect(() => {
        getTopics().then((topics) => {
          setTopics(topics);
        });
      }, []);
  
    // render Navigation Bar on ALL pages
    return(
        <nav>
          <div>
            <ul className="nav--list">
                <li className="nav--topic" >
                    <Link className="nav--topic__Link" to="/">
                        Show All
                    </Link>
                </li>
                {topics.map(({slug}) => {
              return (
                  <li key ={slug} className="nav--topic" >
                      <Link className="nav--topic__Link" to={`/topics/${slug}`}>
                          {slug}
                      </Link>
                  </li>
              );
            })}
            </ul>
          </div>

        </nav>
  )
}