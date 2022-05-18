import { Link } from "react-router-dom";

export default function Header() {
    // RENDER header
    return (
        <header className="header">
            {/* <Link to="/" id="header--title"> */}
            <Link id="header--title" to="/">
                jd_news
            </Link>
            {/* <h1 id="header--title">
                jd news
            </h1> */}
            {/* </Link> */}
            <Link className="header--users__Link" to="/users">
                      account
            </Link>
        </header>
    )
}