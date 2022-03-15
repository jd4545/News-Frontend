import { Link } from "react-router-dom";

export default function Header() {
    // RENDER header
    return (
        <header className="header">
            {/* <Link to="/" id="header--title"> */}
            <h1 id="header--title">
                jd news
            </h1>
            {/* </Link> */}
            <Link className="header--users__Link" to="/users">
                      users
            </Link>
        </header>
    )
}